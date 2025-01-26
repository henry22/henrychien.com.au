import { getAllPosts } from '@/lib/blog'
import { Metadata } from 'next'
import BlogList from '@/components/blog/blog-list'

export const metadata: Metadata = {
  title: 'Blog | Your Name',
  description: 'Technical articles and tutorials about web development',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="container mx-auto px-4 py-8">
      <BlogList initialPosts={posts} />
    </main>
  )
}
