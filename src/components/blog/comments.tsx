'use client'

import { useTheme } from 'next-themes'
import Giscus from '@giscus/react'

type CommentsProps = {
  slug: string
}

export default function Comments({ slug }: CommentsProps) {
  const { theme } = useTheme()

  // Check if Giscus is configured
  const repoId = process.env.NEXT_PUBLIC_GITHUB_REPO_ID
  const categoryId = process.env.NEXT_PUBLIC_GITHUB_CATEGORY_ID

  if (!repoId || !categoryId) {
    return (
      <div className="mt-16 border-t pt-8">
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          <p>Comments are temporarily disabled.</p>
          <p className="text-sm mt-2">Working on setting up the comment system!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-16 border-t pt-8">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      <Giscus
        id="comments"
        repo="henry22/henrychien.com.au"
        repoId={repoId}
        category="General"
        categoryId={categoryId}
        mapping="specific"
        term={slug}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang="en"
        loading="lazy"
      />
    </div>
  )
}
