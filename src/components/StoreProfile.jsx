import React, { useState } from 'react';
import './StoreProfile.css';

const StoreProfile = ({ store, offers, onBack }) => {
  const [activeTab, setActiveTab] = useState('offers'); // 'offers', 'reviews', 'flyer'
  const [reviewSource, setReviewSource] = useState('all'); // 'all', 'app', 'google'
  const [isFlyerZoomed, setIsFlyerZoomed] = useState(false);

  if (!store) return null;

  const storeOffers = offers.filter(o => o.storeId === store.id);

  const filteredReviews = store.reviews.filter(r => {
    if (reviewSource === 'all') return true;
    return r.source === reviewSource;
  });

  const handleWhatsAppContact = (productName = null, price = null) => {
    let message = `Olá! Vi o perfil do ${store.name} no aplicativo No Precinho.`;
    if (productName && price) {
      message = `Olá! Vi no app No Precinho: gostaria de reservar *${productName}* por *R$ ${price}*. Ainda tem disponível?`;
    }
    const cleanPhone = store.whatsapp.replace(/\D/g, '');
    const url = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="store-profile-container">
      {/* Cover and Back Button */}
      <div className="store-cover-wrapper">
        <img src={store.coverImage} alt={store.name} className="store-cover-img" />
        <button className="btn-back-floating" onClick={onBack}>
          ← Voltar
        </button>
        <span className="store-logo-floating">{store.logo}</span>
      </div>

      {/* Store Header Info */}
      <div className="store-info-card">
        <div className="store-title-row">
          <div>
            <h1 className="store-name">{store.name}</h1>
            <p className="store-address">📍 {store.address}</p>
            <p className="store-hours">🕒 {store.hours}</p>
          </div>
        </div>

        {/* Dual Ratings: App vs Google */}
        <div className="ratings-dual-card">
          <div className="rating-box app-rating">
            <div className="rating-top">
              <span className="rating-badge-source">📱 No Precinho</span>
              <span className="rating-score">⭐ {store.ratings.app.score}</span>
            </div>
            <span className="rating-count">{store.ratings.app.count} avaliações de moradores</span>
          </div>

          <div className="rating-box google-rating">
            <div className="rating-top">
              <span className="rating-badge-source google-source">🌐 Google Reviews</span>
              <span className="rating-score">⭐ {store.ratings.google.score}</span>
            </div>
            <span className="rating-count">{store.ratings.google.count} opiniões verificadas</span>
          </div>
        </div>

        {/* WhatsApp Direct Action Button */}
        <button className="btn-main-whatsapp" onClick={() => handleWhatsAppContact()}>
          <span className="wa-icon">💬</span> Chamar no WhatsApp do Mercado
        </button>
      </div>

      {/* Tabs */}
      <div className="store-tabs">
        <button 
          className={`tab-btn ${activeTab === 'offers' ? 'active' : ''}`}
          onClick={() => setActiveTab('offers')}
        >
          🏷️ Ofertas ({storeOffers.length})
        </button>
        {store.flyerUrl && (
          <button 
            className={`tab-btn ${activeTab === 'flyer' ? 'active' : ''}`}
            onClick={() => setActiveTab('flyer')}
          >
            📰 Encarte da Semana
          </button>
        )}
        <button 
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          ⭐ Avaliações ({store.reviews.length})
        </button>
      </div>

      {/* Tab Content: Offers */}
      {activeTab === 'offers' && (
        <div className="store-offers-grid">
          {storeOffers.length === 0 ? (
            <div className="empty-state">
              <p>Nenhuma oferta cadastrada no momento para este mercado.</p>
            </div>
          ) : (
            storeOffers.map(offer => (
              <div key={offer.id} className="store-offer-card">
                <div className="offer-image-box">
                  <img src={offer.photoUrl} alt={offer.name} />
                  {offer.validityLabel && (
                    <span className="validity-badge">⏰ {offer.validityLabel}</span>
                  )}
                </div>
                <div className="offer-card-body">
                  <span className="offer-category-pill">{offer.category}</span>
                  <h3 className="offer-name">{offer.name}</h3>
                  <div className="offer-price-row">
                    {offer.originalPrice && offer.originalPrice !== offer.promoPrice && (
                      <span className="offer-old-price">De R$ {offer.originalPrice}</span>
                    )}
                    <span className="offer-promo-price">R$ {offer.promoPrice}</span>
                  </div>
                  <button 
                    className="btn-reserve-wa"
                    onClick={() => handleWhatsAppContact(offer.name, offer.promoPrice)}
                  >
                    💬 Reservar no WhatsApp
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab Content: Encarte / Tabloide */}
      {activeTab === 'flyer' && store.flyerUrl && (
        <div className="flyer-container">
          <div className="flyer-card" onClick={() => setIsFlyerZoomed(!isFlyerZoomed)}>
            <img 
              src={store.flyerUrl} 
              alt="Encarte da Semana" 
              className={`flyer-img ${isFlyerZoomed ? 'zoomed' : ''}`} 
            />
            <p className="flyer-hint">🔍 Toque na imagem para {isFlyerZoomed ? 'reduzir' : 'ampliar'}</p>
          </div>
        </div>
      )}

      {/* Tab Content: Reviews (App + Google) */}
      {activeTab === 'reviews' && (
        <div className="reviews-tab-container">
          {/* Source Filter Chips */}
          <div className="review-filters">
            <button 
              className={`chip-filter ${reviewSource === 'all' ? 'active' : ''}`}
              onClick={() => setReviewSource('all')}
            >
              Todas ({store.reviews.length})
            </button>
            <button 
              className={`chip-filter ${reviewSource === 'app' ? 'active' : ''}`}
              onClick={() => setReviewSource('app')}
            >
              📱 No Precinho
            </button>
            <button 
              className={`chip-filter ${reviewSource === 'google' ? 'active' : ''}`}
              onClick={() => setReviewSource('google')}
            >
              🌐 Google Reviews
            </button>
          </div>

          <div className="reviews-list">
            {filteredReviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-top-bar">
                  <div>
                    <h4 className="reviewer-name">{review.author}</h4>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <div className="review-source-tag">
                    {review.source === 'app' ? (
                      <span className="badge-source-app">No Precinho</span>
                    ) : (
                      <span className="badge-source-google">Google</span>
                    )}
                  </div>
                </div>
                <div className="review-stars">
                  {'⭐'.repeat(review.rating)}
                </div>
                <p className="review-text">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreProfile;
