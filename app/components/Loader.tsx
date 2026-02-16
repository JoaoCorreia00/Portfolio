'use client';

import { motion, AnimatePresence } from 'framer-motion';

const HEXAGON_PATH =
  'M 50 5 L 90 27.5 L 90 72.5 L 50 95 L 10 72.5 L 10 27.5 Z';

// J letter path
const J_PATH = "M 0 49.605 L 8.4 48.805 Q 8.7 57.405 12.4 61.605 Q 16.1 65.805 23.5 65.805 Q 30.9 65.805 34.65 61.555 Q 38.4 57.305 38.4 48.805 L 38.4 1.605 L 47 1.605 L 47 48.805 Q 47 60.605 40.7 67.405 Q 34.4 74.205 23.5 74.205 Q 16.5 74.205 11.3 71.205 Q 6.1 68.205 3.15 62.655 Q 0.2 57.105 0 49.605 Z";

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0f14]"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.1,
          filter: 'blur(20px)',
          transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
        onAnimationComplete={() => {
          if (onComplete) onComplete();
        }}
      >
        {/* BACKGROUND EFFECTS */}
        
        {/* Ambient glow behind */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.2, 0.9],
            opacity: [0.3, 0.6, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Outer rotating ring effect */}
        <motion.svg
          width="320"
          height="320"
          viewBox="0 0 100 100"
          className="absolute"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1, 0.95],
            opacity: [0, 0.3, 0.15],
          }}
          transition={{
            duration: 2.5,
            ease: 'easeOut',
          }}
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="2 4"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="200 400"
            strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ transformOrigin: 'center' }}
          />
        </motion.svg>

        {/* MAIN CONTAINER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2,
              },
            },
          }}
        >
          <svg width="220" height="220" viewBox="0 0 100 100" fill="none">
            <defs>
              {/* Glow filter */}
              <filter id="glowIntense" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              {/* Inner glow */}
              <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Gradient for hexagon */}
              <linearGradient id="hexGradient" gradientUnits="userSpaceOnUse" x1="10" y1="5" x2="90" y2="95">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </linearGradient>

              {/* Gradient for traveling stroke */}
              <linearGradient id="travelGradientV2" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              {/* Radial gradient for J */}
              <radialGradient id="jGradient" gradientUnits="userSpaceOnUse" cx="20" cy="40" r="50">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#a0a0a0" />
              </radialGradient>
            </defs>

            {/* PHASE 1: Outer hexagon outline - draws in */}
            <motion.path
              d={HEXAGON_PATH}
              stroke="url(#hexGradient)"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="none"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { 
                  pathLength: 1, 
                  opacity: 0.6,
                  transition: {
                    pathLength: { duration: 1.5, ease: 'easeInOut' },
                    opacity: { duration: 1, delay: 0.3 },
                  },
                },
              }}
            />

            {/* PHASE 2: Rotating hexagon container */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{
                duration: 15,
                ease: 'linear',
                repeat: Infinity,
              }}
              style={{ transformOrigin: '50% 50%' }}
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: {
                    opacity: { duration: 0.8, delay: 0.5 },
                    scale: { duration: 1, delay: 0.5, type: 'spring', stiffness: 100 },
                  },
                },
              }}
            >
              {/* Secondary hexagon track */}
              <motion.path
                d={HEXAGON_PATH}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                strokeLinejoin="round"
                variants={{
                  hidden: { pathLength: 0 },
                  visible: { 
                    pathLength: 1,
                    transition: { duration: 1.2, delay: 0.8 },
                  },
                }}
              />

              {/* Traveling highlight stroke */}
              <motion.path
                d={HEXAGON_PATH}
                stroke="url(#travelGradientV2)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="0.12 0.88"
                filter="url(#glowIntense)"
                animate={{ 
                  strokeDashoffset: [0, -1.5],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'linear' },
                  opacity: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                }}
              />

              {/* Corner accent dots */}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const angle = (i * 60 - 90) * (Math.PI / 180);
                const x = 50 + 40 * Math.cos(angle);
                const y = 50 + 40 * Math.sin(angle);
                return (
                  <motion.circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="2"
                    fill="rgba(255,255,255,0.8)"
                    filter="url(#innerGlow)"
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: { 
                        scale: [0, 1.3, 1],
                        opacity: [0, 1, 0.7],
                        transition: {
                          delay: 1.2 + i * 0.08,
                          duration: 0.5,
                        },
                      },
                    }}
                  />
                );
              })}
            </motion.g>

            {/* PHASE 3: Inner ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              fill="none"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { 
                  pathLength: 1, 
                  opacity: 1,
                  transition: {
                    pathLength: { duration: 1, delay: 1.5 },
                    opacity: { duration: 0.5, delay: 1.5 },
                  },
                },
              }}
            />

            {/* PHASE 4: THE J */}
            <motion.g
              transform="translate(35 30) scale(0.54)"
              variants={{
                hidden: { opacity: 0, scale: 0.3, rotate: -15 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  rotate: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 80,
                    damping: 12,
                    delay: 1.8,
                  },
                },
              }}
            >
              {/* J glow background */}
              <motion.path
                d={J_PATH}
                fill="rgba(0, 255, 242, 0.1)"
                filter="url(#glowIntense)"
                transform="translate(35 30) scale(0.54)"
                animate={{
                  opacity: [0.3, 0.6, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2.5,
                }}
              />
              
              {/* Main J */}
              <motion.path
                d={J_PATH}
                fill="url(#jGradient)"
                filter="url(#innerGlow)"
                transform="translate(35 30) scale(0.54)"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { 
                    pathLength: 1, 
                    opacity: 1,
                    transition: {
                      pathLength: { duration: 1.2, delay: 2, ease: 'easeInOut' },
                      opacity: { duration: 0.5, delay: 2 },
                    },
                  },
                }}
              />
            </motion.g>

            {/* PULSE EFFECT AROUND J */}
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
              fill="none"
              variants={{
                hidden: { scale: 0.5, opacity: 0 },
                visible: { 
                  scale: [1, 1.8, 2.2],
                  opacity: [0.6, 0.3, 0],
                  transition: {
                    duration: 2,
                    delay: 2.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                  },
                },
              }}
            />
          </svg>

          {/* TEXT REVEAL */}
          <motion.div
            className="absolute -bottom-24 text-center"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { 
                opacity: [0, 0.8, 1],
                y: 0,
                transition: {
                  opacity: { duration: 0.8, delay: 2.8 },
                  y: { duration: 0.6, delay: 2.8 },
                },
              },
            }}
          >
            <motion.span
              className="text-xs tracking-[0.3em] text-white/50 uppercase"
              animate={{ 
                opacity: [0.3, 0.7, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 3.5,
              }}
            >
              Loading
            </motion.span>
            <motion.div
              className="flex justify-center mt-2 gap-1"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 3,
                  },
                },
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1 h-1 rounded-full bg-white/60"
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { 
                      scale: [0.5, 1, 0.5],
                      opacity: [0.3, 0.8, 0.3],
                      transition: {
                        duration: 0.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.2,
                      },
                    },
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* CORNER ACCENTS */}
        <motion.div
          className="absolute top-8 left-8 w-16 h-16"
          initial={{ opacity: 0, x: -20, y: -20 }}
          animate={{ 
            opacity: [0, 0.4, 0.2],
            x: [ -20, 0, -5],
            y: [-20, 0, -5],
          }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 40 40">
            <path d="M0 20 L0 0 L20 0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute top-8 right-8 w-16 h-16"
          initial={{ opacity: 0, x: 20, y: -20 }}
          animate={{ 
            opacity: [0, 0.4, 0.2],
            x: [20, 0, 5],
            y: [-20, 0, -5],
          }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 40 40">
            <path d="M40 20 L40 0 L20 0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute bottom-8 left-8 w-16 h-16"
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={{ 
            opacity: [0, 0.4, 0.2],
            x: [-20, 0, -5],
            y: [20, 0, 5],
          }}
          transition={{ duration: 1.5, delay: 0.7 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 40 40">
            <path d="M0 20 L0 40 L20 40" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute bottom-8 right-8 w-16 h-16"
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={{ 
            opacity: [0, 0.4, 0.2],
            x: [20, 0, 5],
            y: [20, 0, 5],
          }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 40 40">
            <path d="M40 20 L40 40 L20 40" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
          </svg>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
