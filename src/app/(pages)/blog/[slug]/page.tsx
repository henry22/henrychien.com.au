import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { difficultyColors, Difficulty } from '@/contasnts'
import { getPostBySlug, getAllPosts } from '@/lib/blog'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
  const post = await getPostBySlug(slug)

  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.metadata.title} | Your Name`,
    description: post.metadata.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()

  const Content = post.default

  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
        {post.metadata.title}
      </h1>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 text-gray-400 mb-8">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center min-w-[140px]">
            <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
            <time className="text-sm md:text-base">
              {new Date(post.metadata.publishedAt).toLocaleDateString('en-AU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
            <span className="text-sm md:text-base">{post.metadata.readTime} min read</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className={`${difficultyColors[post.metadata.difficulty as Difficulty]} text-sm`}
          >
            {post.metadata.difficulty}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {post.metadata.type}
          </Badge>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-lg max-w-none prose-code:text-orange-500">
        <Content />
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}
