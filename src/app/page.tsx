"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  ArrowUp,
  Download,
  Book,
  Clock,
  Bookmark,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SkillsSection from "@/components/skills";
import { Badge } from "@/components/ui/badge";

type Project = {
  name: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  image: string;
};

type Package = {
  name: string;
  description: string;
  downloads: number;
  version: string;
  npmLink: string;
  githubLink: string;
  documentation: string;
  tags: string[];
  image: string;
};

type Workshop = {
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  upcoming?: {
    date: string;
    location: string;
    registrationLink: string;
  };
  recordingLink?: string;
  resources: string[];
};

const projects: Project[] = [
  {
    name: "SaaS Dashboard",
    description:
      "A comprehensive dashboard for SaaS analytics with real-time data visualization",
    tech: ["Next.js", "React", "D3.js", "Tailwind CSS"],
    link: "https://example.com/saas-dashboard",
    github: "https://github.com/yourusername/saas-dashboard",
    image: "/projects/saas-dashboard.png",
  },
  {
    name: "E-commerce Platform",
    description:
      "A modern e-commerce solution with real-time inventory and AI-powered recommendations",
    tech: ["React", "Node.js", "MongoDB", "TensorFlow.js"],
    link: "https://example.com/ecommerce-platform",
    github: "https://github.com/yourusername/ecommerce-platform",
    image: "/projects/ecommerce-platform.png",
  },
  {
    name: "Social Media App",
    description:
      "A NextJS-based social media application with real-time features and end-to-end encryption",
    tech: ["Next.js", "TypeScript", "Socket.io", "PostgreSQL"],
    link: "https://example.com/social-media-app",
    github: "https://github.com/yourusername/social-media-app",
    image: "/projects/social-media-app.png",
  },
];

const myPackages: Package[] = [
  {
    name: "@mdeal/react-hooks",
    description:
      "A collection of custom React hooks for common UI patterns and animations",
    downloads: 50000,
    version: "2.1.0",
    npmLink: "https://www.npmjs.com/package/@mdeal/react-hooks",
    githubLink: "https://github.com/mdeal/react-hooks",
    documentation: "https://react-hooks.mdeal.dev",
    tags: ["React", "Hooks", "TypeScript", "Animation"],
    image: "/projects/saas-dashboard.png",
  },
  // Add more packages...
];

const workshops: Workshop[] = [
  {
    title: "Advanced React Patterns",
    description:
      "Deep dive into advanced React patterns including compound components, render props, and custom hooks",
    duration: "6 hours",
    level: "Advanced",
    topics: [
      "Compound Components",
      "Render Props",
      "Custom Hooks",
      "Performance",
    ],
    upcoming: {
      date: "2024-06-15",
      location: "Virtual",
      registrationLink: "https://workshops.mdeal.dev/react-patterns",
    },
    recordingLink: "https://workshops.mdeal.dev/react-patterns/recording",
    resources: ["Slides", "Code Examples", "Exercise Files"],
  },
  // Add more workshops...
];

function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed w-4 h-4 bg-primary rounded-full mix-blend-difference pointer-events-none z-50"
      animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.pageYOffset > 500);
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <motion.button
      className="fixed bottom-8 right-8 p-3 bg-primary rounded-full text-white shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      whileHover={{ scale: 1.1 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="w-6 h-6" />
    </motion.button>
  );
}

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
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
      <CustomCursor />
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
        <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <motion.h1
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Matt Deal
            </motion.h1>
            <div className="flex items-center space-x-4">
              <a
                href="#about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#skills"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Projects
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32">
          <HeroSection />
          <SkillsSection />
          <ProjectsSection projects={projects} />
          <PackagesSection packages={myPackages} />
          <WorkshopsSection workshops={workshops} />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative py-20 flex flex-col items-center justify-center text-center min-h-screen">
      <ParticlesBackground />
      <motion.div
        className="relative z-10 space-y-6 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Crafting Digital Experiences
        </motion.h2>
        <motion.p
          className="text-xl sm:text-2xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Full-stack developer specializing in React and Next.js
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20"
          >
            Contact Me
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ParticlesBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
    }[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius
        );
        gradient.addColorStop(0, "rgba(66, 153, 225, 0.6)");
        gradient.addColorStop(1, "rgba(66, 153, 225, 0)");
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx = -p.dx;
        if (p.y < 0 || p.y > canvas.height) p.dy = -p.dy;
      }
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 z-0" />;
}

