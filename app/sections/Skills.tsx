"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TECHNOLOGY_CATEGORIES, TechnologyCategory as TechCategoryType } from "../lib/constants";

const TechnologyCategory = React.memo(({ category }: { category: TechCategoryType }) => {
  // Category-specific accent colors
  const categoryColors: Record<string, { border: string; glow: string; gradient: string }> = {
    "Frontend": { border: "border-blue-500/30", glow: "hover:shadow-blue-500/20", gradient: "from-blue-500/10" },
    "Backend": { border: "border-purple-500/30", glow: "hover:shadow-purple-500/20", gradient: "from-purple-500/10" },
    "Databases": { border: "border-green-500/30", glow: "hover:shadow-green-500/20", gradient: "from-green-500/10" },
    "DevOps & Cloud": { border: "border-orange-500/30", glow: "hover:shadow-orange-500/20", gradient: "from-orange-500/10" },
    "Testing & Tools": { border: "border-pink-500/30", glow: "hover:shadow-pink-500/20", gradient: "from-pink-500/10" },
  };
  const colors = categoryColors[category.name] || { border: "border-gray-500/30", glow: "", gradient: "from-gray-500/10" };

  return (
    <motion.div
      className={`group relative bg-gradient-to-br ${colors.gradient} to-gray-900/40 rounded-2xl p-6 border ${colors.border} backdrop-blur-md hover:border-opacity-60 transition-all duration-500 hover:scale-[1.04] ${colors.glow} hover:shadow-lg`}
    >
      {/* Category Title */}
      <h3 className="text-xl font-semibold mb-6 text-center text-gray-200 border-b border-white/10 pb-3 relative">
        <span className="relative group-hover:text-white transition-colors duration-300">
          {category.name}
        </span>
      </h3>

      {/* Technology Icons Grid */}
      {category.technologies.length > 0 ? (
        <div className="grid grid-cols-3 gap-3">
          {category.technologies.map((tech) => (
            <div
              key={tech.name}
              className="group/tech flex flex-col items-center justify-center p-2 rounded-xl hover:bg-[#1c2532] transition-all duration-300 cursor-pointer"
            >
              {/* Icon Container with Hover Effect */}
              <motion.div
                className="relative w-10 h-10 mb-2"
                whileHover={{ scale: 1.2 }}
              >
                {/* Grey Icon (default) */}
                <Image
                  src={tech.greyIcon}
                  alt={tech.name}
                  fill
                  sizes="(max-width: 768px) 40px, 40px"
                  className="object-contain transition-all duration-300 group-hover/tech:scale-110 group-hover/tech:opacity-0"
                  
                />
                {/* Color Icon (on hover) */}
                <Image
                  src={tech.colorIcon}
                  alt={tech.name}
                  fill
                  sizes="(max-width: 768px) 40px, 40px"
                  className="object-contain opacity-0 transition-all duration-300 scale-90 group-hover/tech:opacity-100 group-hover/tech:scale-100"
                  loading="lazy"
                />
                
              </motion.div>
              {/* Technology Name */}
              <span className="text-[10px] text-gray-400 group-hover/tech:text-white transition-all duration-300 text-center leading-tight group-hover/tech:font-medium">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-24 text-gray-500 text-sm italic">
          Coming soon
        </div>
      )}
    </motion.div>
  );
});

TechnologyCategory.displayName = "TechnologyCategory";

export default function Skills() {
  return (
    <section id="skills" className="text-white px-6 md:px-16 py-[var(--section-padding)] section-boundary">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technologies <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500"></span>
          </h2>
          <motion.div
            className="w-32 h-[3px] bg-gradient-to-r from-white via-blue-400 to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
          <p className="text-gray-400 mt-4 max-w-2xl text-sm sm:text-base">
            A collection of technologies I&apos;ve worked with, showcasing my skills in full-stack development,
            design, and problem-solving.
          </p>
        </motion.div>

        {/* Technology Categories Grid - Enhanced Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9">
          {TECHNOLOGY_CATEGORIES.map((category) => (
            <TechnologyCategory key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
