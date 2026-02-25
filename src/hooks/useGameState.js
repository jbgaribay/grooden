import { useState } from 'react';

export const useGameState = () => {
  const [gamePhase, setGamePhase] = useState('play-select');
  const [fieldPosition, setFieldPosition] = useState(25);
  const [down, setDown] = useState(1);
  const [distance, setDistance] = useState(10);
  const [firstDownMarker, setFirstDownMarker] = useState(35);
  const [playsRun, setPlaysRun] = useState(0);
  const [totalYards, setTotalYards] = useState(0);
  const [touchdownScored, setTouchdownScored] = useState(false);
  const [driveOver, setDriveOver] = useState(false);
  const [driveResult, setDriveResult] = useState(null);

  const processPlayResult = (result) => {
    const yards = result.yards;
    const newFieldPosition = Math.min(100, Math.max(0, fieldPosition + yards));

    setFieldPosition(newFieldPosition);
    setTotalYards(totalYards + yards);
    setPlaysRun(playsRun + 1);

    if (newFieldPosition >= 100) {
      setTouchdownScored(true);
      setDriveOver(true);
      setDriveResult('touchdown');
      return;
    }

    if (result.outcome === 'interception') {
      setDriveOver(true);
      setDriveResult('turnover');
      return;
    }

    const yardsGained = yards;
    const newDistance = distance - yardsGained;

    if (newDistance <= 0) {
      setDown(1);
      setDistance(10);
      setFirstDownMarker(Math.min(100, newFieldPosition + 10));
    } else {
      const nextDown = down + 1;
      if (nextDown > 4) {
        setDriveOver(true);
        setDriveResult('turnover-on-downs');
      } else {
        setDown(nextDown);
        setDistance(newDistance);
      }
    }
  };

  const resetDriveState = () => {
    setFieldPosition(25);
    setDown(1);
    setDistance(10);
    setFirstDownMarker(35);
    setPlaysRun(0);
    setTotalYards(0);
    setTouchdownScored(false);
    setDriveOver(false);
    setDriveResult(null);
  };

  const getGrudenQuote = (result) => {
    if (result.type === 'run') {
      if (result.yards >= 8) {
        return "BOOM! That's how you run the football! North and south baby!";
      } else if (result.yards >= 4) {
        return "Good running. Keep moving the chains!";
      } else {
        return "Gotta find better holes than that. Read your blocks!";
      }
    }

    if (result.outcome === 'completion' && result.yards >= 10) {
      return "NOW THAT'S WHAT I'M TALKING ABOUT! THAT'S A THROW!";
    } else if (result.outcome === 'completion') {
      return "Nice read kid, you're learning!";
    } else if (result.outcome === 'interception') {
      return "WHAT WERE YOU THINKING?! You forced that into double coverage!";
    } else if (result.outcome === 'sack') {
      return "You gotta get rid of that ball! This isn't a picnic!";
    } else if (result.outcome === 'run') {
      return "Good awareness! Live to see another down!";
    } else {
      return "Not every throw is gonna be perfect. Learn from it.";
    }
  };

  return {
    gamePhase, setGamePhase,
    fieldPosition, down, distance, firstDownMarker,
    playsRun, totalYards, touchdownScored, driveOver, driveResult,
    processPlayResult, resetDriveState, getGrudenQuote,
  };
};
