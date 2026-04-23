import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type ErrorDetail } from '../services/geminiService';
import { TypewriterText } from './TypewriterText';

interface LiveCorrectionBubbleProps {
    error: ErrorDetail | null;
    onApplyFix?: (correction: string) => void;
}

export const LiveCorrectionBubble: React.FC<LiveCorrectionBubbleProps> = ({ error, onApplyFix }) => {
    if (!error) return null;

    const getErrorColor = (type: string) => {
        switch (type) {
            case 'math': return '#3b82f6';
            case 'spelling': return '#ef4444';
            case 'grammar': return '#f59e0b';
            default: return '#8b5cf6';
        }
    };

    const getErrorIcon = (type: string) => {
        switch (type) {
            case 'math': return '🧮';
            case 'spelling': return '✏️';
            case 'grammar': return '📝';
            default: return '💡';
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className="absolute z-50 glass-panel p-4 rounded-lg shadow-2xl max-w-sm"
                style={{
                    borderLeft: `4px solid ${getErrorColor(error.type)}`,
                    bottom: '100%',
                    marginBottom: '8px',
                    left: '0',
                }}
            >
                {/* Error Header */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getErrorIcon(error.type)}</span>
                    <h4 className="text-white font-semibold capitalize text-sm">
                        {error.type} Error Detected
                    </h4>
                </div>

                {/* Explanation with Typing Animation */}
                <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                    <TypewriterText text={error.explanation} speed={30} />
                </p>

                {/* Correction Display */}
                <div className="bg-black/30 rounded px-3 py-2 mb-3">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-red-400 line-through text-xs">{error.userText}</span>
                        <span className="text-gray-500">→</span>
                        <span className="text-green-400 font-semibold text-xs">{error.correction}</span>
                    </div>
                </div>

                {/* Action Button */}
                {onApplyFix && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onApplyFix(error.correction)}
                        className="w-full py-2 px-4 rounded-lg font-medium text-sm transition-all"
                        style={{
                            background: `linear-gradient(135deg, ${getErrorColor(error.type)}dd, ${getErrorColor(error.type)}99)`,
                            color: 'white'
                        }}
                    >
                        ✓ Apply Fix
                    </motion.button>
                )}

                {/* Pointer Arrow */}
                <div
                    className="absolute w-3 h-3 rotate-45"
                    style={{
                        background: 'rgba(17, 24, 39, 0.95)',
                        borderLeft: `2px solid ${getErrorColor(error.type)}`,
                        borderBottom: `2px solid ${getErrorColor(error.type)}`,
                        bottom: '-6px',
                        left: '20px',
                    }}
                />
            </motion.div>
        </AnimatePresence>
    );
};
