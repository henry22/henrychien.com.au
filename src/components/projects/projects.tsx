'use client'

import { ProjectsHeader } from './projects-header'
import { ProjectsFilter } from './projects-filter'
import { ProjectsList } from './projects-list'
import { useState } from 'react'

import { Project } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import ProjectsSkeleton from '../ui/skeletons/projectsSkeleton'
import { getProjects } from '@/lib/sanity/client'
import { useViewMode } from '@/hooks/useViewMode'

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTech, setSelectedTech] = useState('all')
  const { view, setView } = useViewMode('list')

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  // Filter projects based on search query and selected tech
  const filteredProjects = projects?.filter((project: Project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTech = selectedTech === 'all' || project.tech.includes(selectedTech)
    return matchesSearch && matchesTech
  })

  if (isLoading) {
    return <ProjectsSkeleton />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProjectsHeader />
        <ProjectsFilter
          projects={projects}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTech={selectedTech}
          setSelectedTech={setSelectedTech}
          view={view}
          setView={setView}
        />
        <ProjectsList projects={filteredProjects} view={view} />
      </div>
    </div>
  )
}
