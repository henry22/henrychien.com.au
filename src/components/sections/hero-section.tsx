'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, Linkedin } from 'lucide-react'
import { ParticlesBackground } from '@/components/particles-background'
import { getHero } from '@/lib/sanity/client'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import '@/styles/code-animation.css'
import HeroSkeleton from '../ui/skeletons/heroSkeleton'
import { CodeBlock } from '@/components/ui/code-block'

type Snippet = {
  _type: string
  code: string
  language: string
}

type HeroData = {
  title: string
  subtitle: string
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
    resume?: string
  }
  codeSnippet: Snippet[]
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

  const socialLinks = {
    github: hero.socialLinks?.github ?? 'https://github.com',
    linkedin: hero.socialLinks?.linkedin ?? 'https://linkedin.com',
  }

  return (
    <section className="relative pt-12 md:pt-20 pb-24 md:pb-44 flex flex-col items-center text-center px-4">
      <ParticlesBackground />

      <div className="relative z-10 w-full">
        {hero.codeSnippet && hero.codeSnippet.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto mb-8 md:mb-16">
            {hero.codeSnippet.map((snippet: Snippet, index: number) => (
              <div key={index} className="bg-black rounded-lg shadow-2xl overflow-hidden text-left">
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
                <div className="p-4 overflow-x-auto">
                  {mounted && (
                    <CodeBlock
                      code={snippet.code}
                      language={snippet.language?.toLowerCase() || 'typescript'}
                    />
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl pb-1 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          {hero.title}
        </motion.h2>

        <motion.p
          className="mt-4 md:mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          {hero.subtitle}
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}>
          <Button size="lg" asChild>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>

          <Button size="lg" asChild>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
