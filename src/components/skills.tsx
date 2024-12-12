'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSkills } from '@/lib/hooks/usePortfolioData'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

type SkillCategory = {
  _id: string
  name: string
  description: string
  icon: string
}

function SkillsSection() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const { data: skillCategories, isLoading, error } = useSkills()

  console.log('Skill categories:', skillCategories)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId],
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load skills</p>
      </div>
    )
  }

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-16">Skills & Expertise</h2>
      <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto px-4">
        {isLoading
          ? // Loading skeletons
            Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                  <Skeleton className="h-[400px] w-full rounded-lg" />
                </div>
              ))
          : skillCategories?.map((category: SkillCategory) => (
              <SkillTree
                key={category._id}
                category={category}
                isExpanded={expandedCategories.includes(category._id)}
                onToggle={() => toggleCategory(category._id)}
              />
            ))}
      </div>
    </section>
  )
}

function SkillTree({
  category,
  isExpanded,
  onToggle,
}: {
  category: any
  isExpanded: boolean
  onToggle: () => void
}) {
  const { theme } = useTheme()
  if (!theme) return null
  const currentColor = theme === 'dark' ? category.colors.dark : category.colors.light

  console.log('Rendering category:', category)

  return (
    <div className="relative">
      {/* Main Category Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8">
        <Card
          className="relative border-2 cursor-pointer hover:shadow-md transition-shadow"
          style={{ borderColor: currentColor }}
          onClick={onToggle}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${currentColor}20` }}>
                {category.icon ? (
                  <Image
                    src={urlFor(category.icon).width(32).height(32).url()}
                    alt={category.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 dark:invert"
                    unoptimized
                  />
                ) : (
                  // Fallback icon or placeholder
                  <div className="w-10 h-10 bg-muted rounded-lg" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{category.name}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              {isExpanded ? (
                <ChevronDown className="w-6 h-6 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skills List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 relative overflow-hidden">
            {/* Vertical Line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-0.5"
              style={{ backgroundColor: currentColor }}
            />

            {category.skills?.map((skill: any, index: number) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-16">
                {/* Horizontal Line */}
                <div
                  className="absolute left-8 top-8 w-8 h-0.5"
                  style={{ backgroundColor: currentColor }}
                />

                <Card className="relative hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${skill.colors[theme]}20` }}>
                        {skill.icon && skill.icon.asset && (
                          <Image
                            src={urlFor(skill.icon).width(32).height(32).url()}
                            alt={skill.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 dark:invert"
                            unoptimized
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                      </div>
                    </div>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2">
                      {skill.subSkills.map((subSkill: string) => (
                        <span
                          key={subSkill}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{
                            backgroundColor: `${skill.colors[theme]}20`,
                            color: skill.colors[theme],
                          }}>
                          {subSkill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SkillsSection
