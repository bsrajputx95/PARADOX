import React from 'react';
import { motion } from 'framer-motion';

export const HologramLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <motion.svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Outer hologram ring */}
            <motion.circle
                cx="24"
                cy="24"
                r="20"
                stroke="url(#hologram-gradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 4"
                animate={{
                    strokeDashoffset: [0, -8],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Head silhouette */}
            <motion.path
                d="M24 10 C18 10 14 14 14 20 C14 24 16 27 18 28 L18 32 C18 33 19 34 20 34 L28 34 C29 34 30 33 30 32 L30 28 C32 27 34 24 34 20 C34 14 30 10 24 10 Z"
                fill="url(#hologram-gradient)"
                fillOpacity="0.3"
                stroke="url(#hologram-gradient)"
                strokeWidth="1.5"
                animate={{
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Scan lines */}
            <motion.line
                x1="10"
                y1="15"
                x2="38"
                y2="15"
                stroke="#8b5cf6"
                strokeWidth="1"
                animate={{
                    y1: [15, 35, 15],
                    y2: [15, 35, 15],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Data particles */}
            <motion.circle
                cx="14"
                cy="20"
                r="1.5"
                fill="#a78bfa"
                animate={{
                    y: [0, -10, 0],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0
                }}
            />
            <motion.circle
                cx="34"
                cy="20"
                r="1.5"
                fill="#a78bfa"
                animate={{
                    y: [0, -10, 0],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5
                }}
            />
            <motion.circle
                cx="24"
                cy="38"
                r="1.5"
                fill="#a78bfa"
                animate={{
                    y: [0, -10, 0],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1
                }}
            />

            <defs>
                <linearGradient id="hologram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
            </defs>
        </motion.svg>
    );
};
