import { useEffect, useRef } from 'react'

/**
 * Custom hook for synchronizing horizontal scroll between player header and table sections
 * Uses requestAnimationFrame for optimized performance
 */
export function useSynchronizedScroll() {
  const playerHeaderRef = useRef<HTMLDivElement | null>(null)
  const upperTableRef = useRef<HTMLDivElement | null>(null)
  const lowerTableRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const playerHeader = playerHeaderRef.current
    const upperTable = upperTableRef.current
    const lowerTable = lowerTableRef.current

    if (!playerHeader || !upperTable || !lowerTable) return

    let isScrolling = false

    const syncScroll = (source: HTMLDivElement, targets: HTMLDivElement[]) => {
      if (isScrolling) return
      
      isScrolling = true
      requestAnimationFrame(() => {
        targets.forEach(target => {
          if (target !== source) {
            target.scrollLeft = source.scrollLeft
          }
        })
        isScrolling = false
      })
    }

    const allElements = [playerHeader, upperTable, lowerTable]

    const handlePlayerHeaderScroll = () => syncScroll(playerHeader, allElements)
    const handleUpperScroll = () => syncScroll(upperTable, allElements)
    const handleLowerScroll = () => syncScroll(lowerTable, allElements)

    playerHeader.addEventListener('scroll', handlePlayerHeaderScroll)
    upperTable.addEventListener('scroll', handleUpperScroll)
    lowerTable.addEventListener('scroll', handleLowerScroll)

    return () => {
      playerHeader.removeEventListener('scroll', handlePlayerHeaderScroll)
      upperTable.removeEventListener('scroll', handleUpperScroll)
      lowerTable.removeEventListener('scroll', handleLowerScroll)
    }
  }, [])

  return {
    playerHeaderRef,
    upperTableRef,
    lowerTableRef
  }
}