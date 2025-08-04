import type { GameControlsProps } from '../types'

/**
 * Game control buttons component following Single Responsibility Principle
 */
export function GameControls({ 
  onAddPlayer, 
  onRemovePlayer, 
  onResetGame, 
  canRemovePlayer,
  onToggleHideTotals,
  hideTotals
}: GameControlsProps) {
  return (
    <div className="header-controls">
      <button className="add-player-button" onClick={onAddPlayer}>
        + Player
      </button>
      <button 
        className="remove-player-button-header" 
        onClick={onRemovePlayer}
        disabled={!canRemovePlayer}
      >
        - Player
      </button>
      <button 
        className={`toggle-totals-button ${hideTotals ? 'hidden' : 'visible'}`}
        onClick={onToggleHideTotals}
        title={hideTotals ? 'Show totals' : 'Hide totals'}
      >
        {hideTotals ? '👁️ Show' : '🙈 Hide'}
      </button>
      <button className="reset-button" onClick={onResetGame}>
        New Game
      </button>
    </div>
  )
}