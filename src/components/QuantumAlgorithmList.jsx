import React, { useState } from 'react';
/* 1. Added clean link connection to your standalone child file */
import QuantumAlgorithmItem from './QuantumAlgorithmItem';
import QuantumSearch from './QuantumSearch'; 

/* ==========================================================================
   PARENT COMPONENT: SEARCH HANDLING & LAYOUT LOOP
   ========================================================================== */
function QuantumAlgorithmList({ algorithms }) {
  const [flippedCards, setFlippedCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  const toggleCardFlip = (id) => {
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  // Triggers the search query filtering execution instantly
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveFilter(searchQuery);
  };

  // Instantly flushes user inputs and resets layout filtering
  const handleResetSearch = () => {
    setSearchQuery('');
    setActiveFilter('');
  };

  // Filters cards based on typing or clicking search button
  const filteredAlgorithms = algorithms.filter((algo) => {
    const currentQuery = activeFilter.toLowerCase().trim();
    return (
      algo.name.toLowerCase().includes(currentQuery) ||
      algo.purpose.toLowerCase().includes(currentQuery)
    );
  });

  return (
    <>
      {/* Search Bubble Interface Component Container */}
      <form className="search-container" onSubmit={handleSearchSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, position: 'relative' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search quantum algorithms..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value === '') setActiveFilter('');
            }}
          />
          
          {/* Dynamic Reset Inline Button: Visible only when input text is present */}
          {searchQuery && (
            <button
              type="button"
              onClick={handleResetSearch}
              className="search-clear-btn"
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>
        
        <button type="submit" className="search-bubble-btn">
          Search
        </button>
      </form>

      {/* Grid rendering list layout */}
      <div className="algorithm-list" style={{ marginTop: '1rem' }}>
        {filteredAlgorithms.map((algorithm, index) => {
          const isFlipped = flippedCards.includes(algorithm.id);
          
          return (
            /* 2. Added new cascade transition wrapper framework with staggered timing math */
            <div 
              key={algorithm.id} 
              className="cascade-item"
              style={{
                width: '100%',
                maxWidth: '480px',
                animationDelay: `${0.3 + index * 0.05}s`
              }}
            >
              <QuantumAlgorithmItem
                algorithm={algorithm}
                isFlipped={isFlipped}
                onFlip={() => toggleCardFlip(algorithm.id)}
              />
            </div>
          );
        })}
        
        {filteredAlgorithms.length === 0 && (
          <p style={{ color: '#7c7295', marginTop: '2rem', fontStyle: 'italic' }}>
            No algorithms match your search.
          </p>
        )}
      </div>

      {/* Decorative separating spacer */}
      <div id="spacer" className="ticks" style={{ marginTop: '4rem' }}></div>

      {/* QuantumSearch component placed directly above footer */}
      <div className="ticks" style={{ margin: '1rem 0' }}>
        <QuantumSearch />
      </div>

      {/* ==========================================================================
         REORGANIZED STRUCTURAL SECTION FOOTER LAYOUT
         ========================================================================== */}
      <footer id="next-steps" style={{ width: '100%', maxWidth: '960px', margin: '0 auto' }}>
        {/* Column 1: Core Platform Resources */}
        <div id="docs">
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-h)', marginBottom: '12px' }}>
            Documentation & Core Specs
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#7c7295', marginBottom: '20px', lineHeight: '1.4' }}>
            Explore deep research whitepapers, optimization matrix protocols, and system architecture manuals.
          </p>
          <ul>
            <li>
              <a href="#read-docs" className="draw-button" rel="noreferrer" target="_blank">
                {/* Animated SVG Border Framework Layer */}
                <svg className="draw-border-svg" width="100%" height="100%">
                  <defs>
                    {/* Multi-color gradient matching your active cards */}
                    <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="25%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="75%" stopColor="#f8fafc" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                  <rect className="draw-rect" x="0" y="0" width="100%" height="100%" rx="6" fill="none" stroke="url(#cardGradient)" strokeWidth="2"/>
                </svg>
                <span className="button-text">View Guidelines</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2: Ecosystem & Developer Tools */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-h)', marginBottom: '12px' }}>
            Ecosystem Integrations
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#7c7295', marginBottom: '20px', lineHeight: '1.4' }}>
            Connect with our collaborative developer repos, framework templates, and real-time sandbox sandpits.
          </p>
          <ul>
            <li>
              <a href="https://github.com" className="draw-button" rel="noreferrer" target="_blank">
                {/* Animated SVG Border Framework Layer */}
                <svg className="draw-border-svg" width="100%" height="100%">
                  <rect className="draw-rect" x="0" y="0" width="100%" height="100%" rx="6" fill="none" stroke="url(#cardGradient)" strokeWidth="2"/>
                </svg>
                <span className="button-text">GitHub Repositories</span>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default QuantumAlgorithmList;