import { useState } from 'react'
import './App.css'
import sheetData from './assets/sheet-reference.json'
import type { GameData } from './types'
import { GameControls, ScoreSection, PlayerNameHeader } from './components'
import { usePlayerManagement } from './hooks/usePlayerManagement'
import { useScoreCalculations } from './hooks/useScoreCalculations'
import { useSynchronizedScroll } from './hooks/useSynchronizedScroll'
import { useDynamicGrid } from './hooks/useDynamicGrid'

// Type assertion for sheet data
const gameData = sheetData as GameData

/**
 * Main App component - now focused only on composition and coordination
 * Follows Single Responsibility Principle by delegating specific concerns to hooks and components
 */
function App() {
  // Local state for UI preferences - default to hiding totals for suspense
  const [hideTotals, setHideTotals] = useState(true)

  // Custom hooks handle specific concerns
  const {
    players,
    addPlayer,
    removeLatestPlayer,
    updatePlayerName,
    updateScore,
    resetGame,
    canRemovePlayer
  } = usePlayerManagement()

  const {
    calculateUpperTotal,
    calculateBonus,
    calculateLowerTotal,
    calculateGrandTotal
  } = useScoreCalculations()

  const { playerHeaderRef, upperTableRef, lowerTableRef } = useSynchronizedScroll()
  
  // Update CSS grid columns based on player count
  useDynamicGrid(players.length)

  const toggleHideTotals = () => {
    setHideTotals(prev => !prev)
  }

  return (
    <div className="yatzy-sheet">
      <header className="sheet-header">
        <h1>{gameData.title}</h1>
        <GameControls
          onAddPlayer={addPlayer}
          onRemovePlayer={removeLatestPlayer}
          onResetGame={resetGame}
          canRemovePlayer={canRemovePlayer}
          onToggleHideTotals={toggleHideTotals}
          hideTotals={hideTotals}
        />
      </header>

      <div className="sticky-player-header" ref={playerHeaderRef}>
        <PlayerNameHeader 
          players={players} 
          onPlayerNameChange={updatePlayerName} 
        />
      </div>

      <div className="sheet-sections">
        <ScoreSection
          title="Upper Section"
          entries={gameData.upper_section}
          players={players}
          onScoreChange={updateScore}
          calculateUpperTotal={calculateUpperTotal}
          calculateBonus={calculateBonus}
          calculateLowerTotal={calculateLowerTotal}
          calculateGrandTotal={calculateGrandTotal}
          tableRef={upperTableRef as React.RefObject<HTMLDivElement>}
          hideTotals={hideTotals}
        />

        <ScoreSection
          title="Lower Section"
          entries={gameData.lower_section}
          players={players}
          onScoreChange={updateScore}
          calculateUpperTotal={calculateUpperTotal}
          calculateBonus={calculateBonus}
          calculateLowerTotal={calculateLowerTotal}
          calculateGrandTotal={calculateGrandTotal}
          tableRef={lowerTableRef as React.RefObject<HTMLDivElement>}
          hideTotals={hideTotals}
        />
      </div>
    </div>
  )
}

export default App
