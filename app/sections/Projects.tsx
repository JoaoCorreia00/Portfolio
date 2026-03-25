"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "../lib/constants";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const projectsPerView = 2; // Show 2 cards at a time on larger screens
  const maxIndex = Math.max(0, PROJECTS.length - projectsPerView);

  const nextProjects = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevProjects = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const visibleProjects = PROJECTS.slice(currentIndex, currentIndex + projectsPerView);
  const hasMultiplePages = PROJECTS.length > projectsPerView;

  return (
    <section id="projects" className="min-h-screen text-white px-6 md:px-16 py-40">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Projects <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500"></span>
          </h2>
          <motion.div
            className="w-32 h-[3px] bg-gradient-to-r from-white via-blue-400 to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
          <p className="text-gray-400 mt-4 max-w-2xl">
            A collection of projects I&apos;ve worked on, showcasing my skills in full-stack development,
            design, and problem-solving.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {hasMultiplePages && (
            <>
              <button
                onClick={prevProjects}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                  currentIndex === 0
                    ? "bg-gray-800/50 text-gray-600 cursor-not-allowed"
                    : "bg-gray-800/80 hover:bg-gray-700 text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                }`}
                aria-label="Previous projects"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={nextProjects}
                disabled={currentIndex === maxIndex}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                  currentIndex === maxIndex
                    ? "bg-gray-800/50 text-gray-600 cursor-not-allowed"
                    : "bg-gray-800/80 hover:bg-gray-700 text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                }`}
                aria-label="Next projects"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}

          {/* Cards Carousel */}
          <div className="overflow-hidden px-2">
            <motion.div
              key={currentIndex}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          {hasMultiplePages && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-blue-400 to-purple-400 w-8"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Project Count */}
        <motion.p
          className="text-center text-gray-500 text-sm mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Showing {currentIndex + 1}-{Math.min(currentIndex + projectsPerView, PROJECTS.length)} of {PROJECTS.length} projects
        </motion.p>
      </div>
    </section>
  );
}
