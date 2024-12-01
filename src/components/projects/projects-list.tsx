import { getProjects } from '@/lib/sanity/client'
import { ProjectCard } from './projects-card'
import { Suspense } from 'react'
import ProjectsSkeleton from '@/components/ui/skeletons/projectsSkeleton'

// Server Component for data fetching
async function ProjectsData() {
  const projects = await getProjects()

  if (!projects) return null

  return (
    <div className="grid gap-12">
      {projects.map((project, index) => (
        <ProjectCard key={project._id} project={project} index={index} />
      ))}
    </div>
  )
}

// This component wraps the async component with Suspense
export function ProjectsList() {
  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectsData />
    </Suspense>
  )
}
