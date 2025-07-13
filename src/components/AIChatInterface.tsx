import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const AIRobotAssistant: React.FC = () => {
    const [isBlinking, setIsBlinking] = useState(false);

    // Random blinking effect
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 200);
        }, 3000 + Math.random() * 2000); // Blink every 3-5 seconds

        return () => clearInterval(blinkInterval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Robot */}
            <motion.div
                className="relative mb-6"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Glow effect */}
                <div className="absolute inset-0 blur-2xl opacity-50">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
                </div>

                {/* Robot body */}
                <svg width="120" height="120" viewBox="0 0 120 120" className="relative z-10">
                    <defs>
                        <linearGradient id="robotGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>

                    {/* Robot face - rounded pill shape */}
                    <rect
                        x="20"
                        y="30"
                        width="80"
                        height="60"
                        rx="30"
                        fill="#1a1a1a"
                        stroke="url(#robotGlow)"
                        strokeWidth="3"
                    />

                    {/* Eyes */}
                    <motion.g
                        animate={{ scaleY: isBlinking ? 0.1 : 1 }}
                        transition={{ duration: 0.1 }}
                    >
                        {/* Left eye */}
                        <ellipse
                            cx="45"
                            cy="55"
                            rx="8"
                            ry="12"
                            fill="white"
                        />
                        <ellipse
                            cx="45"
                            cy="58"
                            rx="4"
                            ry="6"
                            fill="#3b82f6"
                        />
                        <circle
                            cx="46"
                            cy="56"
                            r="2"
                            fill="white"
                        />

                        {/* Right eye */}
                        <ellipse
                            cx="75"
                            cy="55"
                            rx="8"
                            ry="12"
                            fill="white"
                        />
                        <ellipse
                            cx="75"
                            cy="58"
                            rx="4"
                            ry="6"
                            fill="#3b82f6"
                        />
                        <circle
                            cx="76"
                            cy="56"
                            r="2"
                            fill="white"
                        />
                    </motion.g>

                    {/* Floating particles */}
                    <motion.circle
                        cx="15"
                        cy="50"
                        r="3"
                        fill="#ec4899"
                        animate={{
                            y: [-5, 5, -5],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.circle
                        cx="105"
                        cy="60"
                        r="4"
                        fill="#06b6d4"
                        animate={{
                            y: [5, -5, 5],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    />
                </svg>
            </motion.div>

            {/* AI Text */}
            <h3 className="text-2xl font-bold text-white mb-2">Ask AI</h3>
            <p className="text-gray-400 text-sm mb-6 text-center max-w-xs">
                Have questions? I'm here to help you understand better!
            </p>
        </div>
    );
};

interface AIChatInterfaceProps {
    onSendMessage?: (message: string) => void;
}

export const AIChatInterface: React.FC<AIChatInterfaceProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([
        { role: 'ai', text: "Hi! I'm your AI assistant. Feel free to ask me anything about the lesson!" }
    ]);

    const handleSend = () => {
        if (!message.trim()) return;

        setMessages(prev => [...prev, { role: 'user', text: message }]);

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'ai',
                text: "That's a great question! I'm here to help you learn. Keep watching the video for more insights!"
            }]);
        }, 1000);

        setMessage('');
        onSendMessage?.(message);
    };

    return (
        <div className="flex flex-col h-full">
            <AIRobotAssistant />

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-64">
                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.role === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/10 text-gray-200'
                                }`}
                        >
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors"
                >
                    Send
                </button>
            </div>
        </div>
    );
};
