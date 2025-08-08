import type { ScoreDisplayProps } from '../types'
import styles from './styles/Score.module.css'

/**
 * Reusable score display component for calculated values
 */
export function ScoreDisplay({ value, isGrandTotal = false, isHidden = false }: ScoreDisplayProps) {
  const className = isGrandTotal 
    ? `${styles.scoreDisplay} ${styles.grandTotal}`
    : styles.scoreDisplay
    
  return (
    <div className={`${className} ${isHidden ? styles.hiddenTotal : ''} ${isHidden && isGrandTotal ? styles.hiddenGrandTotal : ''}`}>
      {isHidden ? '?' : value}
    </div>
  )
}