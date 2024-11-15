"use client";

import { motion } from "framer-motion";
import type { Package } from "@/lib/data";

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-black rounded-lg overflow-hidden"
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 p-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-white ml-2 text-sm font-mono">
          npm install {pkg.name}
        </span>
      </div>

      {/* Package Content */}
      <div className="p-6 font-mono text-sm">
        <div className="flex items-center gap-4 mb-6">
          <div>
            <h4 className="text-green-400 text-lg">
              {pkg.name}@{pkg.version}
            </h4>
          </div>
        </div>

        <div className="text-gray-300 mb-4">{pkg.description}</div>

        <div className="space-y-2 text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">$</span>
            {pkg.tags.map((tag) => (
              <span key={tag} className="bg-gray-800 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-yellow-500">$</span>
            <a href={pkg.githubLink} className="text-blue-400 hover:underline">
              github
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
