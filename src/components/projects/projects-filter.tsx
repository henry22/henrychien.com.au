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
import { Grid, List } from 'lucide-react'
import { Project } from '@/types/types'

export function ProjectsFilter({ projects }: { projects?: Project[] }) {
  return (
    <motion.div
      className="sticky top-20 z-30 bg-background/80 backdrop-blur-sm mb-8 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-wrap gap-4 items-center">
        <Input placeholder="Search projects..." className="max-w-xs" />
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Tech Stack" />
          </SelectTrigger>
          <SelectContent>
            {projects &&
              Array.from(new Set(projects.flatMap(p => p.tech))).map(tech => (
                <SelectItem key={tech} value={tech.toLowerCase()}>
                  {tech}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" size="sm">
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
