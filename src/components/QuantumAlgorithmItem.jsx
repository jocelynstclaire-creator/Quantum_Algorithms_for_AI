import React from 'react';

/* ==========================================================================
   CHILD COMPONENT: INDIVIDUAL CARD LAYOUT (FRONT / BACK)
   ========================================================================== */
function QuantumAlgorithmItem({ algorithm, isFlipped, onFlip }) {
  
  // Matches the raw data values to your global CSS badge naming
  const getPracticalClass = (status) => {
    if (status === true) return 'badge-practical-today';
    if (status === 'partially') return 'badge-practical-partial';
    return 'badge-practical-no';
  };

  // Handles readable display labels for your status fields
  const getPracticalLabel = (status) => {
    if (status === true) return 'Practical Today';
    if (status === 'partially') return 'Practical Partial';
    return 'Not Practical';
  };

  // Shared structural styles to keep button heights and text perfectly uniform
  const uniformBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.15rem 0.55rem',
    margin: '0', 
    lineHeight: '1.2',
    height: 'auto',
    verticalAlign: 'middle'
  };

  return (
    <div
      className={`algorithm-card ${isFlipped ? 'flipped' : ''}`}
      onClick={onFlip}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onFlip()}
    >
      {!isFlipped ? (
        
        /* ------------------------------------------------------------------
           FRONT VIEW: Big Font Title Only
           ------------------------------------------------------------------ */
        <h2 className="algorithm-title" style={{ fontSize: '2rem', margin: '1.5rem 0' }}>
          {algorithm.name}
        </h2>
        
      ) : (
        
        /* ------------------------------------------------------------------
           BACK VIEW: Requested Layout Sequence (Purpose -> Note -> Badges)
           ------------------------------------------------------------------ */
        <div className="card-back-wrapper" style={{ textAlign: 'center' }}>
          {/* 1. Purpose */}
          <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
            {algorithm.purpose}
          </p>
          
          {/* 2. Note */}
          <p className="algorithm-note" style={{ margin: '0.5rem 0 1rem' }}>
            {algorithm.note}
          </p>
          
          {/* Badges Inline Strip Layout */}
          <div style={{ 
            marginTop: '0.75rem', 
            display: 'flex', 
            gap: '8px', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexWrap: 'wrap' 
          }}>
            {/* 3. Practical Button Badge */}
            <span 
              className={getPracticalClass(algorithm.isPracticalToday)}
              style={uniformBadgeStyle}
            >
              {getPracticalLabel(algorithm.isPracticalToday)}
            </span>
            
            {/* 4. Used in AI Button Badge */}
            {algorithm.usedInAI && (
              <span 
                className="badge-used-in-ai"
                style={uniformBadgeStyle}
              >
                Used in AI
              </span>
            )}
          </div>
        </div>
        
      )}
    </div>
  );
}

export default QuantumAlgorithmItem;