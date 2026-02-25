import { useState, useEffect } from 'react';
import { defensiveFormations } from '../data/formations';

export const useDefense = (setGamePhase) => {
  const [currentDefense, setCurrentDefense] = useState(null);
  const [coverageAnswer, setCoverageAnswer] = useState(null);
  const [mikeIdentified, setMikeIdentified] = useState(null);
  const [spyIdentified, setSpyIdentified] = useState(null);
  const [identificationComplete, setIdentificationComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctCoverage = currentDefense?.correctAnswer || 'Cover 2';
  const correctMike = currentDefense?.mikePlayer || 'MLB';
  const hasSpyOnPlay = currentDefense?.hasSpy || false;
  const correctSpy = currentDefense?.spyPlayer || null;
  const defensePlayers = currentDefense?.players || [];

  const acedCoverageID = coverageAnswer === correctCoverage &&
    mikeIdentified === correctMike &&
    (!hasSpyOnPlay || spyIdentified === correctSpy);

  const runGaps = [
    { id: 'a-left', label: 'A Gap L', x: 360, optimal: currentDefense?.optimalRun?.includes('a-left') },
    { id: 'b-left', label: 'B Gap L', x: 340, optimal: currentDefense?.optimalRun?.includes('b-left') },
    { id: 'c-left', label: 'C Gap L', x: 300, optimal: currentDefense?.optimalRun?.includes('c-left') },
    { id: 'a-right', label: 'A Gap R', x: 440, optimal: currentDefense?.optimalRun?.includes('a-right') },
    { id: 'b-right', label: 'B Gap R', x: 460, optimal: currentDefense?.optimalRun?.includes('b-right') },
    { id: 'c-right', label: 'C Gap R', x: 500, optimal: currentDefense?.optimalRun?.includes('c-right') }
  ];

  useEffect(() => {
    if (!currentDefense) {
      selectRandomDefense();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selectRandomDefense = () => {
    const formations = Object.values(defensiveFormations);
    const randomFormation = formations[Math.floor(Math.random() * formations.length)];
    setCurrentDefense(randomFormation);
  };

  const handleCoverageSelect = (coverage) => {
    setCoverageAnswer(coverage);
  };

  const handleMikeClick = (playerId) => {
    setMikeIdentified(playerId);
  };

  const handleSpyClick = (playerId) => {
    setSpyIdentified(playerId);
  };

  const checkIdentificationComplete = () => {
    setShowFeedback(true);
    setTimeout(() => {
      setIdentificationComplete(true);
      setGamePhase('audible');
    }, 2500);
  };

  const resetDefenseState = () => {
    setCoverageAnswer(null);
    setMikeIdentified(null);
    setSpyIdentified(null);
    setIdentificationComplete(false);
    setShowFeedback(false);
  };

  return {
    currentDefense, selectRandomDefense,
    coverageAnswer, mikeIdentified, spyIdentified, identificationComplete, showFeedback,
    correctCoverage, correctMike, hasSpyOnPlay, correctSpy, defensePlayers,
    acedCoverageID, runGaps,
    handleCoverageSelect, handleMikeClick, handleSpyClick, checkIdentificationComplete,
    resetDefenseState,
  };
};
