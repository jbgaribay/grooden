import React from 'react';
import { FIELD_WIDTH } from '../../data/constants';

const SeeDefensePanel = ({ currentDefense, selectedPlay, setGamePhase }) => {
  return (
    <div style={{
      marginTop: '24px',
      width: `${FIELD_WIDTH}px`,
      background: 'rgba(15,20,25,0.95)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(255,107,53,0.4)',
      borderRadius: '12px',
      padding: '32px',
      zIndex: 1,
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: '32px',
        color: '#FFC045',
        margin: '0 0 16px 0',
        fontWeight: 'bold',
        letterSpacing: '2px'
      }}>
        THEY'RE IN {currentDefense?.name?.toUpperCase()}
      </h2>

      <p style={{
        fontSize: '18px',
        color: '#9BA4B5',
        marginBottom: '24px',
        fontFamily: '"Courier New", monospace'
      }}>
        Play Called: <span style={{ color: '#FFC045', fontWeight: 'bold' }}>{selectedPlay?.name}</span>
      </p>

      <p style={{
        fontSize: '16px',
        color: '#9BA4B5',
        marginBottom: '32px',
        fontFamily: '"Courier New", monospace'
      }}>
        Look at the defense on the field. Ready to identify coverage?
      </p>

      <button
        onClick={() => setGamePhase('pre-snap')}
        style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #FFC045 100%)',
          border: 'none',
          borderRadius: '8px',
          padding: '20px 48px',
          fontSize: '24px',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          letterSpacing: '2px',
          boxShadow: '0 8px 24px rgba(255,107,53,0.4)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,107,53,0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,53,0.4)';
        }}
      >
        READ THE DEFENSE
      </button>
    </div>
  );
};

export default SeeDefensePanel;
