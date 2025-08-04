import { useState, useEffect, useRef } from 'react'
import './App.css'
import sheetData from './assets/sheet-reference.json'

interface ScoreEntry {
  name: string
  max_point: number | null
}

interface Player {
  id: string
  name: string
  scores: { [key: string]: number | null }
}

function App() {
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Spiller 1', scores: {} },
    { id: '2', name: 'Spiller 2', scores: {} }
  ])

  const upperTableRef = useRef<HTMLDivElement>(null)
  const lowerTableRef = useRef<HTMLDivElement>(null)

  // Load players from localStorage on mount
  useEffect(() => {
    const savedPlayers = localStorage.getItem('yatzy-players')
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers))
    }
  }, [])

  // Save players to localStorage whenever players change
  useEffect(() => {
    localStorage.setItem('yatzy-players', JSON.stringify(players))
  }, [players])

  // Update CSS custom property for dynamic grid columns
  useEffect(() => {
    document.documentElement.style.setProperty('--player-count', players.length.toString())
  }, [players.length])

  // Synchronize horizontal scroll between upper and lower sections
  useEffect(() => {
    const upperTable = upperTableRef.current
    const lowerTable = lowerTableRef.current

    if (!upperTable || !lowerTable) return

    let isScrolling = false

    const syncScrollFromUpper = () => {
      if (isScrolling) return
      isScrolling = true
      lowerTable.scrollLeft = upperTable.scrollLeft
      requestAnimationFrame(() => {
        isScrolling = false
      })
    }

    const syncScrollFromLower = () => {
      if (isScrolling) return
      isScrolling = true
      upperTable.scrollLeft = lowerTable.scrollLeft
      requestAnimationFrame(() => {
        isScrolling = false
      })
    }

    upperTable.addEventListener('scroll', syncScrollFromUpper)
    lowerTable.addEventListener('scroll', syncScrollFromLower)

    return () => {
      upperTable.removeEventListener('scroll', syncScrollFromUpper)
      lowerTable.removeEventListener('scroll', syncScrollFromLower)
    }
  }, [players.length])

  const updateScore = (playerId: string, category: string, value: string) => {
    const numValue = value === '' ? null : parseInt(value)
    setPlayers(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, scores: { ...player.scores, [category]: numValue } }
        : player
    ))
  }

  const updatePlayerName = (playerId: string, newName: string) => {
    setPlayers(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, name: newName }
        : player
    ))
  }

  const addPlayer = () => {
    const newId = Date.now().toString()
    const newPlayer: Player = {
      id: newId,
      name: `Spiller ${players.length + 1}`,
      scores: {}
    }
    setPlayers(prev => [...prev, newPlayer])
  }

  const removeLatestPlayer = () => {
    if (players.length > 2) {
      setPlayers(prev => prev.slice(0, -1))
    }
  }

  const calculateUpperTotal = (player: Player) => {
    const upperCategories = ['ENere', 'TOere', 'TREere', 'FIREre', 'FEMmere', 'SEKSere']
    return upperCategories.reduce((total, category) => {
      const score = player.scores[category]
      return total + (score || 0)
    }, 0)
  }

  const calculateBonus = (player: Player) => {
    const upperTotal = calculateUpperTotal(player)
    return upperTotal >= 84 ? 50 : 0
  }

  const calculateLowerTotal = (player: Player) => {
    const lowerCategories = sheetData.lower_section.filter(item => item.name !== 'I alt').map(item => item.name)
    return lowerCategories.reduce((total, category) => {
      const score = player.scores[category]
      return total + (score || 0)
    }, 0)
  }

  const calculateGrandTotal = (player: Player) => {
    return calculateUpperTotal(player) + calculateBonus(player) + calculateLowerTotal(player)
  }

  const resetGame = () => {
    setPlayers([
      { id: '1', name: 'Spiller 1', scores: {} },
      { id: '2', name: 'Spiller 2', scores: {} }
    ])
    localStorage.removeItem('yatzy-players')
  }

  return (
    <div className="yatzy-sheet">
      <header className="sheet-header">
        <h1>{sheetData.title}</h1>
        <div className="header-controls">
          <button className="add-player-button" onClick={addPlayer}>
            + Spiller
          </button>
          {players.length > 2 && (
            <button className="remove-player-button-header" onClick={removeLatestPlayer}>
              - Spiller
            </button>
          )}
          <button className="reset-button" onClick={resetGame}>
            Ny spil
          </button>
        </div>
      </header>

      <div className="sheet-sections">
        {/* Upper Section */}
        <section className="upper-section">
          <h2>Øvre sektion</h2>
          <div className="score-table" ref={upperTableRef}>
            {/* Player Names Header Row */}
            <div className="player-names-row">
              <div className="category-cell sticky-category">
                <div className="category-header">Players</div>
              </div>
              {players.map((player) => (
                <div key={player.id} className="score-cell">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => updatePlayerName(player.id, e.target.value)}
                    className="player-name-input"
                    maxLength={12}
                  />
                </div>
              ))}
            </div>
            
            {/* Score Rows */}
            {sheetData.upper_section.map((item: ScoreEntry, index) => (
              <div key={index} className={`score-row ${item.name === 'TOTAL' ? 'total-row' : ''} ${item.name === 'BONUS 50 point (v. 84)' ? 'bonus-row' : ''}`}>
                <div className="category-cell sticky-category">
                  <label>
                    {item.name}
                    {item.max_point && <span className="max-points">(max {item.max_point})</span>}
                  </label>
                </div>
                {players.map((player) => (
                  <div key={player.id} className="score-cell">
                    {item.name === 'TOTAL' ? (
                      <div className="score-display">{calculateUpperTotal(player)}</div>
                    ) : item.name === 'BONUS 50 point (v. 84)' ? (
                      <div className="score-display">{calculateBonus(player)}</div>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        max={item.max_point || undefined}
                        value={player.scores[item.name] || ''}
                        onChange={(e) => updateScore(player.id, item.name, e.target.value)}
                        className="score-input"
                        inputMode="numeric"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Lower Section */}
        <section className="lower-section">
          <h2>Nedre sektion</h2>
          <div className="score-table" ref={lowerTableRef}>
            {sheetData.lower_section.map((item: ScoreEntry, index) => (
              <div key={index} className={`score-row ${item.name === 'I alt' ? 'grand-total-row' : ''}`}>
                <div className="category-cell sticky-category">
                  <label>
                    {item.name}
                    {item.max_point && <span className="max-points">(max {item.max_point})</span>}
                  </label>
                </div>
                {players.map((player) => (
                  <div key={player.id} className="score-cell">
                    {item.name === 'I alt' ? (
                      <div className="score-display grand-total">{calculateGrandTotal(player)}</div>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        max={item.max_point || undefined}
                        value={player.scores[item.name] || ''}
                        onChange={(e) => updateScore(player.id, item.name, e.target.value)}
                        className="score-input"
                        inputMode="numeric"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
