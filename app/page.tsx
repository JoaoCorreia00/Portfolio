"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Loader from "./components/Loader";
import AbstractWaveGrid from "./components/AbstractWaveGrid";
import Image from "next/image";


const FULL_NAME = "João Correia";
// The J is already the first char; we type the rest after
const TYPE_REST = FULL_NAME.slice(1); // "oão Correia"

// Floating text component - only animates when in viewport
function FloatingCode1() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const text = "// Code in progress"

  return (
    <div ref={ref} className={`absolute top-4 left-10 text-xs text-white/30 font-mono`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={isInView ? { y: [0, -6, 0] } : { y: 0 }}
          transition={{
            duration: 0.4,
            delay: i * 0.08,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

// Floating code snippet 2 - only animates when in view
function FloatingCode2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="absolute bottom-8 -right-2 text-xs text-white/30 font-mono rotate-310"
      animate={isInView ? {
        y: [4, -4, 4],
        rotate: [10, 15, 10]
      } : { y: 0, rotate: 10 }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {`// Building solutions`}
    </motion.div>
  );
}

// Technology categories with icons
const TECHNOLOGY_CATEGORIES = [
  {
    name: "Frontend",
    technologies: [
      { name: "JavaScript", colorIcon: "/Javascript.png", greyIcon: "/Javascript_grey.png" },
      { name: "TypeScript", colorIcon: "/Typescript.png", greyIcon: "/Typescript_grey.png" },
      { name: "Vue.js", colorIcon: "/Vue.png", greyIcon: "/Vue_grey.png" },
      { name: "React", colorIcon: "/React.png", greyIcon: "/React_grey.png" },
      { name: "Angular", colorIcon: "/Angular.png", greyIcon: "/Angular_grey.png" },
      { name: "Next.js", colorIcon: "/Nextjs.png", greyIcon: "/Nextjs_grey.png" },
      { name: "React Native", colorIcon: "/React.png", greyIcon: "/React_grey.png" },
      { name: "HTML", colorIcon: "/Html.png", greyIcon: "/Html_grey.png" },
      { name: "CSS", colorIcon: "/Css.png", greyIcon: "/Css_grey.png" },
      { name: "jQuery", colorIcon: "/jQuery.png", greyIcon: "/jQuery_grey.png" },
      { name: "TailwindCSS", colorIcon: "/TailwindCSS.png", greyIcon: "/TailwindCSS_grey.png" },
      { name: "Bootstrap", colorIcon: "/Bootstrap.png", greyIcon: "/Bootstrap_grey.png" },
    ],
  },
  {
    name: "Backend",
    technologies: [
      { name: "PHP", colorIcon: "/Php.png", greyIcon: "/Php_grey.png" },
      { name: "Node.js", colorIcon: "/Node.png", greyIcon: "/Node_grey.png" },
      { name: "Laminas", colorIcon: "/Laminas.png", greyIcon: "/Laminas_grey.png" },
      { name: "Zend", colorIcon: "/Zend.png", greyIcon: "/Zend_grey.png" },
      { name: "Kotlin", colorIcon: "/Kotlin.png", greyIcon: "/Kotlin_grey.png" },
      { name: "Ruby", colorIcon: "/Ruby.png", greyIcon: "/Ruby_grey.png" },
      { name: "C#", colorIcon: "/C.png", greyIcon: "/C_grey.png" },
      { name: "C++", colorIcon: "/C++.png", greyIcon: "/C++_grey.png" },
    ],
  },
  {
    name: "Databases",
    technologies: [
      { name: "SQL", colorIcon: "/Sql.png", greyIcon: "/Sql_grey.png" },
      { name: "MySQL", colorIcon: "/MySql.png", greyIcon: "/MySql_grey.png" },
      { name: "PostgreSQL", colorIcon: "/Postgresql.png", greyIcon: "/Postgresql_grey.png" },
      { name: "XML", colorIcon: "/XML.png", greyIcon: "/XML_grey.png" },
      { name: "Json", colorIcon: "/Json.png", greyIcon: "/Json_grey.png" },
      { name: "Firebase", colorIcon: "/Firebase.png", greyIcon: "/Firebase_grey.png" },
    ],
  },
  {
    name: "DevOps & Cloud",
    technologies: [
      { name: "Git", colorIcon: "/Git.png", greyIcon: "/Git_grey.png" },
      { name: "GitHub", colorIcon: "/GitHub.png", greyIcon: "/GitHub_grey.png" },
      { name: "GitHub Actions", colorIcon: "/GitHubActions.png", greyIcon: "/GitHubActions_grey.png" },
      { name: "BitBucket", colorIcon: "/BitBucket.png", greyIcon: "/BitBucket_grey.png" },
      { name: "GitLab", colorIcon: "/GitLab.png", greyIcon: "/GitLab_grey.png" },
      { name: "Docker", colorIcon: "/Docker.png", greyIcon: "/Docker_grey.png" },
      { name: "Jenkins", colorIcon: "/Jenkins.png", greyIcon: "/Jenkins_grey.png" },
    ],
  },
  {
    name: "Testing & Tools",
    technologies: [
      { name: "Jest", colorIcon: "/Jest.png", greyIcon: "/Jest_grey.png" },
      { name: "Postman", colorIcon: "/Postman.png", greyIcon: "/Postman_grey.png" },
      { name: "ESLint", colorIcon: "/Eslint.png", greyIcon: "/Eslint_grey.png" },
      { name: "Vite", colorIcon: "/Vite.png", greyIcon: "/Vite_grey.png" },
      { name: "Figma", colorIcon: "/Figma.png", greyIcon: "/Figma_grey.png" },
    ],
  },
];

// Navigation items
const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [typedText, setTypedText] = useState("J");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

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
      const sections = ["home", "about", "skills", "projects", "contact"];
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

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      
      {/* Navigation Bar */}
      <AnimatePresence>
        {!isLoading && (
          <motion.nav
            className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-5"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="w-full flex items-center justify-between">
              <div></div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-12">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`text-base font-medium transition-all duration-300 relative ${
                      activeSection === item.href.replace("#", "")
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.href.replace("#", "") && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white p-2"
                onClick={() => {
                  const menu = document.getElementById("mobile-menu");
                  menu?.classList.toggle("hidden");
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div id="mobile-menu" className="hidden md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md mt-2 py-4 px-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left py-2 text-sm font-medium ${
                    activeSection === item.href.replace("#", "")
                      ? "text-white"
                      : "text-gray-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Manga-style Scroll Progress Indicator (Left Side) */}
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
            <section id="home" className="relative h-screen overflow-hidden hidden">
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
                  className="text-7xl md:text-8xl font-bold mb-6 flex items-center bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 2.8, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ background: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #a0a0a0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
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

              {/* Bottom Scroll Hint - fades out on scroll */}
              <motion.div
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white z-50 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hasScrolled ? 0 : 1 }}
                transition={{ duration: 0.5 }}
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
            <section id="about" className="min-h-screen text-white px-8 md:px-20 py-60 relative overflow-hidden hidden">
              <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Title with enhanced animation */}
                <motion.div
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    About <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Me</span>
                  </h2>
                  <motion.div
                    className="w-32 h-[3px] bg-gradient-to-r from-white via-blue-400 to-transparent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: 128 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  />
                </motion.div>

                {/* Two Column Layout with staggered animations */}
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  {/* Left Column - Text Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.98 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.9, 
                      delay: 0.2, 
                      ease: [0.22, 1, 0.36, 1],
                      staggerChildren: 0.1
                    }}
                  >
                    <motion.h3
                      className="text-2xl md:text-3xl font-semibold mb-6 text-gray-200"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      Full-Stack Developer Based in Portugal
                    </motion.h3>
                    
                    <motion.p
                      className="text-lg text-gray-400 leading-relaxed mb-6"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      I&apos;m a full-stack web developer focused on building scalable, 
                      performance-driven applications with clean architecture and 
                      maintainable code. I work mainly within the JavaScript ecosystem 
                      and PHP environments, using frameworks like Vue, React, Node.js 
                      and Laminas.
                    </motion.p>
                    
                    <motion.p
                      className="text-lg text-gray-400 leading-relaxed mb-8"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      I&apos;ve contributed to legacy migrations, authentication systems and complex API integrations, ensuring reliability and maintainability across evolving platforms. I aim to bridge backend logic with thoughtful frontend implementation, aligning performance with user experience.
                    </motion.p>

                    {/* Enhanced skill badges */}
                    <motion.div
                      className="flex flex-wrap gap-3"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                      }}
                    >
                      {["Performance", "Architecture", "API Design", "Clean Code"].map((skill, index) => (
                        <motion.span
                          key={skill}
                          className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm text-gray-300 transition-all duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.4, 
                            delay: 0.4 + (index * 0.1),
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            borderColor: "rgba(255, 255, 255, 0.5)"
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Right Column - Visual Element */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.4, 
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="relative"
                  >
                    {/* Code card */}
                    <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">

                      {/* Code-style decorative content */}
                      <div className="space-y-4 font-mono text-sm">
                        <div> </div>
                        <div className="flex items-center gap-2">
                          <span className="text-pink-400">const</span>
                          <span className="text-blue-400">developer</span>
                          <span className="text-gray-500">=</span>
                          <span className="text-yellow-300">{`{`}</span>
                        </div>
                        <div className="pl-8 space-y-2">
                          <div className="flex gap-2">
                            <span className="text-gray-500">name:</span>
                            <span className="text-green-400">&quot;João Correia&quot;</span>
                            <span className="text-gray-500">,</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-500">location:</span>
                            <span className="text-green-400">&quot;Portugal&quot;</span>
                            <span className="text-gray-500">,</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-500">role:</span>
                            <span className="text-green-400">&quot;Full-Stack Developer&quot;</span>
                            <span className="text-gray-500">,</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-500">expertise:</span>
                            <span className="text-yellow-300">[</span>
                          </div>
                          <div className="pl-8">
                            <span className="text-green-400">&quot;Full-Stack Development&quot;</span><span className="text-gray-500">,</span>
                          </div>
                          <div className="pl-8">
                            <span className="text-green-400">&quot;API Integrations&quot;</span><span className="text-gray-500">,</span>
                          </div>
                          <div className="pl-8">
                            <span className="text-green-400">&quot;Authentication Systems&quot;</span><span className="text-gray-500">,</span>
                          </div>
                          <div className="pl-8">
                            <span className="text-green-400">&quot;Legacy System Migration&quot;</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-yellow-300">]</span>
                            <span className="text-gray-500">;</span>
                          </div>
                        </div>
                        <div className="text-yellow-300">{`}`}</div>
                      </div>               
                    </div>
                      {/* Floating code snippet with typing jump - only animates when visible */}
                      <FloatingCode1 />
                      
                      <FloatingCode2 />
                  </motion.div>
                </div>

                {/* Additional animated element below the main content */}
                <motion.div
                  className="mt-20 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                  <motion.div
                    className="inline-flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-8 py-4"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderColor: "rgba(255, 255, 255, 0.3)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-sm text-gray-400">Let&apos;s create something amazing together</span>
                    <motion.div
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Technologies / Skills Section */}
            <section id="skills" className="min-h-screen text-white px-6 md:px-16 py-40">
              <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="mb-20">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Technologies & <span className="text-gray-400">Skills</span>
                  </h2>
                  <motion.div
                    className="w-32 h-[3px] bg-gradient-to-r from-white via-blue-400 to-transparent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: 128 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  />
                </div>

                {/* Technology Categories Grid - Enhanced Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9">
                  {TECHNOLOGY_CATEGORIES.map((category) => {
                    // Category-specific accent colors
                    const categoryColors: Record<string, { border: string; glow: string; gradient: string }> = {
                      "Frontend": { border: "border-blue-500/30", glow: "hover:shadow-blue-500/20", gradient: "from-blue-500/10" },
                      "Backend": { border: "border-purple-500/30", glow: "hover:shadow-purple-500/20", gradient: "from-purple-500/10" },
                      "Databases": { border: "border-green-500/30", glow: "hover:shadow-green-500/20", gradient: "from-green-500/10" },
                      "DevOps & Cloud": { border: "border-orange-500/30", glow: "hover:shadow-orange-500/20", gradient: "from-orange-500/10" },
                      "Testing & Tools": { border: "border-pink-500/30", glow: "hover:shadow-pink-500/20", gradient: "from-pink-500/10" },
                    };
                    const colors = categoryColors[category.name] || { border: "border-gray-500/30", glow: "", gradient: "from-gray-500/10" };
                    
                    return (
                      <motion.div
                        key={category.name}
                        className={`group relative bg-gradient-to-br ${colors.gradient} to-gray-900/40 rounded-2xl p-6 border ${colors.border} backdrop-blur-md hover:border-opacity-60 transition-all duration-500 hover:scale-[1.02] ${colors.glow} hover:shadow-lg`}
                      >
                        {/* Subtle animated background pattern */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)] group-hover:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)] transition-all duration-500" />
                        </div>

                        {/* Category Title */}
                        <h3 className="text-xl font-semibold mb-6 text-center text-gray-200 border-b border-gray-700/40 pb-3 relative">
                          <span className="relative">
                            {category.name}
                            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:w-[60%] transition-all duration-300" />
                          </span>
                        </h3>

                        {/* Technology Icons Grid */}
                        {category.technologies.length > 0 ? (
                          <div className="grid grid-cols-3 gap-3">
                            {category.technologies.map((tech) => (
                              <div
                                key={tech.name}
                                className="group/tech flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-700/30 transition-all duration-300 cursor-pointer"
                              >
                                {/* Icon Container with Hover Effect */}
                                <div className="relative w-10 h-10 mb-2">
                                  {/* Grey Icon (default) */}
                                  <Image
                                    src={tech.greyIcon}
                                    alt={tech.name}
                                    fill
                                    priority
                                    unoptimized
                                    className="object-contain transition-all duration-300 group-hover/tech:scale-110 group-hover/tech:opacity-0"
                                  />
                                  {/* Color Icon (on hover) */}
                                  <Image
                                    src={tech.colorIcon}
                                    alt={tech.name}
                                    fill
                                    className="object-contain opacity-0 transition-all duration-300 scale-90 group-hover/tech:opacity-100 group-hover/tech:scale-100"
                                  />
                                  {/* Glow effect on hover */}
                                  <div className="absolute inset-0 rounded-full bg-white/0 group-hover/tech:bg-white/10 group-hover/tech:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300" />
                                </div>
                                {/* Technology Name */}
                                <span className="text-[10px] text-gray-400 group-hover/tech:text-white transition-all duration-300 text-center leading-tight group-hover/tech:font-medium">
                                  {tech.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-24 text-gray-500 text-sm italic">
                            Coming soon
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
