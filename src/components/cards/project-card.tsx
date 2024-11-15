"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
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

                {project.features && project.features.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-medium text-sm mb-3">Key Features:</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="flex-shrink-0 rounded-full bg-green-100 dark:bg-green-900 p-1">
                            <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-sm text-muted-foreground truncate">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col space-x-4">
                <div className="flex flex-wrap gap-2 mb-4 ">
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
                <Button variant="outline" asChild className="flex-1">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                {project.github && (
                  <Button variant="outline" asChild className="flex-1">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub <Github className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
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
