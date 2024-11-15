export type Project = {
  name: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  image: string;
  features?: string[];
};

export type Package = {
  name: string;
  description: string;
  downloads: number;
  version: string;
  npmLink: string;
  githubLink: string;
  documentation: string;
  tags: string[];
  image: string;
};

export type Workshop = {
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  github?: string;
  upcoming?: {
    date: string;
    location: string;
    registrationLink: string;
  };
  recordingLink?: string;
  resources: string[];
};

export const projects: Project[] = [
  {
    name: "SaaS Dashboard",
    description:
      "A comprehensive dashboard for SaaS analytics with real-time data visualization",
    tech: ["Next.js", "React", "D3.js", "Tailwind CSS"],
    link: "https://example.com/saas-dashboard",
    github: "https://github.com/yourusername/saas-dashboard",
    image: "/projects/saas-dashboard.png",
  },
  {
    name: "E-commerce Platform",
    description:
      "A modern e-commerce solution with real-time inventory and AI-powered recommendations",
    tech: ["React", "Node.js", "MongoDB", "TensorFlow.js"],
    link: "https://example.com/ecommerce-platform",
    github: "https://github.com/yourusername/ecommerce-platform",
    image: "/projects/ecommerce-platform.png",
  },
  {
    name: "Social Media App",
    description:
      "A NextJS-based social media application with real-time features and end-to-end encryption",
    tech: ["Next.js", "TypeScript", "Socket.io", "PostgreSQL"],
    link: "https://example.com/social-media-app",
    github: "https://github.com/yourusername/social-media-app",
    image: "/projects/social-media-app.png",
  },
];

export const myPackages: Package[] = [
  {
    name: "@mdeal/react-hooks",
    description:
      "A collection of custom React hooks for common UI patterns and animations",
    downloads: 50000,
    version: "2.1.0",
    npmLink: "https://www.npmjs.com/package/@mdeal/react-hooks",
    githubLink: "https://github.com/mdeal/react-hooks",
    documentation: "https://react-hooks.mdeal.dev",
    tags: ["React", "Hooks", "TypeScript", "Animation"],
    image: "/projects/saas-dashboard.png",
  },
  {
    name: "@mdeal/ui",
    description:
      "A modern React UI component library with accessibility in mind",
    downloads: 75000,
    version: "3.0.0",
    npmLink: "https://www.npmjs.com/package/@mdeal/ui",
    githubLink: "https://github.com/mdeal/ui",
    documentation: "https://ui.mdeal.dev",
    tags: ["React", "Components", "UI", "Accessibility"],
    image: "/projects/ui-library.png",
  },
  {
    name: "@mdeal/forms",
    description:
      "Form validation and handling made simple for React applications",
    downloads: 35000,
    version: "1.5.0",
    npmLink: "https://www.npmjs.com/package/@mdeal/forms",
    githubLink: "https://github.com/mdeal/forms",
    documentation: "https://forms.mdeal.dev",
    tags: ["React", "Forms", "Validation", "TypeScript"],
    image: "/projects/forms.png",
  },
];

export const workshops: Workshop[] = [
  {
    title: "Advanced React Patterns",
    description:
      "Deep dive into advanced React patterns including compound components, render props, and custom hooks",
    duration: "6 hours",
    level: "Advanced",
    topics: [
      "Compound Components",
      "Render Props",
      "Custom Hooks",
      "Performance Optimization",
    ],
    github: "https://github.com/mdeal/react-patterns",
    upcoming: {
      date: "2024-06-15",
      location: "Virtual",
      registrationLink: "https://workshops.mdeal.dev/react-patterns",
    },
    recordingLink: "https://workshops.mdeal.dev/react-patterns/recording",
    resources: ["Slides", "Code Examples", "Exercise Files"],
  },
  {
    title: "Building with Next.js 14",
    description:
      "Learn to build modern web applications with Next.js 14 and its new features",
    duration: "8 hours",
    level: "Intermediate",
    topics: ["App Router", "Server Components", "Data Fetching", "API Routes"],
    github: "https://github.com/mdeal/nextjs-14",
    upcoming: {
      date: "2024-07-01",
      location: "Virtual",
      registrationLink: "https://workshops.mdeal.dev/nextjs",
    },
    recordingLink: "https://workshops.mdeal.dev/nextjs/recording",
    resources: ["Slides", "Code Examples", "Project Starter"],
  },
  {
    title: "TypeScript Fundamentals",
    description:
      "Master TypeScript basics and advanced concepts for better React development",
    duration: "4 hours",
    level: "Beginner",
    topics: [
      "Type Systems",
      "Interfaces & Types",
      "Generics",
      "React with TypeScript",
    ],
    github: "https://github.com/mdeal/typescript-fundamentals",
    upcoming: {
      date: "2024-05-20",
      location: "Virtual",
      registrationLink: "https://workshops.mdeal.dev/typescript",
    },
    recordingLink: "https://workshops.mdeal.dev/typescript/recording",
    resources: ["Slides", "Code Examples", "Cheat Sheet"],
  },
];
