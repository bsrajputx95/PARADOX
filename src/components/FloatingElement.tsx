import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
    children: ReactNode;
    className?: string;
    duration?: number;
    amplitude?: number;
    delay?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
    children,
    className = '',
    duration = 3,
    amplitude = 10,
    delay = 0,
}) => {
    return (
        <motion.div
            className={className}
            animate={{
                y: [0, -amplitude, 0],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
            }}
        >
            {children}
        </motion.div>
    );
};
