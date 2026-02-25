export const basePlays = {
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

export const routeDefinitions = {
  go: { name: 'Go', targetY: 280, targetXOffset: 0, description: 'Straight deep', symbol: '↑' },
  slant: { name: 'Slant', targetY: 380, targetXOffset: 40, description: 'Quick inside cut', symbol: '↗' },
  out: { name: 'Out', targetY: 380, targetXOffset: -60, description: 'Break outside', symbol: '→' },
  curl: { name: 'Curl', targetY: 360, targetXOffset: 0, description: 'Come back to QB', symbol: '↩' },
  fade: { name: 'Fade', targetY: 300, targetXOffset: -40, description: 'Outside and deep', symbol: '↖' },
  cross: { name: 'Cross', targetY: 380, targetXOffset: 200, description: 'Cross the field', symbol: '↔' },
  flat: { name: 'Flat', targetY: 420, targetXOffset: -50, description: 'Shallow outside', symbol: '⇢' },
  screen: { name: 'Screen', targetY: 460, targetXOffset: -30, description: 'Behind line', symbol: '⇣' }
};
