import { Player } from '../types'
import { GAME_CONFIG, DEFAULT_PLAYERS } from '../constants/gameConfig'
import { useLocalStorage } from './useLocalStorage'

/**
 * Custom hook for managing players state and operations
 */
export function usePlayerManagement() {
  const [players, setPlayers] = useLocalStorage<Player[]>(
    GAME_CONFIG.STORAGE_KEY,
    DEFAULT_PLAYERS
  )

  const addPlayer = () => {
    const newId = Date.now().toString()
    const newPlayer: Player = {
      id: newId,
      name: `Spiller ${players.length + 1}`,
      scores: {}
    }
    setPlayers(prev => [...prev, newPlayer])
  }

  const removeLatestPlayer = () => {
    if (players.length > GAME_CONFIG.MIN_PLAYERS) {
      setPlayers(prev => prev.slice(0, -1))
    }
  }

  const updatePlayerName = (playerId: string, newName: string) => {
    setPlayers(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, name: newName }
        : player
    ))
  }

  const updateScore = (playerId: string, category: string, value: string) => {
    const numValue = value === '' ? null : parseInt(value)
    setPlayers(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, scores: { ...player.scores, [category]: numValue } }
        : player
    ))
  }

  const resetGame = () => {
    setPlayers(DEFAULT_PLAYERS)
  }

  const canRemovePlayer = players.length > GAME_CONFIG.MIN_PLAYERS

  return {
    players,
    addPlayer,
    removeLatestPlayer,
    updatePlayerName,
    updateScore,
    resetGame,
    canRemovePlayer
  }
}