'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ProjectCard } from '@/components/cards/project-card'
import { useFeaturedProjects } from '@/lib/hooks/usePortfolioData'
import { Skeleton } from '@/components/ui/skeleton'
import { Project } from '@/lib/data'
import Section from '../section'

export function FeaturedProjects() {
  const { data: projects, isLoading, error } = useFeaturedProjects()

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load projects</p>
      </div>
    )
  }

  return (
    <Section className="pb-12 pt-70 sm:pt-12">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
        <h3 className="text-xl font-bold sm:text-3xl">Featured Projects</h3>
        <Link href="/projects">
          <Button variant="outline">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="space-y-8 sm:space-y-20">
        {isLoading
          ? // Loading skeletons
            Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-[400px] rounded-lg">
                  <Skeleton className="w-full h-full" />
                </div>
              ))
          : projects?.map((project: Project, index: number) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
      </div>
    </Section>
  )
}
