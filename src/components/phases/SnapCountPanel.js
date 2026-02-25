import React from 'react';
import { FIELD_WIDTH, cadenceSequence } from '../../data/constants';

const SnapCountPanel = ({
  showSnapFeedback,
  snapResult,
  cadenceTiming,
  currentCadence,
}) => {
  return (
    <div style={{
      marginTop: '24px',
      width: `${FIELD_WIDTH}px`,
      background: 'rgba(15,20,25,0.95)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(255,107,53,0.4)',
      borderRadius: '12px',
      padding: '40px',
      zIndex: 1,
      textAlign: 'center'
    }}>
      {!showSnapFeedback ? (
        <>
          <h2 style={{
            fontSize: '32px',
            color: '#FFC045',
            margin: '0 0 20px 0',
            fontWeight: 'bold',
            letterSpacing: '2px'
          }}>
            SNAP COUNT
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#9BA4B5',
            marginBottom: '40px',
            fontFamily: '"Courier New", monospace'
          }}>
            Press the correct key for each cadence call!
          </p>

          {/* Cadence Display */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {cadenceSequence.map((cadence, index) => {
              const isActive = currentCadence === index + 1;
              const isPast = currentCadence > index + 1;
              const userPressed = cadenceTiming[index];
              const isCorrect = userPressed?.expected === userPressed?.pressed;

              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  {/* Cadence Word */}
                  <div style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: isActive ? '#FFC045' : isPast ? (isCorrect ? '#4ECDC4' : '#FF6B35') : '#4a5568',
                    textShadow: isActive ? '0 0 30px rgba(255,192,69,0.8)' : 'none',
                    transition: 'all 0.2s ease',
                    transform: isActive ? 'scale(1.2)' : 'scale(1)',
                    letterSpacing: '2px'
                  }}>
                    {cadence.word}
                  </div>

                  {/* Key Indicator */}
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    background: isActive
                      ? 'linear-gradient(135deg, #FF6B35 0%, #FFC045 100%)'
                      : isPast
                      ? isCorrect ? '#4ECDC4' : '#FF6B35'
                      : 'rgba(255,255,255,0.1)',
                    border: isActive ? '3px solid #fff' : '2px solid rgba(255,255,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#fff',
                    boxShadow: isActive
                      ? '0 0 30px rgba(255,192,69,0.8)'
                      : isPast && isCorrect
                      ? '0 0 20px rgba(78,205,196,0.6)'
                      : 'none',
                    animation: isActive ? 'keyPulse 0.8s ease-in-out infinite' : 'none',
                    fontFamily: '"Courier New", monospace'
                  }}>
                    {cadence.key.toUpperCase()}
                  </div>

                  {/* Result Indicator */}
                  {isPast && (
                    <div style={{
                      fontSize: '24px',
                      animation: 'fadeIn 0.3s ease-in'
                    }}>
                      {isCorrect ? '✓' : '✗'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Instructions */}
          <div style={{
            padding: '16px',
            background: 'rgba(255,192,69,0.1)',
            border: '1px solid rgba(255,192,69,0.3)',
            borderRadius: '6px',
            fontSize: '18px',
            color: '#FFC045',
            fontFamily: '"Courier New", monospace',
            letterSpacing: '1px'
          }}>
            Press D → S → H → H in rhythm with the calls
          </div>
        </>
      ) : (
        /* Snap Feedback */
        <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: snapResult === 'perfect' ? '#4ECDC4' :
              snapResult === 'good' ? '#FFC045' : '#FF6B35'
          }}>
            {snapResult === 'perfect' && '🔥 PERFECT SNAP! 🔥'}
            {snapResult === 'good' && '✓ CLEAN SNAP'}
            {snapResult === 'false-start' && '⚠️ FALSE START!'}
            {snapResult === 'delay' && '⚠️ DELAY OF GAME!'}
          </div>
          <div style={{
            fontSize: '18px',
            color: '#9BA4B5',
            fontFamily: '"Courier New", monospace'
          }}>
            {snapResult === 'perfect' && 'Flawless timing and execution!'}
            {snapResult === 'good' && 'Good enough to get the play off.'}
            {snapResult === 'false-start' && '5 yard penalty. Wrong key pressed.'}
            {snapResult === 'delay' && "Didn't get the snap off in time!"}
          </div>
        </div>
      )}
    </div>
  );
};

export default SnapCountPanel;
