import { useState, useEffect } from 'react'
import './App.css'
import sheetData from './assets/sheet-reference.json'

interface ScoreEntry {
  name: string
  max_point: number | null
}

interface Scores {
  [key: string]: number | null
}

function App() {
  const [scores, setScores] = useState<Scores>({})

  // Load scores from localStorage on mount
  useEffect(() => {
    const savedScores = localStorage.getItem('yatzy-scores')
    if (savedScores) {
      setScores(JSON.parse(savedScores))
    }
  }, [])

  // Save scores to localStorage whenever scores change
  useEffect(() => {
    localStorage.setItem('yatzy-scores', JSON.stringify(scores))
  }, [scores])

  const updateScore = (category: string, value: string) => {
    const numValue = value === '' ? null : parseInt(value)
    setScores(prev => ({
      ...prev,
      [category]: numValue
    }))
  }

  const calculateUpperTotal = () => {
    const upperCategories = ['ENere', 'TOere', 'TREere', 'FIREre', 'FEMmere', 'SEKSere']
    return upperCategories.reduce((total, category) => {
      const score = scores[category]
      return total + (score || 0)
    }, 0)
  }

  const calculateBonus = () => {
    const upperTotal = calculateUpperTotal()
    return upperTotal >= 84 ? 50 : 0
  }

  const calculateLowerTotal = () => {
    const lowerCategories = sheetData.lower_section.filter(item => item.name !== 'I alt').map(item => item.name)
    return lowerCategories.reduce((total, category) => {
      const score = scores[category]
      return total + (score || 0)
    }, 0)
  }

  const calculateGrandTotal = () => {
    return calculateUpperTotal() + calculateBonus() + calculateLowerTotal()
  }

  const resetGame = () => {
    setScores({})
    localStorage.removeItem('yatzy-scores')
  }

  return (
    <div className="yatzy-sheet">
      <header className="sheet-header">
        <h1>{sheetData.title}</h1>
        <button className="reset-button" onClick={resetGame}>
          Ny spil
        </button>
      </header>

      <div className="sheet-sections">
        {/* Upper Section */}
        <section className="upper-section">
          <h2>Øvre sektion</h2>
          <div className="score-grid">
            {sheetData.upper_section.map((item: ScoreEntry, index) => {
              if (item.name === 'TOTAL') {
                return (
                  <div key={index} className="score-row total-row">
                    <label>{item.name}</label>
                    <div className="score-display">{calculateUpperTotal()}</div>
                  </div>
                )
              }
              if (item.name === 'BONUS 50 point (v. 84)') {
                return (
                  <div key={index} className="score-row bonus-row">
                    <label>{item.name}</label>
                    <div className="score-display">{calculateBonus()}</div>
                  </div>
                )
              }
              
              return (
                <div key={index} className="score-row">
                  <label htmlFor={item.name}>
                    {item.name}
                    <span className="max-points">(max {item.max_point})</span>
                  </label>
                  <input
                    type="number"
                    id={item.name}
                    min="0"
                    max={item.max_point || undefined}
                    value={scores[item.name] || ''}
                    onChange={(e) => updateScore(item.name, e.target.value)}
                    className="score-input"
                    inputMode="numeric"
                  />
                </div>
              )
            })}
          </div>
        </section>

        {/* Lower Section */}
        <section className="lower-section">
          <h2>Nedre sektion</h2>
          <div className="score-grid">
            {sheetData.lower_section.map((item: ScoreEntry, index) => {
              if (item.name === 'I alt') {
                return (
                  <div key={index} className="score-row grand-total-row">
                    <label>{item.name}</label>
                    <div className="score-display grand-total">{calculateGrandTotal()}</div>
                  </div>
                )
              }
              
              return (
                <div key={index} className="score-row">
                  <label htmlFor={item.name}>
                    {item.name}
                    <span className="max-points">(max {item.max_point})</span>
                  </label>
                  <input
                    type="number"
                    id={item.name}
                    min="0"
                    max={item.max_point || undefined}
                    value={scores[item.name] || ''}
                    onChange={(e) => updateScore(item.name, e.target.value)}
                    className="score-input"
                    inputMode="numeric"
                  />
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
