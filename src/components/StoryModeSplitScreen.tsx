import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'phosphor-react';
import { AIRobotAssistant } from './AIChatInterface';

interface StoryModeSplitScreenProps {
    topic: string;
    onBack: () => void;
}

export const StoryModeSplitScreen: React.FC<StoryModeSplitScreenProps> = ({ topic, onBack }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [videoReady, setVideoReady] = useState(false);
    const [videoSource, setVideoSource] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);

    // Match topic to video
    useEffect(() => {
        const topicLower = topic.toLowerCase();

        if (topicLower.includes('anglo') || topicLower.includes('mysore') || topicLower.includes('war')) {
            setVideoSource('/r/Anglo.mp4');
        } else {
            setShowError(true);
        }
    }, [topic]);

    // Start video playback with 3-second delay
    useEffect(() => {
        if (videoRef.current && videoReady && videoSource) {
            const timer = setTimeout(() => {
                videoRef.current?.play().catch(err => console.log('Video play failed:', err));
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [videoReady, videoSource]);

    if (showError) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <div className="glass-panel p-8">
                        <div className="inline-flex p-4 rounded-full bg-red-500/20 mb-4">
                            <X size={48} className="text-red-400" weight="bold" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-3">API Credits Exceeded</h2>
                        <p className="text-gray-400 mb-6">
                            We couldn't generate a story for "{topic}". Please try "Anglo Mysore War" or similar topics.
                        </p>
                        <button
                            onClick={onBack}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                        >
                            Try Another Topic
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gray-950 flex flex-col">
            {/* Header */}
            <div className="relative z-10 border-b border-white/10 bg-gray-950/50 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>

                    <div className="text-center flex-1">
                        <h2 className="text-white font-semibold">Story Mode</h2>
                        <p className="text-sm text-gray-500">{topic}</p>
                    </div>

                    <div className="w-20" /> {/* Spacer for centering */}
                </div>
            </div>

            {/* Split Screen */}
            <div className="flex-1 flex">
                {/* Left: Video Player */}
                <div className="w-1/2 bg-black flex items-center justify-center relative">
                    <video
                        ref={videoRef}
                        onLoadedData={() => setVideoReady(true)}
                        className="w-full h-full object-contain"
                        controls
                        playsInline
                    >
                        <source src={videoSource || ''} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Loading overlay */}
                    {!videoReady && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black">
                            <div className="text-center">
                                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto" />
                                <p className="text-white text-sm">Loading video...</p>
                                <p className="text-gray-500 text-xs mt-1">Will start in 3 seconds</p>
                            </div>
                        </div>
                    )}

                    {/* Topic indicator */}
                    <div className="absolute top-4 left-4 px-4 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
                        <p className="text-white text-sm font-medium">📖 {topic}</p>
                    </div>
                </div>

                {/* Right: AI Chat */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-1/2 bg-gray-900 border-l border-white/10"
                >
                    <AIRobotAssistant />
                </motion.div>
            </div>
        </div>
    );
};
