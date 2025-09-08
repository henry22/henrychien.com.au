'use client'

import { ScrollToTop } from '@/components/scroll-to-top'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturedProjects } from '@/components/sections/featured-projects'
import { AboutSection } from '@/components/sections/about-section'
import SkillsSection from '@/components/skills'
import LampContainer from '@/components/ui/lamp'

export default function Portfolio() {
  return (
    <div className="w-full overflow-x-hidden">
      <ScrollToTop />
      <div className="w-full">
        <main className="w-full py-12 px-4 md:px-6 lg:px-8">
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
