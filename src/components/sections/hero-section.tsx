"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Download } from "lucide-react";
import { ParticlesBackground } from "@/components/particles-background";

export function HeroSection() {
  const codeSnippet = `import { Developer } from 'matt-deal';

const Developer = createAmazingStuff();

const skills = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind',

];

function createAmazingStuff() {
  return {
    type: 'Frontend',
    focus: 'User Experience',
    passion: 'Clean Code',
  };
}

// Let's build something amazing together
`;

  return (
    <section className="relative pt-20 pb-44 flex flex-col items-center text-center">
      {/* Particles Background */}
      <ParticlesBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl mb-16"
      >
        <div className="bg-black rounded-lg shadow-2xl overflow-hidden">
          {/* Editor Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-sm text-gray-400 font-mono">
                developer.ts
              </span>
            </div>
          </div>

          {/* Code Editor Content */}
          <div className="p-6 font-mono text-sm text-left [&_pre]:!bg-transparent">
            <pre className="language-typescript">
              {codeSnippet.split("\n").map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className={`
                    ${line.startsWith("import") ? "text-blue-400" : ""}
                    ${line.includes("const") ? "text-purple-400" : ""}
                    ${line.includes("function") ? "text-yellow-400" : ""}
                    ${line.includes("//") ? "text-gray-500" : ""}
                    ${line.includes("'") ? "text-green-400" : ""}
                  `}
                >
                  {line || " "}
                </motion.div>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-white ml-1"
              />
            </pre>
          </div>
        </div>
      </motion.div>

      <motion.h2
        className="text-5xl sm:text-6xl pb-1 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Crafting Digital Experiences
      </motion.h2>

      <motion.p
        className="mt-6 text-xl text-muted-foreground max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Full Stack Developer with a focus on Frontend, passionate about crafting
        beautiful and functional web applications
      </motion.p>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Button asChild>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </Button>

        <Button asChild>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </a>
        </Button>

        <Button asChild>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </a>
        </Button>

        <Button variant="outline" asChild>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            Resume
          </a>
        </Button>
      </motion.div>
    </section>
  );
}
