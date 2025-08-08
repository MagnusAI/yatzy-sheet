import type { ScoreSectionProps } from '../types'
import { ScoreRow } from './ScoreRow'
import score from './styles/Score.module.css'
import sections from './styles/Sections.module.css'

/**
 * Score section component for upper and lower sections
 */
export function ScoreSection({
  title,
  entries,
  players,
  onScoreChange,
  rowConfigByEntryName,
  tableRef,
  hideTotals = false
}: ScoreSectionProps) {
  return (
    <section className={title.toLowerCase().includes('upper') ? sections.upperSection : sections.lowerSection}>
      <div className={score.scoreTable} ref={tableRef}>
        {entries.map((entry, index) => {
          const cfg = rowConfigByEntryName[entry.name] || { type: 'normal', isCalculated: false };
          return (
            <ScoreRow
              key={index}
              entry={entry}
              players={players}
              onScoreChange={(playerId, value) => onScoreChange(playerId, entry.name, value)}
              calculateValue={cfg.calculateValue}
              isCalculatedRow={cfg.isCalculated}
              rowType={cfg.type}
              isGrandTotal={cfg.isGrandTotal}
              hideTotals={hideTotals}
            />
          )
        })}
      </div>
    </section>
  )
}