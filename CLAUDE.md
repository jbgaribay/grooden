# CLAUDE.md — Grooden (Gruden Challenge)

This file provides guidance for AI assistants working in this repository.

---

## Project Overview

**Grooden** is a browser-based NFL quarterback training simulator called the "Gruden Challenge." It is a single-page, client-side React application where users practice:

- Reading pre-snap defensive formations and coverages
- Identifying the Mike linebacker and spy player
- Making audible and hot route adjustments
- Executing snap counts
- Selecting the right receiver or run gap under simulated time pressure
- Making RPO (Run-Pass Option) decisions

There is no backend, no API, no routing, and no external data source. All game logic runs in the browser.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (functional components + hooks) |
| Build tool | Create React App (react-scripts 5) |
| Language | JavaScript (ES6+), no TypeScript |
| Styling | Inline CSS-in-JS style objects |
| Testing | Jest + @testing-library/react |
| Package manager | npm |

---

## Repository Structure

```
grooden/
├── public/             # Static assets (index.html, icons, manifest)
├── src/
│   ├── App.js          # Entire application (~3,000 lines)
│   ├── App.css         # Minimal global CSS
│   ├── App.test.js     # Single smoke test
│   ├── index.js        # React DOM entry point
│   ├── index.css       # Base global styles
│   ├── setupTests.js   # jest-dom configuration
│   └── reportWebVitals.js
├── package.json
├── package-lock.json
└── README.md           # Default CRA readme (not project-specific)
```

The entire application lives in `src/App.js`. There are no sub-directories, component files, or utility modules.

---

## Development Commands

```bash
npm start        # Start dev server at http://localhost:3000 (hot reload)
npm test         # Run tests in watch mode
npm run build    # Production build into /build
```

Do not run `npm run eject` — it is irreversible and exposes the Webpack/Babel config.

---

## Architecture

### Single Monolithic Component

The main export from `App.js` is the `GrudenChallenge` functional component. All game state, logic, event handlers, and rendering are inside this one component. There is no Redux, Context API, or external state management.

### State Machine via `gamePhase`

The game progresses through these phases (controlled by `useState`):

```
play-select → see-defense → pre-snap → audible → snap-count → play-action → result
```

Each phase renders a different section of the UI conditionally.

### Key Data Structures

- **`defensiveFormations`** — Object map of 4 coverage types (Cover 2, Cover 3, Man, Zone Blitz)
- **`basePlays`** — Nested object with pass plays, run plays, and RPO
- **`routeDefinitions`** — Maps route names to their descriptions
- **`runGaps`** — Array of run gap options

### Animation

Pass play animation uses `setInterval` (100ms tick) to interpolate receiver and defender positions. This is managed via `useEffect` with cleanup. Play time pressure increases over a 5-second window.

---

## Coding Conventions

- **Naming:** camelCase for all variables and functions
- **Event handlers:** Prefixed with `handle` (e.g., `handleAudible`, `handleSnapCount`)
- **State setters:** React default `set` prefix (e.g., `setGamePhase`, `setDown`)
- **Visibility flags:** Prefixed with `show` (e.g., `showHotRoutes`)
- **Styling:** All styles are inline JS objects — no external CSS classes or CSS Modules
- **Conditional rendering:** Use `{condition && <JSX>}` or ternary operators
- **No TypeScript:** Pure JavaScript throughout

---

## Testing

The test suite is minimal — `App.test.js` contains a single smoke test:

```js
test('renders learn react link', ...)
```

> **Note:** This default CRA test does not match the current implementation and will likely fail. When adding new tests, write them against the actual `GrudenChallenge` component and its behavior.

Test setup (`setupTests.js`) imports `@testing-library/jest-dom` for DOM matchers like `toBeInTheDocument()`.

Run tests with:
```bash
npm test
```

---

## Styling Guidelines

The app uses a dark theme. Key colors:

| Purpose | Value |
|---|---|
| Primary accent (teal) | `#4ECDC4` |
| Action accent (orange) | `#FF6B35` |
| Highlight (yellow) | `#FFC045` |
| Background | Dark grays |

- Fonts: `Bebas Neue` for headings, `Courier New` for monospace/coaching text
- All styles are written as inline objects: `style={{ color: '#4ECDC4', padding: 12 }}`
- Do not add a CSS-in-JS library or CSS Modules — keep the existing inline style convention

---

## Making Changes

Because the app is a single 3,000+ line component:

1. **Read `src/App.js` in full** before making any changes.
2. **Understand the game phase** relevant to the area you're modifying.
3. **Preserve the existing state machine flow** — changing `setGamePhase` calls out of order will break game logic.
4. **Do not introduce new dependencies** unless absolutely necessary.
5. **Keep all logic in `App.js`** unless specifically instructed to refactor.
6. **Test in the browser** via `npm start` when changing game logic or animations.

---

## Common Pitfalls

- The `setInterval` in `useEffect` must always be cleared on cleanup to avoid memory leaks and duplicate animation frames.
- Many `useState` values are derived from each other during play execution — read all related state before modifying.
- Inline style objects are defined inside the render function; avoid extracting them in ways that cause unnecessary re-renders.
- The existing `App.test.js` smoke test references a "learn react link" that no longer exists — update the test if running CI.

---

## Git Workflow

- The main branch is `master`.
- Claude Code session work happens on branches prefixed with `claude/`.
- There is no CI/CD pipeline configured.
- Commit messages should be clear and descriptive.

---

## What This Project Does NOT Have

- No backend or API integration
- No routing (no react-router)
- No TypeScript
- No state management library (Redux, Zustand, Jotai, etc.)
- No CI/CD configuration
- No Docker
- No environment variables (no `.env` files needed)
- No CSS preprocessor (Sass, Less)
- No component library (MUI, Chakra, etc.)
