import type { GameControlsProps } from '../types'
import styles from './styles/Controls.module.css'

/**
 * Game control buttons component following Single Responsibility Principle
 */
export function GameControls({ 
  onAddPlayer, 
  onRemovePlayer, 
  onResetGame, 
  canRemovePlayer,
  onToggleHideTotals,
  hideTotals,
  showPlayerButtons = true
}: GameControlsProps) {
  return (
    <div className={styles.headerControls}>
      {showPlayerButtons && (
        <>
          <button className={styles.addPlayerButton} onClick={onAddPlayer}>
            + Player
          </button>
          <button 
            className={styles.removePlayerButtonHeader}
            onClick={onRemovePlayer}
            disabled={!canRemovePlayer}
          >
            - Player
          </button>
        </>
      )}
      <button 
        className={`${styles.toggleTotalsButton} ${hideTotals ? styles.toggleTotalsButtonHidden : ''}`}
        onClick={onToggleHideTotals}
        title={hideTotals ? 'Show totals' : 'Hide totals'}
      >
        {hideTotals ? '👁️ Show' : '🙈 Hide'}
      </button>
      <button className={styles.resetButton} onClick={onResetGame}>
        New Game
      </button>
    </div>
  )
}