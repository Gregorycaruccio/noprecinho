import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Search from './components/Search';
import StoreProfile from './components/StoreProfile';
import Login from './components/Login';
import Admin from './components/Admin';
import { initialStores, initialOffers } from './data/mockData';
import { supabase } from './lib/supabase';

function App() {
  const [stores, setStores] = useState(initialStores);
  const [offers, setOffers] = useState(initialOffers);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Toda a cidade (Cidreira)');
  const [loading, setLoading] = useState(true);
  
  // Views: 'home' | 'search' | 'store_profile' | 'login' | 'admin'
  const [currentView, setCurrentView] = useState('home');
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [loggedInStore, setLoggedInStore] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Fetch live data from Supabase on load
  useEffect(() => {
    async function loadDataFromSupabase() {
      try {
        setLoading(true);

        // Fetch stores
        const { data: dbStores, error: storesError } = await supabase.from('stores').select('*');
        if (!storesError && dbStores && dbStores.length > 0) {
          // Merge with initialStores so reviews and custom logos remain intact
          const formattedStores = dbStores.map(dbS => {
            const fallback = initialStores.find(is => is.id === dbS.id) || {};
            return {
              id: dbS.id,
              name: dbS.name,
              neighborhood: dbS.neighborhood,
              address: dbS.address,
              hours: dbS.hours || fallback.hours,
              whatsapp: dbS.whatsapp,
              color: dbS.color || fallback.color || '#0055ff',
              coverImage: dbS.cover_image || fallback.coverImage,
              logo: dbS.logo || fallback.logo || '🏪',
              flyerUrl: dbS.flyer_url || fallback.flyerUrl,
              login: { user: dbS.login_user || fallback.login?.user, pass: dbS.login_pass || fallback.login?.pass },
              ratings: {
                app: { score: Number(dbS.app_rating) || fallback.ratings?.app?.score || 5.0, count: dbS.app_reviews_count || fallback.ratings?.app?.count || 10 },
                google: { score: Number(dbS.google_rating) || fallback.ratings?.google?.score || 4.5, count: dbS.google_reviews_count || fallback.ratings?.google?.count || 50, url: fallback.ratings?.google?.url || 'https://maps.google.com' }
              },
              reviews: fallback.reviews || []
            };
          });

          // Ensure Açougue do Gaúcho is included if not yet inserted in DB
          const hasGaucho = formattedStores.some(s => s.id === 'acougue-do-gaucho');
          if (!hasGaucho) {
            const gaucho = initialStores.find(s => s.id === 'acougue-do-gaucho');
            if (gaucho) formattedStores.unshift(gaucho);
          }

          setStores(formattedStores);
        }

        // Fetch offers
        const { data: dbOffers, error: offersError } = await supabase.from('offers').select('*').order('created_at', { ascending: false });
        if (!offersError && dbOffers && dbOffers.length > 0) {
          const formattedOffers = dbOffers.map(dbO => ({
            id: dbO.id,
            storeId: dbO.store_id,
            name: dbO.name,
            category: dbO.category,
            originalPrice: dbO.original_price ? String(dbO.original_price) : '',
            promoPrice: String(dbO.promo_price),
            validityLabel: dbO.validity_label || 'Válido até domingo',
            photoUrl: dbO.photo_url || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
            views: dbO.views || 0,
          }));

          // Merge with Açougue do Gaúcho offers if DB offers don't have them yet
          const hasGauchoOffers = formattedOffers.some(o => o.storeId === 'acougue-do-gaucho');
          if (!hasGauchoOffers) {
            const gauchoOffers = initialOffers.filter(o => o.storeId === 'acougue-do-gaucho');
            setOffers([...gauchoOffers, ...formattedOffers]);
          } else {
            setOffers(formattedOffers);
          }
        }
      } catch (err) {
        console.warn('Usando dados locais de fallback:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDataFromSupabase();
  }, []);

  // Handle Search Input
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setCurrentView('home');
    } else {
      setCurrentView('search');
    }
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setSearchQuery('');
  };

  // Store profile view
  const handleSelectStore = (storeId) => {
    setSelectedStoreId(storeId);
    setCurrentView('store_profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Login flow
  const handleOpenLogin = () => {
    if (loggedInStore) {
      setCurrentView('admin');
    } else {
      setCurrentView('login');
    }
  };

  const handleLoginSuccess = (store) => {
    setLoggedInStore(store);
    setCurrentView('admin');
  };

  const handleLogout = () => {
    setLoggedInStore(null);
    setCurrentView('home');
  };

  // Admin offer handlers (Synced with Supabase)
  const handleAddOffer = async (newOffer) => {
    // Optimistic UI update
    setOffers(prev => [newOffer, ...prev]);

    try {
      await supabase.from('offers').insert([{
        store_id: newOffer.storeId,
        name: newOffer.name,
        category: newOffer.category,
        original_price: newOffer.originalPrice ? parseFloat(newOffer.originalPrice) : null,
        promo_price: parseFloat(newOffer.promoPrice),
        validity_label: newOffer.validityLabel,
        photo_url: newOffer.photoUrl,
        views: 0
      }]);
    } catch (err) {
      console.error('Erro ao salvar oferta no Supabase:', err);
    }
  };

  const handleDeleteOffer = async (offerId) => {
    // Optimistic UI update
    setOffers(prev => prev.filter(o => o.id !== offerId));

    try {
      await supabase.from('offers').delete().eq('id', offerId);
    } catch (err) {
      console.error('Erro ao remover oferta no Supabase:', err);
    }
  };

  const handleUpdateStore = async (storeId, updatedFields) => {
    setStores(prev => prev.map(s => {
      if (s.id === storeId) {
        return { ...s, ...updatedFields };
      }
      return s;
    }));

    if (loggedInStore && loggedInStore.id === storeId) {
      setLoggedInStore(prev => ({ ...prev, ...updatedFields }));
    }

    try {
      await supabase.from('stores').update({
        whatsapp: updatedFields.whatsapp,
        address: updatedFields.address,
        hours: updatedFields.hours,
        flyer_url: updatedFields.flyerUrl
      }).eq('id', storeId);
    } catch (err) {
      console.error('Erro ao atualizar loja no Supabase:', err);
    }
  };

  // Filtering by neighborhood
  const filteredStores = selectedNeighborhood === 'Toda a cidade (Cidreira)'
    ? stores
    : stores.filter(s => s.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase()));

  const filteredStoreIds = new Set(filteredStores.map(s => s.id));

  const filteredOffers = selectedNeighborhood === 'Toda a cidade (Cidreira)'
    ? offers
    : offers.filter(o => filteredStoreIds.has(o.storeId));

  const currentViewingStore = stores.find(s => s.id === selectedStoreId) || stores[0];

  return (
    <div className="app-container">
      {/* 1. Admin View (when merchant is logged in) */}
      {currentView === 'admin' && loggedInStore && (
        <Admin 
          currentStore={loggedInStore}
          offers={offers}
          onAddOffer={handleAddOffer}
          onDeleteOffer={handleDeleteOffer}
          onUpdateStore={handleUpdateStore}
          onLogout={handleLogout}
          onViewPublicProfile={() => handleSelectStore(loggedInStore.id)}
        />
      )}

      {/* 2. Login View */}
      {currentView === 'login' && (
        <Login 
          stores={stores}
          onLoginSuccess={handleLoginSuccess}
          onBackToApp={handleGoHome}
        />
      )}

      {/* 3. Public Consumer Experience (Header + Main + Footer) */}
      {currentView !== 'admin' && currentView !== 'login' && (
        <>
          <Header 
            onSearch={handleSearch} 
            onGoHome={handleGoHome} 
            currentQuery={searchQuery}
            selectedLocation={selectedNeighborhood}
            onSelectLocation={setSelectedNeighborhood}
          />
          
          <main className="main-content">
            {currentView === 'home' && (
              <Home 
                stores={filteredStores} 
                offers={filteredOffers} 
                onSelectStore={handleSelectStore}
                onCategoryFilter={(cat) => handleSearch(cat)}
              />
            )}

            {currentView === 'search' && (
              <Search 
                query={searchQuery} 
                stores={stores} 
                offers={filteredOffers}
                onSelectStore={handleSelectStore}
              />
            )}

            {currentView === 'store_profile' && (
              <StoreProfile 
                store={currentViewingStore}
                offers={offers}
                onBack={handleGoHome}
              />
            )}
          </main>

          {/* Persistent Footer with Merchant Access */}
          <footer className="app-footer">
            <button 
              className="btn-switch-admin"
              onClick={handleOpenLogin}
            >
              🏪 É dono de mercado? <strong>Acesse seu Painel com Login</strong>
            </button>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
