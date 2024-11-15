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
import { Book, Clock, Play } from "lucide-react";

const workshops = [
  {
    title: "Workshop 1",
    thumbnail: "/images/workshop1.png",
    level: "Beginner",
    duration: "1 hour",
    resources: [
      {
        title: "Resource 1",
        link: "https://example.com",
      },
    ],
    description: "A workshop description",
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
            Technical Workshops
          </motion.h1>
          <p className="text-muted-foreground text-lg">
            Deep-dive video workshops on modern web development
          </p>
        </header>

        <div className="grid gap-8">
          {/* Filter/Search Section */}
          <div className="bg-card p-4 rounded-lg mb-8">
            <div className="flex gap-4 flex-wrap">
              <Input placeholder="Search workshops..." className="max-w-xs" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">Under 1 hour</SelectItem>
                  <SelectItem value="1-3">1-3 hours</SelectItem>
                  <SelectItem value="3+">3+ hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop) => (
              <motion.div
                key={workshop.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary">
                        <Play className="mr-2 h-4 w-4" />
                        Watch Now
                      </Button>
                    </div>
                    <img
                      src={workshop.thumbnail}
                      alt={workshop.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge
                      variant={
                        workshop.level === "Beginner"
                          ? "default"
                          : workshop.level === "Intermediate"
                          ? "secondary"
                          : "destructive"
                      }
                      className="mb-2"
                    >
                      {workshop.level}
                    </Badge>
                    <h3 className="font-semibold mb-2">{workshop.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {workshop.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {workshop.duration}
                      </div>
                      <div className="flex items-center">
                        <Book className="w-4 h-4 mr-1" />
                        {workshop.resources.length} Resources
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
