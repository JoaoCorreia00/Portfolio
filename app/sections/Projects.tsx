"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "../lib/constants";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen text-white px-4 sm:px-6 md:px-12 lg:px-16 py-32">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Projects <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500"></span>
          </h2>
          <motion.div
            className="w-24 md:w-32 h-[3px] bg-gradient-to-r from-white via-blue-400 to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
          <p className="text-gray-400 mt-4 max-w-2xl text-sm sm:text-base">
            A collection of projects I&apos;ve worked on, showcasing my skills in full-stack development,
            design, and problem-solving.
          </p>
        </motion.div>

        {/* Projects Grid - Responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
