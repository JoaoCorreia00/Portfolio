"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, lazy, Suspense } from "react";
import Loader from "./components/Loader";
import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import Footer from "./components/Footer";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useTypingAnimation } from "./hooks/useTypingAnimation";

// Lazy load heavy sections for better performance
const Hero = lazy(() => import("./sections/Hero"));
const About = lazy(() => import("./sections/About"));
const Skills = lazy(() => import("./sections/Skills"));
const Projects = lazy(() => import("./sections/Projects"));
const OtherProjects = lazy(() => import("./sections/OtherProjects"));
const Contact = lazy(() => import("./sections/Contact"));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Custom hooks for cleaner component logic
  const { scrollProgress, activeSection, hasScrolled } = useScrollProgress();
  const { typedText, isTypingDone } = useTypingAnimation(isLoading);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      
      {/* Navigation Bar */}
      <Navigation isLoading={isLoading} activeSection={activeSection} />

      {/* Manga-style Scroll Progress Indicator (Left Side) */}
      <ScrollProgress 
        isLoading={isLoading} 
        scrollProgress={scrollProgress} 
        activeSection={activeSection} 
      />

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key="content"
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section - Full Viewport Height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Hero
                typedText={typedText}
                isTypingDone={isTypingDone}
                hasScrolled={hasScrolled}
              />
            </motion.div>

            {/* About Me Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Suspense fallback={<SectionLoader />}>
                <About />
              </Suspense>
            </motion.div>

            {/* Technologies / Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Suspense fallback={<SectionLoader />}>
                <Skills />
              </Suspense>
            </motion.div>

            {/* Projects Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Suspense fallback={<SectionLoader />}>
                <Projects />
              </Suspense>
            </motion.div>

            {/* Other Projects Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Suspense fallback={<SectionLoader />}>
                <OtherProjects />
              </Suspense>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Suspense fallback={<SectionLoader />}>
                <Contact />
              </Suspense>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Footer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
