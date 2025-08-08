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
  isGrandTotal?: boolean
  hideTotals?: boolean
}

export interface ScoreSectionRowConfig {
  type: 'normal' | 'total' | 'bonus' | 'grand-total'
  isCalculated: boolean
  isGrandTotal?: boolean
  calculateValue?: (player: Player) => number
}

export interface ScoreSectionProps {
  title: string
  entries: ScoreEntry[]
  players: Player[]
  onScoreChange: (playerId: string, category: string, value: string) => void
  rowConfigByEntryName: Record<string, ScoreSectionRowConfig>
  tableRef?: React.RefObject<HTMLDivElement> | React.RefObject<HTMLDivElement | null>
  hideTotals?: boolean
}

export interface GameControlsProps {
  onAddPlayer: () => void
  onRemovePlayer: () => void
  onResetGame: () => void
  canRemovePlayer: boolean
  onToggleHideTotals: () => void
  hideTotals: boolean
  showPlayerButtons?: boolean
}