import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Search from './components/Search';
import Admin from './components/Admin';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'search', 'admin'
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="app-container">
      {currentView === 'admin' ? (
        <Admin onBackToApp={() => setCurrentView('home')} />
      ) : (
        <>
          <Header onSearch={handleSearch} onGoHome={handleGoHome} currentQuery={searchQuery} />
          
          <main className="main-content">
            {currentView === 'home' ? <Home /> : <Search query={searchQuery} />}
          </main>

          {/* Quick Switcher for Demo / Store Owners */}
          <footer className="app-footer">
            <button 
              className="btn-switch-admin"
              onClick={() => setCurrentView('admin')}
            >
              🏪 É dono de mercado? <strong>Acesse o Painel do Lojista</strong>
            </button>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
