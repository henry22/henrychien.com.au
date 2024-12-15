'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '@/lib/sanity/client'
import { Post } from '@/types/types'
import BlogCard from './blog-card'
import { BlogFilters } from './blog-filters'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date>()

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  // Filter posts based on search, type, and date
  const filteredPosts = posts?.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !selectedType || post.type === selectedType
    const matchesDate =
      !selectedDate || new Date(post.publishedAt).toDateString() === selectedDate.toDateString()

    return matchesSearch && matchesType && matchesDate
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

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
      <BlogFilters
        posts={posts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts?.map(post => <BlogCard key={post._id} post={post} />)}
      </div>
    </div>
  )
}
