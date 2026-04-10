"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, SectionId } from "../lib/constants";

interface NavigationProps {
  isLoading: boolean;
  activeSection: SectionId;
}

export default function Navigation({ isLoading, activeSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
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
              className="md:hidden text-white p-2 relative z-50"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="w-6 h-6 relative"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 }
                  }}
                  className="absolute top-0 left-0 w-6 h-0.5 bg-white block transform origin-center transition-all duration-300"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="absolute top-2 left-0 w-6 h-0.5 bg-white block transform transition-all duration-300"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 }
                  }}
                  className="absolute top-4 left-0 w-6 h-0.5 bg-white block transform origin-center transition-all duration-300"
                />
              </motion.div>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 mt-2 py-6 px-6 shadow-2xl"
              >
                <nav className="flex flex-col space-y-4">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={`text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                        activeSection === item.href.replace("#", "")
                          ? "text-white bg-white/10 border-l-4 border-blue-400"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-lg font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
