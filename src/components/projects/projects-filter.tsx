import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Grid, List, Search } from 'lucide-react'
import { Project } from '@/types/types'
import { useDebounce } from '@/hooks/useDebounce'
import { useState, useEffect } from 'react'

interface ProjectsFilterProps {
  projects?: Project[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedTech: string
  setSelectedTech: (tech: string) => void
  view: 'grid' | 'list'
  setView: (view: 'grid' | 'list') => void
}

export function ProjectsFilter({
  projects,
  searchQuery,
  setSearchQuery,
  selectedTech,
  setSelectedTech,
  view,
  setView,
}: ProjectsFilterProps) {
  const [inputValue, setInputValue] = useState(searchQuery)
  const debouncedValue = useDebounce(inputValue)

  useEffect(() => {
    setSearchQuery(debouncedValue)
  }, [debouncedValue, setSearchQuery])

  // Get unique tech stack items
  const uniqueTechStack = projects ? Array.from(new Set(projects.flatMap(p => p.tech))).sort() : []

  return (
    <motion.div
      className="sticky top-20 z-30 bg-background/80 backdrop-blur-xs mb-8 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </div>
        <Select value={selectedTech} onValueChange={setSelectedTech}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Tech" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Technologies</SelectItem>
            {uniqueTechStack.map(tech => (
              <SelectItem key={tech} value={tech}>
                {tech}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2 ml-auto">
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
      </div>
    </motion.div>
  )
}
