import type { Player } from '../types'
import { PlayerNameInput } from './PlayerNameInput'

interface PlayerNameHeaderProps {
  players: Player[]
  onPlayerNameChange: (playerId: string, name: string) => void
}

/**
 * Player names header component
 */
export function PlayerNameHeader({ players, onPlayerNameChange }: PlayerNameHeaderProps) {
  return (
    <div className="player-names-row">
      <div className="category-cell sticky-category">
        <div className="category-header">Category</div>
      </div>
      {players.map((player) => (
        <div key={player.id} className="score-cell">
          <PlayerNameInput
            value={player.name}
            onChange={(name) => onPlayerNameChange(player.id, name)}
          />
        </div>
      ))}
    </div>
  )
}