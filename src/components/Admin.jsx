import React, { useState } from 'react';
import './Admin.css';

const Admin = ({ currentStore, offers, onAddOffer, onDeleteOffer, onUpdateStore, onLogout, onViewPublicProfile }) => {
  const [activeAdminTab, setActiveAdminTab] = useState('offers'); // 'offers', 'flyer', 'settings'
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for new offer
  const [newOffer, setNewOffer] = useState({
    name: '',
    category: 'Açougue',
    originalPrice: '',
    promoPrice: '',
    validityLabel: 'Válido até domingo',
    photoUrl: 'https://images.unsplash.com/photo-1608270119227-28564f27599c?w=500&auto=format&fit=crop&q=80',
  });

  // Settings form states
  const [whatsapp, setWhatsapp] = useState(currentStore?.whatsapp || '');
  const [address, setAddress] = useState(currentStore?.address || '');
  const [hours, setHours] = useState(currentStore?.hours || '');
  const [flyerUrl, setFlyerUrl] = useState(currentStore?.flyerUrl || '');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  if (!currentStore) return null;

  const storeOffers = offers.filter(o => o.storeId === currentStore.id);

  const handleCreateOffer = (e) => {
    e.preventDefault();
    if (!newOffer.name || !newOffer.promoPrice) return;

    onAddOffer({
      id: Date.now(),
      storeId: currentStore.id,
      name: newOffer.name,
      category: newOffer.category,
      originalPrice: newOffer.originalPrice || newOffer.promoPrice,
      promoPrice: newOffer.promoPrice,
      validityLabel: newOffer.validityLabel,
      photoUrl: newOffer.photoUrl,
      views: 0,
    });

    setNewOffer({
      name: '',
      category: 'Açougue',
      originalPrice: '',
      promoPrice: '',
      validityLabel: 'Válido até domingo',
      photoUrl: 'https://images.unsplash.com/photo-1608270119227-28564f27599c?w=500&auto=format&fit=crop&q=80',
    });
    setIsModalOpen(false);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    onUpdateStore(currentStore.id, {
      whatsapp,
      address,
      hours,
      flyerUrl,
    });
    setSaveSuccessMsg('Dados da loja atualizados com sucesso!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  return (
    <div className="admin-container">
      {/* Top Bar with Merchant Info and Logout */}
      <div className="admin-header">
        <div>
          <div className="admin-actions-top">
            <button className="back-link" onClick={onViewPublicProfile}>
              👁️ Ver meu Perfil Público
            </button>
            <button className="btn-logout" onClick={onLogout}>
              Sair da Conta 🚪
            </button>
          </div>
          <h2>Painel do Lojista</h2>
          <div className="store-badge-row">
            <span className="store-badge-logo">{currentStore.logo}</span>
            <div>
              <strong>{currentStore.name}</strong> • Bairro {currentStore.neighborhood}
            </div>
          </div>
        </div>

        {activeAdminTab === 'offers' && (
          <button className="btn-add-offer" onClick={() => setIsModalOpen(true)}>
            + Nova Promoção
          </button>
        )}
      </div>

      {/* Admin Tabs */}
      <div className="admin-nav-tabs">
        <button 
          className={`nav-tab-btn ${activeAdminTab === 'offers' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('offers')}
        >
          🏷️ Promoções Ativas ({storeOffers.length})
        </button>
        <button 
          className={`nav-tab-btn ${activeAdminTab === 'flyer' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('flyer')}
        >
          📰 Encarte / Tabloide
        </button>
        <button 
          className={`nav-tab-btn ${activeAdminTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('settings')}
        >
          ⚙️ Meu WhatsApp e Dados
        </button>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-title">Ofertas no Ar</span>
          <span className="metric-value">{storeOffers.length}</span>
        </div>
        <div className="metric-card highlight">
          <span className="metric-title">Visualizações em Cidreira</span>
          <span className="metric-value">1.525</span>
          <span className="metric-sub">👥 Clientes impactados esta semana</span>
        </div>
      </div>

      {/* TAB 1: OFFERS LIST */}
      {activeAdminTab === 'offers' && (
        <div className="admin-section">
          <div className="section-header">
            <h3>Promoções do {currentStore.name}</h3>
            <span className="info-pill">Atualização Instantânea</span>
          </div>

          <div className="admin-offers-list">
            {storeOffers.length === 0 ? (
              <div className="admin-empty-state">
                <p>Você ainda não cadastrou promoções. Clique em "+ Nova Promoção" acima para começar!</p>
              </div>
            ) : (
              storeOffers.map(offer => (
                <div key={offer.id} className="admin-offer-card">
                  <div className="admin-offer-thumb">
                    <img src={offer.photoUrl} alt={offer.name} />
                  </div>
                  <div className="admin-offer-info">
                    <div className="admin-offer-meta-row">
                      <span className="category-tag">{offer.category}</span>
                      <span className="validity-tag">⏰ {offer.validityLabel}</span>
                    </div>
                    <h4>{offer.name}</h4>
                    <div className="admin-price-row">
                      {offer.originalPrice !== offer.promoPrice && (
                        <span className="admin-old-price">De R$ {offer.originalPrice}</span>
                      )}
                      <span className="admin-promo-price">Por R$ {offer.promoPrice}</span>
                    </div>
                    <span className="offer-stats">👁️ {offer.views} cliques</span>
                  </div>
                  <button className="btn-delete" onClick={() => onDeleteOffer(offer.id)}>
                    Remover
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ENCARTE / TABLOIDE */}
      {activeAdminTab === 'flyer' && (
        <div className="admin-section">
          <div className="section-header">
            <h3>Foto do Encarte / Tabloide Digital</h3>
          </div>
          <p className="admin-section-desc">
            Envie a foto do folheto impresso ou banner das ofertas da semana para os moradores visualizarem como encarte no app.
          </p>

          <div className="flyer-edit-box">
            <div className="form-group">
              <label>Link da Imagem do Encarte</label>
              <input 
                type="text" 
                value={flyerUrl} 
                onChange={(e) => setFlyerUrl(e.target.value)} 
                placeholder="https://exemplo.com/foto-encarte.jpg"
              />
            </div>

            <div className="quick-flyer-presets">
              <span>Opções Rápidas:</span>
              <button 
                type="button" 
                className="btn-preset"
                onClick={() => setFlyerUrl('https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80')}
              >
                📸 Tabloide Modelo Supermercado
              </button>
              <button 
                type="button" 
                className="btn-preset"
                onClick={() => setFlyerUrl('https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80')}
              >
                🥩 Tabloide Modelo Açougue
              </button>
            </div>

            {flyerUrl && (
              <div className="flyer-preview-card">
                <h4>Pré-visualização do Encarte:</h4>
                <img src={flyerUrl} alt="Prévia do Encarte" className="admin-flyer-preview" />
              </div>
            )}

            <button className="btn-save-primary" onClick={handleSaveSettings}>
              Salvar Encarte no Perfil
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: SETTINGS (WHATSAPP, HOURS, ADDRESS) */}
      {activeAdminTab === 'settings' && (
        <div className="admin-section">
          <div className="section-header">
            <h3>Configurações do Perfil do Mercado</h3>
          </div>
          <p className="admin-section-desc">
            Esses dados aparecem na sua página pública para os moradores de Cidreira e turistas.
          </p>

          {saveSuccessMsg && (
            <div className="save-success-alert">
              ✅ {saveSuccessMsg}
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="admin-form settings-form">
            <div className="form-group">
              <label>WhatsApp da Loja (Para clientes reservarem ofertas)</label>
              <input 
                type="text" 
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Ex: 51999998888 (DDD + Número)"
                required
              />
              <small className="form-helper">O botão do WhatsApp abrirá direto uma conversa no seu celular com o produto que o cliente quer.</small>
            </div>

            <div className="form-group">
              <label>Endereço Completo em Cidreira</label>
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ex: Av. Mostardeiro, 1200 - Centro, Cidreira"
                required
              />
            </div>

            <div className="form-group">
              <label>Horário de Funcionamento</label>
              <input 
                type="text" 
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Ex: Seg a Sáb: 08:00 às 21:00 • Dom: 08:00 às 13:00"
                required
              />
            </div>

            <div className="form-group">
              <label>Avaliações Conectadas</label>
              <div className="connected-ratings-display">
                <span className="badge-connected">📱 Nota no App: {currentStore.ratings.app.score} ⭐ ({currentStore.ratings.app.count} votos)</span>
                <span className="badge-connected google">🌐 Nota no Google: {currentStore.ratings.google.score} ⭐ ({currentStore.ratings.google.count} votos)</span>
              </div>
            </div>

            <button type="submit" className="btn-save-primary">
              Salvar Alterações
            </button>
          </form>
        </div>
      )}

      {/* FAST ADD MODAL WITH EXPIRATION DATE & PHOTO */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Cadastrar Promoção Relâmpago</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleCreateOffer} className="admin-form">
              <div className="form-group">
                <label>Nome do Produto</label>
                <input 
                  type="text" 
                  placeholder="Ex: Picanha Bovina Friboi (KG)" 
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
                    placeholder="Ex: 59.90"
                    value={newOffer.originalPrice}
                    onChange={(e) => setNewOffer({ ...newOffer, originalPrice: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Preço Por (Promocional)*</label>
                  <input 
                    type="text" 
                    placeholder="Ex: 49.90" 
                    value={newOffer.promoPrice}
                    onChange={(e) => setNewOffer({ ...newOffer, promoPrice: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Data de Validade da Oferta */}
              <div className="form-group">
                <label>Data de Validade da Oferta</label>
                <select 
                  value={newOffer.validityLabel}
                  onChange={(e) => setNewOffer({ ...newOffer, validityLabel: e.target.value })}
                >
                  <option value="Válido até domingo">⏰ Válido até domingo</option>
                  <option value="Até durar o estoque">⚡ Até durar o estoque</option>
                  <option value="Válido somente hoje!">🔥 Válido somente hoje!</option>
                  <option value="Válido até terça-feira">📅 Válido até terça-feira</option>
                  <option value="Válido até o fim do mês">🗓️ Válido até o fim do mês</option>
                </select>
              </div>

              {/* Foto do Produto */}
              <div className="form-group">
                <label>Foto do Produto (Escolha uma sugestão ou insira o link)</label>
                <div className="photo-suggestions">
                  <button 
                    type="button" 
                    className="btn-photo-pick"
                    onClick={() => setNewOffer({ ...newOffer, photoUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&auto=format&fit=crop&q=80' })}
                  >
                    🥩 Carne
                  </button>
                  <button 
                    type="button" 
                    className="btn-photo-pick"
                    onClick={() => setNewOffer({ ...newOffer, photoUrl: 'https://images.unsplash.com/photo-1608270119227-28564f27599c?w=500&auto=format&fit=crop&q=80' })}
                  >
                    🍻 Cerveja
                  </button>
                  <button 
                    type="button" 
                    className="btn-photo-pick"
                    onClick={() => setNewOffer({ ...newOffer, photoUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80' })}
                  >
                    🥬 Salada/Horti
                  </button>
                  <button 
                    type="button" 
                    className="btn-photo-pick"
                    onClick={() => setNewOffer({ ...newOffer, photoUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=80' })}
                  >
                    🪵 Carvão
                  </button>
                </div>
                <input 
                  type="text" 
                  value={newOffer.photoUrl}
                  onChange={(e) => setNewOffer({ ...newOffer, photoUrl: e.target.value })}
                  placeholder="URL da imagem"
                />
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
