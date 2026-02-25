import React from 'react';
import './App.css';
import { useGameState } from './hooks/useGameState';
import { useDefense } from './hooks/useDefense';
import { usePlaySelection } from './hooks/usePlaySelection';
import { usePlayExecution } from './hooks/usePlayExecution';
import { useSnapCount } from './hooks/useSnapCount';
import { routeDefinitions } from './data/plays';
import { receiverBasePositions } from './data/constants';
import GameInfoBar from './components/GameInfoBar';
import FootballField from './components/FootballField';
import SeeDefensePanel from './components/phases/SeeDefensePanel';
import PreSnapPanel from './components/phases/PreSnapPanel';
import PlaySelectPanel from './components/phases/PlaySelectPanel';
import AudiblePanel from './components/phases/AudiblePanel';
import SnapCountPanel from './components/phases/SnapCountPanel';
import PlayActionPanel from './components/phases/PlayActionPanel';
import ResultPanel from './components/phases/ResultPanel';

const GrudenChallenge = () => {
  const {
    gamePhase, setGamePhase,
    fieldPosition, down, distance, firstDownMarker,
    playsRun, totalYards, driveOver, driveResult,
    processPlayResult, resetDriveState, getGrudenQuote,
  } = useGameState();

  const {
    currentDefense, selectRandomDefense,
    coverageAnswer, mikeIdentified, spyIdentified, identificationComplete, showFeedback,
    correctCoverage, correctMike, hasSpyOnPlay, correctSpy, defensePlayers,
    acedCoverageID, runGaps,
    handleCoverageSelect, handleMikeClick, handleSpyClick, checkIdentificationComplete,
    resetDefenseState,
  } = useDefense(setGamePhase);

  const {
    selectedPlayType, selectedPlay, customRoutes,
    selectedReceiverForHotRoute, showHotRouteMenu,
    handlePlaySelect, handleHotRoute, applyHotRoute, cancelHotRoute,
    handleConfirmPlay, handleAudible, resetPlaySelectionState,
  } = usePlaySelection(setGamePhase);

  const {
    playTimer, passRushPressure,
    receiverPositions, defenderPositions,
    playResult, showPlayResult,
    showGapSelection, showRpoDecision, rpoTimer,
    initializePassPlay, initializeRunPlay,
    handleReceiverClick, handleGapSelect, handleRpoDecision,
    resetPlayExecutionState,
  } = usePlayExecution({ processPlayResult, currentDefense, customRoutes, routeDefinitions, selectedPlayType, acedCoverageID, runGaps });

  const {
    currentCadence, cadenceTiming, snapResult, showSnapFeedback,
    resetSnapCountState,
  } = useSnapCount({ gamePhase, setGamePhase, selectedPlayType, initializePassPlay, initializeRunPlay });

  const continueToNextPlay = () => {
    resetPlaySelectionState();
    resetDefenseState();
    resetSnapCountState();
    resetPlayExecutionState();
    selectRandomDefense();
    setGamePhase('play-select');
  };

  const startNewDrive = () => {
    resetDriveState();
    continueToNextPlay();
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F1419 0%, #1a2332 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: '"Bebas Neue", "Impact", sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(45,53,97,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <div style={{ marginBottom: '30px', textAlign: 'center', zIndex: 1 }}>
        <h1 style={{
          fontSize: '72px',
          fontWeight: 'bold',
          margin: '0',
          background: 'linear-gradient(135deg, #FF6B35 0%, #FFC045 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          textShadow: '0 0 40px rgba(255,107,53,0.3)'
        }}>
          Grooden Challenge
        </h1>
        <p style={{
          fontSize: '24px',
          color: '#9BA4B5',
          margin: '10px 0 0 0',
          letterSpacing: '2px',
          fontFamily: '"Courier New", monospace',
          fontWeight: 'bold'
        }}>
          READ • REACT • EXECUTE
        </p>
      </div>

      <GameInfoBar
        down={down}
        distance={distance}
        fieldPosition={fieldPosition}
        playsRun={playsRun}
        totalYards={totalYards}
      />

      <FootballField
        gamePhase={gamePhase}
        selectedPlayType={selectedPlayType}
        fieldPosition={fieldPosition}
        firstDownMarker={firstDownMarker}
        defensePlayers={defensePlayers}
        coverageAnswer={coverageAnswer}
        mikeIdentified={mikeIdentified}
        hasSpyOnPlay={hasSpyOnPlay}
        spyIdentified={spyIdentified}
        customRoutes={customRoutes}
        routeDefinitions={routeDefinitions}
        receiverBasePositions={receiverBasePositions}
        receiverPositions={receiverPositions}
        defenderPositions={defenderPositions}
        acedCoverageID={acedCoverageID}
        onMikeClick={handleMikeClick}
        onSpyClick={handleSpyClick}
        onHotRoute={handleHotRoute}
        onReceiverClick={handleReceiverClick}
      />

      {/* Phase Indicator */}
      <div style={{
        marginTop: '24px',
        padding: '12px 24px',
        background: 'rgba(255,107,53,0.2)',
        border: '2px solid #FF6B35',
        borderRadius: '8px',
        fontSize: '18px',
        color: '#FFC045',
        fontWeight: 'bold',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        zIndex: 1
      }}>
        Phase: {gamePhase === 'pre-snap' ? 'PRE-SNAP ANALYSIS' : gamePhase.toUpperCase().replace('-', ' ')}
      </div>

      {/* Play Selection */}
      {gamePhase === 'play-select' && (
        <PlaySelectPanel onPlaySelect={handlePlaySelect} />
      )}

      {/* See Defense */}
      {gamePhase === 'see-defense' && (
        <SeeDefensePanel
          currentDefense={currentDefense}
          selectedPlay={selectedPlay}
          setGamePhase={setGamePhase}
        />
      )}

      {/* Pre-Snap Analysis */}
      {gamePhase === 'pre-snap' && !identificationComplete && (
        <PreSnapPanel
          coverageAnswer={coverageAnswer}
          mikeIdentified={mikeIdentified}
          hasSpyOnPlay={hasSpyOnPlay}
          spyIdentified={spyIdentified}
          showFeedback={showFeedback}
          correctCoverage={correctCoverage}
          correctMike={correctMike}
          correctSpy={correctSpy}
          onCoverageSelect={handleCoverageSelect}
          onCheckComplete={checkIdentificationComplete}
        />
      )}

      {/* Audible + Hot Routes */}
      {gamePhase === 'audible' && (
        <AudiblePanel
          selectedPlay={selectedPlay}
          selectedPlayType={selectedPlayType}
          currentDefense={currentDefense}
          customRoutes={customRoutes}
          acedCoverageID={acedCoverageID}
          showHotRouteMenu={showHotRouteMenu}
          selectedReceiverForHotRoute={selectedReceiverForHotRoute}
          onHotRoute={handleHotRoute}
          onApplyHotRoute={applyHotRoute}
          onCancelHotRoute={cancelHotRoute}
          onAudible={handleAudible}
          onConfirm={handleConfirmPlay}
        />
      )}

      {/* Snap Count */}
      {gamePhase === 'snap-count' && (
        <SnapCountPanel
          showSnapFeedback={showSnapFeedback}
          snapResult={snapResult}
          cadenceTiming={cadenceTiming}
          currentCadence={currentCadence}
        />
      )}

      {/* Play Action */}
      {gamePhase === 'play-action' && (
        <PlayActionPanel
          selectedPlayType={selectedPlayType}
          showPlayResult={showPlayResult}
          playTimer={playTimer}
          passRushPressure={passRushPressure}
          acedCoverageID={acedCoverageID}
          showGapSelection={showGapSelection}
          runGaps={runGaps}
          onGapSelect={handleGapSelect}
          showRpoDecision={showRpoDecision}
          rpoTimer={rpoTimer}
          onRpoDecision={handleRpoDecision}
          currentDefense={currentDefense}
        />
      )}

      {/* Play Result */}
      {showPlayResult && (
        <ResultPanel
          playResult={playResult}
          driveOver={driveOver}
          driveResult={driveResult}
          playsRun={playsRun}
          totalYards={totalYards}
          getGrudenQuote={getGrudenQuote}
          onContinue={() => driveOver ? startNewDrive() : continueToNextPlay()}
        />
      )}

      {/* Debug info */}
      <div style={{
        marginTop: '20px',
        color: '#9BA4B5',
        fontSize: '14px',
        fontFamily: 'monospace',
        zIndex: 1
      }}>
        Current Phase: {gamePhase} | Defense: {currentDefense?.name || 'Loading...'}
      </div>
    </div>
  );
};

export default GrudenChallenge;
