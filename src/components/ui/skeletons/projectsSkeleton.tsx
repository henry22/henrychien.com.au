import { Card } from '../card'
import { Skeleton } from '../skeleton'

export default function ProjectsSkeleton() {
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
