import type { ScoreInputProps } from '../types'

/**
 * Reusable score input component
 * Accepts 0 to indicate a crossed-out/sacrificed category
 */
export function ScoreInput({ 
  value, 
  onChange, 
  min = 0, 
  max, 
  disabled = false 
}: ScoreInputProps) {
  return (
    <input
      type="number"
      min={min}
      max={max}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className="score-input"
      inputMode="numeric"
      disabled={disabled}
      title="Enter score or 0 to cross out"
    />
  )
}