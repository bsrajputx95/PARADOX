import React from 'react';
import { motion } from 'framer-motion';

export const VisualizeIcon: React.FC = () => {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <defs>
                <linearGradient id="visualize-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Center star */}
            <motion.circle
                cx="20"
                cy="20"
                r="4"
                fill="url(#visualize-gradient)"
                filter="url(#glow)"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Orbiting particles */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const radius = 12;
                const x = 20 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 20 + radius * Math.sin((angle * Math.PI) / 180);

                return (
                    <motion.circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="2"
                        fill="url(#visualize-gradient)"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                        }}
                    />
                );
            })}

            {/* Outer ring */}
            <motion.circle
                cx="20"
                cy="20"
                r="16"
                stroke="url(#visualize-gradient)"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 360]
                }}
                transition={{
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
            />
        </svg>
    );
};

export const StoryIcon: React.FC = () => {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <defs>
                <linearGradient id="story-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <filter id="story-glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Book pages */}
            <motion.path
                d="M10 8 L10 32 L20 28 L30 32 L30 8 L20 12 Z"
                stroke="url(#story-gradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />

            {/* Center spine */}
            <motion.line
                x1="20"
                y1="8"
                x2="20"
                y2="32"
                stroke="url(#story-gradient)"
                strokeWidth="2"
                animate={{
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Floating particles (pages turning) */}
            {[0, 1, 2].map((i) => (
                <motion.rect
                    key={i}
                    x={18 + i * 4}
                    y={12 + i * 6}
                    width="8"
                    height="1"
                    fill="url(#story-gradient)"
                    opacity="0.6"
                    animate={{
                        x: [18 + i * 4, 25 + i * 4, 18 + i * 4],
                        opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5
                    }}
                />
            ))}
        </svg>
    );
};
