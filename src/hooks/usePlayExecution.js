import { useState, useEffect } from 'react';
import { receiverBasePositions } from '../data/constants';

export const usePlayExecution = ({ processPlayResult, currentDefense, customRoutes, routeDefinitions, selectedPlayType, acedCoverageID, runGaps }) => {
  // Pass play state
  const [playActive, setPlayActive] = useState(false);
  const [playTimer, setPlayTimer] = useState(0);
  const [passRushPressure, setPassRushPressure] = useState(0);
  const [receiverPositions, setReceiverPositions] = useState([]);
  const [defenderPositions, setDefenderPositions] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [didScramble, setDidScramble] = useState(false);
  const [playResult, setPlayResult] = useState(null);
  const [showPlayResult, setShowPlayResult] = useState(false);

  // Run play state
  const [selectedGap, setSelectedGap] = useState(null);
  const [showGapSelection, setShowGapSelection] = useState(false);

  // RPO state
  const [rpoDecision, setRpoDecision] = useState(null);
  const [showRpoDecision, setShowRpoDecision] = useState(false);
  const [rpoTimer, setRpoTimer] = useState(0);

  // Initialize pass play
  const initializePassPlay = () => {
    console.log('Initializing pass play, customRoutes:', customRoutes);

    if (!customRoutes || customRoutes.length === 0) {
      console.error('No custom routes available!');
      return;
    }

    const openReceiverId = currentDefense?.openReceiver || 'TE';

    const initialReceivers = customRoutes.map(routeConfig => {
      const receiverBasePos = receiverBasePositions[routeConfig.receiver];
      const routeDef = routeDefinitions[routeConfig.route];
      const targetX = receiverBasePos.x + routeDef.targetXOffset;
      const targetY = routeDef.targetY;

      return {
        id: routeConfig.receiver,
        x: receiverBasePos.x,
        y: receiverBasePos.y,
        targetX,
        targetY,
        route: routeConfig.route,
        label: routeConfig.label,
        open: routeConfig.receiver === openReceiverId
      };
    });

    console.log('Receiver positions set:', initialReceivers);
    setReceiverPositions(initialReceivers);

    const coverageDefenders = [
      { id: 'CB1', x: 180, y: 400, targetX: 180, targetY: 350 },
      { id: 'CB2', x: 620, y: 400, targetX: 620, targetY: 350 },
      { id: 'S1', x: 300, y: 320, targetX: 280, targetY: 280 },
      { id: 'S2', x: 500, y: 320, targetX: 520, targetY: 280 },
      { id: 'MLB', x: 400, y: 380, targetX: 400, targetY: 360 }
    ];

    setDefenderPositions(coverageDefenders);
    setPlayActive(true);
    console.log('Pass play initialized, playActive set to true');
  };

  // Pass play animation loop
  useEffect(() => {
    if (!playActive || selectedPlayType !== 'pass') return;

    const interval = setInterval(() => {
      setPlayTimer(prev => {
        const newTime = prev + 100;

        setPassRushPressure(Math.min(100, (newTime / 5000) * 100));

        setReceiverPositions(prev => prev.map(receiver => ({
          ...receiver,
          x: receiver.x + (receiver.targetX - receiver.x) * 0.05,
          y: receiver.y + (receiver.targetY - receiver.y) * 0.05
        })));

        setDefenderPositions(prev => prev.map(defender => ({
          ...defender,
          x: defender.x + (defender.targetX - defender.x) * 0.03,
          y: defender.y + (defender.targetY - defender.y) * 0.03
        })));

        if (newTime >= 5000) {
          handleSack();
          return newTime;
        }

        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [playActive, selectedPlayType]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scramble handler
  useEffect(() => {
    if (!playActive || showPlayResult) return;

    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        setDidScramble(true);
        evaluateScramble();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playActive, showPlayResult]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleReceiverClick = (receiver) => {
    if (!playActive || showPlayResult) return;
    setSelectedReceiver(receiver);
    evaluatePass(receiver);
  };

  const evaluatePass = (receiver) => {
    setPlayActive(false);

    const timing = playTimer / 1000;
    let result = {
      type: 'pass',
      receiver: receiver.label,
      outcome: '',
      yards: 0,
      description: ''
    };

    if (receiver.open) {
      result.outcome = 'completion';
      result.yards = Math.floor(Math.random() * 8) + 7;
      result.description = `Complete to ${receiver.label} for ${result.yards} yards!`;
    } else {
      if (timing < 2) {
        result.outcome = 'incompletion';
        result.yards = 0;
        result.description = `Threw too early! ${receiver.label} wasn't ready.`;
      } else {
        const completionChance = Math.random();
        if (completionChance > 0.6) {
          result.outcome = 'interception';
          result.yards = 0;
          result.description = `PICKED OFF! Forced it into coverage.`;
        } else {
          result.outcome = 'incompletion';
          result.yards = 0;
          result.description = `Incomplete. Defender broke it up.`;
        }
      }
    }

    setPlayResult(result);
    setShowPlayResult(true);
    processPlayResult(result);
  };

  const evaluateScramble = () => {
    setPlayActive(false);

    const result = {
      type: 'scramble',
      outcome: 'run',
      yards: Math.floor(Math.random() * 6) + 3,
      description: ''
    };

    result.description = `Scrambled for ${result.yards} yards!`;

    setPlayResult(result);
    setShowPlayResult(true);
    processPlayResult(result);
  };

  const handleSack = () => {
    setPlayActive(false);

    const result = {
      type: 'pass',
      outcome: 'sack',
      yards: -5,
      description: 'SACKED! Held the ball too long.'
    };

    setPlayResult(result);
    setShowPlayResult(true);
    processPlayResult(result);
  };

  // Initialize run play
  const initializeRunPlay = () => {
    setShowGapSelection(true);
  };

  const handleGapSelect = (gap) => {
    setSelectedGap(gap);
    evaluateRun(gap);
  };

  const evaluateRun = (gap) => {
    setShowGapSelection(false);

    let result = {
      type: 'run',
      gap: gap.label,
      outcome: 'run',
      yards: 0,
      description: ''
    };

    const isOptimal = currentDefense?.optimalRun?.includes(gap.id);

    if (isOptimal) {
      result.yards = Math.floor(Math.random() * 6) + 5;
      result.description = `Great read! Ran through ${gap.label} for ${result.yards} yards!`;
    } else {
      const stuffed = Math.random() > 0.6;
      if (stuffed) {
        result.yards = Math.floor(Math.random() * 2);
        result.description = `Stuffed at the line! Only ${result.yards} yard${result.yards === 1 ? '' : 's'}.`;
      } else {
        result.yards = Math.floor(Math.random() * 4) + 2;
        result.description = `Fought through ${gap.label} for ${result.yards} yards.`;
      }
    }

    setPlayResult(result);
    setShowPlayResult(true);
    processPlayResult(result);
  };

  // Initialize RPO
  const initializeRPO = () => {
    setShowRpoDecision(true);
    setPlayActive(true);

    const interval = setInterval(() => {
      setRpoTimer(prev => {
        const newTime = prev + 100;
        if (newTime >= 2000) {
          clearInterval(interval);
          if (!rpoDecision) {
            handleRpoDecision('hand-off');
          }
        }
        return newTime;
      });
    }, 100);
  };

  const handleRpoDecision = (decision) => {
    setRpoDecision(decision);
    setShowRpoDecision(false);
    setPlayActive(false);

    if (decision === 'hand-off') {
      const optimalGap = runGaps.find(g => g.optimal);
      evaluateRun(optimalGap);
    } else {
      setTimeout(() => {
        initializePassPlay();
      }, 300);
    }
  };

  const resetPlayExecutionState = () => {
    setPlayActive(false);
    setPlayTimer(0);
    setPassRushPressure(0);
    setReceiverPositions([]);
    setDefenderPositions([]);
    setSelectedReceiver(null);
    setDidScramble(false);
    setPlayResult(null);
    setShowPlayResult(false);
    setSelectedGap(null);
    setShowGapSelection(false);
    setRpoDecision(null);
    setShowRpoDecision(false);
    setRpoTimer(0);
  };

  return {
    playActive, playTimer, passRushPressure,
    receiverPositions, defenderPositions,
    selectedReceiver, didScramble, playResult, showPlayResult,
    selectedGap, showGapSelection,
    rpoDecision, showRpoDecision, rpoTimer,
    initializePassPlay, initializeRunPlay, initializeRPO,
    handleReceiverClick, handleGapSelect, handleRpoDecision,
    resetPlayExecutionState,
  };
};
