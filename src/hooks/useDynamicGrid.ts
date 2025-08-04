import { useEffect } from 'react'
import { GAME_CONFIG } from '../constants/gameConfig'

/**
 * Custom hook for updating CSS custom properties for dynamic grid layout
 */
export function useDynamicGrid(playerCount: number) {
  useEffect(() => {
    document.documentElement.style.setProperty(
      GAME_CONFIG.CSS_PLAYER_COUNT_VAR, 
      playerCount.toString()
    )
  }, [playerCount])
}