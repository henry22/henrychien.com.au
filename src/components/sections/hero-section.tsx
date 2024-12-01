'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Twitter, Download } from 'lucide-react'
import { ParticlesBackground } from '@/components/particles-background'
import { getHero } from '@/lib/sanity/client'
import { useQuery } from '@tanstack/react-query'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState, useEffect } from 'react'
import '@/styles/code-animation.css'
import { Skeleton } from '../ui/skeleton'
import HeroSkeleton from '../ui/skeletons/heroSkeleton'

// Define types for the hero data
interface HeroData {
  title: string
  subtitle: string
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
    resume?: string
  }

  codeSnippet: {
    _type: string
    code: string
    language: string
  }[]
}

export function HeroSection() {
  const { data: hero, isLoading } = useQuery<HeroData>({
    queryKey: ['hero'],
    queryFn: getHero,
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const lines = document.querySelectorAll('.motion-line')
      lines.forEach((line, index) => {
        const htmlLine = line as HTMLElement
        htmlLine.style.setProperty('--line-index', index.toString())
      })
    }
  }, [mounted, hero])

  if (isLoading) {
    return <HeroSkeleton />
  }

  if (!hero) {
    return null
  }

  // Default social links
  const socialLinks = {
    github: hero.socialLinks?.github ?? 'https://github.com',
    linkedin: hero.socialLinks?.linkedin ?? 'https://linkedin.com',
    twitter: hero.socialLinks?.twitter ?? 'https://twitter.com',
    resume: hero.socialLinks?.resume ?? '#',
  }

  return (
    <section className="relative pt-20 pb-44 flex flex-col items-center text-center">
      <ParticlesBackground />

      {hero.codeSnippet && hero.codeSnippet.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl mb-16">
          {hero.codeSnippet.map((snippet, index) => (
            <div key={index} className="bg-black rounded-lg shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-sm text-gray-400 font-mono">
                    {`${snippet.language?.toLowerCase() || 'ts'}`}
                  </span>
                </div>
              </div>
              <div className="p-6 font-mono text-sm text-left">
                {mounted && (
                  <SyntaxHighlighter
                    language={snippet.language?.toLowerCase() || 'typescript'}
                    style={atomDark}
                    customStyle={{
                      background: 'transparent',
                      padding: 0,
                      margin: 0,
                    }}
                    wrapLines={true}
                    showLineNumbers={false}
                    lineProps={() => ({
                      style: { display: 'block' },
                      className: 'motion-line',
                    })}>
                    {snippet.code}
                  </SyntaxHighlighter>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      <motion.h2
        className="text-5xl sm:text-6xl pb-1 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        {hero.title}
      </motion.h2>

      <motion.p
        className="mt-6 text-xl text-muted-foreground max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        {hero.subtitle}
      </motion.p>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}>
        <Button asChild>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </Button>

        <Button asChild>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </a>
        </Button>

        <Button asChild>
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </a>
        </Button>
      </motion.div>
    </section>
  )
}
