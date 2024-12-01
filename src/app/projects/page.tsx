'use client'

import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/lib/sanity/client'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, ExternalLink, Github, Grid, List } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface Project {
  _id: string
  name: string
  description: string
  tech: string[]
  link: string
  github: string
  image: string
  features: string[]
}

export default function Page() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Skeleton className="h-12 w-48 mb-4" />
        <Skeleton className="h-6 w-96 mb-8" />
        <div className="grid gap-12">
          {[1, 2, 3].map(i => (
            <Card key={i} className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <Skeleton className="aspect-video" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-20 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <div className="flex gap-2">
                      {[1, 2, 3].map(j => (
                        <Skeleton key={j} className="h-6 w-16" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!projects) return null

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}>
            Featured Projects
          </motion.h1>
          <p className="text-muted-foreground text-lg">
            A collection of my favorite projects and applications
          </p>
        </header>

        {/* Filter Bar */}
        <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-sm mb-8 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <Input placeholder="Search projects..." className="max-w-xs" />
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tech Stack" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(new Set(projects.flatMap(p => p.tech))).map(tech => (
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
        </div>

        {/* Projects Grid */}
        <div className="grid gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}>
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Project Preview */}
                  <div className="relative aspect-video group">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="object-cover w-full h-full"
                    />
                    <div
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                                  transition-opacity flex items-center justify-center gap-4">
                      <Button asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Demo
                        </a>
                      </Button>
                      <Button variant="secondary" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Source Code
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map(tech => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {project.features && project.features.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Key Features</h4>
                          <ul className="grid grid-cols-2 gap-2 text-sm">
                            {project.features.map(feature => (
                              <li key={feature} className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
