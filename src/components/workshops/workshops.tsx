'use client'

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
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Book, Clock, Play } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getWorkshops } from '@/lib/sanity/client'
import { useState } from 'react'
import WorkshopsSkeleton from '../ui/skeletons/workshopsSkeleton'
import Image from 'next/image'
import Link from 'next/link'
import { ViewToggle } from '@/components/ui/view-toggle'
import { ContentLayout } from '@/components/ui/content-layout'
import { useViewMode } from '@/hooks/useViewMode'

interface Workshop {
  _id: string
  title: string
  description: string
  duration: string
  level: string
  topics: string[]
  github: string
  image: string
  upcoming?: {
    date: string
    location: string
    registrationLink: string
  }
  recordingLink?: string
  resources: string[]
}

export default function Workshops() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedDuration, setSelectedDuration] = useState('all')
  const { view, setView } = useViewMode('grid')

  const { data: workshops, isLoading } = useQuery<Workshop[]>({
    queryKey: ['workshops'],
    queryFn: getWorkshops,
  })

  console.log(workshops)

  // Enhanced filter function to search through multiple fields
  const filteredWorkshops = workshops?.filter((workshop: Workshop) => {
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      workshop.title.toLowerCase().includes(searchLower) ||
      workshop.description.toLowerCase().includes(searchLower) ||
      workshop.topics.some(topic => topic.toLowerCase().includes(searchLower))

    const matchesLevel = selectedLevel === 'all' || workshop.level === selectedLevel
    const matchesDuration = selectedDuration === 'all' || workshop.duration === selectedDuration

    return matchesSearch && matchesLevel && matchesDuration
  })

  if (isLoading) {
    return <WorkshopsSkeleton />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}>
            Technical Workshops
          </motion.h1>
          <p className="text-muted-foreground text-lg">
            Deep-dive video workshops on modern web development
          </p>
        </header>

        {/* Filter/Search Section */}
        <div className="bg-card p-4 rounded-lg mb-8">
          <div className="flex gap-4 flex-wrap items-center">
            <div className="relative flex-1 max-w-xs">
              <Input
                placeholder="Search workshops..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                <SelectItem value="1 hour">1 hour</SelectItem>
                <SelectItem value="2 hours">2 hours</SelectItem>
                <SelectItem value="3+ hours">3+ hours</SelectItem>
              </SelectContent>
            </Select>
            <ViewToggle view={view} setView={setView} className="ml-auto" />
          </div>
        </div>

        {/* Grid Layout */}
        <ContentLayout view={view}>
          {filteredWorkshops?.map((workshop: Workshop) => (
            <Link
              key={workshop._id}
              href={workshop.github}
              target="_blank"
              rel="noopener noreferrer">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group">
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className={`${view === 'list' ? 'flex gap-6' : 'flex flex-col'}`}>
                    <div
                      className={`relative aspect-video ${view === 'list' ? 'w-1/3' : 'w-full'}`}>
                      {workshop.image && (
                        <Image
                          src={workshop.image}
                          alt={workshop.title}
                          width={500}
                          height={500}
                          className="object-cover w-full h-full"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        {workshop.recordingLink && (
                          <Button variant="secondary" asChild>
                            <a
                              href={workshop.recordingLink}
                              target="_blank"
                              rel="noopener noreferrer">
                              <Play className="mr-2 h-4 w-4" />
                              Watch Now
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className={`p-6 ${view === 'list' ? 'flex-1' : ''}`}>
                      <Badge
                        variant={
                          workshop.level === 'Beginner'
                            ? 'default'
                            : workshop.level === 'Intermediate'
                              ? 'secondary'
                              : 'destructive'
                        }
                        className="mb-2">
                        {workshop.level}
                      </Badge>
                      <h3 className="font-semibold mb-2">{workshop.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{workshop.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {workshop.duration}
                        </div>
                        <div className="flex items-center">
                          <Book className="w-4 h-4 mr-1" />
                          {workshop.resources.length} Resources
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </ContentLayout>
      </div>
    </div>
  )
}
