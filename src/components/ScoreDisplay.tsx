import type { ScoreDisplayProps } from '../types'

/**
 * Reusable score display component for calculated values
 */
export function ScoreDisplay({ value, isGrandTotal = false, isHidden = false }: ScoreDisplayProps) {
  const className = isGrandTotal 
    ? "score-display grand-total" 
    : "score-display"
    
  return (
    <div className={`${className} ${isHidden ? 'hidden-total' : ''}`}>
      {isHidden ? '?' : value}
    </div>
  )
}