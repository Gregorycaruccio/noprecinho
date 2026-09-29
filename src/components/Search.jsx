import React from 'react';
import './Search.css';

const Search = ({ query }) => {
  // Simulando resultados de banco de dados
  const results = [
    { id: 1, market: 'Super Litoral', price: 'R$ 3,19', neighborhood: 'Centro', rating: '4.5', color: '#ff7700', isCheapest: true },
    { id: 2, market: 'Mercado Central', price: 'R$ 3,49', neighborhood: 'Centro', rating: '4.8', color: '#0055ff', isCheapest: false },
    { id: 3, market: 'Super Salinas', price: 'R$ 3,60', neighborhood: 'Salinas', rating: '4.9', color: '#28a745', isCheapest: false },
  ];

  return (
    <div className="search-results-container">
      <div className="search-header">
        <h2>Buscando por: <span>"{query}"</span></h2>
        <p className="search-subtitle">Comparando em 3 mercados da cidade</p>
      </div>

      <div className="comparison-list">
        {results.map((item) => (
          <div key={item.id} className={`comparison-card ${item.isCheapest ? 'cheapest' : ''}`}>
            {item.isCheapest && <div className="cheapest-badge">🔥 Mais Barato!</div>}
            
            <div className="comparison-card-content">
               <div className="market-column">
                  <div className="market-name-row">
                    <span className="market-dot" style={{ backgroundColor: item.color }}></span>
                    <h4 className="market-name">{item.market}</h4>
                  </div>
                  <span className="market-meta">⭐ {item.rating} • {item.neighborhood}</span>
               </div>
               
               <div className="price-column">
                  <span className="price-value">{item.price}</span>
                  <button className="navigate-btn">Ir para oferta</button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
