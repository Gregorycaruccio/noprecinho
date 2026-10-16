import React from 'react';
import './Search.css';

const Search = ({ query, stores, offers, onSelectStore }) => {
  const normalizedQuery = (query || '').toLowerCase().trim();

  // Filter offers matching query (name or category)
  const matchedOffers = offers.filter(o => 
    o.name.toLowerCase().includes(normalizedQuery) ||
    o.category.toLowerCase().includes(normalizedQuery)
  );

  // Sort by price ascending (cheapest first)
  const sortedOffers = [...matchedOffers].sort((a, b) => parseFloat(a.promoPrice) - parseFloat(b.promoPrice));

  const handleWhatsAppContact = (store, offer) => {
    const message = `Olá! Vi no comparador do app No Precinho: gostaria de reservar *${offer.name}* por *R$ ${offer.promoPrice}*.`;
    const cleanPhone = store.whatsapp.replace(/\D/g, '');
    const url = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="search-results-container">
      <div className="search-header">
        <h2>Buscando por: <span>"{query}"</span></h2>
        <p className="search-subtitle">
          {sortedOffers.length > 0 
            ? `Encontramos ${sortedOffers.length} ofertas ordenadas do MENOR para o maior preço:` 
            : 'Nenhum produto encontrado com esse termo.'}
        </p>
      </div>

      <div className="comparison-list">
        {sortedOffers.map((offer, index) => {
          const store = stores.find(s => s.id === offer.storeId) || stores[0];
          const isCheapest = index === 0;

          return (
            <div key={offer.id} className={`comparison-card ${isCheapest ? 'cheapest' : ''}`}>
              {isCheapest && <div className="cheapest-badge">🔥 Menor Preço em Cidreira!</div>}
              
              <div className="comparison-card-content">
                <div className="product-thumb-col">
                  <img src={offer.photoUrl} alt={offer.name} className="product-thumb-img" />
                </div>

                <div className="market-column">
                  <h4 className="search-product-name">{offer.name}</h4>
                  <div className="market-name-row" onClick={() => onSelectStore(store.id)}>
                    <span className="market-dot" style={{ backgroundColor: store.color }}></span>
                    <span className="market-name">{store.name}</span>
                    <span className="market-verified">⭐ {store.ratings.app.score}</span>
                  </div>
                  <span className="market-meta">📍 {store.neighborhood} • ⏰ {offer.validityLabel}</span>
                </div>
                
                <div className="price-column">
                  <span className="price-value">R$ {offer.promoPrice}</span>
                  <button 
                    className="navigate-btn wa"
                    onClick={() => handleWhatsAppContact(store, offer)}
                  >
                    💬 WhatsApp
                  </button>
                  <button 
                    className="navigate-btn profile"
                    onClick={() => onSelectStore(store.id)}
                  >
                    Ver Loja
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
