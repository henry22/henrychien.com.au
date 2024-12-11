import { ViewMode } from '@/hooks/useViewMode'
import { motion } from 'framer-motion'

interface ContentLayoutProps {
  view: ViewMode
  children: React.ReactNode
}

export function ContentLayout({ view, children }: ContentLayoutProps) {
  return (
    <div
      className={`grid gap-6 ${
        view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
      }`}>
      {children}
    </div>
  )
}
