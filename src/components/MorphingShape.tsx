import React from 'react';
import { motion } from 'framer-motion';

interface MorphingShapeProps {
    className?: string;
    size?: number;
    color?: string;
    duration?: number;
}

export const MorphingShape: React.FC<MorphingShapeProps> = ({
    className = '',
    size = 200,
    color = 'url(#morph-gradient)',
    duration = 8,
}) => {
    const shapes = [
        'M40 40 Q60 20, 80 40 T120 40 T160 40 Q180 60, 160 80 T120 120 T80 120 Q60 100, 80 80 T40 40',
        'M50 30 L70 30 L90 50 L90 70 L70 90 L50 90 L30 70 L30 50 Z',
        'M60 20 L80 40 L80 80 L60 100 L40 80 L40 40 Z',
        'M40 60 Q40 20, 60 20 Q80 20, 80 40 Q100 40, 100 60 Q100 80, 80 80 Q80 100, 60 100 Q40 100, 40 80 Q20 80, 20 60 Q20 40, 40 40 Z',
    ];

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 120 120"
            className={`${className}`}
            style={{ overflow: 'visible' }}
        >
            <defs>
                <linearGradient id="morph-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                </linearGradient>

                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <motion.path
                d={shapes[0]}
                fill={color}
                filter="url(#glow)"
                animate={{
                    d: shapes,
                }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </svg>
    );
};
