import React from 'react';
import { FIELD_WIDTH } from '../../data/constants';

const ResultPanel = ({
  playResult,
  driveOver,
  driveResult,
  playsRun,
  totalYards,
  getGrudenQuote,
  onContinue,
}) => {
  return (
    <div style={{
      marginTop: '24px',
      width: `${FIELD_WIDTH}px`,
      background: 'rgba(15,20,25,0.95)',
      backdropFilter: 'blur(10px)',
      border: `3px solid ${
        playResult.outcome === 'completion' || playResult.outcome === 'run' ? '#4ECDC4' :
        playResult.outcome === 'interception' || playResult.outcome === 'sack' ? '#FF6B35' :
        'rgba(255,192,69,0.5)'
      }`,
      borderRadius: '12px',
      padding: '40px',
      textAlign: 'center',
      zIndex: 1,
      animation: 'fadeIn 0.3s ease-in'
    }}>
      <div style={{
        fontSize: '56px',
        marginBottom: '16px'
      }}>
        {playResult.outcome === 'completion' && '✅'}
        {playResult.outcome === 'interception' && '❌'}
        {playResult.outcome === 'sack' && '💥'}
        {playResult.outcome === 'incompletion' && '⚠️'}
        {playResult.outcome === 'run' && '🏃'}
      </div>
      <div style={{
        fontSize: '36px',
        fontWeight: 'bold',
        color: playResult.yards > 0 ? '#4ECDC4' : '#FF6B35',
        marginBottom: '16px',
        letterSpacing: '2px'
      }}>
        {playResult.yards > 0 ? `+${playResult.yards}` : playResult.yards} YARDS
      </div>
      <div style={{
        fontSize: '18px',
        color: '#9BA4B5',
        fontFamily: '"Courier New", monospace',
        marginBottom: '24px'
      }}>
        {playResult.description}
      </div>

      {/* Gruden Quote */}
      <div style={{
        padding: '20px',
        background: 'rgba(255,107,53,0.15)',
        border: '2px solid rgba(255,107,53,0.3)',
        borderRadius: '8px',
        fontSize: '20px',
        color: '#FFC045',
        fontStyle: 'italic',
        fontFamily: '"Bebas Neue", sans-serif',
        letterSpacing: '1px'
      }}>
        "{getGrudenQuote(playResult)}"
      </div>

      <button
        onClick={onContinue}
        style={{
          marginTop: '32px',
          background: 'linear-gradient(135deg, #FF6B35 0%, #FFC045 100%)',
          border: 'none',
          borderRadius: '8px',
          padding: '16px 40px',
          fontSize: '20px',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          letterSpacing: '2px',
          boxShadow: '0 8px 24px rgba(255,107,53,0.4)'
        }}
      >
        {driveOver
          ? driveResult === 'touchdown'
            ? '🎉 START NEW DRIVE'
            : '❌ DRIVE OVER - TRY AGAIN'
          : '➡️ NEXT PLAY'}
      </button>

      {driveOver && (
        <div style={{
          marginTop: '24px',
          padding: '20px',
          background: driveResult === 'touchdown'
            ? 'rgba(78,205,196,0.15)'
            : 'rgba(255,107,53,0.15)',
          border: `2px solid ${driveResult === 'touchdown' ? '#4ECDC4' : '#FF6B35'}`,
          borderRadius: '8px',
          fontSize: '18px',
          color: driveResult === 'touchdown' ? '#4ECDC4' : '#FF6B35',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}>
          {driveResult === 'touchdown' && '🏆 TOUCHDOWN! Drive Summary:'}
          {driveResult === 'turnover' && '💔 TURNOVER - Drive Summary:'}
          {driveResult === 'turnover-on-downs' && '⛔ TURNOVER ON DOWNS - Drive Summary:'}
          <div style={{
            marginTop: '12px',
            fontSize: '16px',
            fontFamily: '"Courier New", monospace',
            color: '#9BA4B5'
          }}>
            {playsRun} plays • {totalYards} total yards
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPanel;
