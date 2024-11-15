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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Link from "next/link";
import { Package, Download, Github } from "lucide-react";

const myPackages = [
  {
    name: "react-use-localstorage",
    version: "1.0.0",
    downloads: 1000,
    npmLink: "https://www.npmjs.com/package/react-use-localstorage",
    githubLink: "https://github.com/yourusername/react-use-localstorage",
    description: "A React hook for local storage",
    tags: ["React", "Hooks", "Local Storage"],
    documentation: "/docs/react-use-localstorage",
    changelog: "/changelog/react-use-localstorage",
    issues: "/issues/react-use-localstorage",
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
            NPM Packages
          </motion.h1>
          <p className="text-muted-foreground text-lg">
            Open source packages and tools for developers
          </p>
        </header>

        {/* Search/Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search packages..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="downloads">Most Downloads</SelectItem>
                <SelectItem value="recent">Recently Updated</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid gap-6">
          {myPackages.map((pkg) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-mono font-bold text-primary mb-1">
                        {pkg.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Package className="w-4 h-4" />v{pkg.version}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {pkg.downloads.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={pkg.npmLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          NPM
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={pkg.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {pkg.description}
                  </p>

                  {/* Installation Command */}
                  <div className="bg-muted p-3 rounded-lg font-mono text-sm mb-4 group-hover:bg-primary/5 transition-colors">
                    <code>npm install {pkg.name}</code>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {pkg.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Quick Links */}
                  <div className="mt-4 pt-4 border-t flex gap-4">
                    <Link
                      href={pkg.documentation}
                      className="text-sm text-primary hover:underline"
                    >
                      Documentation
                    </Link>
                    <Link
                      href={pkg.changelog}
                      className="text-sm text-primary hover:underline"
                    >
                      Changelog
                    </Link>
                    <Link
                      href={pkg.issues}
                      className="text-sm text-primary hover:underline"
                    >
                      Issues
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
