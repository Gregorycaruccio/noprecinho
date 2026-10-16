import React, { useState } from 'react';
import './Login.css';

const Login = ({ stores, onLoginSuccess, onBackToApp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const matchedStore = stores.find(
      s => s.login.user.toLowerCase() === username.trim().toLowerCase() && s.login.pass === password
    );

    if (matchedStore) {
      onLoginSuccess(matchedStore);
    } else {
      setErrorMessage('Usuário ou senha incorretos. Tente o acesso de demonstração abaixo.');
    }
  };

  const handleQuickDemoLogin = (store) => {
    onLoginSuccess(store);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <button className="login-back-btn" onClick={onBackToApp}>
          ← Voltar para o App
        </button>

        <div className="login-header">
          <div className="app-brand-badge">🏪 No Precinho Lojista</div>
          <h2>Área Exclusiva do Comerciante</h2>
          <p>Acesse o painel do seu mercado para gerenciar suas promoções, fotos e WhatsApp.</p>
        </div>

        {errorMessage && (
          <div className="login-error-alert">
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="login-form-group">
            <label>Usuário do Mercado</label>
            <input 
              type="text" 
              placeholder="Ex: central ou litoral"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="login-form-group">
            <label>Senha</label>
            <input 
              type="password" 
              placeholder="Sua senha secreta"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Entrar no Meu Painel
          </button>
        </form>

        {/* Quick Demo Logins */}
        <div className="demo-accounts-box">
          <span className="demo-title">⚡ Acesso Rápido de Teste (1 Clique):</span>
          <div className="demo-buttons-list">
            {stores.map(store => (
              <button 
                key={store.id} 
                className="btn-demo-account"
                onClick={() => handleQuickDemoLogin(store)}
              >
                <span>{store.logo} <strong>{store.name}</strong> ({store.neighborhood})</span>
                <span className="demo-arrow">Entrar →</span>
              </button>
            ))}
          </div>
          <p className="demo-caption">Cada mercado só tem acesso às suas próprias ofertas e configurações.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
