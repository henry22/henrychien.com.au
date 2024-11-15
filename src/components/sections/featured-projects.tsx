"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/cards/project-card";
import { projects } from "@/lib/data";

export function FeaturedProjects() {
  return (
    <section className="py-20">
      <div className="flex justify-between items-center mb-12">
        <h3 className="text-3xl font-bold">Featured Projects</h3>
        <Link href="/projects">
          <Button variant="outline">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="space-y-20">
        {projects.slice(0, 3).map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
