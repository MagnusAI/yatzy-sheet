import React from 'react'
import sheetData from '../assets/sheet-reference.json'
import type { GameData, Player } from '../types'
import { CALCULATED_ROWS } from '../constants/gameConfig'
import { ScoreSection } from '../components/ScoreSection'
import { useScoreCalculations } from '../hooks/useScoreCalculations'
// Yatzy rendering only; settings are handled at App level

const gameData = sheetData as GameData

export function buildYatzyRowConfig(
  _players: Player[],
  calculateUpperTotal: (p: Player) => number,
  calculateBonus: (p: Player) => number,
  calculateGrandTotal: (p: Player) => number,
  numDice: number) {
  const config: Record<string, { type: 'normal' | 'total' | 'bonus' | 'grand-total'; isCalculated: boolean; isGrandTotal?: boolean; calculateValue?: (p: Player) => number }> = {}

  // Upper section
  for (const entry of gameData.upper_section) {
    if (entry.name === CALCULATED_ROWS.UPPER_TOTAL) {
      config[entry.name] = { type: 'total', isCalculated: true, calculateValue: calculateUpperTotal }
    } else if (entry.name === CALCULATED_ROWS.BONUS) {
      config[entry.name] = { type: 'bonus', isCalculated: true, calculateValue: calculateBonus }
    } else {
      config[entry.name] = { type: 'normal', isCalculated: false }
    }
  }

  // Lower section
  const filteredLower = gameData.lower_section.filter(entry => {
    if (numDice >= 6) return true
    // Remove entries unachievable with fewer than 6 dice
    const name = entry.name.toLowerCase()
    if (name.includes('three pairs')) return false
    if (name.includes('two three')) return false
    if (name.includes('royal')) return false
    return true
  })

  for (const entry of filteredLower) {
    if (entry.name === CALCULATED_ROWS.GRAND_TOTAL) {
      config[entry.name] = { type: 'grand-total', isCalculated: true, isGrandTotal: true, calculateValue: calculateGrandTotal }
    } else {
      config[entry.name] = { type: 'normal', isCalculated: false }
    }
  }

  return config
}

export function YatzySections({
  players,
  onScoreChange,
  upperTableRef,
  lowerTableRef,
  hideTotals,
  bonusThreshold,
  bonusPoints,
  numDice
}: {
  players: Player[]
  onScoreChange: (playerId: string, category: string, value: string) => void
  upperTableRef?: React.RefObject<HTMLDivElement>
  lowerTableRef?: React.RefObject<HTMLDivElement>
  hideTotals?: boolean
  bonusThreshold: number
  bonusPoints: number
  numDice: number
}) {
  const { calculateUpperTotal, calculateBonus, calculateGrandTotal } = useScoreCalculations({ bonusThreshold, bonusPoints })
  const rowConfig = buildYatzyRowConfig(players, calculateUpperTotal, calculateBonus, calculateGrandTotal, numDice)

  return (
    <div>
      <ScoreSection
        title="Upper Section"
        entries={gameData.upper_section}
        players={players}
        onScoreChange={onScoreChange}
        rowConfigByEntryName={rowConfig}
        tableRef={upperTableRef}
        hideTotals={hideTotals}
      />
      <ScoreSection
        title="Lower Section"
        entries={gameData.lower_section.filter(entry => {
          if (numDice >= 6) return true
          const name = entry.name.toLowerCase()
          if (name.includes('three pairs')) return false
          if (name.includes('two three')) return false
          if (name.includes('royal')) return false
          return true
        })}
        players={players}
        onScoreChange={onScoreChange}
        rowConfigByEntryName={rowConfig}
        tableRef={lowerTableRef}
        hideTotals={hideTotals}
      />
    </div>
  )
}

