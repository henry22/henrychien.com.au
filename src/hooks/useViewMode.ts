'use client'

import { useState, useEffect } from 'react'

export function useViewMode(defaultView: 'grid' | 'list' = 'list') {
  const [view, setView] = useState<'grid' | 'list'>(defaultView)
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
