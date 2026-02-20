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
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section - Full Viewport Height */}
            <section className="relative h-screen overflow-hidden">
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
            </section>

            {/* About Me Section */}
            <section className="min-h-screen text-white px-8 md:px-20 py-60">
              <div className="max-w-6xl mx-auto">
                {/* Section Title */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    About <span className="text-gray-400">Me</span>
                  </h2>
                  <div className="w-24 h-[2px] bg-gradient-to-r from-white to-transparent mb-16" />
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  {/* Left Column - Text Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-200">
                      Full-Stack Developer Based in Portugal
                    </h3>
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                      I'm a full-stack web developer focused on building scalable, 
                      performance-driven applications with clean architecture and 
                      maintainable code. I work mainly within the JavaScript ecosystem 
                      and PHP environments, using frameworks like Vue, React, Node.js 
                      and Laminas.
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed mb-8">
                      I've contributed to legacy migrations, authentication systems and complex API integrations, ensuring reliability and maintainability across evolving platforms. I aim to bridge backend logic with thoughtful frontend implementation, aligning performance with user experience.
                    </p>
                    
                  </motion.div>

                  {/* Right Column - Visual Element */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative"
                  >
                    {/* Decorative Card with Code Snippet Aesthetic */}
                    <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
                      
                      {/* Code-style decorative content */}
                      <div className="space-y-4 font-mono text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-pink-400">const</span>
                          <span className="text-blue-400">developer</span>
                          <span className="text-gray-500">=</span>
                          <span className="text-yellow-300">{`{`}</span>
                        </div>
                        <div className="pl-8 space-y-2">
                          <div className="flex gap-2">
                            <span className="text-gray-500">name:</span>
                            <span className="text-green-400">"João Correia"</span>
                            <span className="text-gray-500">,</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-500">location:</span>
                            <span className="text-green-400">"Portugal"</span>
                            <span className="text-gray-500">,</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-500">role:</span>
                            <span className="text-green-400">"Full-Stack Developer"</span>
                            <span className="text-gray-500">,</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-500">expertise:</span>
                            <span className="text-yellow-300">[</span>
                          </div>
                          <div className="pl-8">
                            <span className="text-green-400">"Full-Stack Development"</span><span className="text-gray-500">,</span>
                          </div>
                          <div className="pl-8">
                            <span className="text-green-400">"API Integrations"</span><span className="text-gray-500">,</span>
                          </div>
                          <div className="pl-8">
                            <span className="text-green-400">"Authentication Systems"</span><span className="text-gray-500">,</span>
                          </div>
                          <div className="pl-8">
                            <span className="text-green-400">"Legacy System Migration"</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-yellow-300">]</span>
                            <span className="text-gray-500">;</span>
                          </div>
                        </div>
                        <div className="text-yellow-300">{`}`}</div>
                      </div>

                      {/* Animated cursor */}
                      <motion.div
                        className="absolute bottom-8 right-8 w-2 h-2 bg-white rounded-full"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
