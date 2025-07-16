# home24 Frontend Tech Task

## Demo

![Demo of Refactored Product Listing Page](./assets/video.gif)

## Overview

Welcome to the home24 frontend tech task! This project is a simple product listing application built with a client-server architecture. The client is a React application written in TypeScript, utilizing Emotion.js and styled-system for styling, and it communicates with a GraphQL server. Your task is to refactor and improve the client-side code to create a polished, production-ready product listing page.

The application consists of two main parts:

- **Server**: A Node.js/Express server that proxies GraphQL requests to a public production GraphQL endpoint with a 5-minute cache.
- **Client**: A React application (created with Vite) that renders a product listing page displaying 50 products from a specific category.

This README provides instructions for setting up, running, and testing the project.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher recommended)
- **Yarn** (package manager)
- **Git** (to clone the repository)
- A modern web browser (e.g., Chrome, Firefox, Safari)

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/nahukas/home24.git
cd home24
```

### 2. Server Setup

The server is a Node.js/Express application that proxies GraphQL requests.

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

3. Start the server:

   ```bash
   yarn start
   ```

   The server will run on `http://localhost:3001` and proxy GraphQL requests to the public endpoint.

### 3. Client Setup

The client is a React application built with Vite, TypeScript, Emotion.js, and styled-system.

1. Navigate to the client directory:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

   The client will run on `http://localhost:5173` (default Vite port) and automatically open in your default browser. The client is configured to proxy API requests to `http://localhost:3001`.

### 4. Running Tests

The project includes unit tests (Jest) and end-to-end (E2E) tests (Playwright) to ensure code quality.

#### Unit Tests (Jest)

To run unit tests:

```bash
cd client
yarn test
```

To run unit tests with coverage:

```bash
yarn test:coverage
```

- Tests are configured in `jest.config.js`.
- The test suite uses `@testing-library/react` for React component testing and `jest-environment-jsdom` for a browser-like environment.
- Coverage reports will be generated in the `coverage/` directory.

#### End-to-End Tests (Playwright)

To run E2E tests:

```bash
cd client
yarn test:e2e
```

- Playwright tests are configured to run against the application in a real browser environment.
- Ensure the server (`yarn start` in the `server` directory) and client (`yarn dev` in the `client` directory) are running before executing E2E tests.
- Test files are typically located in the `tests/` directory (or as specified in the Playwright configuration).

### 5. Building for Production

To build the client for production:

```bash
cd client
yarn build
```

The optimized build will be generated in the `dist/` directory.

To preview the production build locally:

```bash
yarn preview
```

### Project Structure

- **server/**: Contains the Node.js/Express server that proxies GraphQL requests.
- **client/**: Contains the React application.
  - `src/`: Source code for the React application, including components, styles, and GraphQL queries.
  - `tests/`: Unit and E2E test files (if applicable).
  - `package.json`: Client dependencies and scripts.
  - `jest.config.js`: Jest configuration for unit tests.
  - `playwright.config.ts`: Playwright configuration for E2E tests.

### Technologies Used

The project leverages the following technologies:

- **React**: Frontend library with Hooks for building the UI.
- **TypeScript**: Static typing for improved code reliability.
- **Emotion.js**: CSS-in-JS for styling components.
- **styled-system**: Utility for consistent styling with design tokens.
- **Jest**: Unit testing framework.
- **Playwright**: End-to-end testing framework.
- **Vite**: Build tool for fast development and production builds.
