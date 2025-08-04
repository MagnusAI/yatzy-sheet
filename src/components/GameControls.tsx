import { GameControlsProps } from '../types'

/**
 * Game control buttons component following Single Responsibility Principle
 */
export function GameControls({ 
  onAddPlayer, 
  onRemovePlayer, 
  onResetGame, 
  canRemovePlayer 
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
      <button className="reset-button" onClick={onResetGame}>
        Ny spil
      </button>
    </div>
  )
}