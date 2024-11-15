"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const skills = [
  {
    name: "Next.js",
    icon: "/icons/nextjs.svg",
    color: "#000000",
    description:
      "Building fast and scalable web applications with server-side rendering and static site generation.",
    experience: "3 years",
  },
  {
    name: "React",
    icon: "/icons/react.svg",
    color: "#61DAFB",
    description:
      "Creating dynamic and responsive user interfaces with reusable components and efficient state management.",
    experience: "5 years",
  },
  {
    name: "TypeScript",
    icon: "/icons/typescript.svg",
    color: "#3178C6",
    description:
      "Enhancing JavaScript with static type-checking for more robust and maintainable code.",
    experience: "4 years",
  },
  {
    name: "Tailwind CSS",
    icon: "/icons/tailwind.svg",
    color: "#06B6D4",
    description:
      "Rapidly building custom designs with utility-first CSS framework for modern web applications.",
    experience: "3 years",
  },
  {
    name: "Node.js",
    icon: "/icons/nodejs.svg",
    color: "#339933",
    description:
      "Developing scalable backend services and APIs with JavaScript runtime built on Chromes V8 engine.",
    experience: "4 years",
  },
  {
    name: "GraphQL",
    icon: "/icons/graphql.svg",
    color: "#E10098",
    description:
      "Implementing efficient data querying and manipulation with a powerful API query language.",
    experience: "2 years",
  },
];

function SkillsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="skills" className="relative py-20">
      <h3 className="text-4xl font-bold mb-12 text-center">
        Skills & Technologies
      </h3>
      <div className="max-w-5xl mx-auto px-4">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                isSelected={index === selectedIndex}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className="rounded-full"
            aria-label="Previous skill"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className="rounded-full"
            aria-label="Next skill"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index, isSelected }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className="flex-[0_0_100%] min-w-0 pl-4 sm:pl-6 md:pl-8"
      style={{ scrollSnapAlign: "start" }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card
          className={`w-full h-full transition-all duration-300 ${
            isSelected ? "scale-100 opacity-100" : "scale-95 opacity-70"
          }`}
        >
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
                style={{ backgroundColor: `${skill.color}20` }}
              >
                <img src={skill.icon} alt={skill.name} className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-2xl font-semibold">{skill.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {skill.experience} of experience
                </p>
              </div>
            </div>
            <p className="text-muted-foreground flex-grow">
              {skill.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default SkillsSection;
