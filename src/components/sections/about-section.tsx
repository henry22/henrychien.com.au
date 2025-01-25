'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { Skeleton } from '@/components/ui/skeleton'
import { useAbout } from '@/lib/hooks/usePortfolioData'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { data: about, isLoading, error } = useAbout()

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load about section</p>
      </div>
    )
  }

  return (
    <section id="about" ref={ref} className="py-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-[hsl(var(--gradient-start)/0.1)] to-[hsl(var(--gradient-end)/0.1)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </motion.div>

      {isLoading ? (
        <div className="relative z-10 bg-card rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 bg-card text-card-foreground rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
          <h3 className="text-5xl font-bold mb-8 text-center mr-2">{about?.title}</h3>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              {about?.background && (
                <Image
                  src={urlFor(about.background).width(400).height(400).url()}
                  alt="Profile"
                  width={400}
                  height={400}
                  className="rounded-full w-48 h-48 object-cover mx-auto sticky top-8"
                />
              )}
            </div>
            <div className="md:w-2/3">
              <div className="prose dark:prose-invert max-w-none">
                <PortableText value={about?.content} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
