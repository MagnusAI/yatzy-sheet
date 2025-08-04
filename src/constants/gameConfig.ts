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
  'ENere', 
  'TOere', 
  'TREere', 
  'FIREre', 
  'FEMmere', 
  'SEKSere'
] as const

export const CALCULATED_ROWS = {
  UPPER_TOTAL: 'TOTAL',
  BONUS: 'BONUS 50 point (v. 84)',
  GRAND_TOTAL: 'I alt'
} as const

export const DEFAULT_PLAYERS = [
  { id: '1', name: 'Spiller 1', scores: {} },
  { id: '2', name: 'Spiller 2', scores: {} }
] as const