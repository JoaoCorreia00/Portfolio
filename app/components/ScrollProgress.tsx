"use client";

import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, SectionId } from "../lib/constants";

interface ScrollProgressProps {
  isLoading: boolean;
  scrollProgress: number;
  activeSection: SectionId;
}

export default function ScrollProgress({ isLoading, scrollProgress, activeSection }: ScrollProgressProps) {
  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {!isLoading && (
        <motion.div
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          {/* Progress dots */}
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="group relative flex items-center"
                  title={item.label}
                >
                  {/* Tooltip */}
                  <span className="absolute left-8 bg-white/10 backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.label}
                  </span>
                  
                  {/* Dot */}
                  <motion.div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? "bg-white scale-125" : "bg-white/30 group-hover:bg-white/60"
                    }`}
                    animate={{
                      boxShadow: isActive ? "0 0 8px rgba(255,255,255,0.8)" : "none"
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Vertical progress line */}
          <motion.div
            className="absolute left-[3px] top-2 w-[2px] bg-white/20"
            style={{ height: "calc(100% - 16px)" }}
          >
            <motion.div
              className="w-full bg-white"
              style={{
                height: `${scrollProgress}%`,
                position: "absolute",
                top: 0,
              }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
