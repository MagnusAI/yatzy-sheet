import type { Player } from '../types'
import { PlayerNameInput } from './PlayerNameInput'
import table from './styles/Table.module.css'
import score from './styles/Score.module.css'

interface PlayerNameHeaderProps {
  players: Player[]
  onPlayerNameChange: (playerId: string, name: string) => void
}

/**
 * Player names header component
 */
export function PlayerNameHeader({ players, onPlayerNameChange }: PlayerNameHeaderProps) {
  return (
    <div className={table.playerNamesRow}>
      <div className={score.categoryCell}>
        <div className={table.categoryHeader}/>
      </div>
      {players.map((player) => (
        <div key={player.id} className={table.scoreCell}>
          <PlayerNameInput
            value={player.name}
            onChange={(name) => onPlayerNameChange(player.id, name)}
          />
        </div>
      ))}
    </div>
  )
}