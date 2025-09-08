import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { unstable_ViewTransition as ViewTransition } from 'react'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, ClockIcon, FileText, Database } from 'lucide-react'
import { difficultyColors, Difficulty } from '@/contasnts'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import BlogContent from '@/components/blog/blog-content'
import BackButton from '@/components/blog/back-button'
import { parsePublishedDate } from '@/lib/utils/formatters'
import Script from 'next/script'
import { BlogMetadata } from '@/types/blog'
import Comments from '@/components/blog/comments'

interface Props {
  params: Promise<{ slug: string }>
}

type BlogPostData = {
  metadata: BlogMetadata
  slug: string
  source: 'mdx' | 'sanity'
  category?: string
  content?: unknown
}

function getMetadata(post: {
  source: 'mdx' | 'sanity'
  metadata?: BlogMetadata
  title?: string
  excerpt?: string
  publishedAt?: string
  readTime?: number
  type?: string
  difficulty?: string
}): BlogMetadata {
  if (post.source === 'mdx' && post.metadata) {
    return post.metadata
  } else {
    // Sanity post
    return {
      title: post.title || '',
      excerpt: post.excerpt || '',
      publishedAt: post.publishedAt || '',
      readTime: post.readTime || 0,
      type: post.type || '',
      difficulty: (post.difficulty as 'easy' | 'intermediate' | 'advanced') || 'intermediate',
    }
  }
}

function BlogPostSchema({ post, canonicalUrl }: { post: BlogPostData; canonicalUrl: string }) {
  const metadata = getMetadata(post)
  const publishedDate =
    post.source === 'mdx'
      ? parsePublishedDate(metadata.publishedAt)
      : new Date(metadata.publishedAt)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: metadata.title,
    description: metadata.excerpt,
    datePublished: publishedDate.toISOString(),
    dateModified: publishedDate.toISOString(),
    author: {
      '@type': 'Person',
      name: 'Henry Chien',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Henry Chien',
      logo: {
        '@type': 'ImageObject',
        url: 'https://henrychien.com.au/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    keywords: [metadata.type, metadata.difficulty],
  }

  return (
    <Script
      id="blog-post-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { slug } = params
  const post = await getPostBySlug(slug)

  if (!post) return { title: 'Post Not Found' }

  const metadata = getMetadata(post)
  const publishedDate =
    post.source === 'mdx'
      ? parsePublishedDate(metadata.publishedAt)
      : new Date(metadata.publishedAt)
  const canonicalUrl = `https://henrychien.com.au/blog/${slug}`

  return {
    title: `${metadata.title} | Henry Chien`,
    description: metadata.excerpt,
    metadataBase: new URL('https://henrychien.com.au'),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.excerpt,
      type: 'article',
      publishedTime: publishedDate.toISOString(),
      authors: ['Henry Chien'],
      siteName: 'Henry Chien',
      url: canonicalUrl,
    },
    other: {
      'article:published_time': publishedDate.toISOString(),
      'article:author': 'Henry Chien',
      'article:section': metadata.type,
      'article:tag': [metadata.type, metadata.difficulty],
    },
  }
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()

  const metadata = getMetadata(post)
  const difficulty = metadata.difficulty.toLowerCase() as Difficulty
  const canonicalUrl = `https://henrychien.com.au/blog/${params.slug}`
  const publishedDate =
    post.source === 'mdx'
      ? parsePublishedDate(metadata.publishedAt)
      : new Date(metadata.publishedAt)

  return (
    <ViewTransition name={`blog-${params.slug}`}>
      <BlogPostSchema post={post as BlogPostData} canonicalUrl={canonicalUrl} />
      <div className="w-full min-h-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16 max-w-[95%] lg:max-w-[90%] xl:max-w-[85%] 2xl:max-w-[70%]">
          <article className="space-y-6 sm:space-y-8">
            <header>
              <BackButton />
              <ViewTransition name={`blog-title-${params.slug}`}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 leading-tight font-bold font-cinzel">
                  {metadata.title}
                </h1>
              </ViewTransition>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 text-gray-400">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center min-w-[140px]">
                    <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
                    <time className="text-sm sm:text-base">
                      {publishedDate.toLocaleDateString('en-AU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
                    <span className="text-sm sm:text-base">{metadata.readTime} min read</span>
                  </div>
                  {/* Source indicator */}
                  <div className="flex items-center">
                    {post.source === 'mdx' ? (
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
                    ) : (
                      <Database className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
                    )}
                    <span className="text-sm sm:text-base uppercase font-mono">{post.source}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className={`${difficultyColors[difficulty]} text-sm`}>
                    {metadata.difficulty}
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    {metadata.type}
                  </Badge>
                </div>
              </div>
            </header>
            <BlogContent slug={params.slug} post={post} />
            <Comments slug={params.slug} />
          </article>
        </div>
      </div>
    </ViewTransition>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({
    slug:
      post.source === 'mdx'
        ? post.slug
        : typeof post.slug === 'string'
          ? post.slug
          : post.slug.current,
  }))
}
