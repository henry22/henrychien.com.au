"use client";

import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ExternalLink, Github, Grid, List } from "lucide-react";

const projects = [
  {
    title: "Project 1",
    image: "/images/project1.png",
    description: "A project description",
    tech: ["React", "Next.js", "TypeScript"],
    features: ["Feature 1", "Feature 2", "Feature 3"],
    demo: "https://example.com",
    github: "https://github.com/example/project1",
  },
  {
    title: "Project 2",
    image: "/images/project2.png",
    description: "A project description",
    tech: ["React", "Next.js", "TypeScript"],
    features: ["Feature 1", "Feature 2", "Feature 3"],
    demo: "https://example.com",
    github: "https://github.com/example/project2",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Featured Projects
          </motion.h1>
          <p className="text-muted-foreground text-lg">
            A collection of my favorite projects and applications
          </p>
        </header>

        {/* Filter Bar */}
        <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-sm mb-8 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <Input placeholder="Search projects..." className="max-w-xs" />
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tech Stack" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="nextjs">Next.js</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                {/* Add more tech options */}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web">Web App</SelectItem>
                <SelectItem value="mobile">Mobile App</SelectItem>
                <SelectItem value="desktop">Desktop App</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm">
                <Grid className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Project Preview */}
                  <div className="relative aspect-video group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                    <div
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                                  transition-opacity flex items-center justify-center gap-4"
                    >
                      <Button asChild>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Demo
                        </a>
                      </Button>
                      <Button variant="secondary" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Source Code
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-2">
                          Key Features
                        </h4>
                        <ul className="grid grid-cols-2 gap-2 text-sm">
                          {project.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2"
                            >
                              <Check className="w-4 h-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
