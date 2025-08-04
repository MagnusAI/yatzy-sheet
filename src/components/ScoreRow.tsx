import type { ScoreRowProps } from '../types'
import { CALCULATED_ROWS } from '../constants/gameConfig'
import { ScoreInput } from './ScoreInput'
import { ScoreDisplay } from './ScoreDisplay'

/**
 * Reusable score row component that handles both input and calculated rows
 */
export function ScoreRow({ 
  entry, 
  players, 
  onScoreChange, 
  calculateValue,
  isCalculatedRow = false,
  rowType = 'normal',
  hideTotals = false
}: ScoreRowProps) {
  const getRowClassName = () => {
    const baseClass = 'score-row'
    const typeClasses = {
      total: 'total-row',
      bonus: 'bonus-row', 
      'grand-total': 'grand-total-row',
      normal: ''
    }
    return `${baseClass} ${typeClasses[rowType]}`.trim()
  }

  const renderScoreCell = (playerId: string) => {
    if (isCalculatedRow && calculateValue) {
      const player = players.find(p => p.id === playerId)!
      const value = calculateValue(player)
      const isGrandTotal = entry.name === CALCULATED_ROWS.GRAND_TOTAL
      return <ScoreDisplay value={value} isGrandTotal={isGrandTotal} isHidden={hideTotals} />
    }

    const player = players.find(p => p.id === playerId)!
    
    return (
      <ScoreInput
        value={player.scores[entry.name] ?? null}
        onChange={(value) => onScoreChange(playerId, value)}
        max={entry.max_point || undefined}
      />
    )
  }

  return (
    <div className={getRowClassName()}>
      <div className="category-cell sticky-category">
        <label>
          {entry.name}
          {entry.max_point && (
            <span className="max-points">(max {entry.max_point})</span>
          )}
        </label>
      </div>
      {players.map((player) => (
        <div key={player.id} className="score-cell">
          {renderScoreCell(player.id)}
        </div>
      ))}
    </div>
  )
}