import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'
import { BlogMetadata } from '@/types/blog'
import { useDebounce } from '@/hooks/useDebounce'
import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { motion } from 'framer-motion'
import { difficultyFilterColors, type Difficulty } from '@/contasnts'
import { cn } from '@/lib/utils'
import { useTransition } from 'react'

type BlogFiltersProps = {
  posts?: (BlogMetadata & { slug: string })[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedTypes: string[]
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>
  selectedDifficulties: string[]
  setSelectedDifficulties: React.Dispatch<React.SetStateAction<string[]>>
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
  const [_, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      setSearchQuery(debouncedValue)
    })
  }, [debouncedValue, setSearchQuery, startTransition])

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

  const clearAllFilters = useCallback(() => {
    startTransition(() => {
      setInputValue('')
      setSearchQuery('')
      setSelectedTypes([])
      setSelectedDifficulties([])
      setSelectedDate(undefined)
    })
  }, [setSearchQuery, setSelectedTypes, setSelectedDifficulties, setSelectedDate])

  const toggleType = useCallback(
    (type: string) => {
      startTransition(() => {
        setSelectedTypes((prev: string[]) =>
          prev.includes(type) ? prev.filter((t: string) => t !== type) : [...prev, type]
        )
      })
    },
    [setSelectedTypes]
  )

  const toggleDifficulty = useCallback(
    (difficulty: string) => {
      startTransition(() => {
        setSelectedDifficulties((prev: string[]) =>
          prev.includes(difficulty)
            ? prev.filter((d: string) => d !== difficulty)
            : [...prev, difficulty]
        )
      })
    },
    [setSelectedDifficulties]
  )

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
          <DatePicker
            date={selectedDate}
            setDate={date => startTransition(() => setSelectedDate(date))}
          />
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
                className={cn(
                  'cursor-pointer transition-all duration-300',
                  selectedTypes.includes(type) && 'scale-110'
                )}
                onClick={() => toggleType(type)}
              >
                {type} {count}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 dark:bg-[#020817] dark:p-0 bg-white rounded-md p-2">
            <span className="text-sm text-muted-foreground">Difficulty:</span>
            {Object.entries(difficultyCount).map(([difficulty, count]) => {
              const difficultyKey = difficulty.toLowerCase() as Difficulty
              return (
                <Badge
                  key={difficulty}
                  variant="secondary"
                  className={cn(
                    'cursor-pointer transition-all duration-300',
                    selectedDifficulties.includes(difficulty)
                      ? cn(difficultyFilterColors[difficultyKey].selected, 'scale-110')
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
