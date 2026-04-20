"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, Phone, Github, Linkedin, Loader2, CheckCircle } from "lucide-react";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  const validation: boolean[] = [false, false, false]

  const validateField = (fieldName: string, value: string) => {
    const errors: {[key: string]: string} = {};

    validation[0] = false
    validation[1] = false
    validation[2] = false
    
    switch (fieldName) {
      case 'from_name':
        if (!value.trim()) {
          errors.from_name = "Name is required";
        } else if (value.trim().length < 2) {
          errors.from_name = "Name must be at least 2 characters";
        }
        else {
          validation[0] = true
        }
        break;
        
      case 'from_email':
        if (!value.trim()) {
          errors.from_email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.from_email = "Please enter a valid email address";
        }
        else {
          validation[1] = true
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          errors.message = "Message is required";
        } else if (value.trim().length < 10) {
          errors.message = "Message must be at least 10 characters long";
        }
        else {
          validation[2] = true
        }
        break;
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    console.log("Reached Here");

    // Validate form before submission
    if (validation[0] === false || validation[1] === false || validation[2] === false) {
      return;
    }

    console.log("Reached Also Here");

    setIsSending(true);
    setError("");
    setFormErrors({});

    try {
      await emailjs.sendForm(
        "service_r5kji5q",
        "template_2abuo4j",
        formRef.current,
        "uOwuy1ezg9GoTcIoX"
      );
      setIsSent(true);
      formRef.current.reset();
      setFormErrors({});
      setTimeout(() => setIsSent(false), 5000); // Extended success message duration
    } catch (err: unknown) {
      console.error(err);
      // More detailed error messages based on error type
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        setError("Network error. Please check your connection and try again.");
      } else if (errorMessage.includes('rate') || errorMessage.includes('limit')) {
        setError("Too many requests. Please wait a moment before trying again.");
      } else if (errorMessage.includes('service') || errorMessage.includes('template')) {
        setError("Service temporarily unavailable. Please try again later.");
      } else {
        setError("Failed to send message. Please try again or contact me directly via email.");
      }
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <section id="contact" className="text-white px-8 md:px-20 py-[var(--section-padding)] section-boundary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Contact <span>Me</span>
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
                { icon: Mail, label: "Email", value: "JCorreia_jpbc@hotmail.com"},
                { icon: Phone, label: "Phone", value: "+351 919 652 591"},
                { icon: Github, label: "GitHub", value: "github.com/JoaoCorreia00", url: "https://github.com/JoaoCorreia00" },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/joaocorreia00", url: "https://linkedin.com/in/joaocorreia00" },
              ].map((item,) => (
                <motion.a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 group cursor-pointer"
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
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-200">
              Send a Message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  required
                  placeholder="Your name"
                  onChange={(e) => {
                    const value = e.target.value;
                    const fieldErrors = validateField('from_name', value);
                    setFormErrors(prev => ({
                      ...prev,
                      from_name: fieldErrors.from_name || ""
                    }));
                  }}
                  className={`w-full px-5 py-4 bg-[#161d27] border rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-1 transition-all duration-300 pt-6 pb-2 ${
                    formErrors.from_name
                      ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50"
                      : "border-white/10 focus:border-blue-500/50 focus:ring-blue-500/50"
                  }`}
                />
                <motion.label
                  htmlFor="from_name"
                  className={`absolute left-5 text-sm transition-all duration-300 pointer-events-none ${
                    formErrors.from_name ? "text-red-400" : "text-gray-500"
                  }`}
                  animate={{
                    top: "8px",
                    fontSize: "14px"
                  }}
                >
                  Name
                </motion.label>
                {formErrors.from_name && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.from_name}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  required
                  placeholder="your.email@example.com"
                  onChange={(e) => {
                    const value = e.target.value;
                    const fieldErrors = validateField('from_email', value);
                    setFormErrors(prev => ({
                      ...prev,
                      from_email: fieldErrors.from_email || ""
                    }));
                  }}
                  className={`w-full px-5 py-4 bg-[#161d27] border rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-1 transition-all duration-300 pt-6 pb-2 ${
                    formErrors.from_email
                      ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50"
                      : "border-white/10 focus:border-blue-500/50 focus:ring-blue-500/50"
                  }`}
                />
                <motion.label
                  htmlFor="from_email"
                  className={`absolute left-5 text-sm transition-all duration-300 pointer-events-none ${
                    formErrors.from_email ? "text-red-400" : "text-gray-500"
                  }`}
                  animate={{
                    top: "8px",
                    fontSize: "14px"
                  }}
                >
                  Email
                </motion.label>
                {formErrors.from_email && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.from_email}</p>
                )}
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Your message here..."
                  onChange={(e) => {
                    const value = e.target.value;
                    const fieldErrors = validateField('message', value);
                    setFormErrors(prev => ({
                      ...prev,
                      message: fieldErrors.message || ""
                    }));
                  }}
                  className={`w-full px-5 py-4 bg-[#161d27] border rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-1 transition-all duration-300 resize-none pt-6 pb-2 ${
                    formErrors.message
                      ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50"
                      : "border-white/10 focus:border-blue-500/50 focus:ring-blue-500/50"
                  }`}
                />
                <motion.label
                  htmlFor="message"
                  className={`absolute left-5 top-4 text-sm transition-all duration-300 pointer-events-none ${
                    formErrors.message ? "text-red-400" : "text-gray-500"
                  }`}
                  animate={{
                    top: "8px",
                    fontSize: "14px"
                  }}
                >
                  Message
                </motion.label>
                {formErrors.message && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.message}</p>
                )}
              </div>

              {/* Global error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                >
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Success message with enhanced animation */}
              <AnimatePresence>
                {isSent && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </motion.div>
                    <div>
                      <p className="text-green-400 font-medium text-sm">Message sent successfully!</p>
                      <p className="text-green-400/80 text-xs">I&apos;ll get back to you soon.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isSending}
                className="w-full py-4 px-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={!isSending ? { scale: 1.02 } : {}}
                whileTap={!isSending ? { scale: 0.98 } : {}}
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : isSent ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}