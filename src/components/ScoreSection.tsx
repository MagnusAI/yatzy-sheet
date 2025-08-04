import type { ScoreSectionProps } from '../types'
import { CALCULATED_ROWS } from '../constants/gameConfig'
import { PlayerNameHeader } from './PlayerNameHeader'
import { ScoreRow } from './ScoreRow'

/**
 * Score section component for upper and lower sections
 */
export function ScoreSection({
  title,
  entries,
  players,
  onScoreChange,
  onPlayerNameChange,
  calculateUpperTotal,
  calculateBonus,
  calculateGrandTotal,
  tableRef,
  showPlayerNames = false
}: ScoreSectionProps) {
  // calculateLowerTotal is passed in but not used directly in this component
  // It's part of the props interface for consistency across sections
  const getCalculationFunction = (entryName: string) => {
    switch (entryName) {
      case CALCULATED_ROWS.UPPER_TOTAL:
        return calculateUpperTotal
      case CALCULATED_ROWS.BONUS:
        return calculateBonus
      case CALCULATED_ROWS.GRAND_TOTAL:
        return calculateGrandTotal
      default:
        return undefined
    }
  }

  const getRowType = (entryName: string) => {
    switch (entryName) {
      case CALCULATED_ROWS.UPPER_TOTAL:
        return 'total' as const
      case CALCULATED_ROWS.BONUS:
        return 'bonus' as const
      case CALCULATED_ROWS.GRAND_TOTAL:
        return 'grand-total' as const
      default:
        return 'normal' as const
    }
  }

  const isCalculatedRow = (entryName: string) => {
    return Object.values(CALCULATED_ROWS).includes(entryName as any)
  }

  return (
    <section className={title.toLowerCase().includes('øvre') ? 'upper-section' : 'lower-section'}>
      <h2>{title}</h2>
      <div className="score-table" ref={tableRef}>
        {showPlayerNames && (
          <PlayerNameHeader 
            players={players} 
            onPlayerNameChange={onPlayerNameChange} 
          />
        )}
        
        {entries.map((entry, index) => (
          <ScoreRow
            key={index}
            entry={entry}
            players={players}
            onScoreChange={(playerId, value) => onScoreChange(playerId, entry.name, value)}
            calculateValue={getCalculationFunction(entry.name)}
            isCalculatedRow={isCalculatedRow(entry.name)}
            rowType={getRowType(entry.name)}
          />
        ))}
      </div>
    </section>
  )
}