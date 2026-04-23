import React from 'react';
import { motion } from 'framer-motion';
import { VisualizeIcon, StoryIcon } from './AnimatedIcons';

interface ChronosModeSelectorProps {
    onSelectMode: (mode: 'visualize' | 'story') => void;
}

export const ChronosModeSelector: React.FC<ChronosModeSelectorProps> = ({ onSelectMode }) => {
    const modes = [
        {
            id: 'visualize' as const,
            title: 'Visualize',
            description: 'Interactive visual learning with AI-powered insights',
            Icon: VisualizeIcon,
            gradient: 'from-blue-500 to-purple-600',
            color: '#6366f1'
        },
        {
            id: 'story' as const,
            title: 'Story Mode',
            description: 'Learn through immersive storytelling with video guidance',
            Icon: StoryIcon,
            gradient: 'from-purple-500 to-pink-600',
            color: '#a855f7'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4">Choose Your Learning Mode</h1>
                    <p className="text-gray-400 text-lg">Select how you'd like to experience your learning journey</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {modes.map((mode, index) => (
                        <motion.button
                            key={mode.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => onSelectMode(mode.id)}
                            className="group relative glass-panel p-8 text-left transition-all duration-300 hover:bg-white/10"
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div
                                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br"
                                style={{ backgroundImage: `linear-gradient(to bottom right, ${mode.color}, transparent)` }}
                            />

                            <div className="relative">
                                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${mode.gradient} mb-4`}>
                                    <mode.Icon />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{mode.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{mode.description}</p>

                                <div className="mt-6 flex items-center gap-2 text-sm font-medium" style={{ color: mode.color }}>
                                    <span>Get Started</span>
                                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                        →
                                    </motion.span>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};
