import React from 'react';
import { FIELD_WIDTH } from '../../data/constants';
import { basePlays, routeDefinitions } from '../../data/plays';

const AudiblePanel = ({
  selectedPlay,
  selectedPlayType,
  currentDefense,
  customRoutes,
  acedCoverageID,
  showHotRouteMenu,
  selectedReceiverForHotRoute,
  onHotRoute,
  onApplyHotRoute,
  onCancelHotRoute,
  onAudible,
  onConfirm,
}) => {
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
        margin: '0 0 16px 0',
        fontWeight: 'bold',
        letterSpacing: '2px',
        textAlign: 'center'
      }}>
        ADJUST YOUR PLAY
      </h2>

      {acedCoverageID && (
        <div style={{
          textAlign: 'center',
          padding: '12px',
          background: 'rgba(78,205,196,0.1)',
          border: '1px solid rgba(78,205,196,0.3)',
          borderRadius: '6px',
          marginBottom: '24px',
          fontSize: '14px',
          color: '#4ECDC4',
          fontFamily: '"Courier New", monospace'
        }}>
          ✓ Perfect read! You know exactly what they're running.
        </div>
      )}

      {/* Current Play Info */}
      <div style={{
        padding: '20px',
        background: 'rgba(255,107,53,0.1)',
        border: '2px solid rgba(255,107,53,0.3)',
        borderRadius: '8px',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '18px',
          color: '#9BA4B5',
          marginBottom: '8px',
          fontFamily: '"Courier New", monospace'
        }}>
          Current Play:
        </div>
        <div style={{
          fontSize: '28px',
          color: '#FFC045',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}>
          {selectedPlay?.name}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#9BA4B5',
          marginTop: '8px',
          fontFamily: '"Courier New", monospace'
        }}>
          vs. {currentDefense?.name}
        </div>
      </div>

      {/* Hot Routes (for pass plays) */}
      {selectedPlayType === 'pass' && (
        <div style={{
          marginBottom: '24px',
          padding: '20px',
          background: 'rgba(78,205,196,0.05)',
          border: '2px solid rgba(78,205,196,0.2)',
          borderRadius: '8px'
        }}>
          <div style={{
            fontSize: '20px',
            color: '#4ECDC4',
            fontWeight: 'bold',
            marginBottom: '16px',
            textAlign: 'center',
            letterSpacing: '1px'
          }}>
            HOT ROUTES
          </div>
          <p style={{
            fontSize: '14px',
            color: '#9BA4B5',
            marginBottom: '16px',
            textAlign: 'center',
            fontFamily: '"Courier New", monospace'
          }}>
            Click receivers on the field to adjust routes
          </p>

          {/* Current Routes Display */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px'
          }}>
            {customRoutes.map(route => (
              <div
                key={route.receiver}
                onClick={() => onHotRoute(route.receiver)}
                style={{
                  padding: '12px',
                  background: 'rgba(78,205,196,0.1)',
                  border: '2px solid rgba(78,205,196,0.3)',
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(78,205,196,0.2)';
                  e.currentTarget.style.borderColor = '#4ECDC4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(78,205,196,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(78,205,196,0.3)';
                }}
              >
                <span style={{
                  fontSize: '16px',
                  color: '#4ECDC4',
                  fontWeight: 'bold'
                }}>
                  {route.label}
                </span>
                <span style={{
                  fontSize: '20px',
                  marginRight: '8px'
                }}>
                  {routeDefinitions[route.route].symbol}
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#9BA4B5',
                  fontFamily: '"Courier New", monospace'
                }}>
                  {routeDefinitions[route.route].name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audible Options */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          fontSize: '18px',
          color: '#FFC045',
          fontWeight: 'bold',
          marginBottom: '16px',
          textAlign: 'center',
          letterSpacing: '1px'
        }}>
          OR AUDIBLE TO:
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          {(selectedPlayType === 'pass'
            ? basePlays.pass.filter(p => p.id !== selectedPlay?.id).slice(0, 2)
            : basePlays.run.filter(p => p.id !== selectedPlay?.id).slice(0, 2)
          ).map(play => (
            <button
              key={play.id}
              onClick={() => onAudible(play)}
              style={{
                background: 'rgba(255,107,53,0.1)',
                border: '2px solid rgba(255,107,53,0.5)',
                borderRadius: '8px',
                padding: '16px',
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
                fontSize: '18px',
                color: '#FFC045',
                fontWeight: 'bold',
                marginBottom: '4px'
              }}>
                {play.name}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#9BA4B5',
                fontFamily: '"Courier New", monospace'
              }}>
                {play.description}
              </div>
            </button>
          ))}

          {selectedPlayType === 'pass' && (
            <button
              onClick={() => onAudible(basePlays.run[0])}
              style={{
                background: 'rgba(255,107,53,0.1)',
                border: '2px solid rgba(255,107,53,0.5)',
                borderRadius: '8px',
                padding: '16px',
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
                fontSize: '18px',
                color: '#FFC045',
                fontWeight: 'bold',
                marginBottom: '4px'
              }}>
                Switch to Run
              </div>
              <div style={{
                fontSize: '12px',
                color: '#9BA4B5',
                fontFamily: '"Courier New", monospace'
              }}>
                {basePlays.run[0].name}
              </div>
            </button>
          )}

          {selectedPlayType === 'run' && (
            <button
              onClick={() => onAudible(basePlays.pass[0])}
              style={{
                background: 'rgba(255,107,53,0.1)',
                border: '2px solid rgba(255,107,53,0.5)',
                borderRadius: '8px',
                padding: '16px',
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
                fontSize: '18px',
                color: '#FFC045',
                fontWeight: 'bold',
                marginBottom: '4px'
              }}>
                Switch to Pass
              </div>
              <div style={{
                fontSize: '12px',
                color: '#9BA4B5',
                fontFamily: '"Courier New", monospace'
              }}>
                {basePlays.pass[0].name}
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Hot Route Menu Modal */}
      {showHotRouteMenu && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(15,20,25,0.98)',
          border: '3px solid #4ECDC4',
          borderRadius: '12px',
          padding: '24px',
          zIndex: 1000,
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
        }}>
          <div style={{
            fontSize: '24px',
            color: '#4ECDC4',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {selectedReceiverForHotRoute} - SELECT ROUTE
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px'
          }}>
            {Object.entries(routeDefinitions).map(([routeKey, routeDef]) => (
              <button
                key={routeKey}
                onClick={() => onApplyHotRoute(routeKey)}
                style={{
                  background: 'rgba(78,205,196,0.15)',
                  border: '2px solid rgba(78,205,196,0.4)',
                  borderRadius: '8px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(78,205,196,0.3)';
                  e.currentTarget.style.borderColor = '#4ECDC4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(78,205,196,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(78,205,196,0.4)';
                }}
              >
                <div style={{ fontSize: '32px' }}>
                  {routeDef.symbol}
                </div>
                <div style={{
                  fontSize: '18px',
                  color: '#4ECDC4',
                  fontWeight: 'bold',
                  marginBottom: '4px'
                }}>
                  {routeDef.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#9BA4B5',
                  fontFamily: '"Courier New", monospace',
                  textAlign: 'center'
                }}>
                  {routeDef.description}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={onCancelHotRoute}
            style={{
              marginTop: '16px',
              width: '100%',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              padding: '12px',
              color: '#9BA4B5',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Confirm and Move to Snap Count */}
      <button
        onClick={onConfirm}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #FF6B35 0%, #FFC045 100%)',
          border: 'none',
          borderRadius: '8px',
          padding: '20px',
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
        READY → SNAP COUNT
      </button>
    </div>
  );
};

export default AudiblePanel;
