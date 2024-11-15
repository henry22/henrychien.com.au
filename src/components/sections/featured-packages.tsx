"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PackageCard } from "@/components/cards/package-card";
import { myPackages } from "@/lib/data";

export function FeaturedPackages() {
  return (
    <section className="py-20">
      <div className="flex justify-between items-center mb-12">
        <h3 className="text-3xl font-bold">Featured Packages</h3>
        <Link href="/packages">
          <Button variant="outline">
            View All Packages
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid gap-8">
        {myPackages.slice(0, 3).map((pkg) => (
          <PackageCard key={pkg.name} pkg={pkg} />
        ))}
      </div>
    </section>
  );
}
