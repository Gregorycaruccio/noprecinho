import React, { useState } from 'react';
import './Admin.css';

const Admin = ({ onBackToApp }) => {
  const [offers, setOffers] = useState([
    { id: 1, name: 'Cerveja Brahma 350ml lata', originalPrice: '3.49', promoPrice: '2.99', category: 'Bebidas', views: 420 },
    { id: 2, name: 'Contra Filé Friboi (KG)', originalPrice: '42.00', promoPrice: '34.90', category: 'Açougue', views: 890 },
    { id: 3, name: 'Carvão Vegetal 3kg', originalPrice: '16.00', promoPrice: '12.90', category: 'Outros', views: 215 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    name: '',
    category: 'Açougue',
    originalPrice: '',
    promoPrice: '',
  });

  const handleAddOffer = (e) => {
    e.preventDefault();
    if (!newOffer.name || !newOffer.promoPrice) return;

    const offerItem = {
      id: Date.now(),
      name: newOffer.name,
      category: newOffer.category,
      originalPrice: newOffer.originalPrice || newOffer.promoPrice,
      promoPrice: newOffer.promoPrice,
      views: 0,
    };

    setOffers([offerItem, ...offers]);
    setNewOffer({ name: '', category: 'Açougue', originalPrice: '', promoPrice: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setOffers(offers.filter(o => o.id !== id));
  };

  return (
    <div className="admin-container">
      {/* Top Bar */}
      <div className="admin-header">
        <div>
          <button className="back-link" onClick={onBackToApp}>← Voltar ao App</button>
          <h2>Painel do Lojista</h2>
          <span className="store-badge">Mercado Central • Cidreira</span>
        </div>
        <button className="btn-add-offer" onClick={() => setIsModalOpen(true)}>
          + Nova Oferta
        </button>
      </div>

      {/* Metrics Row (Demonstrates value to the merchant) */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-title">Ofertas Ativas</span>
          <span className="metric-value">{offers.length}</span>
        </div>
        <div className="metric-card highlight">
          <span className="metric-title">Visualizações no App</span>
          <span className="metric-value">1.525</span>
          <span className="metric-sub">Nesta semana em Cidreira</span>
        </div>
      </div>

      {/* Offers Management */}
      <div className="admin-section">
        <div className="section-header">
          <h3>Suas Promoções em Destaque</h3>
          <span className="info-pill">Atualização Instantânea</span>
        </div>

        <div className="admin-offers-list">
          {offers.map(offer => (
            <div key={offer.id} className="admin-offer-card">
              <div className="admin-offer-info">
                <span className="category-tag">{offer.category}</span>
                <h4>{offer.name}</h4>
                <div className="admin-price-row">
                  {offer.originalPrice !== offer.promoPrice && (
                    <span className="admin-old-price">De R$ {offer.originalPrice}</span>
                  )}
                  <span className="admin-promo-price">Por R$ {offer.promoPrice}</span>
                </div>
                <span className="offer-stats">👁️ {offer.views} visualizações</span>
              </div>
              <button className="btn-delete" onClick={() => handleDelete(offer.id)}>
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fast Add Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Cadastrar Promoção Relâmpago</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleAddOffer} className="admin-form">
              <div className="form-group">
                <label>Nome do Produto</label>
                <input 
                  type="text" 
                  placeholder="Ex: Cerveja Skol 350ml lata" 
                  value={newOffer.name}
                  onChange={(e) => setNewOffer({ ...newOffer, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <select 
                  value={newOffer.category}
                  onChange={(e) => setNewOffer({ ...newOffer, category: e.target.value })}
                >
                  <option value="Açougue">Açougue 🥩</option>
                  <option value="Hortifruti">Hortifruti 🥬</option>
                  <option value="Bebidas">Bebidas 🍻</option>
                  <option value="Padaria">Padaria 🥖</option>
                  <option value="Limpeza">Limpeza 🧼</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preço De (Normal)</label>
                  <input 
                    type="text" 
                    placeholder="Ex: 4.50"
                    value={newOffer.originalPrice}
                    onChange={(e) => setNewOffer({ ...newOffer, originalPrice: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Preço Por (Promocional)*</label>
                  <input 
                    type="text" 
                    placeholder="Ex: 3.29" 
                    value={newOffer.promoPrice}
                    onChange={(e) => setNewOffer({ ...newOffer, promoPrice: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-submit">
                  Publicar no App
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
