import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileArrowUp } from 'phosphor-react';
import { StoryIcon } from './AnimatedIcons';

interface StoryModeTopicInputProps {
    onSubmit: (topic: string) => void;
}

export const StoryModeTopicInput: React.FC<StoryModeTopicInputProps> = ({ onSubmit }) => {
    const [topic, setTopic] = useState('');

    const suggestions = [
        'The Solar System',
        'World War II',
        'Photosynthesis',
        'Ancient Egypt',
        'The Water Cycle',
        'Shakespeare\'s Life'
    ];

    const handleSubmit = () => {
        if (topic.trim()) {
            onSubmit(topic);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mb-4"
                    >
                        <StoryIcon />
                    </motion.div>

                    <h2 className="text-4xl font-bold text-white mb-3">What would you like to learn about?</h2>
                    <p className="text-gray-400 text-lg">Enter a topic, paste content, or upload a PDF</p>
                </div>

                <div className="glass-panel p-6 mb-6">
                    <textarea
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Type your topic or paste content here...&#10;&#10;Example: Explain the theory of relativity&#10;Or: Tell me about ancient Roman civilization"
                        className="w-full h-40 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none text-lg leading-relaxed"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.ctrlKey) {
                                handleSubmit();
                            }
                        }}
                    />

                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                        <FileArrowUp size={16} />
                        <span>PDF upload coming soon</span>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-3">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion) => (
                            <motion.button
                                key={suggestion}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setTopic(suggestion)}
                                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm transition-colors"
                            >
                                {suggestion}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <motion.button
                    onClick={handleSubmit}
                    disabled={!topic.trim()}
                    whileHover={{ scale: topic.trim() ? 1.02 : 1 }}
                    whileTap={{ scale: topic.trim() ? 0.98 : 1 }}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${topic.trim()
                            ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                            : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        }`}
                >
                    {topic.trim() ? (
                        <span className="flex items-center justify-center gap-2">
                            Start Learning
                            <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
                                →
                            </motion.span>
                        </span>
                    ) : (
                        'Enter a topic to continue'
                    )}
                </motion.button>

                <p className="text-center text-sm text-gray-600 mt-4">Press Ctrl + Enter to submit</p>
            </motion.div>
        </div>
    );
};
