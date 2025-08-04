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
        + Spiller
      </button>
      <button 
        className="remove-player-button-header" 
        onClick={onRemovePlayer}
        disabled={!canRemovePlayer}
      >
        - Spiller
      </button>
      <button 
        className={`toggle-totals-button ${hideTotals ? 'hidden' : 'visible'}`}
        onClick={onToggleHideTotals}
        title={hideTotals ? 'Vis totaler' : 'Skjul totaler'}
      >
        {hideTotals ? '👁️ Vis' : '🙈 Skjul'}
      </button>
      <button className="reset-button" onClick={onResetGame}>
        Ny spil
      </button>
    </div>
  )
}