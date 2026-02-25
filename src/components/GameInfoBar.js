import React from 'react';

const GameInfoBar = ({ down, distance, fieldPosition, playsRun, totalYards }) => {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(255,107,53,0.3)',
      borderRadius: '12px',
      padding: '16px 32px',
      marginBottom: '24px',
      display: 'flex',
      gap: '40px',
      zIndex: 1
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '14px', color: '#9BA4B5', marginBottom: '4px', letterSpacing: '1px' }}>DOWN</div>
        <div style={{ fontSize: '28px', color: '#FF6B35', fontWeight: 'bold' }}>
          {down === 1 ? '1st' : down === 2 ? '2nd' : down === 3 ? '3rd' : '4th'} & {distance}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '14px', color: '#9BA4B5', marginBottom: '4px', letterSpacing: '1px' }}>FIELD POSITION</div>
        <div style={{ fontSize: '28px', color: '#FFC045', fontWeight: 'bold' }}>
          {fieldPosition < 50 ? `OWN ${fieldPosition}` : fieldPosition === 50 ? '50' : `OPP ${100 - fieldPosition}`}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '14px', color: '#9BA4B5', marginBottom: '4px', letterSpacing: '1px' }}>PLAYS</div>
        <div style={{ fontSize: '28px', color: '#4ECDC4', fontWeight: 'bold' }}>{playsRun}</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '14px', color: '#9BA4B5', marginBottom: '4px', letterSpacing: '1px' }}>YARDS</div>
        <div style={{ fontSize: '28px', color: '#4ECDC4', fontWeight: 'bold' }}>{totalYards}</div>
      </div>
    </div>
  );
};

export default GameInfoBar;
