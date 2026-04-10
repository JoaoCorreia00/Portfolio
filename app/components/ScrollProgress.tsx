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
          {/* Progress dots with enhanced animations */}
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item, index) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              const isPassed = NAV_ITEMS.findIndex(nav => nav.href.replace("#", "") === activeSection) > index;

              return (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="group relative flex items-center"
                  title={item.label}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Enhanced Tooltip */}
                  <motion.span
                    className="absolute left-8 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap border border-white/10"
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                  >
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-black/80"></div>
                  </motion.span>

                  {/* Enhanced Dot with section states */}
                  <motion.div
                    className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
                      isActive
                        ? "bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                        : isPassed
                        ? "bg-white/70"
                        : "bg-white/30 group-hover:bg-white/60"
                    }`}
                    animate={{
                      scale: isActive ? 1.3 : 1,
                      boxShadow: isActive ? "0 0 20px rgba(59,130,246,0.9)" : "none"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Inner pulse for active section */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-blue-400"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.8, 0, 0.8]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.div>
                </motion.button>
              );
            })}
          </div>

          {/* Enhanced vertical progress line */}
          <div
            className="absolute left-[5px] top-2 w-[2px] bg-white/10 rounded-full"
            style={{ height: "calc(100% - 16px)" }}
          >
            {/* Background track */}
            <div className="w-full h-full bg-gradient-to-b from-white/20 via-white/10 to-white/5 rounded-full" />

            {/* Animated progress fill */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 via-blue-300 to-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              style={{
                height: `${scrollProgress}%`,
              }}
              animate={{
                background: scrollProgress > 80
                  ? "linear-gradient(to bottom, #10b981, #059669, #047857)"
                  : "linear-gradient(to bottom, #3b82f6, #60a5fa, #93c5fd)"
              }}
              transition={{
                height: { duration: 0.3, ease: "easeOut" },
                background: { duration: 0.5 }
              }}
            />

            {/* Progress glow effect */}
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full"
              style={{
                height: `${scrollProgress}%`,
                background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)",
                filter: "blur(2px)"
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
