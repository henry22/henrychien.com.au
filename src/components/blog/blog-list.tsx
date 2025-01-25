'use client'

import { useState } from 'react'
import { BlogMetadata } from '@/types/blog'
import BlogCard from './blog-card'
import { BlogFilters } from './blog-filters'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

type BlogPost = BlogMetadata & { slug: string }

interface BlogListProps {
  initialPosts: BlogPost[]
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date>()

  // Filter posts based on search, type, and date
  const filteredPosts = initialPosts.filter(post => {
    const matchesSearch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    const matchesType = selectedType ? post.type === selectedType : true
    const matchesDate = selectedDate
      ? new Date(post.publishedAt).toDateString() === selectedDate.toDateString()
      : true

    return matchesSearch && matchesType && matchesDate
  })

  if (filteredPosts.length === 0) {
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
        <BlogFilters
          posts={initialPosts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className="flex justify-center items-center h-[300px]">
          <p>No posts found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
      <BlogFilters
        posts={initialPosts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  )
}
