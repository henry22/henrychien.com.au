'use client'

import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Package, Github } from 'lucide-react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getPackages } from '@/lib/sanity/client'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'
import { ViewToggle } from '@/components/ui/view-toggle'
import { ContentLayout } from '@/components/ui/content-layout'
import { useViewMode } from '@/hooks/useViewMode'
import { Button } from '../ui/button'
import WorkshopsSkeleton from '../ui/skeletons/workshopsSkeleton'

interface Package {
  _id: string
  name: string
  description: string
  version: string
  npmLink: string
  githubLink: string
  documentation: string
  tags: string[]
}

export default function Packages() {
  const [searchQuery, setSearchQuery] = useState('')
  const { view, setView } = useViewMode('list')

  const { data: packages, isLoading } = useQuery<Package[]>({
    queryKey: ['packages'],
    queryFn: getPackages,
  })

  const filteredPackages = packages?.filter(
    (pkg: Package) =>
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  if (isLoading) {
    return <WorkshopsSkeleton />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}>
            NPM Packages
          </motion.h1>
          <p className="text-muted-foreground text-lg">
            Open source packages and tools for developers
          </p>
        </header>

        {/* Search */}
        <div className="mb-8">
          <div className="flex gap-4 flex-wrap items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search packages..."
                className="pl-9"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <ViewToggle view={view} setView={setView} className="ml-auto" />
          </div>
        </div>

        {/* Packages Grid */}
        <ContentLayout view={view}>
          {filteredPackages?.map((pkg: Package) => (
            <motion.div
              key={pkg._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-colors h-full">
                <div className={`${view === 'list' ? 'flex gap-6' : 'flex flex-col'}`}>
                  <div className={`p-6 ${view === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-mono font-bold text-primary mb-1">
                          {pkg.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" />v{pkg.version}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          {pkg.npmLink && (
                            <a href={pkg.npmLink || ''} target="_blank" rel="noopener noreferrer">
                              NPM
                            </a>
                          )}
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={pkg.githubLink || ''} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{pkg.description}</p>

                    {/* Installation Command */}
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm mb-4 group-hover:bg-primary/5 transition-colors">
                      <code>npm install {pkg.name}</code>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {pkg.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Quick Links */}
                    <div className="mt-4 pt-4 border-t flex gap-4">
                      {pkg.documentation && (
                        <Link
                          href={pkg.documentation || ''}
                          className="text-sm text-primary hover:underline">
                          Documentation
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </ContentLayout>
      </div>
    </div>
  )
}
