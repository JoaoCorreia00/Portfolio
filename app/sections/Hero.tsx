"use client";

import { motion } from "framer-motion";
import AbstractWaveGrid from "../components/AbstractWaveGrid";

interface HeroProps {
  typedText: string;
  isTypingDone: boolean;
  hasScrolled: boolean;
}

export default function Hero({ typedText, isTypingDone, hasScrolled }: HeroProps) {
  return (
    <section id="home" className="relative h-screen overflow-hidden section-boundary">
      {/* Abstract Wave Grid background - fades in after loader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
      >
        <AbstractWaveGrid />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-8 text-white text-center">

        {/* Title with typing animation */}
        {/* The J starts scaled-up (like the loader's J) and shrinks down to title size */}
        <motion.h1
          className="text-7xl md:text-8xl font-bold mb-6 flex items-center text-white"
          initial={{ opacity: 0, scale: 2.8, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span>{typedText}</span>
          {/* Cursor spacing - visible during typing, replaced by invisible spacer when done */}
          {isTypingDone ? (
            <span className="cursor-spacing" aria-hidden="true" />
          ) : (
            <span className="typing-cursor" aria-hidden="true" />
          )}
        </motion.h1>

        <motion.h2
          className="text-3xl md:text-4xl text-gray-300 mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Fullstack Developer
        </motion.h2>
        <motion.p
          className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          I create end-to-end web applications with performance, design, and scalability in mind.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-6 mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <button 
            className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105"
            onClick={() => {
              window.open('/CV_JoaoCorreia.pdf', '_blank');
            }}
          >
            Download CV
          </button>
          <button
            className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact
          </button>
        </motion.div>
        <motion.p
          className="text-base text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          Based in Portugal • Available for work
        </motion.p>
      </div>

      {/* Bottom Scroll Hint - fades out on scroll */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Only animate when not scrolled */}
        {hasScrolled ? (
          <div className="flex flex-col items-center">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white rounded-full mt-2" />
            </div>
            <span className="text-xs mt-2">Scroll</span>
          </div>
        ) : (
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 bg-white rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-xs mt-2">Scroll</span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

