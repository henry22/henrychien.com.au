import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { unstable_ViewTransition as ViewTransition } from 'react'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { difficultyColors, Difficulty } from '@/contasnts'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import BlogContent from '@/components/blog/blog-content'

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
    },
  }
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()

  const difficulty = post.metadata.difficulty.toLowerCase() as Difficulty

  return (
    <ViewTransition name={`blog-${params.slug}`}>
      <div className="w-full min-h-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-[95%] lg:max-w-[90%] xl:max-w-[85%] 2xl:max-w-[95%]">
          <article className="space-y-6 sm:space-y-8">
            <header>
              <ViewTransition name={`blog-title-${params.slug}`}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                  {post.metadata.title}
                </h1>
              </ViewTransition>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 text-gray-400">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center min-w-[140px]">
                    <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
                    <time className="text-sm sm:text-base">
                      {new Date(post.metadata.publishedAt).toLocaleDateString('en-AU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
                    <span className="text-sm sm:text-base">{post.metadata.readTime} min read</span>
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
            <BlogContent slug={params.slug} />
          </article>
        </div>
      </div>
    </ViewTransition>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}
