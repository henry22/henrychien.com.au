"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";

const skillsTree = {
  frontend: {
    name: "Frontend Development",
    description: "Building beautiful, responsive user interfaces",
    icon: "/icons/frontend.svg",
    colors: {
      light: "#2563eb",
      dark: "#60a5fa",
    },
    skills: [
      {
        name: "Next.js",
        description:
          "Building modern web applications with server-side rendering",
        icon: "/icons/nextjs.svg",
        colors: {
          light: "#000000",
          dark: "#ffffff",
        },
        subSkills: [
          "App Router",
          "Page Router",
          "Server Actions",
          "Dynamic routes",
          "Parallel Routes",
          "Data Streaming",
        ],
      },
      {
        name: "React",
        description: "Building modern web applications with React",
        icon: "/icons/react.svg",
        colors: {
          light: "#087ea4",
          dark: "#61dafb",
        },
        subSkills: [
          "Functional Components",
          "Hooks",
          "Context API",
          "JSX",
          "RSC's",
        ],
      },
      {
        name: "Third Party Libraries",
        description: "React packages",
        icon: "/icons/packages.svg",
        colors: {
          light: "#7c3aed",
          dark: "#a78bfa",
        },
        subSkills: [
          "React Hook Form",
          "React Router",
          "Tanstack Query",
          "Zustand",
        ],
      },
      {
        name: "Authentication",
        description: "Building secure authentication systems",
        icon: "/icons/auth.svg",
        colors: {
          light: "#ff6b6b",
          dark: "#ff4500",
        },
        subSkills: ["Clerk", "Next Auth", "Auth0", "Self Rolled"],
      },
      {
        name: "TypeScript",
        description: "Type-safe development for scalable applications",
        icon: "/icons/typescript.svg",
        colors: {
          light: "#3178c6",
          dark: "#3178c6",
        },
        subSkills: [
          "Generics",
          "Union Types",
          "Discriminated Unions",
          "As const",
          "type narrowing",
          "TypeOf & Keyof",
          "Type Inference",
          "Decorators",
          "Zod",
        ],
      },
      {
        name: "UI & Styling",
        description: "Creating beautiful and responsive interfaces",
        icon: "/icons/tailwind.svg",
        colors: {
          light: "#06b6d4",
          dark: "#06b6d4",
        },
        subSkills: [
          "Tailwind CSS",
          "ShadCN",
          "Radix UI",
          "Styled Components",
          "Charka UI",
          "Ant Design",
          "CSS",
        ],
      },
    ],
  },
  backend: {
    name: "Backend Development",
    description: "Building scalable server-side applications",
    icon: "/icons/backend.svg",
    colors: {
      light: "#7c3aed", // Purple-600
      dark: "#a78bfa", // Purple-400
    },
    skills: [
      {
        name: "Next.js",
        description: "Building server-side applications with Next.js",
        icon: "/icons/nextjs.svg",
        colors: {
          light: "#000000",
          dark: "#ffffff",
        },
        subSkills: ["Server Components", "API Routes", "Server Actions"],
      },
      {
        name: "Node.js",
        description: "Server-side JavaScript runtime",
        icon: "/icons/nodejs.svg",
        colors: {
          light: "#339933",
          dark: "#339933",
        },
        subSkills: ["Express", "REST APIs"],
      },
      {
        name: "Databases",
        description: "Data storage and management",
        icon: "/icons/database.svg",
        colors: {
          light: "#336791",
          dark: "#336791",
        },
        subSkills: ["PostgreSQL", "Prisma", "Supabase", "Drizzle"],
      },
      {
        name: "CMS",
        description: "Content Management Systems",
        icon: "/icons/cms.svg",
        colors: {
          light: "#6366f1",
          dark: "#ffd700",
        },
        subSkills: ["Sanity", "Contentful", "Storyblok", "Directus"],
      },
    ],
  },
};

function SkillsSection() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-16">
        Skills & Expertise
      </h2>
      <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto px-4">
        <SkillTree
          category={skillsTree.frontend}
          isExpanded={expandedCategories.includes("frontend")}
          onToggle={() => toggleCategory("frontend")}
        />
        <SkillTree
          category={skillsTree.backend}
          isExpanded={expandedCategories.includes("backend")}
          onToggle={() => toggleCategory("backend")}
        />
      </div>
    </section>
  );
}

function SkillTree({
  category,
  isExpanded,
  onToggle,
}: {
  category: any;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { theme } = useTheme();
  if (!theme) return null;
  const currentColor =
    theme === "dark" ? category.colors.dark : category.colors.light;

  return (
    <div className="relative">
      {/* Main Category Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <Card
          className="relative border-2 cursor-pointer hover:shadow-md transition-shadow"
          style={{ borderColor: currentColor }}
          onClick={onToggle}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${currentColor}20` }}
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-10 h-10"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{category.name}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              {isExpanded ? (
                <ChevronDown className="w-6 h-6 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skills List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 relative overflow-hidden"
          >
            {/* Vertical Line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-0.5"
              style={{ backgroundColor: currentColor }}
            />

            {category.skills.map((skill: any, index: number) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-16"
              >
                {/* Horizontal Line */}
                <div
                  className="absolute left-8 top-8 w-8 h-0.5"
                  style={{ backgroundColor: currentColor }}
                />

                <Card className="relative hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${skill.colors[theme]}20` }}
                      >
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-8 h-8"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {skill.description}
                        </p>
                      </div>
                    </div>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2">
                      {skill.subSkills.map((subSkill: string) => (
                        <span
                          key={subSkill}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{
                            backgroundColor: `${skill.colors[theme]}20`,
                            color: skill.colors[theme],
                          }}
                        >
                          {subSkill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SkillsSection;
