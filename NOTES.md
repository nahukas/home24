# home24 Frontend Tech Task – Technical Summary

## 1. Migrated from CRA to Vite

- Replaced CRA with Vite for faster dev server, HMR, and smaller production builds.
- Updated `package.json` scripts (`yarn start`, `yarn build`) accordingly.

## 2. API Fetching Refactored into Custom Hook

- Created `useProductData`.
- Centralized GraphQL fetching logic, added loading/error handling.
- Typed response data with TypeScript.

## 3. Added Unit Tests with Jest

- Configured Jest with TypeScript and React Testing Library.
- Wrote tests for components context, and hooks.
- Ensured test compatibility with `yarn test`.

## 4. Styling with Emotion and styled-system

- Migrated styles to Emotion styled components.
- Used `styled-system` for theme-based spacing, colors, and responsiveness.
- Centralized theme config for consistency.

## 5. Additional Work

- Implemented Playwright E2E setup (separate scripts for unit/e2e).
- Added Basic cart functionality.

## Other Improvements

- TypeScript interfaces added for API and props.
- Modularized folder structure (`components/`, `hooks/`, etc.).
- Improved accessibility with ARIA and keyboard support.
- Implemented ESLint/Prettier for code quality.
