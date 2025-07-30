import React from 'react';
import { motion } from 'framer-motion';

export const CinemaLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <motion.svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            animate={{
                scale: [1, 1.05, 1],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {/* Film reel outer ring */}
            <motion.circle
                cx="24"
                cy="24"
                r="20"
                stroke="url(#cinema-gradient)"
                strokeWidth="2"
                fill="none"
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Inner circle */}
            <circle cx="24" cy="24" r="14" fill="url(#cinema-gradient)" fillOpacity="0.2" />

            {/* Film holes */}
            <motion.circle cx="24" cy="8" r="2" fill="#3b82f6"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.circle cx="38" cy="18" r="2" fill="#3b82f6"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            />
            <motion.circle cx="38" cy="30" r="2" fill="#3b82f6"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
            />
            <motion.circle cx="24" cy="40" r="2" fill="#3b82f6"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
            />
            <motion.circle cx="10" cy="30" r="2" fill="#3b82f6"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}
            />
            <motion.circle cx="10" cy="18" r="2" fill="#3b82f6"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            />

            {/* Play triangle */}
            <motion.path
                d="M20 16 L20 32 L32 24 Z"
                fill="#3b82f6"
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <defs>
                <linearGradient id="cinema-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
            </defs>
        </motion.svg>
    );
};
