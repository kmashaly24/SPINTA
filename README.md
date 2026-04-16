# Spinta - Football Analytics Mobile App

A comprehensive React Native mobile application for football/soccer analytics, designed for coaches and players to track performance, analyze matches, and manage training sessions.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [Development](#development)
- [Testing](#testing)
- [Recent Updates](#recent-updates)

---

## Overview

Spinta is a mobile-first football analytics platform that provides:

- **For Coaches**: Team management, match analysis, player performance tracking, training session management
- **For Players**: Personal statistics, match history, performance insights, training tracking

The app uses mock data currently but is architected to seamlessly integrate with a real backend API.

---

## Features

### Coach Features
- 📊 **Dashboard**: Overview of club statistics, upcoming matches, and recent performance
- 👥 **Player Management**: View and manage squad, track player statistics
- ⚽ **Match Analysis**: Detailed match statistics, comparisons, and insights
- 📝 **Training Sessions**: Create and manage training sessions
- 📈 **Performance Tracking**: Track team and individual player metrics

### Player Features
- 📊 **Personal Dashboard**: Individual performance statistics and insights
- ⚽ **Match History**: View past matches and personal performance
- 📈 **Statistics**: Detailed personal statistics and trends
- 🎯 **Training**: View assigned training sessions

### Shared Features
- 🔐 **Authentication**: Secure login and registration with role-based access (Coach/Player)
- 🎨 **Modern UI**: Clean, intuitive interface with gradient accents
- 📱 **Native Feel**: Bottom navigation, smooth animations, and native components
- 🌙 **Error Recovery**: Robust error handling with ErrorBoundary

---

## Tech Stack

### Core
- **React Native** (via Expo) - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **Expo Router v4** - File-based routing and navigation

### State Management
- **Zustand** - Lightweight client state management (auth)
- **React Query (@tanstack/react-query)** - Server state management and caching

### UI/UX
- **Expo Linear Gradient** - Gradient backgrounds and accents
- **React Native SVG** - Vector graphics for icons and visualizations
- **React Native Gesture Handler** - Native gesture handling

### Data & Storage
- **AsyncStorage** - Persistent local storage
- **Mock Data** - Comprehensive mock data for development (see `/data/mockData.ts`)

### Development
- **Jest** - Testing framework
- **React Native Testing Library** - Component testing
- **TypeScript Compiler** - Type checking

---

## Project Structure

```
spinta_final_foda/
├── app/                          # Main application code
│   ├── (auth)/                   # Authentication screens
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (coach)/                  # Coach-specific screens
│   │   ├── _layout.tsx
│   │   ├── dashboard.tsx
│   │   ├── players.tsx
│   │   ├── matches.tsx
│   │   ├── training.tsx
│   │   ├── profile.tsx
│   │   ├── edit-profile.tsx
│   │   ├── player/
│   │   │   └── [playerId].tsx   # Player detail screen
│   │   └── match/
│   │       ├── [id].tsx         # Match detail screen
│   │       └── player/
│   │           └── [playerId].tsx
│   ├── (player)/                 # Player-specific screens
│   │   ├── _layout.tsx
│   │   ├── dashboard.tsx
│   │   ├── matches.tsx
│   │   ├── profile.tsx
│   │   ├── edit-profile.tsx
│   │   └── match/
│   │       └── [id].tsx
│   ├── api/                      # API layer (currently mock)
│   │   ├── auth.ts
│   │   ├── players.ts
│   │   ├── matches.ts
│   │   ├── club.ts
│   │   └── client.ts
│   ├── components/               # Reusable components
│   │   ├── ui/                   # Basic UI components
│   │   │   ├── Button.tsx
│   │   │   ├── DataCard.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── GradientSectionHeader.tsx
│   │   ├── visualizations/       # Data visualization components
│   │   │   ├── ComparisonStatBar.tsx
│   │   │   └── TeamFormationPitch.tsx
│   │   ├── ErrorBoundary.tsx     # Error boundary for crash recovery
│   │   ├── BottomNavigation.tsx
│   │   ├── MatchListItem.tsx
│   │   └── PlayerListItem.tsx
│   ├── constants/                # App constants
│   │   ├── theme.ts              # Colors, typography, spacing
│   │   └── config.ts             # App configuration
│   ├── data/                     # Mock data
│   │   └── mockData.ts           # Comprehensive mock data for development
│   ├── hooks/                    # Custom React hooks
│   │   └── useAuthCheck.ts
│   ├── providers/                # Context providers
│   │   └── QueryProvider.tsx     # React Query provider
│   ├── store/                    # Client state management
│   │   └── authStore.ts          # Zustand auth store
│   ├── types/                    # TypeScript types
│   │   └── index.ts
│   ├── utils/                    # Utility functions
│   │   ├── helpers.ts            # General helpers (with validation)
│   │   ├── storage.ts            # AsyncStorage helpers
│   │   └── gradient.tsx          # Gradient utilities
│   ├── _layout.tsx               # Root layout (with ErrorBoundary)
│   └── index.tsx                 # Entry point
├── assets/                       # Static assets
│   └── images/
├── __tests__/                    # Test files
│   ├── components/
│   │   ├── Button.test.tsx
│   │   └── DataCard.test.tsx
│   ├── utils/
│   │   └── helpers.test.ts
│   └── store/
│       └── authStore.test.ts
├── node_modules/                 # Dependencies
├── .gitignore
├── app.json                      # Expo configuration
├── babel.config.js               # Babel configuration
├── jest.config.js                # Jest configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── CRITICAL_FIXES_SUMMARY.md     # Recent bug fixes summary
└── README.md                     # This file
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Expo CLI** (optional, installed automatically)
- **iOS Simulator** (Mac only) or **Android Emulator**
- **Physical device** (optional) with Expo Go app installed

### Installation

1. **Clone the repository**
   ```bash
   cd spinta_final_foda
   ```

2. **Install dependencies**
   ```bash
   cd app
   npm install
   ```

3. **Verify installation**
   ```bash
   npm run type-check
   ```

---

## Running the App

### Start Development Server

```bash
cd app
npm start
```

This will start the Expo development server and display a QR code.

### Run on iOS Simulator (Mac only)

```bash
npm run ios
```

Or press `i` in the terminal after running `npm start`.

### Run on Android Emulator

```bash
npm run android
```

Or press `a` in the terminal after running `npm start`.

### Run on Physical Device

1. Install **Expo Go** app from App Store or Google Play
2. Scan the QR code displayed in the terminal
3. The app will load on your device

---

## Available Scripts

In the `app` directory:

### Development
- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator

### Code Quality
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint (if configured)

### Testing
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

### Production
- `npm run build` - Create production build

---

## Development

### Mock Data

The app currently uses comprehensive mock data defined in `app/data/mockData.ts`. This includes:

- Mock users (coaches and players)
- Mock clubs and teams
- Mock matches with detailed statistics
- Mock player performance data
- Mock training sessions

All API calls in `app/api/*` return this mock data with simulated delays.

### Authentication

**Test Credentials** (defined in mock data):

**Coach Account**:
- Email: `coach@example.com`
- Password: `password123`

**Player Account**:
- Email: `player@example.com`
- Password: `password123`

### Adding New Features

1. **Create component** in `app/components/`
2. **Add types** in `app/types/index.ts`
3. **Add mock data** in `app/data/mockData.ts` (if needed)
4. **Create screen** in appropriate directory (`(coach)` or `(player)`)
5. **Update API layer** in `app/api/` (if needed)

### Error Handling

The app includes an `ErrorBoundary` component that catches errors and prevents app crashes:

- Displays user-friendly error UI
- Shows error details in development mode
- Provides "Try Again" button for recovery
- Logs errors for debugging

---

## Testing

### Running Tests

```bash
npm test
```

### Writing Tests

Place test files adjacent to the code they test or in `__tests__/` directory:

```
app/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
```

Example test:
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button onPress={onPress}>Click me</Button>
    );

    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

### Test Coverage

Current coverage: ~15% (4 test files)

**Target**: 70%+ coverage

See `CRITICAL_FIXES_SUMMARY.md` for testing roadmap.

---

## Recent Updates

### Critical Bug Fixes (Latest)

All critical bug fixes have been implemented:

✅ **Error Boundary** - App-wide crash recovery
✅ **Auth Error Handling** - Safe error handling in authentication
✅ **Storage Resilience** - Graceful fallback for storage failures
✅ **Input Validation** - Comprehensive validation in helper functions
✅ **Code Cleanup** - Removed unused imports

See `CRITICAL_FIXES_SUMMARY.md` for detailed information.

---
**Built with ❤️ for football analytics**
