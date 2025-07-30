import React from 'react';
import { motion } from 'framer-motion';

export const ChronosLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <motion.svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Outer clock circle */}
            <motion.circle
                cx="24"
                cy="24"
                r="20"
                stroke="url(#chronos-gradient)"
                strokeWidth="2"
                fill="none"
            />

            {/* Inner glow */}
            <motion.circle
                cx="24"
                cy="24"
                r="16"
                fill="url(#chronos-gradient)"
                fillOpacity="0.1"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Clock markers */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
                const isMainMarker = angle % 90 === 0;
                const rad = (angle * Math.PI) / 180;
                const x1 = 24 + Math.cos(rad) * (isMainMarker ? 16 : 17);
                const y1 = 24 + Math.sin(rad) * (isMainMarker ? 16 : 17);
                const x2 = 24 + Math.cos(rad) * 19;
                const y2 = 24 + Math.sin(rad) * 19;

                return (
                    <motion.line
                        key={angle}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#10b981"
                        strokeWidth={isMainMarker ? "2" : "1"}
                        animate={{
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1
                        }}
                    />
                );
            })}

            {/* Hour hand */}
            <motion.line
                x1="24"
                y1="24"
                x2="24"
                y2="14"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ originX: "24px", originY: "24px" }}
            />

            {/* Minute hand */}
            <motion.line
                x1="24"
                y1="24"
                x2="24"
                y2="10"
                stroke="#34d399"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ originX: "24px", originY: "24px" }}
            />

            {/* Center dot */}
            <motion.circle
                cx="24"
                cy="24"
                r="2.5"
                fill="#10b981"
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Timeline arrows */}
            <motion.path
                d="M8 24 L4 24 L7 20 M8 24 L4 24 L7 28"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                    x: [0, -2, 0],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.path
                d="M40 24 L44 24 L41 20 M40 24 L44 24 L41 28"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                    x: [0, 2, 0],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <defs>
                <linearGradient id="chronos-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
            </defs>
        </motion.svg>
    );
};
