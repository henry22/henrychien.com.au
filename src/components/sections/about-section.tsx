"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import me from "@/components/images/me.jpeg";
import Image from "next/image";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-start)/0.1)] to-[hsl(var(--gradient-end)/0.1)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-card text-card-foreground rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto"
      >
        <h3 className="text-3xl font-bold mb-8 text-center">About Me</h3>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3">
            <Image
              src={me}
              alt="Matt Deal"
              className="rounded-full w-48 h-48 object-cover mx-auto"
            />
          </div>
          <div className="md:w-2/3 space-y-4">
            <p className="text-lg leading-relaxed">
              With 5 years of professional experience in Frontend development,
              I've honed my skills working with innovative SaaS startups. My
              expertise lies in creating intuitive, performant user interfaces
              that drive business growth and enhance user experiences.
            </p>
            <p className="text-lg leading-relaxed">
              I specialize in building robust, scalable applications using
              cutting-edge technologies like Next.js, React, and TypeScript. My
              approach combines clean, efficient code with stunning designs to
              create web applications that not only function flawlessly but also
              delight users.
            </p>
            <p className="text-lg leading-relaxed">
              Coding isn't just my profession—it's my passion and hobby. I'm
              constantly exploring new technologies and methodologies to push
              the boundaries of what's possible in web development.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
