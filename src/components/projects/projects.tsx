import { ProjectsHeader } from './projects-header'
import { ProjectsFilter } from './projects-filter'
import { ProjectsList } from './projects-list'

export default function Projects() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProjectsHeader />
        <ProjectsFilter />
        <ProjectsList />
      </div>
    </div>
  )
}
