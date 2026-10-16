import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Search from './components/Search';
import StoreProfile from './components/StoreProfile';
import Login from './components/Login';
import Admin from './components/Admin';
import { initialStores, initialOffers } from './data/mockData';

function App() {
  const [stores, setStores] = useState(initialStores);
  const [offers, setOffers] = useState(initialOffers);
  
  // Views: 'home' | 'search' | 'store_profile' | 'login' | 'admin'
  const [currentView, setCurrentView] = useState('home');
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [loggedInStore, setLoggedInStore] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Admin offer handlers
  const handleAddOffer = (newOffer) => {
    setOffers([newOffer, ...offers]);
  };

  const handleDeleteOffer = (offerId) => {
    setOffers(offers.filter(o => o.id !== offerId));
  };

  const handleUpdateStore = (storeId, updatedFields) => {
    setStores(stores.map(s => {
      if (s.id === storeId) {
        return { ...s, ...updatedFields };
      }
      return s;
    }));

    if (loggedInStore && loggedInStore.id === storeId) {
      setLoggedInStore({ ...loggedInStore, ...updatedFields });
    }
  };

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
          />
          
          <main className="main-content">
            {currentView === 'home' && (
              <Home 
                stores={stores} 
                offers={offers} 
                onSelectStore={handleSelectStore}
                onCategoryFilter={(cat) => handleSearch(cat)}
              />
            )}

            {currentView === 'search' && (
              <Search 
                query={searchQuery} 
                stores={stores} 
                offers={offers}
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
