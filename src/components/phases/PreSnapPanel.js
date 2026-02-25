import React from 'react';
import { FIELD_WIDTH, coverageOptions } from '../../data/constants';

const PreSnapPanel = ({
  coverageAnswer,
  mikeIdentified,
  hasSpyOnPlay,
  spyIdentified,
  showFeedback,
  correctCoverage,
  correctMike,
  correctSpy,
  onCoverageSelect,
  onCheckComplete,
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
      {/* Step 1: Coverage Identification */}
      {!coverageAnswer && (
        <div>
          <h2 style={{
            fontSize: '28px',
            color: '#FFC045',
            margin: '0 0 20px 0',
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}>
            STEP 1: IDENTIFY THE COVERAGE
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#9BA4B5',
            marginBottom: '24px',
            fontFamily: '"Courier New", monospace'
          }}>
            Study the defensive alignment. What coverage are they running?
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px'
          }}>
            {coverageOptions.map(option => (
              <button
                key={option.id}
                onClick={() => onCoverageSelect(option.label)}
                style={{
                  background: 'rgba(255,107,53,0.1)',
                  border: '2px solid rgba(255,107,53,0.5)',
                  borderRadius: '8px',
                  padding: '20px',
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
                  fontSize: '22px',
                  color: '#FFC045',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  letterSpacing: '1px'
                }}>
                  {option.label}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#9BA4B5',
                  fontFamily: '"Courier New", monospace'
                }}>
                  {option.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Mike LB Identification */}
      {coverageAnswer && !mikeIdentified && (
        <div>
          <h2 style={{
            fontSize: '28px',
            color: '#FFC045',
            margin: '0 0 20px 0',
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}>
            STEP 2: IDENTIFY THE MIKE
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#9BA4B5',
            marginBottom: '16px',
            fontFamily: '"Courier New", monospace'
          }}>
            Click on the field to identify the Mike linebacker. This sets your protection.
          </p>
          <div style={{
            padding: '16px',
            background: 'rgba(255,192,69,0.1)',
            border: '1px solid rgba(255,192,69,0.3)',
            borderRadius: '6px',
            fontSize: '14px',
            color: '#FFC045',
            fontFamily: '"Courier New", monospace'
          }}>
            TIP: The Mike is typically the middle linebacker in the defensive alignment
          </div>
        </div>
      )}

      {/* Step 3: Spy Identification (if applicable) */}
      {coverageAnswer && mikeIdentified && hasSpyOnPlay && !spyIdentified && (
        <div>
          <h2 style={{
            fontSize: '28px',
            color: '#FFC045',
            margin: '0 0 20px 0',
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}>
            STEP 3: IDENTIFY THE SPY
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#9BA4B5',
            marginBottom: '16px',
            fontFamily: '"Courier New", monospace'
          }}>
            They're running a QB spy. Click on the defender assigned to contain you.
          </p>
          <div style={{
            padding: '16px',
            background: 'rgba(255,192,69,0.1)',
            border: '1px solid rgba(255,192,69,0.3)',
            borderRadius: '6px',
            fontSize: '14px',
            color: '#FFC045',
            fontFamily: '"Courier New", monospace'
          }}>
            TIP: The spy usually sits in shallow zone ready to chase the QB
          </div>
        </div>
      )}

      {/* Ready to Continue */}
      {coverageAnswer && mikeIdentified && (!hasSpyOnPlay || spyIdentified) && !showFeedback && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onCheckComplete}
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
            LOCK IT IN
          </button>
        </div>
      )}

      {/* Feedback Display */}
      {showFeedback && (
        <div style={{
          animation: 'fadeIn 0.3s ease-in',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: coverageAnswer === correctCoverage ? '#4ECDC4' : '#FF6B35'
          }}>
            {coverageAnswer === correctCoverage && mikeIdentified === correctMike && (!hasSpyOnPlay || spyIdentified === correctSpy)
              ? '🔥 PERFECT READ! 🔥'
              : coverageAnswer === correctCoverage
              ? '✓ GOT THE COVERAGE'
              : '✗ MISSED THE READ'}
          </div>
          <div style={{
            fontSize: '16px',
            color: '#9BA4B5',
            fontFamily: '"Courier New", monospace',
            lineHeight: '1.6'
          }}>
            <p>Coverage: {coverageAnswer} {coverageAnswer === correctCoverage ? '✓' : `✗ (${correctCoverage})`}</p>
            <p>Mike: {mikeIdentified} {mikeIdentified === correctMike ? '✓' : `✗ (${correctMike})`}</p>
            {hasSpyOnPlay && <p>Spy: {spyIdentified} {spyIdentified === correctSpy ? '✓' : `✗ (${correctSpy})`}</p>}
            <p style={{ marginTop: '12px', color: '#FFC045' }}>Moving to snap count...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreSnapPanel;
