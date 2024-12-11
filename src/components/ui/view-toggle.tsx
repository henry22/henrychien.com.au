import { Button } from '@/components/ui/button'
import { Grid, List } from 'lucide-react'
import { ViewMode } from '@/hooks/useViewMode'

interface ViewToggleProps {
  view: ViewMode
  setView: (view: ViewMode) => void
  className?: string
}

export function ViewToggle({ view, setView, className = '' }: ViewToggleProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        variant={view === 'list' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setView('list')}>
        <List className="w-4 h-4" />
      </Button>
      <Button
        variant={view === 'grid' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setView('grid')}>
        <Grid className="w-4 h-4" />
      </Button>
    </div>
  )
}
