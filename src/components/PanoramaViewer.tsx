import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowsOut, ArrowsIn } from 'phosphor-react';

interface PanoramaViewerProps {
    topic: string;
    onBack: () => void;
}

export const PanoramaViewer: React.FC<PanoramaViewerProps> = ({ topic, onBack }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [panoramaImage, setPanoramaImage] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<any>(null);

    // Match topic to panorama image
    useEffect(() => {
        const topicLower = topic.toLowerCase();

        if (topicLower.includes('2300') || topicLower.includes('delhi')) {
            setPanoramaImage('/r/delhi 2300.png');
        } else if (topicLower.includes('british')) {
            setPanoramaImage('/r/british.png');
        } else if (topicLower.includes('mysore')) {
            setPanoramaImage('/r/mysore.png');
        } else {
            setShowError(true);
        }
    }, [topic]);

    // Initialize Pannellum viewer
    useEffect(() => {
        if (!panoramaImage || !containerRef.current) return;

        // Dynamically load Pannellum
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
        script.async = true;
        document.head.appendChild(script);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
        document.head.appendChild(link);

        script.onload = () => {
            if (window.pannellum && containerRef.current) {
                viewerRef.current = window.pannellum.viewer(containerRef.current, {
                    type: 'equirectangular',
                    panorama: panoramaImage,
                    autoLoad: true,
                    autoRotate: -2,
                    showZoomCtrl: false,
                    showFullscreenCtrl: false,
                    mouseZoom: true,
                    hfov: 100,
                });
            }
        };

        return () => {
            if (viewerRef.current) {
                viewerRef.current.destroy();
            }
        };
    }, [panoramaImage]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

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
                            We couldn't generate a visualization for "{topic}". Please try one of the available locations.
                        </p>
                        <button
                            onClick={onBack}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                        >
                            Try Another Topic
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen bg-gray-950">
            {/* Panorama Container */}
            <div ref={containerRef} className="w-full h-full" />

            {/* UI Overlay */}
            <div className="absolute top-0 left-0 right-0 p-6 z-10">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-panel px-6 py-3"
                    >
                        <h3 className="text-white font-bold text-lg">{topic}</h3>
                        <p className="text-gray-400 text-sm">360° Panoramic View</p>
                    </motion.div>

                    <div className="flex gap-3">
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={toggleFullscreen}
                            className="glass-panel p-3 hover:bg-white/20 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isFullscreen ? (
                                <ArrowsIn size={24} className="text-white" weight="bold" />
                            ) : (
                                <ArrowsOut size={24} className="text-white" weight="bold" />
                            )}
                        </motion.button>

                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            onClick={onBack}
                            className="glass-panel p-3 hover:bg-white/20 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <X size={24} className="text-white" weight="bold" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 glass-panel px-6 py-3 z-10"
            >
                <p className="text-white text-sm">
                    <span className="font-semibold">Drag</span> to look around • <span className="font-semibold">Scroll</span> to zoom
                </p>
            </motion.div>
        </div>
    );
};

// Extend Window interface for Pannellum
declare global {
    interface Window {
        pannellum: any;
    }
}
