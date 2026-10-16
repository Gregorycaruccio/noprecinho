import React from 'react';
import './Home.css';

const Home = ({ stores, offers, onSelectStore, onCategoryFilter }) => {
  const categories = [
    { id: 1, name: 'Açougue', emoji: '🥩' },
    { id: 2, name: 'Hortifruti', emoji: '🥬' },
    { id: 3, name: 'Bebidas', emoji: '🍻' },
    { id: 4, name: 'Limpeza', emoji: '🧼' },
    { id: 5, name: 'Padaria', emoji: '🥖' },
  ];

  const filters = ['Aberto agora', '⭐ Mais bem avaliados', '💸 Promoções', '📍 Mais perto'];

  const handleWhatsAppContact = (store, offer) => {
    const message = `Olá! Vi no app No Precinho: gostaria de reservar *${offer.name}* por *R$ ${offer.promoPrice}*. Ainda tem disponível?`;
    const cleanPhone = store.whatsapp.replace(/\D/g, '');
    const url = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="home-container">
      {/* Categories Row */}
      <section className="categories-section">
        <div className="categories-list">
          {categories.map(cat => (
            <div 
              key={cat.id} 
              className="category-item"
              onClick={() => onCategoryFilter && onCategoryFilter(cat.name)}
            >
              <div className="category-icon">{cat.emoji}</div>
              <span className="category-name">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Filters Scroll */}
      <section className="filters-section">
        <div className="filters-scroll">
          {filters.map((filter, index) => (
            <div key={index} className="filter-chip">
              {filter}
            </div>
          ))}
        </div>
      </section>

      {/* Sponsored Banner */}
      <section className="banner-section">
        <div className="promo-banner">
          <div className="banner-content">
            <h3>Sextou com Churrasco em Cidreira! 🍖</h3>
            <p>Até 30% OFF em carnes e cervejas nos melhores mercados</p>
            <button className="banner-btn" onClick={() => onCategoryFilter && onCategoryFilter('Açougue')}>
              Ver ofertas
            </button>
          </div>
        </div>
      </section>

      {/* Top Offers Grid */}
      <section className="offers-section">
        <div className="section-title-row">
          <h2 className="section-title">Precinho da Semana</h2>
          <span className="live-pulse">🔴 Ao vivo</span>
        </div>

        <div className="offers-grid">
          {offers.map(offer => {
            const store = stores.find(s => s.id === offer.storeId) || stores[0];
            return (
              <div key={offer.id} className="offer-card">
                <div className="offer-image-box">
                  <img src={offer.photoUrl} alt={offer.name} className="offer-real-img" />
                  {offer.validityLabel && (
                    <span className="validity-badge-home">⏰ {offer.validityLabel}</span>
                  )}
                </div>

                <div className="offer-details">
                  <div 
                    className="market-info-row clickable"
                    onClick={() => onSelectStore(store.id)}
                    title="Clique para ver o perfil completo deste mercado"
                  >
                    <span className="market-badge" style={{ backgroundColor: store.color }}>
                      {store.name}
                    </span>
                    <span className="market-rating">⭐ {store.ratings.app.score}</span>
                  </div>
                  
                  <h4 className="product-name">{offer.name}</h4>
                  
                  <div className="price-row">
                    {offer.originalPrice && offer.originalPrice !== offer.promoPrice && (
                      <span className="old-price">R$ {offer.originalPrice}</span>
                    )}
                    <span className="new-price">R$ {offer.promoPrice}</span>
                  </div>

                  <div className="offer-card-actions">
                    <button 
                      className="btn-reserve-quick"
                      onClick={() => handleWhatsAppContact(store, offer)}
                      title="Reservar oferta no WhatsApp do mercado"
                    >
                      💬 WhatsApp
                    </button>
                    <button 
                      className="btn-view-store"
                      onClick={() => onSelectStore(store.id)}
                    >
                      Ver Loja →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stores Showcase: Mercados Parceiros com Notas do Google e App */}
      <section className="stores-showcase-section">
        <h2 className="section-title">Mercados e Açougues Parceiros</h2>
        <p className="section-subtitle">Toque para ver perfil, fotos do encarte e avaliações do Google</p>

        <div className="stores-horizontal-list">
          {stores.map(store => (
            <div 
              key={store.id} 
              className="store-showcase-card"
              onClick={() => onSelectStore(store.id)}
            >
              <div className="store-card-header" style={{ backgroundImage: `url(${store.coverImage})` }}>
                <span className="store-card-logo">{store.logo}</span>
              </div>
              <div className="store-card-body">
                <h4>{store.name}</h4>
                <p className="store-card-neighborhood">📍 {store.neighborhood} • Cidreira</p>
                
                <div className="store-card-ratings">
                  <span className="rating-pill app">📱 {store.ratings.app.score}</span>
                  <span className="rating-pill google">🌐 Google: {store.ratings.google.score}</span>
                </div>

                {store.flyerUrl && (
                  <span className="badge-has-flyer">📰 Encarte Disponível</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
