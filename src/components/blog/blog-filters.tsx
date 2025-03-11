import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'
import { BlogMetadata } from '@/types/blog'
import { useDebounce } from '@/hooks/useDebounce'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { motion } from 'framer-motion'
import { difficultyFilterColors, type Difficulty } from '@/contasnts'
import { cn } from '@/lib/utils'

type BlogFiltersProps = {
  posts?: (BlogMetadata & { slug: string })[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedTypes: string[]
  setSelectedTypes: (types: string[]) => void
  selectedDifficulties: string[]
  setSelectedDifficulties: (difficulties: string[]) => void
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
}

export function BlogFilters({
  posts,
  searchQuery,
  setSearchQuery,
  selectedTypes,
  setSelectedTypes,
  selectedDifficulties,
  setSelectedDifficulties,
  selectedDate,
  setSelectedDate,
}: BlogFiltersProps) {
  const [inputValue, setInputValue] = useState(searchQuery)
  const debouncedValue = useDebounce(inputValue)

  useEffect(() => {
    setSearchQuery(debouncedValue)
  }, [debouncedValue, setSearchQuery])

  // Get unique types and their counts
  const typeCount =
    posts?.reduce(
      (acc, post) => {
        if (post.type) {
          acc[post.type] = (acc[post.type] || 0) + 1
        }
        return acc
      },
      {} as Record<string, number>
    ) || {}

  // Get unique difficulties and their counts
  const difficultyCount =
    posts?.reduce(
      (acc, post) => {
        if (post.difficulty) {
          acc[post.difficulty] = (acc[post.difficulty] || 0) + 1
        }
        return acc
      },
      {} as Record<string, number>
    ) || {}

  const hasActiveFilters =
    searchQuery || selectedTypes.length > 0 || selectedDifficulties.length > 0 || selectedDate

  const clearAllFilters = () => {
    setInputValue('')
    setSearchQuery('')
    setSelectedTypes([])
    setSelectedDifficulties([])
    setSelectedDate(undefined)
  }

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const toggleDifficulty = (difficulty: string) => {
    if (selectedDifficulties.includes(difficulty)) {
      setSelectedDifficulties(selectedDifficulties.filter(d => d !== difficulty))
    } else {
      setSelectedDifficulties([...selectedDifficulties, difficulty])
    }
  }

  return (
    <motion.div
      className="sticky top-20 z-30 bg-background/80 backdrop-blur-xs mb-8 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              className="pl-9"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
          </div>
          <DatePicker date={selectedDate} setDate={setSelectedDate} />
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear filters
            </Button>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Types:</span>
            {Object.entries(typeCount).map(([type, count]) => (
              <Badge
                key={type}
                variant={selectedTypes.includes(type) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleType(type)}
              >
                {type} {count}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 dark:bg-[#020817] dark:p-0 bg-white rounded-md p-2">
            <span className="text-sm text-muted-foreground ">Difficulty:</span>
            {Object.entries(difficultyCount).map(([difficulty, count]) => {
              const difficultyKey = difficulty.toLowerCase() as Difficulty
              return (
                <Badge
                  key={difficulty}
                  variant="secondary"
                  className={cn(
                    'cursor-pointer',
                    selectedDifficulties.includes(difficulty)
                      ? difficultyFilterColors[difficultyKey].selected
                      : difficultyFilterColors[difficultyKey].default
                  )}
                  onClick={() => toggleDifficulty(difficulty)}
                >
                  {difficulty} {count}
                </Badge>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
