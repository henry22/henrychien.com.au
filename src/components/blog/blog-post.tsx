import { Badge } from '@/components/ui/badge'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { difficultyColors, Difficulty } from '@/contasnts'

interface BlogPostProps {
  slug: string
}

export default async function BlogPost({ slug }: BlogPostProps) {
  const post = await import(`../../../posts/**/${slug}.mdx`)
  const Content = post.default
  const metadata = post.metadata

  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
        {metadata.title}
      </h1>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 text-gray-400 mb-8">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center min-w-[140px]">
            <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
            <time className="text-sm md:text-base">
              {new Date(metadata.publishedAt).toLocaleDateString('en-AU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
            <span className="text-sm md:text-base">{metadata.readTime} min read</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className={`${difficultyColors[metadata.difficulty as Difficulty]} text-sm`}
          >
            {metadata.difficulty}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {metadata.type}
          </Badge>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-lg max-w-none prose-code:text-orange-500">
        <Content />
      </div>
    </article>
  )
}
