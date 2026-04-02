"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "../lib/constants";

interface ProjectCardProps {
  project: Project;
}

// Determine if images are likely mobile (portrait) based on filename patterns
const isMobileProject = (screenshots: string[]) => {
  // Cat Breed Android app is mobile
  return screenshots.some(s => s.toLowerCase().includes("cat_breed"));
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const hasMultipleScreenshots = project.screenshots.length > 1;
  const isMobile = isMobileProject(project.screenshots);

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % project.screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot(
      (prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length
    );
  };

  // Calculate technology tag width for better wrapping
  const getTechCountClass = () => {
    const count = project.technologies.length;
    if (count <= 3) return "text-xs";
    if (count <= 5) return "text-xs";
    return "text-[10px]";
  };

  return (
    <div className="group relative bg-[#161d27] rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500">
      {/* Main Content Grid */}
      <div className={`flex flex-col ${isMobile ? 'lg:flex-row' : 'lg:flex-col'}`}>
        
        {/* Screenshot Section - Takes more space for mobile to show phone-like aspect */}
        <div className={`
          relative overflow-hidden bg-[#0a0e14] 
          ${isMobile ? 'lg:w-1/2 lg:min-h-[610px]' : 'w-full h-64 lg:h-[320px]'}
        `}>
          <Image
            src={project.screenshots[currentScreenshot]}
            alt={`${project.title} screenshot ${currentScreenshot + 1}`}
            fill
            className="object-fill"
            priority
            unoptimized
          />

          {/* Carousel Controls */}
          {hasMultipleScreenshots && (
            <>
              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  prevScreenshot();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 hover:bg-black/80 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm z-10"
                aria-label="Previous screenshot"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  nextScreenshot();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 hover:bg-black/80 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm z-10"
                aria-label="Next screenshot"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {project.screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentScreenshot(index);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentScreenshot
                        ? "bg-white w-6"
                        : "bg-white/40 hover:bg-white/60 w-1.5"
                    }`}
                    aria-label={`Go to screenshot ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Screenshot Count Badge */}
          {hasMultipleScreenshots && (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white/90 font-medium">
              {currentScreenshot + 1}/{project.screenshots.length}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className={`p-5 lg:p-6 flex flex-col ${isMobile ? 'lg:w-1/2' : 'w-full'}`}>
          {/* Title & Description */}
          <div className="mb-4">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies - Flexible wrap */}
          <div className="mb-5">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className={`
                    px-2.5 py-1 font-medium text-gray-300 bg-gray-700/40 rounded-lg 
                    border border-gray-600/30 hover:border-gray-500/60 hover:bg-gray-600/40 
                    transition-all duration-300 whitespace-nowrap
                    ${getTechCountClass()}
                  `}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links - Adaptive layout */}
          <div className="mt-auto pt-4 px-2">
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3">
              {/* Live URL */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Live Demo
                </a>
              )}

              {/* Frontend GitHub */}
              {project.githubUrlFrontend && (
                <a
                  href={project.githubUrlFrontend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700/50 hover:bg-gray-600/70 text-white text-sm font-medium rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  {project.id === "4" ? "Frontend" : "Github"}
                </a>
              )}

              {/* Backend GitHub */}
              {project.githubUrlBackend && (
                <a
                  href={project.githubUrlBackend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700/50 hover:bg-gray-600/70 text-white text-sm font-medium rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  {project.id === "4" ? "Backend" : "Github"}
                </a>
              )}
            </div>

            {/* No links message */}
            {!project.liveUrl && !project.githubUrlFrontend && !project.githubUrlBackend && (
              <div className="w-full text-center p-4 pb-8">
                <p className="text-xs text-gray-500 italic">
                  No live demo or repository available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
