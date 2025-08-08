import type { PlayerNameInputProps } from '../types'
import { GAME_CONFIG } from '../constants/gameConfig'
import styles from './styles/Player.module.css'

/**
 * Reusable player name input component
 */
export function PlayerNameInput({ 
  value, 
  onChange, 
  maxLength = GAME_CONFIG.MAX_PLAYER_NAME_LENGTH 
}: PlayerNameInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.playerNameInput}
      maxLength={maxLength}
    />
  )
}