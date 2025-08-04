import { ScoreDisplayProps } from '../types'

/**
 * Reusable score display component for calculated values
 */
export function ScoreDisplay({ value, isGrandTotal = false }: ScoreDisplayProps) {
  const className = isGrandTotal 
    ? "score-display grand-total" 
    : "score-display"
    
  return (
    <div className={className}>
      {value}
    </div>
  )
}