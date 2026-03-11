"use client";

import { motion } from "framer-motion";
import { FloatingCode1, FloatingCode2 } from "../components/FloatingCode";

export default function About() {
  return (
    <section id="about" className="min-h-screen text-white px-8 md:px-20 py-60 relative overflow-hidden">
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
              {["Performance", "Architecture", "API Design", "Clean Code"].map((skill) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm text-gray-300 transition-all duration-300"
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
  );
}
