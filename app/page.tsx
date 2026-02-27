"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Loader from "./components/Loader";
import AbstractWaveGrid from "./components/AbstractWaveGrid";

const FULL_NAME = "João Correia";
// The J is already the first char; we type the rest after
const TYPE_REST = FULL_NAME.slice(1); // "oão Correia"

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
              {NAV_ITEMS.map((item, index) => {
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
            <section id="home" className="relative h-screen overflow-hidden">
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
            <section id="about" className="min-h-screen text-white px-8 md:px-20 py-60">
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

            {/* Technologies / Skills Section */}
            <section id="skills" className="min-h-screen text-white px-8 md:px-20 py-60">
              <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Technologies & <span className="text-gray-400">Skills</span>
                  </h2>
                  <div className="w-24 h-[2px] bg-gradient-to-r from-white to-transparent mb-16" />
                </motion.div>

                {/* Technology Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {TECHNOLOGY_CATEGORIES.map((category, categoryIndex) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                      className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-6 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300"
                    >
                      {/* Category Title */}
                      <h3 className="text-xl font-semibold mb-6 text-center text-gray-200 border-b border-gray-700/50 pb-3">
                        {category.name}
                      </h3>

                      {/* Technology Icons Grid */}
                      {category.technologies.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                          {category.technologies.map((tech, techIndex) => (
                            <motion.div
                              key={tech.name}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                              className="group flex flex-col items-center justify-center p-3 rounded-xl hover:bg-gray-700/20 transition-all duration-300"
                            >
                              {/* Icon Container with Hover Effect */}
                              <div className="relative w-12 h-12 mb-2">
                                {/* Grey Icon (default) */}
                                <img
                                  src={tech.greyIcon}
                                  alt={tech.name}
                                  className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                                />
                                {/* Color Icon (on hover) */}
                                <img
                                  src={tech.colorIcon}
                                  alt={tech.name}
                                  className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                />
                              </div>
                              {/* Technology Name */}
                              <span className="text-xs text-gray-400 group-hover:text-white transition-colors duration-300 text-center">
                                {tech.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-24 text-gray-500 text-sm italic">
                          Coming soon
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
