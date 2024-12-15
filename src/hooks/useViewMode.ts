'use client'

import { useState, useEffect } from 'react'

export type ViewMode = 'grid' | 'list'

export function useViewMode(defaultView: ViewMode = 'list') {
  const [view, setView] = useState<ViewMode>(defaultView)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if we're on mobile (less than 768px)
    const isMobile = window.innerWidth < 768
    setView(isMobile ? 'grid' : 'list')

    // Update view mode if window is resized
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      setView(isMobile ? 'grid' : 'list')
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) return { view: defaultView, setView }

  return { view, setView }
}
