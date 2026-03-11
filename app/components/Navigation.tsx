"use client";

import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, SectionId } from "../lib/constants";

interface NavigationProps {
  isLoading: boolean;
  activeSection: SectionId;
}

export default function Navigation({ isLoading, activeSection }: NavigationProps) {
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
  );
}
