import { Skeleton } from '@/components/ui/skeleton'

export default function BlogPostSkeleton() {
  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      <Skeleton className="h-12 w-3/4 mb-4" /> {/* Title */}
      <div className="flex space-x-4 mb-8">
        <Skeleton className="h-4 w-32" /> {/* Date */}
        <Skeleton className="h-4 w-32" /> {/* Reading time */}
      </div>
      <Skeleton className="h-[400px] w-full mb-8" /> {/* Main image */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </article>
  )
}
