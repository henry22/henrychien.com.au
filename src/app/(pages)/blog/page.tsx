import BlogList from '@/components/blog/blog-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Your Name',
  description: 'Technical articles and tutorials about web development',
}

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <BlogList />
    </main>
  )
}
