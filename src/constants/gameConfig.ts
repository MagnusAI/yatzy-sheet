// Game configuration constants
export const GAME_CONFIG = {
  MIN_PLAYERS: 2,
  MAX_PLAYER_NAME_LENGTH: 12,
  BONUS_THRESHOLD: 84,
  BONUS_POINTS: 50,
  STORAGE_KEY: 'yatzy-players',
  CSS_PLAYER_COUNT_VAR: '--player-count'
} as const

export const UPPER_CATEGORIES = [
  'Ones', 
  'Twos', 
  'Threes', 
  'Fours', 
  'Fives', 
  'Sixes'
] as const

export const CALCULATED_ROWS = {
  UPPER_TOTAL: 'TOTAL',
  BONUS: 'BONUS 50 points (at 84)',
  GRAND_TOTAL: 'TOTAL'
} as const

export const DEFAULT_PLAYERS: Array<{ id: string; name: string; scores: {} }> = [
  { id: '1', name: 'Player 1', scores: {} },
  { id: '2', name: 'Player 2', scores: {} }
]