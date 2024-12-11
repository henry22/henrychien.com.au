import { useState } from 'react'

export type ViewMode = 'grid' | 'list'

export function useViewMode(defaultView: ViewMode = 'grid') {
  const [view, setView] = useState<ViewMode>(defaultView)
  return { view, setView }
}
