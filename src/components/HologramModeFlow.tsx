import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, GraduationCap, BookOpen } from 'phosphor-react';
import { HologramBackground } from './HologramBackground';
import { ModelViewer } from './ModelViewer';
import { AIRobotAssistant } from './AIChatInterface';
import { analyzeLive, type AnalysisResult, type ErrorDetail } from '../services/geminiService';
import { speak, stopSpeaking } from '../services/ttsService';
import { LiveCorrectionBubble } from './LiveCorrectionBubble';
import { TypewriterText } from './TypewriterText';

interface HologramModeFlowProps {
    onBack: () => void;
}

interface Teacher {
    id: string;
    name: string;
    image: string;
    grade: string;
    subjects: string[];
    expertise: string;
    bio: string;
    color: string;
}

export const HologramModeFlow: React.FC<HologramModeFlowProps> = ({ onBack }) => {
    const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
    const [showChat, setShowChat] = useState(false);
    const [workText, setWorkText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const greetingTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const analysisTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [hasGreeted, setHasGreeted] = useState(false);
    const [aiFeedback, setAiFeedback] = useState<AnalysisResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [currentError, setCurrentError] = useState<ErrorDetail | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [isAITyping, setIsAITyping] = useState(false);
    const aiTypingIntervalRef = useRef<ReturnType<typeof setInterval>>();

    const teachers: Teacher[] = [
        {
            id: 'arjun',
            name: 'Arjun Rao',
            image: '/r/arjun.png',
            grade: '9th Standard',
            subjects: ['Science', 'Mathematics'],
            expertise: 'Problem Solving & Logic',
            bio: 'Builds strong analytical skills with step-by-step problem-solving techniques',
            color: '#3b82f6'
        },
        {
            id: 'priya',
            name: 'Priya Reddy',
            image: '/r/priya.png',
            grade: '10th Standard',
            subjects: ['Chemistry', 'Biology'],
            expertise: 'Lab Work & Life Sciences',
            bio: 'Brings the microscopic world to life with hands-on experiments and fascinating facts',
            color: '#8b5cf6'
        },
        {
            id: 'vikram',
            name: 'Vikram Joshi',
            image: '/r/vikram.png',
            grade: '11th Standard',
            subjects: ['Finance', 'Accounts'],
            expertise: 'Business & Financial Planning',
            bio: 'Prepares future leaders with practical finance knowledge and accounting principles',
            color: '#14b8a6'
        },
        {
            id: 'default',
            name: 'AI Guide',
            image: '',
            grade: 'All Standards',
            subjects: ['General Support'],
            expertise: 'Multi-subject Assistance',
            bio: 'Your all-purpose AI companion for any subject, any grade, anytime',
            color: '#6b7280'
        }
    ];

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setWorkText(newText);
        setIsTyping(true);

        // Clear any existing AI feedback when typing
        setAiFeedback(null);
        stopSpeaking();

        // Greeting detection
        const greetings = ['hi', 'hey', 'hello', 'greetings', 'good morning', 'good afternoon', 'good evening', 'namaste'];
        const lowerText = newText.toLowerCase();

        // Clear existing timeouts
        if (greetingTimeoutRef.current) {
            clearTimeout(greetingTimeoutRef.current);
        }
        if (analysisTimeoutRef.current) {
            clearTimeout(analysisTimeoutRef.current);
        }

        // Check if any greeting is typed and hasn't been greeted yet
        if (!hasGreeted && greetings.some(greeting => lowerText.includes(greeting))) {
            // Wait 2 seconds after user stops typing before playing voice
            greetingTimeoutRef.current = setTimeout(() => {
                setHasGreeted(true);
                // Play greeting voice
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch(err => console.log('Audio play failed:', err));
                }
            }, 2000);
        }

        // LIVE TUTORING: Wait 3 seconds after user stops typing before analyzing
        if (newText.trim().length > 5) {
            analysisTimeoutRef.current = setTimeout(async () => {
                setIsAnalyzing(true);
                try {
                    // Use live analysis for instant feedback  
                    const result = await analyzeLive(newText);
                    setAiFeedback(result);

                    // If there are specific errors with positions, show the first one
                    if (result.errors && result.errors.length > 0) {
                        const firstError = result.errors[0];
                        setCurrentError(firstError);

                        // Speak and type the correction
                        speak(firstError.explanation);
                        typeAIResponse(firstError.explanation);
                    } else if (result.hasErrors && result.feedback) {
                        // Type AI response into textarea
                        speak(result.feedback);
                        typeAIResponse(result.feedback);
                    }
                } catch (error) {
                    console.error('Live analysis error:', error);
                } finally {
                    setIsAnalyzing(false);
                }
            }, 3000); // 3 seconds to allow user to finish typing
        }

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, 1000);
    };

    // Apply correction function
    const handleApplyFix = (correction: string) => {
        if (!currentError || !textareaRef.current) return;

        const { start, end } = currentError.position;
        const before = workText.substring(0, start);
        const after = workText.substring(end);
        const newText = before + correction + after;

        setWorkText(newText);
        setCurrentError(null);
        setAiFeedback(null);

        // Speak confirmation
        speak("Great! That's correct now!");

        // Update textarea
        if (textareaRef.current) {
            textareaRef.current.value = newText;
        }
    };

    // Type AI response into textarea
    const typeAIResponse = (response: string) => {
        if (!textareaRef.current) return;

        const userText = workText;
        const fullText = userText + '\n\n[AI Tutor]: ' + response;
        let currentIndex = workText.length + 12; // Start after "\n\n[AI Tutor]: "

        setIsAITyping(true);
        setWorkText(userText + '\n\n[AI Tutor]: ');

        // Clear any existing interval
        if (aiTypingIntervalRef.current) {
            clearInterval(aiTypingIntervalRef.current);
        }

        // Type character by character
        aiTypingIntervalRef.current = setInterval(() => {
            if (currentIndex < fullText.length) {
                setWorkText(fullText.substring(0, currentIndex + 1));
                currentIndex++;

                // Auto-scroll to bottom
                if (textareaRef.current) {
                    textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
                }
            } else {
                if (aiTypingIntervalRef.current) {
                    clearInterval(aiTypingIntervalRef.current);
                }
                setIsAITyping(false);
            }
        }, 30); // 30ms per character
    };

    // Reset greeting when character changes
    React.useEffect(() => {
        setHasGreeted(false);
        setWorkText('');
    }, [selectedCharacter]);

    // Character selection screen
    if (!selectedCharacter) {
        return (
            <div className="min-h-screen bg-gray-950 relative overflow-hidden">
                <HologramBackground />

                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={onBack}
                    className="fixed top-6 left-6 z-50 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                    <ArrowLeft size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                </motion.button>

                <div className="container mx-auto px-6 py-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Hologram Teacher</h2>
                        <p className="text-gray-400 text-lg">Select a specialized educator to guide your learning journey</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {teachers.map((teacher, index) => (
                            <motion.button
                                key={teacher.id}
                                onClick={() => setSelectedCharacter(teacher.id)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-panel p-4 text-left transition-all duration-300 hover:bg-white/10 group"
                                whileHover={{ y: -4, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Teacher Image or Icon */}
                                <div className="relative mb-4 aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                                    {teacher.image ? (
                                        <img
                                            src={teacher.image}
                                            alt={teacher.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <GraduationCap size={48} className="text-gray-600" />
                                        </div>
                                    )}

                                    {/* Grade badge */}
                                    <div
                                        className="absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-semibold text-white"
                                        style={{ backgroundColor: teacher.color }}
                                    >
                                        {teacher.grade}
                                    </div>
                                </div>

                                {/* Teacher Info */}
                                <h3 className="text-lg font-bold text-white mb-1">{teacher.name}</h3>

                                <div className="flex flex-wrap gap-1 mb-2">
                                    {teacher.subjects.slice(0, 2).map((subject) => (
                                        <span
                                            key={subject}
                                            className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-gray-300"
                                        >
                                            {subject}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-sm text-gray-400 mb-2 line-clamp-2">{teacher.bio}</p>

                                <div className="flex items-center gap-1 text-xs" style={{ color: teacher.color }}>
                                    <BookOpen size={14} />
                                    <span className="font-medium">{teacher.expertise}</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const selectedTeacher = teachers.find(t => t.id === selectedCharacter);

    // Main workspace
    return (
        <div className="min-h-screen bg-gray-950 relative overflow-hidden">
            <HologramBackground />

            {/* Hidden audio element for greetings */}
            <audio ref={audioRef} src="/r/1.mp3" preload="auto" />

            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={onBack}
                className="fixed top-6 left-6 z-50 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
            >
                <ArrowLeft size={20} className="text-gray-400 group-hover:text-white transition-colors" />
            </motion.button>

            <div className="h-screen flex relative z-10">
                {/* Left side - 3D Model or Teacher Image (1/3) */}
                <div className="w-1/3 border-r border-white/10 p-6 flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-white">{selectedTeacher?.name}</h3>
                        <p className="text-sm text-gray-400">{selectedTeacher?.grade} • {selectedTeacher?.expertise}</p>
                    </div>
                    <div className="flex-1 glass-panel p-4 rounded-xl overflow-hidden flex items-center justify-center">
                        {selectedTeacher?.id === 'default' ? (
                            <ModelViewer isTyping={isTyping} />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                <img
                                    src={selectedTeacher?.image}
                                    alt={selectedTeacher?.name}
                                    className="max-w-full max-h-full object-contain"
                                    style={{
                                        filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.3))'
                                    }}
                                />
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right side - Work Area (2/3) */}
                <div className="flex-1 p-6 flex flex-col gap-4">
                    <h3 className="text-xl font-semibold text-white">Your Work Area</h3>
                    <div className="flex-1 glass-panel p-6 rounded-xl relative">
                        <textarea
                            ref={textareaRef}
                            value={workText}
                            onChange={handleTextChange}
                            disabled={isAITyping}
                            placeholder="Paste or type your content here..."
                            className="w-full h-full bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none text-lg leading-relaxed disabled:opacity-70"
                        />

                        {/* Live Correction Bubble */}
                        {currentError && (
                            <div className="absolute bottom-6 left-6">
                                <LiveCorrectionBubble
                                    error={currentError}
                                    onApplyFix={handleApplyFix}
                                />
                            </div>
                        )}
                    </div>

                    {/* AI Feedback Panel */}
                    <AnimatePresence>
                        {(aiFeedback || isAnalyzing) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="glass-panel p-4 rounded-xl border-l-4"
                                style={{
                                    borderColor: aiFeedback?.type === 'spelling' ? '#ef4444' :
                                        aiFeedback?.type === 'grammar' ? '#f59e0b' :
                                            aiFeedback?.type === 'math' ? '#3b82f6' : '#8b5cf6'
                                }}
                            >
                                {isAnalyzing ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                        <p className="text-gray-300 text-sm">Analyzing your text...</p>
                                    </div>
                                ) : aiFeedback?.hasErrors ? (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xl">
                                                {aiFeedback.type === 'spelling' ? '✏️' :
                                                    aiFeedback.type === 'grammar' ? '📝' :
                                                        aiFeedback.type === 'math' ? '🧮' : '💡'}
                                            </span>
                                            <h4 className="text-white font-semibold capitalize">
                                                {aiFeedback.type} Help
                                            </h4>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            <TypewriterText text={aiFeedback.feedback} speed={25} />
                                        </p>
                                    </div>
                                ) : null}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Floating AI Assistant */}
            <AnimatePresence>
                {showChat && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="fixed bottom-24 right-6 w-96 h-[500px] glass-panel p-6 rounded-xl shadow-2xl z-50"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-semibold text-white">AI Assistant</h4>
                            <button
                                onClick={() => setShowChat(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="h-[calc(100%-2rem)]">
                            <AIRobotAssistant />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating AI Icon */}
            <motion.button
                onClick={() => setShowChat(!showChat)}
                className="fixed bottom-6 right-6 z-40"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: showChat ? 0 : [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="relative">
                    <div className="absolute inset-0 blur-xl opacity-50">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
                    </div>

                    <svg width="64" height="64" viewBox="0 0 120 120" className="relative z-10">
                        <defs>
                            <linearGradient id="logoGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>

                        <rect
                            x="30"
                            y="35"
                            width="60"
                            height="50"
                            rx="25"
                            fill="#1a1a1a"
                            stroke="url(#logoGlow)"
                            strokeWidth="3"
                        />

                        <circle cx="50" cy="55" r="6" fill="white" />
                        <circle cx="50" cy="57" r="3" fill="#3b82f6" />
                        <circle cx="70" cy="55" r="6" fill="white" />
                        <circle cx="70" cy="57" r="3" fill="#3b82f6" />
                    </svg>
                </div>
            </motion.button>
        </div>
    );
};
