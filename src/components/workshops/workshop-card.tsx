'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Github } from 'lucide-react'
import Link from 'next/link'

interface Workshop {
  _id: string
  title: string
  description: string
  duration: string
  level: string
  topics: string[]
  resources: string[]
  github: string
  recordingLink?: string | null
  upcoming?: boolean | null
}

interface WorkshopCardProps {
  workshop: Workshop
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  return (
    <Link href={workshop.github} target="_blank" rel="noopener noreferrer">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group">
        <Card className="p-6 border-2 border-transparent hover:border-primary transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold mb-1">{workshop.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {workshop.duration}
              </div>
            </div>
            <Badge variant={workshop.level === 'Beginner' ? 'default' : 'secondary'}>
              {workshop.level}
            </Badge>
          </div>

          <p className="text-muted-foreground mb-6">{workshop.description}</p>

          <div className="space-y-4">
            {/* Topics */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Topics Covered</h4>
              <div className="flex flex-wrap gap-2">
                {workshop.topics.map(topic => (
                  <Badge key={topic} variant="outline">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Resources */}
            {workshop.resources && workshop.resources.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2">Resources</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {workshop.resources.map(resource => (
                    <li key={resource}>{resource}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            <div className="pt-4 border-t">
              <div className="flex gap-4">
                <span className="text-sm text-primary hover:underline inline-flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  View Workshop
                </span>
                {workshop.recordingLink && (
                  <a
                    href={workshop.recordingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-sm text-primary hover:underline">
                    Watch Recording
                  </a>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  )
}
