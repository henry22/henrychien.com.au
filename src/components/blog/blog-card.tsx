import Link from 'next/link'
import Image from 'next/image'
import { BlogMetadata } from '@/types/blog'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, Clock } from 'lucide-react'
import { difficultyColors, Difficulty } from '@/contasnts'
import { parsePublishedDate } from '@/lib/utils/formatters'

type BlogCardProps = BlogMetadata & { slug: string }

export default function BlogCard({
  slug,
  title,
  excerpt,
  publishedAt,
  readTime,
  difficulty,
  image,
  type,
}: BlogCardProps) {
  if (!publishedAt) return null

  const difficultyKey = difficulty.toLowerCase() as Difficulty
  const publishedDate = parsePublishedDate(publishedAt)
  const isPublished = publishedDate < new Date()

  return (
    <>
      {isPublished ? (
        <Link
          href={`/blog/${slug}`}
          prefetch={true}
          className="text-primary hover:scale-105 hover:border-blue-500 hover:border-2 rounded-lg transition duration-300 h-full"
        >
          <Card className="overflow-hidden h-full flex flex-col">
            {image && (
              <div className="relative w-full aspect-2/1">
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
              </div>
            )}
            <CardHeader className="flex-none">
              <div className="flex items-center justify-between">
                <CardTitle className="line-clamp-2">{title}</CardTitle>
                <div className="flex flex-row items-center gap-3">
                  {type && (
                    <Badge variant="secondary" className="text-sm">
                      {type}
                    </Badge>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{readTime} min read</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center flex-none">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <time dateTime={publishedAt}>
                    {publishedDate.toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <Badge variant="secondary" className={difficultyColors[difficultyKey]}>
                  {difficulty}
                </Badge>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ) : null}
    </>
  )
}
