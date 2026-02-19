"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import AbstractWaveGrid from "./components/AbstractWaveGrid";

const FULL_NAME = "João Correia";
// The J is already the first char; we type the rest after
const TYPE_REST = FULL_NAME.slice(1); // "oão Correia"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [typedText, setTypedText] = useState("J");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  // Start typing animation once loader is gone
  useEffect(() => {
    if (isLoading) return;

    // Wait for the J entrance animation to finish before typing starts
    let charIndex = 0;
    const typingDelay = setTimeout(() => {
      const interval = setInterval(() => {
        charIndex++;
        setTypedText("J" + TYPE_REST.slice(0, charIndex));
        if (charIndex === TYPE_REST.length) {
          clearInterval(interval);
          // Remove cursor after a short pause
          setTimeout(() => setIsTypingDone(true), 600);
        }
      }, 80); // ~80ms per character
      return () => clearInterval(interval);
    }, 900); // let the J entrance animation finish first (~0.8s)

    return () => clearTimeout(typingDelay);
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader />}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="content"
            className="relative h-screen overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Abstract Wave Grid background */}
          <AbstractWaveGrid />

          {/* Main Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full px-8 text-white text-center">

              {/* Title with typing animation */}
              {/* The J starts scaled-up (like the loader's J) and shrinks down to title size */}
              <motion.h1
                className="text-7xl md:text-8xl font-bold mb-6 flex items-center"
                initial={{ opacity: 0, scale: 2.8, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span>{typedText}</span>
                {/* Blinking cursor — hidden once typing is complete */}
                {!isTypingDone && (
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
                <button className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                  Download CV
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
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

            {/* Bottom Scroll Hint */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
