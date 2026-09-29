import React, { useState } from 'react';
import './Header.css';

const Header = ({ onSearch, onGoHome, currentQuery }) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Toda a cidade (Cidreira)');

  const locations = [
    'Toda a cidade (Cidreira)',
    'Centro',
    'Costa do Sol',
    'Nazaré',
    'Parque dos Pinos',
    'Salinas'
  ];

  return (
    <header className="main-header">
      <div className="location-bar">
        <span className="location-label">📍 Procurando preços em</span>
        <div className="location-selector" onClick={() => setIsLocationOpen(!isLocationOpen)}>
          <strong>{selectedLocation}</strong>
          <span className="chevron">{isLocationOpen ? '▲' : '▼'}</span>
        </div>

        {isLocationOpen && (
          <div className="location-dropdown">
            {locations.map(loc => (
              <div 
                key={loc} 
                className={`location-option ${selectedLocation === loc ? 'active' : ''}`}
                onClick={() => {
                  setSelectedLocation(loc);
                  setIsLocationOpen(false);
                }}
              >
                {loc}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="search-container">
        <div className="search-bar">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Qual produto você quer economizar?" 
            className="search-input"
            value={currentQuery || ''}
            onChange={(e) => onSearch(e.target.value)}
          />
          {currentQuery && (
            <button className="clear-search-btn" onClick={() => onSearch('')}>✕</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
