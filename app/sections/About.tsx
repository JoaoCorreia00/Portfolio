"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="text-white px-8 md:px-20 py-[var(--section-padding)] section-boundary">
      <div className="max-w-7xl mx-auto">
        {/* Section Title with enhanced animation */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            About <span>Me</span>
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
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-200">
              Full-Stack Developer Based in Portugal
            </h3>

            <p className="text-lg text-gray-400 leading-relaxed mb-6">
              I&apos;m a full-stack web developer specialising in JavaScript across both frontend and backend, 
              building scalable, performance-driven applications with a strong focus on clean architecture and maintainability.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              Alongside my JavaScript stack, I have solid experience working with PHP in production environments, 
              contributing to legacy system migrations, authentication systems and complex API integrations. 
              This has given me a flexible approach to problem-solving across different technologies and architectures.
            </p>

            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              I&apos;m constantly expanding my skillset, currently exploring Rust for its performance and safety, and Ruby through my cybersecurity training.
            </p>

            {/* Enhanced skill badges */}
            <div className="flex flex-wrap gap-3">
              {["Performance", "Scalable Systems", "API Integration", "Clean Code"].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-[#161d27] border border-white/10 rounded-full text-sm text-gray-300 transition-all duration-300 hover:bg-[#1c2532] hover:border-white/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative">
            {/* Code card */}
            <div className="relative bg-[#161d27] rounded-2xl p-8 border border-white/10">

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
                    <span className="text-gray-500">core tech:</span>
                    <span className="text-yellow-300">[</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-green-400">&quot;JavaScript&quot;</span><span className="text-gray-500">,</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-green-400">&quot;PHP&quot;</span><span className="text-gray-500">,</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-green-400">&quot;Vue.js&quot;</span><span className="text-gray-500">,</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-green-400">&quot;Node.js&quot;</span><span className="text-gray-500">,</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-green-400">&quot;MySql&quot;</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-yellow-300">]</span>
                    <span className="text-gray-500">;</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">learning:</span>
                    <span className="text-yellow-300">[</span>
                    <span className="text-orange-500">Next.js</span>
                    <span className="text-gray-500">,</span>
                    <span className="text-orange-500">Ruby</span>
                    <span className="text-gray-500">,</span>
                    <span className="text-orange-500">Rust</span>
                    <span className="text-yellow-300">]</span>
                    <span className="text-gray-500">;</span>
                  </div>
                </div>
                <div className="text-yellow-300">{`}`}</div>
              </div>               
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
