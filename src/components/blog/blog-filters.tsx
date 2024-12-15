import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Calendar } from 'lucide-react'
import { Post } from '@/types/types'
import { useDebounce } from '@/hooks/useDebounce'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { motion } from 'framer-motion'

interface BlogFiltersProps {
  posts?: Post[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedType: string
  setSelectedType: (type: string) => void
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
}

export function BlogFilters({
  posts,
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
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

  return (
    <motion.div
      className="sticky top-20 z-30 bg-background/80 backdrop-blur-sm mb-8 py-4"
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
          {selectedType && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedType('')}>
              Clear filters
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(typeCount).map(([type, count]) => (
            <Badge
              key={type}
              variant={selectedType === type ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedType(type === selectedType ? '' : type)}
            >
              {type} {count}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
