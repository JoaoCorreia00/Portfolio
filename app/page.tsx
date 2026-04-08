"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import { TYPE_REST, SectionId } from "./lib/constants";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [typedText, setTypedText] = useState("J");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  // Detect scroll for progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      
      setScrollProgress(progress);
      
      if (scrollY > 50 && !hasScrolled) {
        setHasScrolled(true);
      }

      // Determine active section
      const sections: SectionId[] = ["home", "about", "skills", "projects", "contact"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

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
      
      {/* Navigation Bar */}
      <Navigation isLoading={isLoading} activeSection={activeSection} />

      {/* Manga-style Scroll Progress Indicator (Left Side) */}
      <ScrollProgress 
        isLoading={isLoading} 
        scrollProgress={scrollProgress} 
        activeSection={activeSection} 
      />

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
            <Hero 
              typedText={typedText} 
              isTypingDone={isTypingDone} 
              hasScrolled={hasScrolled}
            />

            {/* About Me Section */}
            <About />

            {/* Technologies / Skills Section */}
            <Skills />

            {/* Projects Section */}
            <Projects />

            {/* Contact Section */}
            <Contact />

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
