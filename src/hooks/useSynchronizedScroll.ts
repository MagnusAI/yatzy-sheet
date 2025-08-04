import { useEffect, useRef } from 'react'

/**
 * Custom hook for synchronizing horizontal scroll between two elements
 */
export function useSynchronizedScroll() {
  const upperTableRef = useRef<HTMLDivElement | null>(null)
  const lowerTableRef = useRef<HTMLDivElement | null>(null)

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
  }, [])

  return {
    upperTableRef,
    lowerTableRef
  }
}