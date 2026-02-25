import React from 'react';
import { FIELD_WIDTH } from '../../data/constants';

const PlayActionPanel = ({
  selectedPlayType,
  showPlayResult,
  playTimer,
  passRushPressure,
  acedCoverageID,
  showGapSelection,
  runGaps,
  onGapSelect,
  showRpoDecision,
  rpoTimer,
  onRpoDecision,
  currentDefense,
}) => {
  return (
    <>
      {/* Pass Play UI */}
      {selectedPlayType === 'pass' && !showPlayResult && (
        <div style={{
          marginTop: '24px',
          width: `${FIELD_WIDTH}px`,
          zIndex: 1
        }}>
          {/* Pressure Timer */}
          <div style={{
            background: 'rgba(15,20,25,0.95)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255,107,53,0.4)',
            borderRadius: '12px',
            padding: '16px 24px',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              fontSize: '18px',
              color: '#FFC045',
              fontFamily: '"Courier New", monospace',
              fontWeight: 'bold'
            }}>
              TIME TO THROW: {((5000 - playTimer) / 1000).toFixed(1)}s
            </div>
            <div style={{
              flex: 1,
              marginLeft: '24px',
              height: '24px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${passRushPressure}%`,
                background: passRushPressure > 75
                  ? 'linear-gradient(90deg, #FF6B35 0%, #ff0000 100%)'
                  : passRushPressure > 50
                  ? 'linear-gradient(90deg, #FFC045 0%, #FF6B35 100%)'
                  : 'linear-gradient(90deg, #4ECDC4 0%, #FFC045 100%)',
                transition: 'width 0.1s linear',
                boxShadow: passRushPressure > 75 ? '0 0 20px rgba(255,0,0,0.6)' : 'none'
              }} />
            </div>
            <div style={{
              marginLeft: '24px',
              fontSize: '14px',
              color: passRushPressure > 75 ? '#ff0000' : '#9BA4B5',
              fontFamily: '"Courier New", monospace'
            }}>
              {passRushPressure > 75 ? '⚠️ PRESSURE!' : 'Clean pocket'}
            </div>
          </div>

          {/* Instructions */}
          <div style={{
            background: 'rgba(15,20,25,0.95)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255,107,53,0.4)',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
            fontSize: '16px',
            color: '#9BA4B5',
            fontFamily: '"Courier New", monospace'
          }}>
            <span style={{ color: '#FFC045', fontWeight: 'bold' }}>CLICK</span> a receiver to throw •
            <span style={{ color: '#FFC045', fontWeight: 'bold' }}> SPACEBAR</span> to scramble
            {acedCoverageID && <span style={{ color: '#4ECDC4' }}> • TE glowing = OPEN</span>}
          </div>
        </div>
      )}

      {/* Run Play Gap Selection */}
      {selectedPlayType === 'run' && showGapSelection && (
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
            SELECT YOUR GAP
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#9BA4B5',
            marginBottom: '32px',
            fontFamily: '"Courier New", monospace'
          }}>
            Click on the gap you want to run through
            {acedCoverageID && <span style={{ color: '#4ECDC4' }}> • B Gaps highlighted = best choice vs Cover 2</span>}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '16px'
          }}>
            {runGaps.slice(0, 3).map(gap => (
              <button
                key={gap.id}
                onClick={() => onGapSelect(gap)}
                style={{
                  background: gap.optimal && acedCoverageID
                    ? 'rgba(78,205,196,0.2)'
                    : 'rgba(255,107,53,0.1)',
                  border: gap.optimal && acedCoverageID
                    ? '3px solid #4ECDC4'
                    : '2px solid rgba(255,107,53,0.5)',
                  borderRadius: '8px',
                  padding: '24px 16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  ...(gap.optimal && acedCoverageID && {
                    boxShadow: '0 0 20px rgba(78,205,196,0.4)'
                  })
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = gap.optimal && acedCoverageID
                    ? 'rgba(78,205,196,0.3)'
                    : 'rgba(255,107,53,0.25)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = gap.optimal && acedCoverageID
                    ? 'rgba(78,205,196,0.2)'
                    : 'rgba(255,107,53,0.1)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <div style={{
                  fontSize: '24px',
                  color: gap.optimal && acedCoverageID ? '#4ECDC4' : '#FFC045',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  letterSpacing: '1px'
                }}>
                  {gap.label}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#9BA4B5',
                  fontFamily: '"Courier New", monospace'
                }}>
                  Left Side
                </div>
              </button>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }}>
            {runGaps.slice(3).map(gap => (
              <button
                key={gap.id}
                onClick={() => onGapSelect(gap)}
                style={{
                  background: gap.optimal && acedCoverageID
                    ? 'rgba(78,205,196,0.2)'
                    : 'rgba(255,107,53,0.1)',
                  border: gap.optimal && acedCoverageID
                    ? '3px solid #4ECDC4'
                    : '2px solid rgba(255,107,53,0.5)',
                  borderRadius: '8px',
                  padding: '24px 16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  ...(gap.optimal && acedCoverageID && {
                    boxShadow: '0 0 20px rgba(78,205,196,0.4)'
                  })
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = gap.optimal && acedCoverageID
                    ? 'rgba(78,205,196,0.3)'
                    : 'rgba(255,107,53,0.25)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = gap.optimal && acedCoverageID
                    ? 'rgba(78,205,196,0.2)'
                    : 'rgba(255,107,53,0.1)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <div style={{
                  fontSize: '24px',
                  color: gap.optimal && acedCoverageID ? '#4ECDC4' : '#FFC045',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  letterSpacing: '1px'
                }}>
                  {gap.label}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#9BA4B5',
                  fontFamily: '"Courier New", monospace'
                }}>
                  Right Side
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RPO Decision */}
      {selectedPlayType === 'rpo' && showRpoDecision && (
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
          <h2 style={{
            fontSize: '32px',
            color: '#FFC045',
            margin: '0 0 16px 0',
            fontWeight: 'bold',
            letterSpacing: '2px'
          }}>
            READ & REACT
          </h2>

          {/* Decision Timer */}
          <div style={{
            marginBottom: '32px',
            fontSize: '18px',
            color: '#9BA4B5',
            fontFamily: '"Courier New", monospace'
          }}>
            Decision time: {((2000 - rpoTimer) / 1000).toFixed(1)}s
          </div>

          <div style={{
            height: '8px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '4px',
            marginBottom: '40px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${(rpoTimer / 2000) * 100}%`,
              background: 'linear-gradient(90deg, #4ECDC4 0%, #FFC045 50%, #FF6B35 100%)',
              transition: 'width 0.1s linear'
            }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px'
          }}>
            <button
              onClick={() => onRpoDecision('hand-off')}
              style={{
                background: 'rgba(255,107,53,0.1)',
                border: '2px solid rgba(255,107,53,0.5)',
                borderRadius: '12px',
                padding: '32px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,107,53,0.25)';
                e.currentTarget.style.borderColor = '#FF6B35';
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,107,53,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏃</div>
              <div style={{
                fontSize: '28px',
                color: '#FFC045',
                fontWeight: 'bold',
                marginBottom: '8px',
                letterSpacing: '2px'
              }}>
                HAND OFF
              </div>
              <div style={{
                fontSize: '14px',
                color: '#9BA4B5',
                fontFamily: '"Courier New", monospace'
              }}>
                Give it to the RB
              </div>
            </button>

            <button
              onClick={() => onRpoDecision('pull')}
              style={{
                background: 'rgba(255,107,53,0.1)',
                border: '2px solid rgba(255,107,53,0.5)',
                borderRadius: '12px',
                padding: '32px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,107,53,0.25)';
                e.currentTarget.style.borderColor = '#FF6B35';
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,107,53,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,107,53,0.5)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎯</div>
              <div style={{
                fontSize: '28px',
                color: '#FFC045',
                fontWeight: 'bold',
                marginBottom: '8px',
                letterSpacing: '2px'
              }}>
                PULL & THROW
              </div>
              <div style={{
                fontSize: '14px',
                color: '#9BA4B5',
                fontFamily: '"Courier New", monospace'
              }}>
                Keep it and pass
              </div>
            </button>
          </div>

          {acedCoverageID && (
            <div style={{
              marginTop: '24px',
              padding: '12px',
              background: 'rgba(78,205,196,0.1)',
              border: '1px solid rgba(78,205,196,0.3)',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#4ECDC4',
              fontFamily: '"Courier New", monospace'
            }}>
              With Cover 2, both options are viable - read the OLB!
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PlayActionPanel;
