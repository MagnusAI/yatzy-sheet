import type { Player } from '../types'
import { UPPER_CATEGORIES, GAME_CONFIG, CALCULATED_ROWS } from '../constants/gameConfig'
import sheetData from '../assets/sheet-reference.json'

/**
 * Custom hook for score calculations
 */
export function useScoreCalculations(config?: { bonusThreshold?: number; bonusPoints?: number }) {
  const bonusThreshold = config?.bonusThreshold ?? GAME_CONFIG.BONUS_THRESHOLD
  const bonusPoints = config?.bonusPoints ?? GAME_CONFIG.BONUS_POINTS
  const calculateUpperTotal = (player: Player): number => {
    return UPPER_CATEGORIES.reduce((total, category) => {
      const score = player.scores[category]
      return total + (score ?? 0)
    }, 0)
  }

  const calculateBonus = (player: Player): number => {
    const upperTotal = calculateUpperTotal(player)
    return upperTotal >= bonusThreshold ? bonusPoints : 0
  }

  const calculateLowerTotal = (player: Player): number => {
    const lowerCategories = sheetData.lower_section
      .filter(item => item.name !== CALCULATED_ROWS.GRAND_TOTAL)
      .map(item => item.name)
    
    return lowerCategories.reduce((total, category) => {
      const score = player.scores[category]
      return total + (score ?? 0)
    }, 0)
  }

  const calculateGrandTotal = (player: Player): number => {
    return calculateUpperTotal(player) + calculateBonus(player) + calculateLowerTotal(player)
  }

  return {
    calculateUpperTotal,
    calculateBonus,
    calculateLowerTotal,
    calculateGrandTotal
  }
}