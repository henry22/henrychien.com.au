'use client'

import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/sanity/client'
import { Post } from '@/types/types'
import BlogCard from './blog-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function BlogList() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: async () => {
      return client.fetch(`
        *[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          publishedAt,
          excerpt,
          mainImage,
        }
      `)
    },
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load blog posts. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Posts</AlertTitle>
        <AlertDescription>There are no blog posts available at the moment.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