function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-20">
      <h3 className="text-3xl font-bold mb-12 text-center">
        Featured Projects
      </h3>
      <div className="space-y-20">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-semibold mb-2">{project.name}</h4>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.1 }}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded text-sm cursor-pointer"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" asChild className="flex-1">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub <Github className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function AboutSection() {
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
            <img
              src="/profile-picture.jpg"
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

function PackagesSection({ packages }: { packages: Package[] }) {
  return (
    <section id="packages" className="py-20">
      <h3 className="text-3xl font-bold mb-12 text-center">
        Featured Packages
      </h3>
      <div className="grid gap-8">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black rounded-lg overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="bg-gray-800 p-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-white ml-2 text-sm font-mono">
                npm install {pkg.name}
              </span>
            </div>

            {/* Package Content */}
            <div className="p-6 font-mono text-sm">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <h4 className="text-green-400 text-lg">
                    {pkg.name}@{pkg.version}
                  </h4>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Download className="w-4 h-4" />
                    <span>
                      {pkg.downloads.toLocaleString()} downloads per month
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-gray-300 mb-4">{pkg.description}</div>

              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">$</span>
                  {pkg.tags.map((tag) => (
                    <span key={tag} className="bg-gray-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">$</span>
                  <a
                    href={pkg.npmLink}
                    className="text-blue-400 hover:underline"
                  >
                    npm
                  </a>
                  <a
                    href={pkg.githubLink}
                    className="text-blue-400 hover:underline"
                  >
                    github
                  </a>
                  <a
                    href={pkg.documentation}
                    className="text-blue-400 hover:underline"
                  >
                    docs
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WorkshopsSection({ workshops }: { workshops: Workshop[] }) {
  return (
    <section id="workshops" className="py-20">
      <h3 className="text-3xl font-bold mb-12 text-center">
        Technical Workshops
      </h3>
      <div className="grid gap-8">
        {workshops.map((workshop) => (
          <motion.div
            key={workshop.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid md:grid-cols-[2fr,1fr] gap-6 bg-card rounded-xl overflow-hidden shadow-lg">
              {/* Main Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge
                    variant={
                      workshop.level === "Beginner"
                        ? "default"
                        : workshop.level === "Intermediate"
                        ? "secondary"
                        : "destructive"
                    }
                    className="rounded-full"
                  >
                    {workshop.level}
                  </Badge>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {workshop.duration}
                  </div>
                </div>

                <h4 className="text-2xl font-bold mb-3">{workshop.title}</h4>
                <p className="text-muted-foreground mb-6">
                  {workshop.description}
                </p>

                <div className="space-y-4">
                  <h5 className="font-semibold">Workshop Content:</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {workshop.topics.map((topic) => (
                      <div key={topic} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Side Panel */}
              <div className="bg-muted p-6 flex flex-col gap-4">
                <Button className="w-full" size="lg" asChild>
                  <a href={workshop.recordingLink}>
                    <Play className="w-4 h-4 mr-2" />
                    Watch Workshop
                  </a>
                </Button>

                <div className="bg-background p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Workshop Resources</h5>
                  <ul className="text-sm space-y-2">
                    {workshop.resources.map((resource) => (
                      <li key={resource} className="flex items-center gap-2">
                        {resource === "Code Examples" ? (
                          <Github className="w-4 h-4" />
                        ) : resource === "Slides" ? (
                          <Book className="w-4 h-4" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                        {resource}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Access includes:</p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Full workshop recording
                    </li>
                    <li className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      Source code repository
                    </li>
                    <li className="flex items-center gap-2">
                      <Book className="w-4 h-4" />
                      Written documentation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-muted-foreground mb-4 md:mb-0">
          © 2024 Matt Deal. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary dark:hover:text-primary"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary dark:hover:text-primary"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary dark:hover:text-primary"
          >
            <Twitter className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
