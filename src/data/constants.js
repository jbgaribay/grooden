export const FIELD_WIDTH = 800;
export const FIELD_HEIGHT = 600;
export const YARD_HEIGHT = FIELD_HEIGHT / 120;

export const offensePlayers = [
  { id: 'C', x: 400, y: 450, role: 'C', color: '#FF6B35' },
  { id: 'LG', x: 360, y: 450, role: 'LG', color: '#FF6B35' },
  { id: 'RG', x: 440, y: 450, role: 'RG', color: '#FF6B35' },
  { id: 'LT', x: 320, y: 450, role: 'LT', color: '#FF6B35' },
  { id: 'RT', x: 480, y: 450, role: 'RT', color: '#FF6B35' },
  { id: 'QB', x: 400, y: 480, role: 'QB', color: '#FFC045', isQB: true },
  { id: 'WR1', x: 200, y: 450, role: 'WR', color: '#FF6B35' },
  { id: 'WR2', x: 600, y: 450, role: 'WR', color: '#FF6B35' },
  { id: 'TE', x: 520, y: 445, role: 'TE', color: '#FF6B35' },
  { id: 'RB', x: 400, y: 500, role: 'RB', color: '#FF6B35' },
];

export const cadenceSequence = [
  { word: 'DOWN', key: 'd', beat: 0 },
  { word: 'SET', key: 's', beat: 1000 },
  { word: 'HUT', key: 'h', beat: 2000 },
  { word: 'HUT', key: 'h', beat: 2800 }
];

export const coverageOptions = [
  { id: 'cover2', label: 'Cover 2', description: 'Two deep safeties, zone underneath' },
  { id: 'cover3', label: 'Cover 3', description: 'Three deep zones, four underneath' },
  { id: 'man', label: 'Man Coverage', description: 'Man-to-man across the board' },
  { id: 'blitz', label: 'Zone Blitz', description: 'Extra rushers, zone behind' }
];

export const receiverBasePositions = {
  'WR1': { x: 200, y: 450 },
  'WR2': { x: 600, y: 450 },
  'TE': { x: 520, y: 445 },
  'RB': { x: 400, y: 500 }
};
