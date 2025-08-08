import { useState } from 'react'
import styles from './App.module.css'
import sheetData from './assets/sheet-reference.json'
import type { GameData } from './types'
import { GameControls, PlayerNameHeader } from './components'
import { usePlayerManagement } from './hooks/usePlayerManagement'
import { useSynchronizedScroll } from './hooks/useSynchronizedScroll'
import { useDynamicGrid } from './hooks/useDynamicGrid'
import { YatzySections } from './pages/YatzyPage'
import { MiniGolfSection, createMiniGolfData } from './pages/MiniGolfPage'
import controls from './components/styles/Controls.module.css'

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

  const { playerHeaderRef, upperTableRef, lowerTableRef } = useSynchronizedScroll()
  const [sheetType, setSheetType] = useState<'yatzy' | 'minigolf'>('yatzy')
  const miniGolfData = createMiniGolfData(9)
  const pageTitle = sheetType === 'yatzy' ? gameData.title : miniGolfData.title
  
  // Update CSS grid columns based on player count
  useDynamicGrid(players.length)

  const toggleHideTotals = () => {
    setHideTotals(prev => !prev)
  }

  return (
    <div className={styles.yatzySheet}>
      <header className={styles.sheetHeader}>
        <h1>{pageTitle}</h1>
        <div className={controls.headerControls}>
          <button
            className={`${controls.toggleTotalsButton} ${sheetType !== 'yatzy' ? controls.toggleTotalsButtonHidden : ''}`}
            onClick={() => setSheetType('yatzy')}
          >
            Yatzy
          </button>
          <button
            className={`${controls.toggleTotalsButton} ${sheetType !== 'minigolf' ? controls.toggleTotalsButtonHidden : ''}`}
            onClick={() => setSheetType('minigolf')}
          >
            Mini Golf
          </button>
        </div>
        <GameControls
          onAddPlayer={addPlayer}
          onRemovePlayer={removeLatestPlayer}
          onResetGame={resetGame}
          canRemovePlayer={canRemovePlayer}
          onToggleHideTotals={toggleHideTotals}
          hideTotals={hideTotals}
        />
      </header>

      <div className={styles.stickyPlayerHeader} ref={playerHeaderRef}>
        <PlayerNameHeader 
          players={players} 
          onPlayerNameChange={updatePlayerName} 
        />
      </div>

      <div className={styles.sheetSections}>
        {sheetType === 'yatzy' ? (
          <YatzySections
            players={players}
            onScoreChange={(playerId, category, value) => updateScore(playerId, category, value)}
            upperTableRef={upperTableRef as React.RefObject<HTMLDivElement>}
            lowerTableRef={lowerTableRef as React.RefObject<HTMLDivElement>}
            hideTotals={hideTotals}
          />
        ) : (
          <MiniGolfSection
            data={miniGolfData}
            players={players}
            onScoreChange={(playerId, category, value) => updateScore(playerId, category, value)}
            tableRef={lowerTableRef as React.RefObject<HTMLDivElement>}
            hideTotals={hideTotals}
          />
        )}
      </div>
    </div>
  )
}

export default App
