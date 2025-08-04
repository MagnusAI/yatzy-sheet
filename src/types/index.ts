// Shared type definitions
export interface ScoreEntry {
  name: string
  max_point: number | null
}

export interface PlayerScores {
  [category: string]: number | null
}

export interface Player {
  id: string
  name: string
  scores: PlayerScores
}

export interface GameData {
  title: string
  upper_section: ScoreEntry[]
  lower_section: ScoreEntry[]
}

export interface ScoreCalculations {
  upperTotal: number
  bonus: number
  lowerTotal: number
  grandTotal: number
}

// Component prop types
export interface ScoreInputProps {
  value: number | null
  onChange: (value: string) => void
  min?: number
  max?: number
  disabled?: boolean
}

export interface ScoreDisplayProps {
  value: number
  isGrandTotal?: boolean
  isHidden?: boolean
}

export interface PlayerNameInputProps {
  value: string
  onChange: (value: string) => void
  maxLength?: number
}

export interface ScoreRowProps {
  entry: ScoreEntry
  players: Player[]
  onScoreChange: (playerId: string, value: string) => void
  calculateValue?: (player: Player) => number
  isCalculatedRow?: boolean
  rowType?: 'normal' | 'total' | 'bonus' | 'grand-total'
  hideTotals?: boolean
}

export interface ScoreSectionProps {
  title: string
  entries: ScoreEntry[]
  players: Player[]
  onScoreChange: (playerId: string, category: string, value: string) => void
  onPlayerNameChange: (playerId: string, name: string) => void
  calculateUpperTotal: (player: Player) => number
  calculateBonus: (player: Player) => number
  calculateLowerTotal: (player: Player) => number
  calculateGrandTotal: (player: Player) => number
  tableRef?: React.RefObject<HTMLDivElement> | React.RefObject<HTMLDivElement | null>
  showPlayerNames?: boolean
  hideTotals?: boolean
}

export interface GameControlsProps {
  onAddPlayer: () => void
  onRemovePlayer: () => void
  onResetGame: () => void
  canRemovePlayer: boolean
  onToggleHideTotals: () => void
  hideTotals: boolean
}