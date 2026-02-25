import React from 'react';
import { FIELD_WIDTH } from '../../data/constants';
import { basePlays } from '../../data/plays';

const PlaySelectPanel = ({ onPlaySelect }) => {
  return (
    <div style={{
      marginTop: '24px',
      width: `${FIELD_WIDTH}px`,
      background: 'rgba(15,20,25,0.95)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(255,107,53,0.4)',
      borderRadius: '12px',
      padding: '32px',
      zIndex: 1
    }}>
      <h2 style={{
        fontSize: '32px',
        color: '#FFC045',
        margin: '0 0 12px 0',
        fontWeight: 'bold',
        letterSpacing: '2px',
        textAlign: 'center'
      }}>
        CALL YOUR PLAY
      </h2>

      <p style={{
        fontSize: '16px',
        color: '#9BA4B5',
        marginBottom: '32px',
        textAlign: 'center',
        fontFamily: '"Courier New", monospace'
      }}>
        Choose your play - you'll adjust routes next
      </p>

      {/* Pass Plays */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          fontSize: '18px',
          color: '#FFC045',
          fontWeight: 'bold',
          marginBottom: '16px',
          letterSpacing: '1px'
        }}>
          PASS PLAYS
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          {basePlays.pass.map(play => (
            <button
              key={play.id}
              onClick={() => onPlaySelect(play)}
              style={{
                background: 'rgba(255,107,53,0.1)',
                border: '2px solid rgba(255,107,53,0.5)',
                borderRadius: '8px',
                padding: '20px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,107,53,0.25)';
                e.currentTarget.style.borderColor = '#FF6B35';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,107,53,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                fontSize: '20px',
                color: '#FFC045',
                fontWeight: 'bold',
                marginBottom: '8px',
                letterSpacing: '1px'
              }}>
                {play.name}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#9BA4B5',
                fontFamily: '"Courier New", monospace'
              }}>
                {play.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Run Plays */}
      <div>
        <div style={{
          fontSize: '18px',
          color: '#FFC045',
          fontWeight: 'bold',
          marginBottom: '16px',
          letterSpacing: '1px'
        }}>
          RUN PLAYS
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          {basePlays.run.map(play => (
            <button
              key={play.id}
              onClick={() => onPlaySelect(play)}
              style={{
                background: 'rgba(255,107,53,0.1)',
                border: '2px solid rgba(255,107,53,0.5)',
                borderRadius: '8px',
                padding: '20px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,107,53,0.25)';
                e.currentTarget.style.borderColor = '#FF6B35';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,107,53,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                fontSize: '20px',
                color: '#FFC045',
                fontWeight: 'bold',
                marginBottom: '8px',
                letterSpacing: '1px'
              }}>
                {play.name}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#9BA4B5',
                fontFamily: '"Courier New", monospace'
              }}>
                {play.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaySelectPanel;
