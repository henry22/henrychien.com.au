import Link from 'next/link'
import { unstable_ViewTransition as ViewTransition } from 'react'
import type { BlogMetadata } from '@/types/blog'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, Clock, ArrowRightIcon, BookOpen } from 'lucide-react'
import { difficultyColors, type Difficulty } from '@/contasnts'
import { parsePublishedDate } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils'

type BlogCardProps = Omit<BlogMetadata & { slug: string }, 'image'>

export default function BlogCardNoImage({
  slug,
  title,
  excerpt,
  publishedAt,
  readTime,
  difficulty,
}: BlogCardProps) {
  if (!publishedAt) return null

  const difficultyKey = difficulty.toLowerCase() as Difficulty
  const publishedDate = parsePublishedDate(publishedAt)
  const isPublished = publishedDate < new Date()

  const accentColorClass =
    {
      easy: 'border-l-emerald-500',
      intermediate: 'border-l-blue-500',
      advanced: 'border-l-purple-500',
    }[difficultyKey as keyof typeof difficultyColors] || 'border-l-primary'

  return (
    <>
      {isPublished ? (
        <Link href={`/blog/${slug}`} prefetch={true} className="group block w-full">
          <ViewTransition name={`blog-${slug}`}>
            <Card
              className={cn(
                'overflow-hidden flex flex-col min-h-[320px]',
                'border-2 border-l-4 border-border',
                accentColorClass,
                'hover:border-primary/50 hover:border-l-primary transition-all duration-300',
                'shadow-sm hover:shadow-md bg-card'
              )}
            >
              <CardHeader className="flex-none pt-6 pb-2">
                <div className="flex items-center gap-3 mb-3">
                  <Badge
                    variant="secondary"
                    className={cn('text-xs font-medium', difficultyColors[difficultyKey])}
                  >
                    {difficulty}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>{readTime} min read</span>
                  </div>
                </div>
                <CardTitle className="line-clamp-2 text-2xl font-bold group-hover:text-primary transition-colors">
                  {title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow py-4">
                <div className="flex">
                  <div className="mr-4 hidden sm:block text-base/5 ">
                    <div
                      className={cn(
                        'p-2 rounded-full',
                        'border border-border',
                        'text-muted-foreground group-hover:text-primary group-hover:border-primary transition-all'
                      )}
                    >
                      <BookOpen className="h-[1lh] w-5" />
                    </div>
                  </div>
                  <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between items-center flex-none py-5 border-t">
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarIcon className="mr-2 h-3 w-3" />
                  <time dateTime={publishedAt}>
                    {publishedDate.toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="text-primary text-sm font-medium flex items-center opacity-70 group-hover:opacity-100 transition-all duration-300">
                  Read article{' '}
                  <ArrowRightIcon className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </CardFooter>
            </Card>
          </ViewTransition>
        </Link>
      ) : null}
    </>
  )
}
