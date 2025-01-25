import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { difficultyColors, Difficulty } from '@/contasnts'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import BlogContent from '@/components/blog/blog-content'
import Image from 'next/image'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params

  const { slug } = params

  const post = await getPostBySlug(slug)

  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.metadata.title} | Your Name`,
    description: post.metadata.excerpt,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.excerpt,
      type: 'article',
      images: [
        {
          url: post.metadata.image.src,
          width: post.metadata.image.width,
          height: post.metadata.image.height,
          alt: post.metadata.image.alt,
        },
      ],
    },
  }
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()

  const difficulty = post.metadata.difficulty.toLowerCase() as Difficulty

  return (
    <div className="mx-auto px-4 py-16 max-w-4xl">
      <article className="space-y-8">
        <header>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            {post.metadata.title}
          </h1>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 text-gray-400">
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
              <Badge variant="secondary" className={`${difficultyColors[difficulty]} text-sm`}>
                {post.metadata.difficulty}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {post.metadata.type}
              </Badge>
            </div>
          </div>
        </header>

        {post.metadata.image && (
          <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden">
            <Image
              src={post.metadata.image.src}
              alt={post.metadata.image.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <BlogContent slug={params.slug} />
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}
