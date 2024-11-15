"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/cards/project-card";
import { useProjects } from "@/lib/hooks/usePortfolioData";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedProjects() {
  const { data: projects, isLoading, error } = useProjects();

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load projects</p>
      </div>
    );
  }

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
        {isLoading
          ? // Loading skeletons
            Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-[400px] rounded-lg">
                  <Skeleton className="w-full h-full" />
                </div>
              ))
          : projects
              ?.slice(0, 3)
              .map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                />
              ))}
      </div>
    </section>
  );
}
