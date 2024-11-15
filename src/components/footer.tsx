import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-muted-foreground mb-4 md:mb-0">
          © 2024 Matt Deal. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary dark:hover:text-primary"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary dark:hover:text-primary"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary dark:hover:text-primary"
          >
            <Twitter className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
