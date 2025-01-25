'use client'

import { motion } from 'framer-motion'
import { Play, Github, Book, Clock, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Workshop } from '@/lib/data'

interface WorkshopCardProps {
  workshop: Workshop
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
      <div className="grid md:grid-cols-[2fr_1fr] gap-6 bg-card rounded-xl overflow-hidden shadow-lg">
        {/* Main Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant={
                workshop.level === 'Beginner'
                  ? 'default'
                  : workshop.level === 'Intermediate'
                    ? 'secondary'
                    : 'destructive'
              }
              className="rounded-full">
              {workshop.level}
            </Badge>
            <div className="flex items-center text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              {workshop.duration}
            </div>
          </div>

          <h4 className="text-2xl font-bold mb-3">{workshop.title}</h4>
          <p className="text-muted-foreground mb-6">{workshop.description}</p>

          <div className="space-y-4">
            <h5 className="font-semibold">Workshop Content:</h5>
            <div className="grid grid-cols-2 gap-2">
              {workshop.topics.map(topic => (
                <div key={topic} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="bg-muted p-6 flex flex-col gap-4">
          <Button className="w-full" size="lg" asChild>
            {workshop.recordingLink ? (
              <a href={workshop.recordingLink}>
                <Play className="w-4 h-4 mr-2" />
                Watch Workshop
              </a>
            ) : null}
          </Button>

          <div className="bg-background p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Workshop Resources</h5>
            <ul className="text-sm space-y-2 mb-">
              {workshop.resources.map(resource => (
                <li key={resource} className="flex items-center gap-2">
                  {resource === 'Code Examples' ? (
                    <Github className="w-4 h-4" />
                  ) : resource === 'Slides' ? (
                    <Book className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                  {resource}
                </li>
              ))}
            </ul>
            <Button variant="outline" asChild className="flex-1 mt-4">
              <a href={workshop.github} target="_blank" rel="noopener noreferrer">
                GitHub <Github className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
