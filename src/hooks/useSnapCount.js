import { useState, useEffect } from 'react';
import { cadenceSequence } from '../data/constants';

export const useSnapCount = ({ gamePhase, setGamePhase, selectedPlayType, initializePassPlay, initializeRunPlay }) => {
  const [snapCountActive, setSnapCountActive] = useState(false);
  const [currentCadence, setCurrentCadence] = useState(0);
  const [cadenceTiming, setCadenceTiming] = useState([]);
  const [snapResult, setSnapResult] = useState(null);
  const [showSnapFeedback, setShowSnapFeedback] = useState(false);

  // Start snap count when phase becomes snap-count
  useEffect(() => {
    if (gamePhase === 'snap-count' && !snapCountActive) {
      setTimeout(() => {
        setSnapCountActive(true);
        startCadence();
      }, 500);
    }
  }, [gamePhase]); // eslint-disable-line react-hooks/exhaustive-deps

  const startCadence = () => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setCurrentCadence(index);
      if (index >= cadenceSequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          if (!showSnapFeedback) {
            setSnapResult('delay');
            setShowSnapFeedback(true);
          }
        }, 500);
      }
    }, 1000);
  };

  // Keyboard handler for snap count
  useEffect(() => {
    if (!snapCountActive || showSnapFeedback) return;

    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase();
      const expectedKey = cadenceSequence[currentCadence - 1]?.key;

      if (!expectedKey) return;

      const timingRecord = {
        expected: expectedKey,
        pressed: key,
        cadenceIndex: currentCadence - 1,
        timestamp: Date.now()
      };

      setCadenceTiming(prev => [...prev, timingRecord]);

      if (currentCadence === cadenceSequence.length) {
        evaluateSnap([...cadenceTiming, timingRecord]);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [snapCountActive, currentCadence, showSnapFeedback, cadenceTiming]); // eslint-disable-line react-hooks/exhaustive-deps

  const evaluateSnap = (timing) => {
    console.log('Evaluating snap, timing:', timing);
    const allCorrect = timing.every(t => t.expected === t.pressed);

    if (!allCorrect) {
      setSnapResult('false-start');
    } else {
      setSnapResult('perfect');
    }

    setShowSnapFeedback(true);
    console.log('Snap result:', allCorrect ? 'perfect' : 'false-start');

    setTimeout(() => {
      console.log('Moving to play-action, selectedPlayType:', selectedPlayType);
      setGamePhase('play-action');
      if (selectedPlayType === 'pass') {
        initializePassPlay();
      } else if (selectedPlayType === 'run') {
        initializeRunPlay();
      }
    }, 2000);
  };

  const resetSnapCountState = () => {
    setSnapCountActive(false);
    setCurrentCadence(0);
    setCadenceTiming([]);
    setSnapResult(null);
    setShowSnapFeedback(false);
  };

  return {
    snapCountActive, currentCadence, cadenceTiming, snapResult, showSnapFeedback,
    resetSnapCountState,
  };
};
