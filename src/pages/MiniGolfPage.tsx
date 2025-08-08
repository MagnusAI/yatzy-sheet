import type { Player, GameData } from '../types'
import { ScoreSection } from '../components/ScoreSection'

// Simple minigolf definition: N holes with a TOTAL row at the end
export function createMiniGolfData(holes: number): GameData {
  const entries = Array.from({ length: holes }, (_, i) => ({ name: `Hole ${i + 1}`, max_point: null }))
  entries.push({ name: 'TOTAL', max_point: null })
  return {
    title: `Mini Golf - ${holes} holes`,
    upper_section: entries,
    lower_section: []
  }
}

export function buildMiniGolfRowConfig() {
  return new Proxy({}, {
    get: (_target, prop: string) => {
      if (prop === 'TOTAL') {
        return { type: 'grand-total', isCalculated: true, isGrandTotal: true, calculateValue: (player: Player) => {
          return Object.entries(player.scores).reduce((sum, [key, val]) => {
            if (key.startsWith('Hole ')) {
              return sum + (typeof val === 'number' ? val : 0)
            }
            return sum
          }, 0)
        }}
      }
      return { type: 'normal', isCalculated: false }
    }
  }) as Record<string, { type: 'normal' | 'total' | 'bonus' | 'grand-total'; isCalculated: boolean; isGrandTotal?: boolean; calculateValue?: (p: Player) => number }>
}

export function MiniGolfSection({
  data,
  players,
  onScoreChange,
  tableRef,
  hideTotals
}: {
  data: GameData
  players: Player[]
  onScoreChange: (playerId: string, category: string, value: string) => void
  tableRef?: React.RefObject<HTMLDivElement>
  hideTotals?: boolean
}) {
  const rowConfig = buildMiniGolfRowConfig()

  return (
    <ScoreSection
      title={data.title}
      entries={data.upper_section}
      players={players}
      onScoreChange={onScoreChange}
      rowConfigByEntryName={rowConfig}
      tableRef={tableRef}
      hideTotals={hideTotals}
    />
  )
}

