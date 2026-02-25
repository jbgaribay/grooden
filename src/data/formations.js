export const defensiveFormations = {
  'Cover 2': {
    name: 'Cover 2',
    description: 'Two deep safeties, zone underneath',
    correctAnswer: 'Cover 2',
    hasSpy: true,
    spyPlayer: 'OLB1',
    mikePlayer: 'MLB',
    openReceiver: 'TE',
    optimalRun: ['b-left', 'b-right'],
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
    openReceiver: 'WR2',
    optimalRun: ['c-left', 'c-right'],
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
    openReceiver: 'RB',
    optimalRun: ['a-left', 'a-right'],
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
    openReceiver: 'WR1',
    optimalRun: ['b-left', 'b-right'],
    players: [
      { id: 'DE1', x: 300, y: 420, role: 'DE', color: '#2D3561' },
      { id: 'DT1', x: 370, y: 420, role: 'DT', color: '#2D3561' },
      { id: 'DT2', x: 430, y: 420, role: 'DT', color: '#2D3561' },
      { id: 'DE2', x: 500, y: 420, role: 'DE', color: '#2D3561' },
      { id: 'OLB1', x: 340, y: 405, role: 'OLB', color: '#2D3561', isMike: true },
      { id: 'OLB2', x: 460, y: 405, role: 'OLB', color: '#2D3561' },
      { id: 'MLB', x: 400, y: 360, role: 'MLB', color: '#2D3561' },
      { id: 'CB1', x: 200, y: 380, role: 'CB', color: '#2D3561' },
      { id: 'CB2', x: 600, y: 380, role: 'CB', color: '#2D3561' },
      { id: 'S1', x: 300, y: 320, role: 'S', color: '#2D3561' },
      { id: 'S2', x: 500, y: 320, role: 'S', color: '#2D3561' }
    ]
  }
};
