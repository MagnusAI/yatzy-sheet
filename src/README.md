# Yatzy Score Sheet - Refactored Architecture

## 🏗️ Architecture Overview

This Yatzy score sheet application has been refactored to follow React/TypeScript best practices and SOLID principles.

### 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── GameControls.tsx     # Header control buttons
│   ├── ScoreInput.tsx       # Score input field component
│   ├── ScoreDisplay.tsx     # Calculated score display
│   ├── PlayerNameInput.tsx  # Player name editing
│   ├── ScoreRow.tsx         # Individual score row
│   ├── PlayerNameHeader.tsx # Player names header
│   ├── ScoreSection.tsx     # Upper/Lower sections
│   └── index.ts             # Component exports
├── hooks/                # Custom React hooks
│   ├── useLocalStorage.ts   # Generic localStorage hook
│   ├── usePlayerManagement.ts # Player state management
│   ├── useScoreCalculations.ts # Score calculation logic
│   ├── useSynchronizedScroll.ts # Scroll synchronization
│   └── useDynamicGrid.ts    # Dynamic CSS grid updates
├── types/                # TypeScript type definitions
│   └── index.ts             # All shared interfaces
├── constants/            # Application constants
│   └── gameConfig.ts        # Game rules and configuration
├── assets/               # Static assets
│   └── sheet-reference.json # Game data structure
├── App.tsx              # Main application component
├── App.css              # Styling
└── main.tsx             # Application entry point
```

## 🎯 SOLID Principles Applied

### Single Responsibility Principle (SRP)
- **App.tsx**: Only handles composition and coordination
- **GameControls**: Only manages control buttons
- **ScoreInput**: Only handles score input
- **usePlayerManagement**: Only manages player state
- **useScoreCalculations**: Only handles calculations

### Open/Closed Principle (OCP)
- Components are open for extension but closed for modification
- New game types can be added by extending interfaces
- New calculation methods can be added without changing existing code

### Liskov Substitution Principle (LSP)
- All components can be replaced with implementations that follow the same interface
- Props interfaces ensure components are interchangeable

### Interface Segregation Principle (ISP)
- Small, focused interfaces (GameControlsProps, ScoreInputProps, etc.)
- Components only depend on the methods they actually use

### Dependency Inversion Principle (DIP)
- App depends on abstractions (hooks) not concrete implementations
- High-level components don't depend on low-level details

## 🔧 Custom Hooks

### usePlayerManagement
Manages all player-related state and operations:
- Adding/removing players
- Updating player names and scores
- Resetting game state
- Enforcing minimum player rules

### useScoreCalculations
Handles all score calculation logic:
- Upper section totals
- Bonus calculations
- Lower section totals
- Grand totals

### useLocalStorage
Generic hook for localStorage persistence:
- Type-safe storage operations
- Error handling
- Automatic serialization

### useSynchronizedScroll
Manages scroll synchronization between sections:
- Bi-directional scroll sync
- Performance optimization
- Event cleanup

### useDynamicGrid
Updates CSS custom properties for responsive layout:
- Player count-based grid columns
- Automatic layout updates

## 🧩 Component Architecture

### Presentational Components
Pure components that only handle rendering:
- `ScoreInput`
- `ScoreDisplay` 
- `PlayerNameInput`
- `GameControls`

### Container Components
Components that manage state and logic:
- `ScoreSection`
- `ScoreRow`

### Composite Components
Components that compose other components:
- `App` (main composition)
- `PlayerNameHeader`

## 🎮 Features

### Core Functionality
- ✅ Multi-player support (minimum 2 players)
- ✅ Automatic score calculations
- ✅ Persistent game state
- ✅ Mobile-responsive design
- ✅ Synchronized horizontal scrolling
- ✅ Touch-friendly inputs

### Extensibility Features
- 🔧 Configurable game rules via constants
- 🔧 Type-safe component interfaces
- 🔧 Modular hook system
- 🔧 Reusable component library

## 🚀 Benefits of This Architecture

### Developer Experience
- **Better Testing**: Isolated components and hooks are easier to test
- **Code Reusability**: Components can be reused across different contexts
- **Type Safety**: Comprehensive TypeScript coverage prevents runtime errors
- **Maintainability**: Clear separation of concerns makes code easier to modify

### Performance
- **Optimized Rendering**: Small components re-render only when needed
- **Efficient State Management**: Hooks prevent unnecessary state updates
- **Memory Management**: Proper cleanup in custom hooks

### Future Extensions
This architecture makes it easy to add:
- 🎯 Different game variants (5-dice Yahtzee, etc.)
- 📊 Score statistics and analytics
- 🏆 Tournament modes
- 💾 Cloud synchronization
- 🎨 Theming support
- 📱 PWA capabilities

## 🧪 Testing Strategy

The modular architecture enables comprehensive testing:

### Unit Tests
- Individual components can be tested in isolation
- Custom hooks can be tested with `@testing-library/react-hooks`
- Utility functions have no side effects

### Integration Tests
- Component interactions can be tested
- Hook combinations can be verified
- User flows can be tested end-to-end

### Example Test Structure
```typescript
// Component test
describe('ScoreInput', () => {
  it('should handle score updates correctly', () => {
    // Test isolated component behavior
  })
})

// Hook test  
describe('usePlayerManagement', () => {
  it('should enforce minimum player count', () => {
    // Test hook logic in isolation
  })
})
```

## 📈 Performance Considerations

### Rendering Optimization
- Components only re-render when their specific props change
- Calculation hooks memoize expensive operations
- Event handlers are optimized to prevent unnecessary updates

### Memory Management
- Custom hooks properly clean up event listeners
- localStorage operations are error-handled
- No memory leaks from uncontrolled state

This refactored architecture provides a solid foundation for maintaining and extending the Yatzy score sheet application while following modern React and TypeScript best practices.