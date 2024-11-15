"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { WorkshopCard } from "@/components/cards/workshop-card";
import { workshops } from "@/lib/data";

export function FeaturedWorkshops() {
  return (
    <section className="py-20">
      <div className="flex justify-between items-center mb-12">
        <h3 className="text-3xl font-bold">Featured Workshops</h3>
        <Link href="/workshops">
          <Button variant="outline">
            View All Workshops
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid gap-8">
        {workshops.slice(0, 3).map((workshop) => (
          <WorkshopCard key={workshop.title} workshop={workshop} />
        ))}
      </div>
    </section>
  );
}
