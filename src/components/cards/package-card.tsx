'use client'

import { motion } from 'framer-motion'
import type { Package } from '@/lib/data'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface PackageCardProps {
  pkg: Package
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Link href={pkg.githubLink} target="_blank" rel="noopener noreferrer" className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group"
      >
        {/* Terminal Header */}
        <div className="bg-gray-800 p-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-white ml-2 text-sm font-mono">Version: {pkg.version}</span>
        </div>

        {/* Package Content */}
        <div className="p-6 font-mono text-sm relative">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-green-400 text-lg font-bold group-hover:text-green-300 transition-colors duration-300">
              {pkg.name}
            </h4>
          </div>

          <div className="text-gray-300 mb-4 prose max-w-6xl group-hover:text-gray-200 transition-colors duration-300">
            {pkg?.description}
          </div>

          <div className="space-y-2 text-gray-400">
            <div className="flex flex-wrap items-center gap-2">
              {pkg?.tags && <span className="text-yellow-500">$</span>}
              {pkg?.tags?.map(tag => (
                <span
                  key={tag}
                  className="bg-gray-800 px-2 py-1 rounded text-xs group-hover:bg-gray-700 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="w-5 h-5 text-green-400" />
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    </Link>
  )
}
