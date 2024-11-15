"use client";

import { useState, useEffect } from "react";
import { useScroll, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { ScrollToTop } from "@/components/scroll-to-top";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { FeaturedPackages } from "@/components/sections/featured-packages";
import { FeaturedWorkshops } from "@/components/sections/featured-workshops";
import { AboutSection } from "@/components/sections/about-section";
import { Footer } from "@/components/footer";
import SkillsSection from "@/components/skills";

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      <ScrollToTop />
      <div
        className={`min-h-screen ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] transform-none z-50"
          style={{ scaleX }}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32">
          <HeroSection />
          <SkillsSection />
          <FeaturedProjects />
          <FeaturedPackages />
          <FeaturedWorkshops />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
