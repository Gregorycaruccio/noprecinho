import React from 'react';
import './Home.css';

const Home = () => {
  const categories = [
    { id: 1, name: 'Açougue', emoji: '🥩' },
    { id: 2, name: 'Hortifruti', emoji: '🥬' },
    { id: 3, name: 'Bebidas', emoji: '🍻' },
    { id: 4, name: 'Limpeza', emoji: '🧼' },
    { id: 5, name: 'Padaria', emoji: '🥖' },
  ];

  const filters = ['Aberto agora', '⭐ Bem avaliados', '💸 Promoções', '📍 Mais perto'];

  const offers = [
    { id: 1, product: 'Cerveja Brahma 350ml lata', price: 'R$ 2,99', oldPrice: 'R$ 3,49', market: 'Mercado Central', marketColor: '#0055ff', rating: '4.8' },
    { id: 2, product: 'Contra Filé Friboi (KG)', price: 'R$ 34,90', oldPrice: 'R$ 42,00', market: 'Super Litoral', marketColor: '#ff7700', rating: '4.5' },
    { id: 3, product: 'Leite Integral Tirol 1L', price: 'R$ 4,59', oldPrice: 'R$ 5,20', market: 'Mercado Central', marketColor: '#0055ff', rating: '4.8' },
    { id: 4, product: 'Carvão Vegetal 3kg', price: 'R$ 12,90', oldPrice: 'R$ 16,00', market: 'Super Salinas', marketColor: '#28a745', rating: '4.9' },
  ];

  return (
    <div className="home-container">
      {/* Categories Row */}
      <section className="categories-section">
        <div className="categories-list">
          {categories.map(cat => (
            <div key={cat.id} className="category-item">
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
            <h3>Sextou com Churrasco! 🍖</h3>
            <p>Até 30% OFF em carnes e bebidas</p>
            <button className="banner-btn">Ver ofertas</button>
          </div>
        </div>
      </section>

      {/* Top Offers */}
      <section className="offers-section">
        <h2 className="section-title">Precinho da Semana</h2>
        <div className="offers-grid">
          {offers.map(offer => (
            <div key={offer.id} className="offer-card">
              <div className="offer-image-placeholder"></div>
              <div className="offer-details">
                
                <div className="market-info-row">
                  <span className="market-badge" style={{ backgroundColor: offer.marketColor }}>
                    {offer.market}
                  </span>
                  <span className="market-rating">⭐ {offer.rating}</span>
                </div>
                
                <h4 className="product-name">{offer.product}</h4>
                <div className="price-row">
                  <span className="old-price">{offer.oldPrice}</span>
                  <span className="new-price">{offer.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
