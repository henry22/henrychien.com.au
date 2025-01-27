'use client'

import { motion } from 'framer-motion'
import { Play, Github, Book, Clock, Bookmark, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Workshop } from '@/lib/data'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface WorkshopCardProps {
  workshop: Workshop
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  if (!workshop.github) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <Link
        href={workshop.github}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('block transition-all duration-300', 'hover:shadow-xl hover:scale-[1.02]')}
      >
        <div className="grid md:grid-cols-[2fr_1fr] gap-6 bg-card rounded-xl overflow-hidden shadow-lg border border-border">
          {/* Main Content */}
          <div className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  variant={
                    workshop.level === 'Beginner'
                      ? 'default'
                      : workshop.level === 'Intermediate'
                        ? 'secondary'
                        : 'destructive'
                  }
                  className="rounded-full text-xs font-semibold px-3 py-1"
                >
                  {workshop.level}
                </Badge>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {workshop.duration}
                </div>
              </div>

              <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                {workshop.title}
              </h4>
              <p className="text-muted-foreground mb-6">{workshop.description}</p>

              <div className="space-y-4">
                <h5 className="font-semibold text-lg">Workshop Content:</h5>
                <div className="grid grid-cols-2 gap-3">
                  {workshop.topics
                    ? workshop.topics.map(topic => (
                        <div key={topic} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {topic}
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="bg-muted p-6 flex flex-col justify-between">
            <div className="space-y-4">
              {workshop.recordingLink && (
                <Button
                  className="w-full group"
                  size="lg"
                  onClick={e => {
                    e.preventDefault()
                    window.open(workshop.recordingLink, '_blank')
                  }}
                >
                  <Play className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  Watch Workshop
                </Button>
              )}
              <div className="bg-background p-4 rounded-lg shadow-inner">
                <h5 className="font-semibold mb-3 text-lg">Workshop Resources</h5>
                <ul className="text-sm space-y-3">
                  {workshop.resources.map(resource => (
                    <li key={resource} className="flex items-center gap-2 group/item">
                      {resource === 'Code Examples' ? (
                        <Github className="w-4 h-4 text-primary" />
                      ) : resource === 'Slides' ? (
                        <Book className="w-4 h-4 text-primary" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-primary" />
                      )}
                      <span className="group-hover/item:text-primary transition-colors duration-300">
                        {resource}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Click to view workshop details and resources
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowRight className="w-6 h-6 text-primary" />
        </div>
      </Link>
    </motion.div>
  )
}
