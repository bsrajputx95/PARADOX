import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Hourglass } from 'phosphor-react';

interface StoryModeBufferProps {
    duration: number;
    message: string;
    onComplete: () => void;
}

export const StoryModeBuffer: React.FC<StoryModeBufferProps> = ({ duration, message, onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = 100;
        const increment = 100 / (duration * 10);

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 300);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [duration, onComplete]);

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-md"
            >
                <motion.div
                    animate={{
                        rotate: [0, 180, 360],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="inline-flex p-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mb-6"
                >
                    <Hourglass size={48} className="text-white" weight="duotone" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-3">{message}</h3>

                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-600"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>

                <p className="text-gray-400 text-sm">{Math.round(progress)}%</p>

                <div className="relative h-20">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-purple-500 rounded-full"
                            style={{ left: `${20 + i * 15}%`, bottom: 0 }}
                            animate={{ y: [-60, -80], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
