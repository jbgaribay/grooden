import React from 'react';
import { FIELD_WIDTH, FIELD_HEIGHT, YARD_HEIGHT, offensePlayers } from '../data/constants';

const drawRoutePath = (startX, startY, targetX, targetY, color = '#4ECDC4') => {
  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2
      }}
    >
      <defs>
        <marker
          id={`arrowhead-${color.replace('#', '')}`}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3, 0 6"
            fill={color}
          />
        </marker>
      </defs>
      <path
        d={`M ${startX} ${startY} L ${targetX} ${targetY}`}
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeDasharray="5,5"
        markerEnd={`url(#arrowhead-${color.replace('#', '')})`}
        style={{
          filter: `drop-shadow(0 0 4px ${color})`
        }}
      />
    </svg>
  );
};

const FootballField = ({
  gamePhase,
  selectedPlayType,
  fieldPosition,
  firstDownMarker,
  defensePlayers,
  coverageAnswer,
  mikeIdentified,
  hasSpyOnPlay,
  spyIdentified,
  customRoutes,
  routeDefinitions,
  receiverBasePositions,
  receiverPositions,
  defenderPositions,
  acedCoverageID,
  onMikeClick,
  onSpyClick,
  onHotRoute,
  onReceiverClick,
}) => {
  return (
    <div style={{
      position: 'relative',
      width: `${FIELD_WIDTH}px`,
      height: `${FIELD_HEIGHT}px`,
      background: 'linear-gradient(180deg, #2B5F2E 0%, #1e4521 100%)',
      border: '4px solid #fff',
      borderRadius: '8px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 0 100px rgba(0,0,0,0.3)',
      overflow: 'hidden',
      zIndex: 1
    }}>
      {/* Yard lines */}
      {[...Array(12)].map((_, i) => {
        const yardLine = i * 10;
        const y = (100 - yardLine + 10) * YARD_HEIGHT;

        return (
          <div key={i}>
            <div style={{
              position: 'absolute',
              top: `${y}px`,
              left: 0,
              right: 0,
              height: '2px',
              background: i % 2 === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
            }} />
            {yardLine > 0 && yardLine < 100 && (
              <>
                <div style={{
                  position: 'absolute',
                  top: `${y - 20}px`,
                  left: '20px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: '"Bebas Neue", sans-serif'
                }}>
                  {yardLine <= 50 ? yardLine : 100 - yardLine}
                </div>
                <div style={{
                  position: 'absolute',
                  top: `${y - 20}px`,
                  right: '20px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: '"Bebas Neue", sans-serif'
                }}>
                  {yardLine <= 50 ? yardLine : 100 - yardLine}
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* Route Visualization - Show during audible/see-defense phase for pass plays */}
      {(gamePhase === 'audible' || gamePhase === 'see-defense') && selectedPlayType === 'pass' && customRoutes.length > 0 && (
        <>
          {customRoutes.map(route => {
            const receiverBasePos = receiverBasePositions[route.receiver];
            const routeDef = routeDefinitions[route.route];
            const targetX = receiverBasePos.x + routeDef.targetXOffset;
            const targetY = routeDef.targetY;

            return (
              <React.Fragment key={`route-${route.receiver}`}>
                {drawRoutePath(receiverBasePos.x, receiverBasePos.y, targetX, targetY, '#4ECDC4')}
              </React.Fragment>
            );
          })}
        </>
      )}

      {/* Line of Scrimmage */}
      <div style={{
        position: 'absolute',
        top: `${(100 - fieldPosition + 10) * YARD_HEIGHT}px`,
        left: 0,
        right: 0,
        height: '3px',
        background: '#FFC045',
        boxShadow: '0 0 10px rgba(255,192,69,0.6)'
      }} />

      {/* First Down Marker */}
      <div style={{
        position: 'absolute',
        top: `${(100 - firstDownMarker + 10) * YARD_HEIGHT}px`,
        left: 0,
        right: 0,
        height: '2px',
        background: '#FF6B35',
        boxShadow: '0 0 8px rgba(255,107,53,0.6)'
      }} />

      {/* Defense Players */}
      {defensePlayers.map(player => {
        const isWaitingForMike = coverageAnswer && !mikeIdentified;
        const isWaitingForSpy = coverageAnswer && mikeIdentified && hasSpyOnPlay && !spyIdentified;
        const isClickable = isWaitingForMike || isWaitingForSpy;
        const isSelected = (isWaitingForMike && mikeIdentified === player.id) ||
          (isWaitingForSpy && spyIdentified === player.id);

        return (
          <div
            key={player.id}
            onClick={() => {
              if (isWaitingForMike) onMikeClick(player.id);
              if (isWaitingForSpy) onSpyClick(player.id);
            }}
            style={{
              position: 'absolute',
              left: `${player.x - 15}px`,
              top: `${player.y - 15}px`,
              width: '30px',
              height: '30px',
              background: player.color,
              border: player.isMike ? '3px solid #FFC045' : '2px solid rgba(255,255,255,0.3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#fff',
              boxShadow: player.isMike
                ? '0 0 15px rgba(255,192,69,0.8), 0 4px 8px rgba(0,0,0,0.4)'
                : '0 4px 8px rgba(0,0,0,0.4)',
              cursor: isClickable ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
              fontFamily: '"Courier New", monospace',
              ...(isClickable && {
                animation: 'pulse 1.5s ease-in-out infinite'
              }),
              ...(isSelected && {
                border: '3px solid #4ECDC4',
                boxShadow: '0 0 20px rgba(78,205,196,0.8)',
                transform: 'scale(1.2)'
              })
            }}
            onMouseEnter={(e) => {
              if (isClickable) {
                e.currentTarget.style.transform = isSelected ? 'scale(1.2)' : 'scale(1.3)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(255,192,69,0.9), 0 6px 12px rgba(0,0,0,0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (isClickable) {
                e.currentTarget.style.transform = isSelected ? 'scale(1.2)' : 'scale(1)';
                e.currentTarget.style.boxShadow = isSelected
                  ? '0 0 20px rgba(78,205,196,0.8)'
                  : player.isMike
                  ? '0 0 15px rgba(255,192,69,0.8), 0 4px 8px rgba(0,0,0,0.4)'
                  : '0 4px 8px rgba(0,0,0,0.4)';
              }
            }}
          >
            {player.role}
          </div>
        );
      })}

      {/* Offense Players */}
      {gamePhase === 'play-action' && selectedPlayType === 'pass' ? (
        /* Animated Receivers during pass play */
        receiverPositions.map(receiver => (
          <div
            key={receiver.id}
            onClick={() => onReceiverClick(receiver)}
            style={{
              position: 'absolute',
              left: `${receiver.x - 15}px`,
              top: `${receiver.y - 15}px`,
              width: '30px',
              height: '30px',
              background: '#FF6B35',
              border: receiver.open && acedCoverageID
                ? '3px solid #4ECDC4'
                : '2px solid rgba(255,255,255,0.3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 'bold',
              color: '#fff',
              boxShadow: receiver.open && acedCoverageID
                ? '0 0 20px rgba(78,205,196,0.9), 0 4px 8px rgba(0,0,0,0.4)'
                : '0 4px 8px rgba(0,0,0,0.4)',
              cursor: 'pointer',
              transition: 'left 0.1s linear, top 0.1s linear',
              fontFamily: '"Courier New", monospace',
              zIndex: 5,
              ...(receiver.open && acedCoverageID && {
                animation: 'receiverPulse 1s ease-in-out infinite'
              })
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.3)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(255,192,69,1), 0 6px 12px rgba(0,0,0,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = receiver.open && acedCoverageID
                ? '0 0 20px rgba(78,205,196,0.9), 0 4px 8px rgba(0,0,0,0.4)'
                : '0 4px 8px rgba(0,0,0,0.4)';
            }}
          >
            {receiver.label}
          </div>
        ))
      ) : gamePhase === 'audible' && selectedPlayType === 'pass' ? (
        /* Hot Route Adjustment Phase - Show receivers with route indicators */
        customRoutes.map(route => {
          const receiverBasePos = receiverBasePositions[route.receiver];

          return (
            <div
              key={route.receiver}
              onClick={() => onHotRoute(route.receiver)}
              style={{
                position: 'absolute',
                left: `${receiverBasePos.x - 15}px`,
                top: `${receiverBasePos.y - 15}px`,
                width: '30px',
                height: '30px',
                background: '#FF6B35',
                border: '3px solid #4ECDC4',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#fff',
                boxShadow: '0 0 15px rgba(78,205,196,0.8), 0 4px 8px rgba(0,0,0,0.4)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: '"Courier New", monospace',
                zIndex: 5,
                animation: 'pulse 1.5s ease-in-out infinite'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.3)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(78,205,196,1), 0 6px 12px rgba(0,0,0,0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(78,205,196,0.8), 0 4px 8px rgba(0,0,0,0.4)';
              }}
            >
              {route.label}
            </div>
          );
        })
      ) : (
        /* Static offensive formation */
        offensePlayers.map(player => (
          <div
            key={player.id}
            style={{
              position: 'absolute',
              left: `${player.x - 15}px`,
              top: `${player.y - 15}px`,
              width: '30px',
              height: '30px',
              background: player.isQB
                ? 'linear-gradient(135deg, #FFC045 0%, #FF6B35 100%)'
                : player.color,
              border: player.isQB ? '3px solid #fff' : '2px solid rgba(255,255,255,0.3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#fff',
              boxShadow: player.isQB
                ? '0 0 20px rgba(255,192,69,0.9), 0 4px 8px rgba(0,0,0,0.4)'
                : '0 4px 8px rgba(0,0,0,0.4)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: player.isQB ? 10 : 1,
              fontFamily: '"Courier New", monospace'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(255,192,69,0.9), 0 6px 12px rgba(0,0,0,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = player.isQB
                ? '0 0 20px rgba(255,192,69,0.9), 0 4px 8px rgba(0,0,0,0.4)'
                : '0 4px 8px rgba(0,0,0,0.4)';
            }}
          >
            {player.role}
          </div>
        ))
      )}

      {/* Defense Players - Animated during pass plays */}
      {gamePhase === 'play-action' && selectedPlayType === 'pass' ? (
        defenderPositions.map(defender => (
          <div
            key={defender.id}
            style={{
              position: 'absolute',
              left: `${defender.x - 15}px`,
              top: `${defender.y - 15}px`,
              width: '30px',
              height: '30px',
              background: '#2D3561',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#fff',
              boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
              transition: 'left 0.1s linear, top 0.1s linear',
              fontFamily: '"Courier New", monospace'
            }}
          >
            {defender.id.substring(0, 2)}
          </div>
        ))
      ) : null}
    </div>
  );
};

export default FootballField;
