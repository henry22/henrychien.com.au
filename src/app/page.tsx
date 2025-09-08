'use client'

import { ScrollToTop } from '@/components/scroll-to-top'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturedProjects } from '@/components/sections/featured-projects'
import { AboutSection } from '@/components/sections/about-section'
import SkillsSection from '@/components/skills'
import LampContainer from '@/components/ui/lamp'

export default function Portfolio() {
  return (
    <div>
      <ScrollToTop />
      <div>
        <main className="sm:max-w-7xl w-full mx-auto py-12 px-2">
          <HeroSection />
          <LampContainer color="cyan">
            <FeaturedProjects />
          </LampContainer>
          <SkillsSection />
          <AboutSection />
        </main>
      </div>
    </div>
  )
}
