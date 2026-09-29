import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Search from './components/Search';

function App() {
  const [currentView, setCurrentView] = useState('home');
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
      <Header onSearch={handleSearch} onGoHome={handleGoHome} currentQuery={searchQuery} />
      
      <main className="main-content">
        {currentView === 'home' ? <Home /> : <Search query={searchQuery} />}
      </main>
    </div>
  );
}

export default App;
