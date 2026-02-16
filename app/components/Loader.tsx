'use client';

import { motion } from 'framer-motion';

const HEXAGON_PATH =
  'M 50 5 L 90 27.5 L 90 72.5 L 50 95 L 10 72.5 L 10 27.5 Z';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0f14]">
      <svg width="220" height="220" viewBox="0 0 100 100" fill="none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="travelGradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="60%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* ROTATING HEXAGON ONLY */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{
            duration: 12,
            ease: 'linear',
            repeat: Infinity,
          }}
          style={{ transformOrigin: '50% 50%' }}
        >
          {/* Static hexagon */}
          <path
            d={HEXAGON_PATH}
            stroke="#3a3a3a"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Traveling stroke */}
          <motion.path
            d={HEXAGON_PATH}
            stroke="url(#travelGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="0.15 0.85"
            filter="url(#glow)"
            animate={{ strokeDashoffset: [0, -1] }}
            transition={{
              duration: 1.2,
              ease: 'linear',
              repeat: Infinity,
            }}
          />
        </motion.g>

        {/* STATIC J */}
        <g
          fill="#ffffff"
          transform="translate(32 25) scale(0.65)"
        >
          {/* J */}
          <path d="M 0 49.605 L 8.4 48.805 Q 8.7 57.405 12.4 61.605 Q 16.1 65.805 23.5 65.805 Q 30.9 65.805 34.65 61.555 Q 38.4 57.305 38.4 48.805 L 38.4 1.605 L 47 1.605 L 47 48.805 Q 47 60.605 40.7 67.405 Q 34.4 74.205 23.5 74.205 Q 16.5 74.205 11.3 71.205 Q 6.1 68.205 3.15 62.655 Q 0.2 57.105 0 49.605 Z" />
        </g>

      </svg>
    </div>
  );
}
