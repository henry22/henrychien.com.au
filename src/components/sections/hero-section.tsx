'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, ChevronDown, Mail } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { getHero } from '@/lib/sanity/client'
import { CodeBlock } from '@/components/ui/code-block'
import type { HeroData, Snippet } from '@/types/types'
import { ParticlesBackground } from '../particles-background'
import Image from 'next/image'

export function HeroSection() {
  const { data: hero, isLoading } = useQuery<HeroData>({
    queryKey: ['hero'],
    queryFn: getHero,
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (isLoading || !hero) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const socialLinks = {
    github: hero.socialLinks?.github ?? 'https://github.com',
    linkedin: hero.socialLinks?.linkedin ?? 'https://linkedin.com',
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-background to-background/80">
      <ParticlesBackground />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]">
                {hero.title}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">{hero.subtitle}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" asChild>
                <a href="#contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Get in Touch
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#projects">View Projects</a>
              </Button>
            </div>
            <div className="flex gap-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-10"></div>
            <div className="relative z-20 bg-black/80 rounded-lg shadow-2xl overflow-hidden">
              {hero.codeSnippet && hero.codeSnippet.length > 0 && (
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  {mounted && (
                    <CodeBlock
                      code={hero.codeSnippet[0].code}
                      language={hero.codeSnippet[0].language?.toLowerCase() || 'typescript'}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64">
              <Image
                src="/avatar-illustration.png"
                alt="Matt Deal"
                width={256}
                height={256}
                className="rounded-full border-4 border-primary/20"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  )
}
