"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="text-white px-8 md:px-20 py-20 section-boundary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Me</span>
          </h2>
          <motion.div
            className="w-32 h-[3px] bg-gradient-to-r from-white via-blue-400 to-transparent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-200">
              Get In Touch
            </h3>
            
            <p className="text-lg text-gray-400 leading-relaxed mb-10">
              Feel free to reach out for collaborations, opportunities, or just to say hello. 
              I&apos;m always open to discussing new projects and ideas.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "JCorreia_jpbc@hotmail.com" },
                { icon: Phone, label: "Phone", value: "+351 919 652 591" },
                { icon: Github, label: "GitHub", value: "github.com/JoaoCorreia00" },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/joaocorreia00" },
              ].map((item,) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-5 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#161d27] border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1c2532] group-hover:border-white/20">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="text-gray-300 group-hover:text-white transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-200">
              Send a Message
            </h3>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-500 mb-3">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="w-full px-5 py-4 bg-[#161d27] border border-white/10 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-500 mb-3">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  className="w-full px-5 py-4 bg-[#161d27] border border-white/10 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-500 mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Your message here..."
                  className="w-full px-5 py-4 bg-[#161d27] border border-white/10 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 resize-none"
                />
              </div>

              <motion.button
                type="button"
                className="w-full py-4 px-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}