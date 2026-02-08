import React, { useState } from 'react';

const GrudenChallenge = () => {
  // Game state
  const [gamePhase, setGamePhase] = useState('play-select'); // play-select, see-defense, pre-snap, audible, snap-count, play-action, result
  
  // Drive state management
  const [fieldPosition, setFieldPosition] = useState(25); // Yard line (0-100)
  const [down, setDown] = useState(1); // Current down (1-4)
  const [distance, setDistance] = useState(10); // Yards to first down
  const [firstDownMarker, setFirstDownMarker] = useState(35); // Yard line for first down
  const [playsRun, setPlaysRun] = useState(0);
  const [totalYards, setTotalYards] = useState(0);
  const [touchdownScored, setTouchdownScored] = useState(false);
  const [driveOver, setDriveOver] = useState(false);
  const [driveResult, setDriveResult] = useState(null); // 'touchdown', 'turnover', 'incomplete'
  
  // Current defensive formation
  const [currentDefense, setCurrentDefense] = useState(null);
  
  // Coverage identification state
  const [coverageAnswer, setCoverageAnswer] = useState(null);
  const [mikeIdentified, setMikeIdentified] = useState(null);
  const [spyIdentified, setSpyIdentified] = useState(null);
  const [identificationComplete, setIdentificationComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Snap count rhythm state
  const [snapCountActive, setSnapCountActive] = useState(false);
  const [currentCadence, setCurrentCadence] = useState(0); // 0=ready, 1=DOWN, 2=SET, 3=HUT, 4=HUT
  const [cadenceTiming, setCadenceTiming] = useState([]);
  const [snapResult, setSnapResult] = useState(null); // 'perfect', 'good', 'false-start', 'delay'
  const [showSnapFeedback, setShowSnapFeedback] = useState(false);
  
  // Play selection state
  const [selectedPlayType, setSelectedPlayType] = useState(null); // 'pass', 'run', 'rpo'
  const [selectedPlay, setSelectedPlay] = useState(null); // Specific play chosen
  const [showPlayHints, setShowPlayHints] = useState(false);
  
  // Hot route state
  const [baseRoutes, setBaseRoutes] = useState([]);
  const [customRoutes, setCustomRoutes] = useState([]);
  const [selectedReceiverForHotRoute, setSelectedReceiverForHotRoute] = useState(null);
  const [showHotRouteMenu, setShowHotRouteMenu] = useState(false);
  
  // Play execution state (Pass plays)
  const [playActive, setPlayActive] = useState(false);
  const [playTimer, setPlayTimer] = useState(0); // Timer in ms
  const [passRushPressure, setPassRushPressure] = useState(0); // 0-100
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
  const [rpoDecision, setRpoDecision] = useState(null); // 'hand-off' or 'pull'
  const [showRpoDecision, setShowRpoDecision] = useState(false);
  const [rpoTimer, setRpoTimer] = useState(0);
  
  // Defensive formations library
  const defensiveFormations = {
    'Cover 2': {
      name: 'Cover 2',
      description: 'Two deep safeties, zone underneath',
      correctAnswer: 'Cover 2',
      hasSpy: true,
      spyPlayer: 'OLB1',
      mikePlayer: 'MLB',
      openReceiver: 'TE', // TE open in seams
      optimalRun: ['b-left', 'b-right'], // B gaps good vs 2-high
      players: [
        { id: 'DE1', x: 300, y: 420, role: 'DE', color: '#2D3561' },
        { id: 'DT1', x: 370, y: 420, role: 'DT', color: '#2D3561' },
        { id: 'DT2', x: 430, y: 420, role: 'DT', color: '#2D3561' },
        { id: 'DE2', x: 500, y: 420, role: 'DE', color: '#2D3561' },
        { id: 'MLB', x: 400, y: 380, role: 'MLB', color: '#2D3561', isMike: true },
        { id: 'OLB1', x: 280, y: 380, role: 'OLB', color: '#2D3561' },
        { id: 'OLB2', x: 520, y: 380, role: 'OLB', color: '#2D3561' },
        { id: 'CB1', x: 180, y: 400, role: 'CB', color: '#2D3561' },
        { id: 'CB2', x: 620, y: 400, role: 'CB', color: '#2D3561' },
        { id: 'S1', x: 300, y: 320, role: 'S', color: '#2D3561' },
        { id: 'S2', x: 500, y: 320, role: 'S', color: '#2D3561' }
      ]
    },
    'Cover 3': {
      name: 'Cover 3',
      description: 'Three deep zones, four underneath',
      correctAnswer: 'Cover 3',
      hasSpy: false,
      spyPlayer: null,
      mikePlayer: 'MLB',
      openReceiver: 'WR2', // Outside WR open
      optimalRun: ['c-left', 'c-right'], // Outside runs vs 3-deep
      players: [
        { id: 'DE1', x: 300, y: 420, role: 'DE', color: '#2D3561' },
        { id: 'DT1', x: 370, y: 420, role: 'DT', color: '#2D3561' },
        { id: 'DT2', x: 430, y: 420, role: 'DT', color: '#2D3561' },
        { id: 'DE2', x: 500, y: 420, role: 'DE', color: '#2D3561' },
        { id: 'MLB', x: 400, y: 380, role: 'MLB', color: '#2D3561', isMike: true },
        { id: 'OLB1', x: 280, y: 380, role: 'OLB', color: '#2D3561' },
        { id: 'OLB2', x: 520, y: 380, role: 'OLB', color: '#2D3561' },
        { id: 'CB1', x: 180, y: 350, role: 'CB', color: '#2D3561' },
        { id: 'CB2', x: 620, y: 350, role: 'CB', color: '#2D3561' },
        { id: 'SS', x: 400, y: 300, role: 'SS', color: '#2D3561' },
        { id: 'FS', x: 400, y: 280, role: 'FS', color: '#2D3561' }
      ]
    },
    'Man Coverage': {
      name: 'Man Coverage',
      description: 'Man-to-man across the board',
      correctAnswer: 'Man Coverage',
      hasSpy: false,
      spyPlayer: null,
      mikePlayer: 'MLB',
      openReceiver: 'RB', // RB can slip out
      optimalRun: ['a-left', 'a-right'], // Quick runs vs man
      players: [
        { id: 'DE1', x: 300, y: 420, role: 'DE', color: '#2D3561' },
        { id: 'DT1', x: 370, y: 420, role: 'DT', color: '#2D3561' },
        { id: 'DT2', x: 430, y: 420, role: 'DT', color: '#2D3561' },
        { id: 'DE2', x: 500, y: 420, role: 'DE', color: '#2D3561' },
        { id: 'MLB', x: 400, y: 390, role: 'MLB', color: '#2D3561', isMike: true },
        { id: 'OLB1', x: 220, y: 410, role: 'OLB', color: '#2D3561' },
        { id: 'OLB2', x: 580, y: 410, role: 'OLB', color: '#2D3561' },
        { id: 'CB1', x: 200, y: 450, role: 'CB', color: '#2D3561' },
        { id: 'CB2', x: 600, y: 450, role: 'CB', color: '#2D3561' },
        { id: 'S1', x: 350, y: 360, role: 'S', color: '#2D3561' },
        { id: 'S2', x: 450, y: 360, role: 'S', color: '#2D3561' }
      ]
    },
    'Zone Blitz': {
      name: 'Zone Blitz',
      description: 'Extra rushers, zone behind',
      correctAnswer: 'Zone Blitz',
      hasSpy: false,
      spyPlayer: null,
      mikePlayer: 'OLB1',
      openReceiver: 'WR1', // Quick throw to WR
      optimalRun: ['b-left', 'b-right'], // Hit the gap before blitz arrives
      players: [
        { id: 'DE1', x: 300, y: 420, role: 'DE', color: '#2D3561' },
        { id: 'DT1', x: 370, y: 420, role: 'DT', color: '#2D3561' },
        { id: 'DT2', x: 430, y: 420, role: 'DT', color: '#2D3561' },
        { id: 'DE2', x: 500, y: 420, role: 'DE', color: '#2D3561' },
        { id: 'OLB1', x: 340, y: 405, role: 'OLB', color: '#2D3561', isMike: true }, // Blitzing
        { id: 'OLB2', x: 460, y: 405, role: 'OLB', color: '#2D3561' }, // Blitzing
        { id: 'MLB', x: 400, y: 360, role: 'MLB', color: '#2D3561' }, // Dropping to zone
        { id: 'CB1', x: 200, y: 380, role: 'CB', color: '#2D3561' },
        { id: 'CB2', x: 600, y: 380, role: 'CB', color: '#2D3561' },
        { id: 'S1', x: 300, y: 320, role: 'S', color: '#2D3561' },
        { id: 'S2', x: 500, y: 320, role: 'S', color: '#2D3561' }
      ]
    }
  };
  
  // Correct answers for this play (now dynamic based on defense)
  // Correct answers for this play (now dynamic based on defense)
  const correctCoverage = currentDefense?.correctAnswer || 'Cover 2';
  const correctMike = currentDefense?.mikePlayer || 'MLB';
  const hasSpyOnPlay = currentDefense?.hasSpy || false;
  const correctSpy = currentDefense?.spyPlayer || null;
  
  // Get defensive players from current formation
  const defensePlayers = currentDefense?.players || [];
  
  // Base play library
  const basePlays = {
    pass: [
      {
        id: 'verticals',
        name: 'Four Verticals',
        description: 'All receivers go deep',
        routes: [
          { receiver: 'WR1', route: 'go', label: 'WR1' },
          { receiver: 'WR2', route: 'go', label: 'WR2' },
          { receiver: 'TE', route: 'go', label: 'TE' },
          { receiver: 'RB', route: 'go', label: 'RB' }
        ]
      },
      {
        id: 'spacing',
        name: 'Spacing Concept',
        description: 'Quick rhythm throws',
        routes: [
          { receiver: 'WR1', route: 'slant', label: 'WR1' },
          { receiver: 'WR2', route: 'out', label: 'WR2' },
          { receiver: 'TE', route: 'curl', label: 'TE' },
          { receiver: 'RB', route: 'flat', label: 'RB' }
        ]
      },
      {
        id: 'flood',
        name: 'Flood Concept',
        description: 'Overload one side',
        routes: [
          { receiver: 'WR1', route: 'go', label: 'WR1' },
          { receiver: 'WR2', route: 'curl', label: 'WR2' },
          { receiver: 'TE', route: 'out', label: 'TE' },
          { receiver: 'RB', route: 'flat', label: 'RB' }
        ]
      },
      {
        id: 'mesh',
        name: 'Mesh Concept',
        description: 'Crossing routes',
        routes: [
          { receiver: 'WR1', route: 'cross', label: 'WR1' },
          { receiver: 'WR2', route: 'cross', label: 'WR2' },
          { receiver: 'TE', route: 'curl', label: 'TE' },
          { receiver: 'RB', route: 'flat', label: 'RB' }
        ]
      },
      {
        id: 'screen',
        name: 'RB Screen',
        description: 'Quick screen to RB',
        routes: [
          { receiver: 'WR1', route: 'go', label: 'WR1' },
          { receiver: 'WR2', route: 'go', label: 'WR2' },
          { receiver: 'TE', route: 'go', label: 'TE' },
          { receiver: 'RB', route: 'screen', label: 'RB' }
        ]
      }
    ],
    run: [
      {
        id: 'inside-zone',
        name: 'Inside Zone',
        description: 'Run between tackles',
        optimalGaps: ['a-left', 'a-right', 'b-left', 'b-right']
      },
      {
        id: 'outside-zone',
        name: 'Outside Zone',
        description: 'Stretch to the edge',
        optimalGaps: ['c-left', 'c-right']
      },
      {
        id: 'power',
        name: 'Power',
        description: 'Lead blocker through gap',
        optimalGaps: ['b-left', 'b-right']
      }
    ]
  };
  
  // Route type definitions with targets
  const routeDefinitions = {
    go: { name: 'Go', targetY: 280, targetXOffset: 0, description: 'Straight deep', symbol: '↑' },
    slant: { name: 'Slant', targetY: 380, targetXOffset: 40, description: 'Quick inside cut', symbol: '↗' },
    out: { name: 'Out', targetY: 380, targetXOffset: -60, description: 'Break outside', symbol: '→' },
    curl: { name: 'Curl', targetY: 360, targetXOffset: 0, description: 'Come back to QB', symbol: '↩' },
    fade: { name: 'Fade', targetY: 300, targetXOffset: -40, description: 'Outside and deep', symbol: '↖' },
    cross: { name: 'Cross', targetY: 380, targetXOffset: 200, description: 'Cross the field', symbol: '↔' },
    flat: { name: 'Flat', targetY: 420, targetXOffset: -50, description: 'Shallow outside', symbol: '⇢' },
    screen: { name: 'Screen', targetY: 460, targetXOffset: -30, description: 'Behind line', symbol: '⇣' }
  };
  
  // Draw route path on field
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
  
  // Initialize first play
  React.useEffect(() => {
    if (!currentDefense) {
      selectRandomDefense();
    }
  }, []);
  
  // Select random defensive formation
  const selectRandomDefense = () => {
    const formations = Object.values(defensiveFormations);
    const randomFormation = formations[Math.floor(Math.random() * formations.length)];
    setCurrentDefense(randomFormation);
  };
  
  // Calculate if player aced the coverage ID (for hints)
  const acedCoverageID = coverageAnswer === correctCoverage && 
                          mikeIdentified === correctMike && 
                          (!hasSpyOnPlay || spyIdentified === correctSpy);
  
  // Cadence sequence
  const cadenceSequence = [
    { word: 'DOWN', key: 'd', beat: 0 },
    { word: 'SET', key: 's', beat: 1000 },
    { word: 'HUT', key: 'h', beat: 2000 },
    { word: 'HUT', key: 'h', beat: 2800 }
  ];
  
  // Coverage quiz options
  const coverageOptions = [
    { id: 'cover2', label: 'Cover 2', description: 'Two deep safeties, zone underneath' },
    { id: 'cover3', label: 'Cover 3', description: 'Three deep zones, four underneath' },
    { id: 'man', label: 'Man Coverage', description: 'Man-to-man across the board' },
    { id: 'blitz', label: 'Zone Blitz', description: 'Extra rushers, zone behind' }
  ];
  
  // Handle coverage selection
  const handleCoverageSelect = (coverage) => {
    setCoverageAnswer(coverage);
  };
  
  // Handle Mike LB identification
  const handleMikeClick = (playerId) => {
    setMikeIdentified(playerId);
  };
  
  // Handle Spy identification
  const handleSpyClick = (playerId) => {
    setSpyIdentified(playerId);
  };
  
  // Check if identification phase is complete
  const checkIdentificationComplete = () => {
    const coverageCorrect = coverageAnswer === correctCoverage;
    const mikeCorrect = mikeIdentified === correctMike;
    const spyCorrect = hasSpyOnPlay ? spyIdentified === correctSpy : true;
    
    setShowFeedback(true);
    setTimeout(() => {
      setIdentificationComplete(true);
      setGamePhase('audible'); // Now go to audible option
    }, 2500);
  };
  
  // Start snap count sequence
  React.useEffect(() => {
    if (gamePhase === 'snap-count' && !snapCountActive) {
      // Small delay before starting
      setTimeout(() => {
        setSnapCountActive(true);
        startCadence();
      }, 500);
    }
  }, [gamePhase]);
  
  // Start cadence sequence
  const startCadence = () => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setCurrentCadence(index);
      if (index >= cadenceSequence.length) {
        clearInterval(interval);
        // If player hasn't completed by now, it's a delay of game
        setTimeout(() => {
          if (!showSnapFeedback) {
            setSnapResult('delay');
            setShowSnapFeedback(true);
          }
        }, 500);
      }
    }, 1000); // Cadence progresses every second
  };
  
  // Handle keyboard input for snap count
  React.useEffect(() => {
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
      
      // Check if it's the last key (second HUT)
      if (currentCadence === cadenceSequence.length) {
        evaluateSnap([...cadenceTiming, timingRecord]);
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [snapCountActive, currentCadence, showSnapFeedback, cadenceTiming]);
  
  // Evaluate snap timing
  const evaluateSnap = (timing) => {
    console.log('Evaluating snap, timing:', timing);
    // Check if all keys were correct
    const allCorrect = timing.every(t => t.expected === t.pressed);
    
    if (!allCorrect) {
      setSnapResult('false-start');
    } else {
      // All keys correct - check timing quality (for now, always perfect if keys are right)
      setSnapResult('perfect');
    }
    
    setShowSnapFeedback(true);
    console.log('Snap result:', allCorrect ? 'perfect' : 'false-start');
    
    // Move to play execution after feedback
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
  
  // Handle play selection - now picks specific play, not just type
  const handlePlaySelect = (play) => {
    setSelectedPlay(play);
    
    if (play.routes) {
      // Pass play - set up base routes
      setBaseRoutes(play.routes);
      setCustomRoutes(JSON.parse(JSON.stringify(play.routes))); // Deep copy
      setSelectedPlayType('pass');
    } else {
      // Run play
      setSelectedPlayType('run');
    }
    
    // Move to see defense phase (show them what they're facing)
    setGamePhase('see-defense');
  };
  
  // Handle hot route selection
  const handleHotRoute = (receiverId) => {
    setSelectedReceiverForHotRoute(receiverId);
    setShowHotRouteMenu(true);
  };
  
  // Apply hot route change
  const applyHotRoute = (newRoute) => {
    setCustomRoutes(prev => prev.map(r => 
      r.receiver === selectedReceiverForHotRoute 
        ? { ...r, route: newRoute }
        : r
    ));
    setShowHotRouteMenu(false);
    setSelectedReceiverForHotRoute(null);
  };
  
  // Finish hot route adjustments and move to snap count
  const finishHotRoutes = () => {
    setGamePhase('snap-count');
  };
  
  // Handle audible decision - now includes hot route adjustments
  const handleConfirmPlay = () => {
    // Player has made all adjustments (audible + hot routes if applicable)
    // Move to snap count
    setGamePhase('snap-count');
  };
  
  // Handle switching to a different play during audible
  const handleAudible = (newPlay) => {
    setSelectedPlay(newPlay);
    
    if (newPlay.routes) {
      // Audibled to pass play - update routes
      setBaseRoutes(newPlay.routes);
      setCustomRoutes(JSON.parse(JSON.stringify(newPlay.routes)));
      setSelectedPlayType('pass');
    } else {
      // Audibled to run play
      setSelectedPlayType('run');
    }
    // Stay on same screen so they can make more adjustments or confirm
  };
  
  // Initialize run play
  const initializeRunPlay = () => {
    setShowGapSelection(true);
  };
  
  // Gap options for run plays
  const runGaps = [
    { id: 'a-left', label: 'A Gap L', x: 360, optimal: currentDefense?.optimalRun?.includes('a-left') },
    { id: 'b-left', label: 'B Gap L', x: 340, optimal: currentDefense?.optimalRun?.includes('b-left') },
    { id: 'c-left', label: 'C Gap L', x: 300, optimal: currentDefense?.optimalRun?.includes('c-left') },
    { id: 'a-right', label: 'A Gap R', x: 440, optimal: currentDefense?.optimalRun?.includes('a-right') },
    { id: 'b-right', label: 'B Gap R', x: 460, optimal: currentDefense?.optimalRun?.includes('b-right') },
    { id: 'c-right', label: 'C Gap R', x: 500, optimal: currentDefense?.optimalRun?.includes('c-right') }
  ];
  
  // Handle gap selection
  const handleGapSelect = (gap) => {
    setSelectedGap(gap);
    evaluateRun(gap);
  };
  
  // Evaluate run play
  const evaluateRun = (gap) => {
    setShowGapSelection(false);
    
    let result = {
      type: 'run',
      gap: gap.label,
      outcome: 'run',
      yards: 0,
      description: ''
    };
    
    // Check if gap is optimal for current defense
    const isOptimal = currentDefense?.optimalRun?.includes(gap.id);
    
    if (isOptimal) {
      // Good gap choice
      result.yards = Math.floor(Math.random() * 6) + 5; // 5-10 yards
      result.description = `Great read! Ran through ${gap.label} for ${result.yards} yards!`;
    } else {
      // Suboptimal gap
      const stuffed = Math.random() > 0.6;
      if (stuffed) {
        result.yards = Math.floor(Math.random() * 2); // 0-1 yards
        result.description = `Stuffed at the line! Only ${result.yards} yard${result.yards === 1 ? '' : 's'}.`;
      } else {
        result.yards = Math.floor(Math.random() * 4) + 2; // 2-5 yards
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
    
    // Start RPO decision timer (2 seconds to decide)
    const interval = setInterval(() => {
      setRpoTimer(prev => {
        const newTime = prev + 100;
        if (newTime >= 2000) {
          clearInterval(interval);
          // Auto hand-off if no decision
          if (!rpoDecision) {
            handleRpoDecision('hand-off');
          }
        }
        return newTime;
      });
    }, 100);
  };
  
  // Handle RPO decision
  const handleRpoDecision = (decision) => {
    setRpoDecision(decision);
    setShowRpoDecision(false);
    setPlayActive(false);
    
    if (decision === 'hand-off') {
      // Execute as run play to optimal gap
      const optimalGap = runGaps.find(g => g.optimal);
      evaluateRun(optimalGap);
    } else {
      // Execute as pass play - initialize pass mechanics
      setTimeout(() => {
        initializePassPlay();
      }, 300);
    }
  };
  
  // Initialize pass play
  const initializePassPlay = () => {
    console.log('Initializing pass play, customRoutes:', customRoutes);
    
    // Safeguard: if customRoutes is empty, something went wrong
    if (!customRoutes || customRoutes.length === 0) {
      console.error('No custom routes available!');
      return;
    }
    
    // Determine which receiver is open based on current defense
    const openReceiverId = currentDefense?.openReceiver || 'TE';
    
    // Use custom routes from hot route adjustments
    const initialReceivers = customRoutes.map(routeConfig => {
      const receiverBasePos = {
        'WR1': { x: 200, y: 450 },
        'WR2': { x: 600, y: 450 },
        'TE': { x: 520, y: 445 },
        'RB': { x: 400, y: 500 }
      }[routeConfig.receiver];
      
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
    
    // Keep defense in their coverage positions (simplified - they don't move much)
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
  
  // Animate the pass play
  React.useEffect(() => {
    if (!playActive || selectedPlayType !== 'pass') return;
    
    const interval = setInterval(() => {
      setPlayTimer(prev => {
        const newTime = prev + 100; // Increment by 100ms
        
        // Update pressure (increases over time)
        setPassRushPressure(Math.min(100, (newTime / 5000) * 100)); // Max pressure at 5 seconds
        
        // Animate receivers toward their targets
        setReceiverPositions(prev => prev.map(receiver => ({
          ...receiver,
          x: receiver.x + (receiver.targetX - receiver.x) * 0.05,
          y: receiver.y + (receiver.targetY - receiver.y) * 0.05
        })));
        
        // Animate defenders
        setDefenderPositions(prev => prev.map(defender => ({
          ...defender,
          x: defender.x + (defender.targetX - defender.x) * 0.03,
          y: defender.y + (defender.targetY - defender.y) * 0.03
        })));
        
        // Sack after 5 seconds
        if (newTime >= 5000) {
          handleSack();
          return newTime;
        }
        
        return newTime;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [playActive, selectedPlayType]);
  
  // Handle receiver click
  const handleReceiverClick = (receiver) => {
    if (!playActive || showPlayResult) return;
    setSelectedReceiver(receiver);
    evaluatePass(receiver);
  };
  
  // Handle scramble
  React.useEffect(() => {
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
  }, [playActive, showPlayResult]);
  
  // Evaluate pass
  const evaluatePass = (receiver) => {
    setPlayActive(false);
    
    const timing = playTimer / 1000; // Convert to seconds
    let result = {
      type: 'pass',
      receiver: receiver.label,
      outcome: '',
      yards: 0,
      description: ''
    };
    
    if (receiver.open) {
      // Good throw to open receiver
      result.outcome = 'completion';
      result.yards = Math.floor(Math.random() * 8) + 7; // 7-15 yards
      result.description = `Complete to ${receiver.label} for ${result.yards} yards!`;
    } else {
      // Throwing into coverage
      if (timing < 2) {
        // Threw too early, receiver not open yet
        result.outcome = 'incompletion';
        result.yards = 0;
        result.description = `Threw too early! ${receiver.label} wasn't ready.`;
      } else {
        // Decent chance of completion but risky
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
  
  // Evaluate scramble
  const evaluateScramble = () => {
    setPlayActive(false);
    
    const result = {
      type: 'scramble',
      outcome: 'run',
      yards: Math.floor(Math.random() * 6) + 3, // 3-8 yards
      description: ''
    };
    
    result.description = `Scrambled for ${result.yards} yards!`;
    
    setPlayResult(result);
    setShowPlayResult(true);
    processPlayResult(result);
  };
  
  // Handle sack
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
  
  // Process play result and update drive state
  const processPlayResult = (result) => {
    const yards = result.yards;
    const newFieldPosition = Math.min(100, Math.max(0, fieldPosition + yards));
    
    setFieldPosition(newFieldPosition);
    setTotalYards(totalYards + yards);
    setPlaysRun(playsRun + 1);
    
    // Check for touchdown
    if (newFieldPosition >= 100) {
      setTouchdownScored(true);
      setDriveOver(true);
      setDriveResult('touchdown');
      return;
    }
    
    // Check for turnover (interception or fumble)
    if (result.outcome === 'interception') {
      setDriveOver(true);
      setDriveResult('turnover');
      return;
    }
    
    // Update downs and distance
    const yardsGained = yards;
    const newDistance = distance - yardsGained;
    
    if (newDistance <= 0) {
      // First down!
      setDown(1);
      setDistance(10);
      setFirstDownMarker(Math.min(100, newFieldPosition + 10));
    } else {
      // Next down
      const nextDown = down + 1;
      if (nextDown > 4) {
        // Turnover on downs
        setDriveOver(true);
        setDriveResult('turnover-on-downs');
      } else {
        setDown(nextDown);
        setDistance(newDistance);
      }
    }
  };
  
  // Continue to next play
  const continueToNextPlay = () => {
    // Reset play-specific state
    setSelectedPlay(null);
    setBaseRoutes([]);
    setCustomRoutes([]);
    setSelectedReceiverForHotRoute(null);
    setShowHotRouteMenu(false);
    setCoverageAnswer(null);
    setMikeIdentified(null);
    setSpyIdentified(null);
    setIdentificationComplete(false);
    setShowFeedback(false);
    setSnapCountActive(false);
    setCurrentCadence(0);
    setCadenceTiming([]);
    setSnapResult(null);
    setShowSnapFeedback(false);
    setSelectedPlayType(null);
    setShowPlayHints(false);
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
    
    // Select new defensive formation
    selectRandomDefense();
    
    // Reset to play selection (new flow starts with choosing play)
    setGamePhase('play-select');
  };
  
  // Start new drive
  const startNewDrive = () => {
    setFieldPosition(25);
    setDown(1);
    setDistance(10);
    setFirstDownMarker(35);
    setPlaysRun(0);
    setTotalYards(0);
    setTouchdownScored(false);
    setDriveOver(false);
    setDriveResult(null);
    continueToNextPlay();
  };
  
  // Gruden quote generator
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

  // Play type options
  const playTypes = [
    {
      id: 'pass',
      label: 'PASS',
      description: 'Drop back and find your receiver',
      icon: '🎯',
      hint: acedCoverageID && currentDefense ? `${currentDefense.name} - ${currentDefense.openReceiver} should be open` : null
    },
    {
      id: 'run',
      label: 'RUN',
      description: 'Hand it off and hit the gap',
      icon: '🏃',
      hint: acedCoverageID && currentDefense ? `${currentDefense.name} - ${currentDefense.optimalRun.join(' or ')} are best` : null
    },
    {
      id: 'rpo',
      label: 'RPO',
      description: 'Read the defender and decide',
      icon: '⚡',
      hint: acedCoverageID && currentDefense ? `Perfect for ${currentDefense.name} - read and react` : null
    }
  ];
  
  // Field dimensions (scaled for display)
  const FIELD_WIDTH = 800;
  const FIELD_HEIGHT = 600;
  const YARD_HEIGHT = FIELD_HEIGHT / 120; // 120 yards total (100 + 2 endzones)
  
  // Sample formation - offense at the 25 yard line
  const offensePlayers = [
    // Offensive Line
    { id: 'C', x: 400, y: 450, role: 'C', color: '#FF6B35' },
    { id: 'LG', x: 360, y: 450, role: 'LG', color: '#FF6B35' },
    { id: 'RG', x: 440, y: 450, role: 'RG', color: '#FF6B35' },
    { id: 'LT', x: 320, y: 450, role: 'LT', color: '#FF6B35' },
    { id: 'RT', x: 480, y: 450, role: 'RT', color: '#FF6B35' },
    // QB
    { id: 'QB', x: 400, y: 480, role: 'QB', color: '#FFC045', isQB: true },
    // Receivers
    { id: 'WR1', x: 200, y: 450, role: 'WR', color: '#FF6B35' },
    { id: 'WR2', x: 600, y: 450, role: 'WR', color: '#FF6B35' },
    { id: 'TE', x: 520, y: 445, role: 'TE', color: '#FF6B35' },
    // RB
    { id: 'RB', x: 400, y: 500, role: 'RB', color: '#FF6B35' },
  ];
  
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
      <div style={{
        marginBottom: '30px',
        textAlign: 'center',
        zIndex: 1
      }}>
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

      {/* Game Info Bar */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255,107,53,0.3)',
        borderRadius: '12px',
        padding: '16px 32px',
        marginBottom: '24px',
        display: 'flex',
        gap: '40px',
        zIndex: 1
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#9BA4B5', marginBottom: '4px', letterSpacing: '1px' }}>DOWN</div>
          <div style={{ fontSize: '28px', color: '#FF6B35', fontWeight: 'bold' }}>
            {down === 1 ? '1st' : down === 2 ? '2nd' : down === 3 ? '3rd' : '4th'} & {distance}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#9BA4B5', marginBottom: '4px', letterSpacing: '1px' }}>FIELD POSITION</div>
          <div style={{ fontSize: '28px', color: '#FFC045', fontWeight: 'bold' }}>
            {fieldPosition < 50 ? `OWN ${fieldPosition}` : fieldPosition === 50 ? '50' : `OPP ${100 - fieldPosition}`}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#9BA4B5', marginBottom: '4px', letterSpacing: '1px' }}>PLAYS</div>
          <div style={{ fontSize: '28px', color: '#4ECDC4', fontWeight: 'bold' }}>{playsRun}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#9BA4B5', marginBottom: '4px', letterSpacing: '1px' }}>YARDS</div>
          <div style={{ fontSize: '28px', color: '#4ECDC4', fontWeight: 'bold' }}>{totalYards}</div>
        </div>
      </div>

      {/* Football Field */}
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
          const y = (100 - yardLine + 10) * YARD_HEIGHT; // Start from bottom (offense side)
          
          return (
            <div key={i}>
              {/* Yard line */}
              <div style={{
                position: 'absolute',
                top: `${y}px`,
                left: 0,
                right: 0,
                height: '2px',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
              }} />
              {/* Yard number */}
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
        
        {/* Route Visualization - Show during audible phase for pass plays */}
        {(gamePhase === 'audible' || gamePhase === 'see-defense') && selectedPlayType === 'pass' && customRoutes.length > 0 && (
          <>
            {customRoutes.map(route => {
              const receiverBasePos = {
                'WR1': { x: 200, y: 450 },
                'WR2': { x: 600, y: 450 },
                'TE': { x: 520, y: 445 },
                'RB': { x: 400, y: 500 }
              }[route.receiver];
              
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
                if (isWaitingForMike) handleMikeClick(player.id);
                if (isWaitingForSpy) handleSpyClick(player.id);
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
              onClick={() => handleReceiverClick(receiver)}
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
          /* Hot Route Adjustment Phase during audible - Show receivers with route indicators */
          customRoutes.map(route => {
            const receiverBasePos = {
              'WR1': { x: 200, y: 450 },
              'WR2': { x: 600, y: 450 },
              'TE': { x: 520, y: 445 },
              'RB': { x: 400, y: 500 }
            }[route.receiver];
            
            return (
              <div
                key={route.receiver}
                onClick={() => handleHotRoute(route.receiver)}
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
        )))}

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
        ) : (
          /* Static defensive formation - already rendered above */
          null
        )}
      </div>

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

      {/* Coverage Identification Panel */}
      {gamePhase === 'pre-snap' && !identificationComplete && (
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
                    onClick={() => handleCoverageSelect(option.label)}
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
                onClick={checkIdentificationComplete}
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
      )}

      {/* Play Selection - Choose Your Play */}
      {gamePhase === 'play-select' && (
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
            margin: '0 0 12px 0',
            fontWeight: 'bold',
            letterSpacing: '2px',
            textAlign: 'center'
          }}>
            CALL YOUR PLAY
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#9BA4B5',
            marginBottom: '32px',
            textAlign: 'center',
            fontFamily: '"Courier New", monospace'
          }}>
            Choose your play - you'll adjust routes next
          </p>
          
          {/* Pass Plays */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontSize: '18px',
              color: '#FFC045',
              fontWeight: 'bold',
              marginBottom: '16px',
              letterSpacing: '1px'
            }}>
              PASS PLAYS
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px'
            }}>
              {basePlays.pass.map(play => (
                <button
                  key={play.id}
                  onClick={() => handlePlaySelect(play)}
                  style={{
                    background: 'rgba(255,107,53,0.1)',
                    border: '2px solid rgba(255,107,53,0.5)',
                    borderRadius: '8px',
                    padding: '20px 16px',
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
                    fontSize: '20px',
                    color: '#FFC045',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    letterSpacing: '1px'
                  }}>
                    {play.name}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#9BA4B5',
                    fontFamily: '"Courier New", monospace'
                  }}>
                    {play.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Run Plays */}
          <div>
            <div style={{
              fontSize: '18px',
              color: '#FFC045',
              fontWeight: 'bold',
              marginBottom: '16px',
              letterSpacing: '1px'
            }}>
              RUN PLAYS
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px'
            }}>
              {basePlays.run.map(play => (
                <button
                  key={play.id}
                  onClick={() => handlePlaySelect(play)}
                  style={{
                    background: 'rgba(255,107,53,0.1)',
                    border: '2px solid rgba(255,107,53,0.5)',
                    borderRadius: '8px',
                    padding: '20px 16px',
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
                    fontSize: '20px',
                    color: '#FFC045',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    letterSpacing: '1px'
                  }}>
                    {play.name}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#9BA4B5',
                    fontFamily: '"Courier New", monospace'
                  }}>
                    {play.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* See Defense Phase */}
      {gamePhase === 'see-defense' && (
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
            THEY'RE IN {currentDefense?.name?.toUpperCase()}
          </h2>
          
          <p style={{
            fontSize: '18px',
            color: '#9BA4B5',
            marginBottom: '24px',
            fontFamily: '"Courier New", monospace'
          }}>
            Play Called: <span style={{ color: '#FFC045', fontWeight: 'bold' }}>{selectedPlay?.name}</span>
          </p>
          
          <p style={{
            fontSize: '16px',
            color: '#9BA4B5',
            marginBottom: '32px',
            fontFamily: '"Courier New", monospace'
          }}>
            Look at the defense on the field. Ready to identify coverage?
          </p>
          
          <button
            onClick={() => setGamePhase('pre-snap')}
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
            READ THE DEFENSE
          </button>
        </div>
      )}

      {/* Audible + Hot Routes Combined Phase */}
      {gamePhase === 'audible' && (
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
                    onClick={() => handleHotRoute(route.receiver)}
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
          <div style={{
            marginBottom: '24px'
          }}>
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
              {/* Show audible options */}
              {(selectedPlayType === 'pass' 
                ? basePlays.pass.filter(p => p.id !== selectedPlay?.id).slice(0, 2)
                : basePlays.run.filter(p => p.id !== selectedPlay?.id).slice(0, 2)
              ).map(play => (
                <button
                  key={play.id}
                  onClick={() => handleAudible(play)}
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
              
              {/* Option to switch between pass/run */}
              {selectedPlayType === 'pass' && (
                <button
                  onClick={() => handleAudible(basePlays.run[0])}
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
                  onClick={() => handleAudible(basePlays.pass[0])}
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
                    onClick={() => applyHotRoute(routeKey)}
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
                    <div style={{
                      fontSize: '32px'
                    }}>
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
                onClick={() => {
                  setShowHotRouteMenu(false);
                  setSelectedReceiverForHotRoute(null);
                }}
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
            onClick={handleConfirmPlay}
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
      )}

      {/* Snap Count Rhythm Game */}
      {gamePhase === 'snap-count' && (
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
          {!showSnapFeedback ? (
            <>
              <h2 style={{
                fontSize: '32px',
                color: '#FFC045',
                margin: '0 0 20px 0',
                fontWeight: 'bold',
                letterSpacing: '2px'
              }}>
                SNAP COUNT
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#9BA4B5',
                marginBottom: '40px',
                fontFamily: '"Courier New", monospace'
              }}>
                Press the correct key for each cadence call!
              </p>
              
              {/* Cadence Display */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '24px',
                marginBottom: '40px'
              }}>
                {cadenceSequence.map((cadence, index) => {
                  const isActive = currentCadence === index + 1;
                  const isPast = currentCadence > index + 1;
                  const userPressed = cadenceTiming[index];
                  const isCorrect = userPressed?.expected === userPressed?.pressed;
                  
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      {/* Cadence Word */}
                      <div style={{
                        fontSize: '48px',
                        fontWeight: 'bold',
                        color: isActive ? '#FFC045' : isPast ? (isCorrect ? '#4ECDC4' : '#FF6B35') : '#4a5568',
                        textShadow: isActive ? '0 0 30px rgba(255,192,69,0.8)' : 'none',
                        transition: 'all 0.2s ease',
                        transform: isActive ? 'scale(1.2)' : 'scale(1)',
                        letterSpacing: '2px'
                      }}>
                        {cadence.word}
                      </div>
                      
                      {/* Key Indicator */}
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '8px',
                        background: isActive 
                          ? 'linear-gradient(135deg, #FF6B35 0%, #FFC045 100%)'
                          : isPast
                          ? isCorrect ? '#4ECDC4' : '#FF6B35'
                          : 'rgba(255,255,255,0.1)',
                        border: isActive ? '3px solid #fff' : '2px solid rgba(255,255,255,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: '#fff',
                        boxShadow: isActive 
                          ? '0 0 30px rgba(255,192,69,0.8)'
                          : isPast && isCorrect
                          ? '0 0 20px rgba(78,205,196,0.6)'
                          : 'none',
                        animation: isActive ? 'keyPulse 0.8s ease-in-out infinite' : 'none',
                        fontFamily: '"Courier New", monospace'
                      }}>
                        {cadence.key.toUpperCase()}
                      </div>
                      
                      {/* Result Indicator */}
                      {isPast && (
                        <div style={{
                          fontSize: '24px',
                          animation: 'fadeIn 0.3s ease-in'
                        }}>
                          {isCorrect ? '✓' : '✗'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Instructions */}
              <div style={{
                padding: '16px',
                background: 'rgba(255,192,69,0.1)',
                border: '1px solid rgba(255,192,69,0.3)',
                borderRadius: '6px',
                fontSize: '18px',
                color: '#FFC045',
                fontFamily: '"Courier New", monospace',
                letterSpacing: '1px'
              }}>
                Press D → S → H → H in rhythm with the calls
              </div>
            </>
          ) : (
            /* Snap Feedback */
            <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: snapResult === 'perfect' ? '#4ECDC4' : 
                       snapResult === 'good' ? '#FFC045' : '#FF6B35'
              }}>
                {snapResult === 'perfect' && '🔥 PERFECT SNAP! 🔥'}
                {snapResult === 'good' && '✓ CLEAN SNAP'}
                {snapResult === 'false-start' && '⚠️ FALSE START!'}
                {snapResult === 'delay' && '⚠️ DELAY OF GAME!'}
              </div>
              <div style={{
                fontSize: '18px',
                color: '#9BA4B5',
                fontFamily: '"Courier New", monospace'
              }}>
                {snapResult === 'perfect' && 'Flawless timing and execution!'}
                {snapResult === 'good' && 'Good enough to get the play off.'}
                {snapResult === 'false-start' && '5 yard penalty. Wrong key pressed.'}
                {snapResult === 'delay' && "Didn't get the snap off in time!"}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Play Execution - Pass Play */}
      {gamePhase === 'play-action' && selectedPlayType === 'pass' && !showPlayResult && (
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

      {/* Play Execution - Run Play */}
      {gamePhase === 'play-action' && selectedPlayType === 'run' && showGapSelection && (
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
                onClick={() => handleGapSelect(gap)}
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
                onClick={() => handleGapSelect(gap)}
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

      {/* Play Execution - RPO Decision */}
      {gamePhase === 'play-action' && selectedPlayType === 'rpo' && showRpoDecision && (
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
              onClick={() => handleRpoDecision('hand-off')}
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
              onClick={() => handleRpoDecision('pull')}
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

      {/* Play Result */}
      {showPlayResult && (
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
            onClick={() => {
              if (driveOver) {
                startNewDrive();
              } else {
                continueToNextPlay();
              }
            }}
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
      )}

      {/* Temporary controls for testing */}
      <div style={{
        marginTop: '20px',
        color: '#9BA4B5',
        fontSize: '14px',
        fontFamily: 'monospace',
        zIndex: 1
      }}>
        Current Phase: {gamePhase} | Defense: {currentDefense?.name || 'Loading...'}
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 15px rgba(255,192,69,0.6), 0 4px 8px rgba(0,0,0,0.4); }
          50% { box-shadow: 0 0 30px rgba(255,192,69,0.9), 0 4px 8px rgba(0,0,0,0.4); }
        }
        @keyframes keyPulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 30px rgba(255,192,69,0.8);
          }
          50% { 
            transform: scale(1.1);
            box-shadow: 0 0 50px rgba(255,192,69,1);
          }
        }
        @keyframes receiverPulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(78,205,196,0.9), 0 4px 8px rgba(0,0,0,0.4);
          }
          50% { 
            box-shadow: 0 0 35px rgba(78,205,196,1), 0 4px 8px rgba(0,0,0,0.4);
          }
        }
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      `}</style>
    </div>
  );
};

export default GrudenChallenge;