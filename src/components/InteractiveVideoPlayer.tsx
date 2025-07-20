import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SpeakerHigh, SpeakerSlash, Check, X } from 'phosphor-react';
import { AIChatInterface } from './AIChatInterface';

interface InteractiveVideoPlayerProps {
    character: { name: string; color: string } | undefined;
}

interface QuizQuestion {
    id: number;
    timestamp: number; // in seconds
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

export const InteractiveVideoPlayer: React.FC<InteractiveVideoPlayerProps> = ({ character: _character }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
    const [countdown, setCountdown] = useState(10);
    const [isBuffering, setIsBuffering] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isVideoBuffering, setIsVideoBuffering] = useState(true);

    const quizQuestions: QuizQuestion[] = [
        {
            id: 1,
            timestamp: 10,
            question: "Which of the following BEST describes Copyrights?",
            options: [
                "Rules for punishing people who use the internet",
                "Legal rights that protect creators and their original work",
                "A license that lets everyone share creative works freely",
                "Laws that only apply to movies and songs"
            ],
            correctAnswer: 1,
            explanation: "Copyrights = protection for creators + their original works."
        },
        {
            id: 2,
            timestamp: 20,
            question: "Which of these is a type of work protected by copyright?",
            options: [
                "Weather reports",
                "Mathematical formulas",
                "Artistic works like drawings or logos",
                "Road traffic rules"
            ],
            correctAnswer: 2,
            explanation: "Artistic works are copyrighted; weather data & rules are not."
        },
        {
            id: 3,
            timestamp: 40,
            question: "Who is protected under \"Related Rights\"?",
            options: [
                "Only programmers",
                "Only teachers",
                "Performers and producers who help bring creative works to the public",
                "People who buy music online"
            ],
            correctAnswer: 2,
            explanation: "Related rights protect actors, singers, producers, broadcasters."
        }
    ];

    // Countdown timer, then buffering, then page loads
    useEffect(() => {
        if (!isBuffering && !isReady && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && !isBuffering && !isReady) {
            setIsBuffering(true);
            // Buffer for 10 seconds before showing page
            setTimeout(() => {
                setIsBuffering(false);
                setIsReady(true);
                // Start 3-second video buffer after page loads
                setTimeout(() => {
                    setIsVideoBuffering(false);
                }, 3000);
            }, 10000);
        }
    }, [countdown, isBuffering, isReady]);

    // Monitor video time for quiz triggers
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            const time = video.currentTime;
            setCurrentTime(time);

            // Check if we should show a quiz
            const unansweredQuestion = quizQuestions.find(
                q => !answeredQuestions.has(q.id) &&
                    time >= q.timestamp &&
                    time < q.timestamp + 0.5
            );

            if (unansweredQuestion && !showQuiz) {
                video.pause();
                setIsPlaying(false);
                setCurrentQuestion(unansweredQuestion);
                setShowQuiz(true);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [answeredQuestions, showQuiz, quizQuestions]);

    const togglePlay = () => {
        if (!videoRef.current || !isReady || isVideoBuffering) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleAnswerSubmit = () => {
        if (selectedAnswer === null || !currentQuestion) return;

        setAnsweredQuestions(prev => new Set(prev).add(currentQuestion.id));

        // Wait a bit to show the result, then resume video
        setTimeout(() => {
            setShowQuiz(false);
            setCurrentQuestion(null);
            setSelectedAnswer(null);
            if (videoRef.current) {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }, 2000);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Countdown screen
    if (!isReady && !isBuffering) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
                <div className="text-center relative z-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Your session is getting ready</h2>
                        <p className="text-gray-400 mb-8">Kindly wait...</p>

                        <motion.div
                            className="text-8xl font-bold text-blue-500 mb-4"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            {countdown}
                        </motion.div>

                        <div className="w-64 h-2 bg-white/10 rounded-full mx-auto overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                                initial={{ width: '0%' }}
                                animate={{ width: `${((10 - countdown) / 10) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // Buffering screen
    if (isBuffering && !isReady) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
                <div className="text-center relative z-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8">Loading your experience...</h2>

                        {/* Animated spinner */}
                        <div className="flex justify-center mb-8">
                            <motion.div
                                className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        {/* Animated dots */}
                        <div className="flex items-center justify-center gap-2">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-3 h-3 bg-blue-500 rounded-full"
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Video Player - Left Side */}
                <div className="glass-panel p-2">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                        {isVideoBuffering ? (
                            // Video buffering overlay
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                                <div className="text-center">
                                    <motion.div
                                        className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-4"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                    <p className="text-gray-400 text-sm">Loading video...</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <video
                                    ref={videoRef}
                                    className="w-full h-full object-cover"
                                    src="/v1.mp4"
                                    onEnded={() => setIsPlaying(false)}
                                />

                                {/* Video Controls Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                    {/* Progress Bar */}
                                    <div className="mb-3">
                                        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 transition-all duration-100"
                                                style={{ width: `${(currentTime / duration) * 100}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>{formatTime(currentTime)}</span>
                                            <span>{formatTime(duration)}</span>
                                        </div>
                                    </div>

                                    {/* Control Buttons */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={togglePlay}
                                            className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors"
                                        >
                                            {isPlaying ? (
                                                <Pause size={20} weight="fill" className="text-white" />
                                            ) : (
                                                <Play size={20} weight="fill" className="text-white ml-0.5" />
                                            )}
                                        </button>

                                        <button
                                            onClick={toggleMute}
                                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                        >
                                            {isMuted ? (
                                                <SpeakerSlash size={20} weight="fill" className="text-white" />
                                            ) : (
                                                <SpeakerHigh size={20} weight="fill" className="text-white" />
                                            )}
                                        </button>

                                        <div className="flex-1" />

                                        <div className="text-sm text-white font-medium">
                                            Question {answeredQuestions.size} / {quizQuestions.length} answered
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Quiz Panel - Right Side */}
                <div className="glass-panel p-6">
                    <AnimatePresence mode="wait">
                        {showQuiz && currentQuestion ? (
                            <motion.div
                                key={currentQuestion.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="h-full flex flex-col"
                            >
                                <div className="mb-4">
                                    <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                                        Question {currentQuestion.id} of {quizQuestions.length}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-6">
                                        {currentQuestion.question}
                                    </h3>
                                </div>

                                <div className="space-y-3 flex-1">
                                    {currentQuestion.options.map((option, index) => {
                                        const isSelected = selectedAnswer === index;
                                        const isCorrect = index === currentQuestion.correctAnswer;
                                        const showResult = selectedAnswer !== null;

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => !showResult && setSelectedAnswer(index)}
                                                disabled={showResult}
                                                className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-start gap-3 ${showResult
                                                        ? isCorrect
                                                            ? 'bg-green-500/20 border-2 border-green-500'
                                                            : isSelected
                                                                ? 'bg-red-500/20 border-2 border-red-500'
                                                                : 'bg-white/5 border border-white/10'
                                                        : isSelected
                                                            ? 'bg-blue-500/20 border-2 border-blue-500'
                                                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                                    }`}
                                            >
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${showResult && isCorrect
                                                        ? 'bg-green-500'
                                                        : showResult && isSelected
                                                            ? 'bg-red-500'
                                                            : isSelected
                                                                ? 'bg-blue-500'
                                                                : 'bg-white/10'
                                                    }`}>
                                                    {showResult && isCorrect && <Check size={16} weight="bold" className="text-white" />}
                                                    {showResult && isSelected && !isCorrect && <X size={16} weight="bold" className="text-white" />}
                                                </div>
                                                <span className="text-white font-medium">{option}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {selectedAnswer !== null && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`mt-6 p-4 rounded-xl ${selectedAnswer === currentQuestion.correctAnswer
                                                ? 'bg-green-500/20 border border-green-500/50'
                                                : 'bg-red-500/20 border border-red-500/50'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {selectedAnswer === currentQuestion.correctAnswer ? (
                                                <Check size={24} weight="bold" className="text-green-500 flex-shrink-0" />
                                            ) : (
                                                <X size={24} weight="bold" className="text-red-500 flex-shrink-0" />
                                            )}
                                            <div>
                                                <p className={`font-semibold mb-1 ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-400' : 'text-red-400'
                                                    }`}>
                                                    {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                                                </p>
                                                <p className="text-gray-300 text-sm">{currentQuestion.explanation}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {selectedAnswer === null && (
                                    <button
                                        onClick={handleAnswerSubmit}
                                        disabled
                                        className="btn-primary w-full mt-6 opacity-50 cursor-not-allowed"
                                    >
                                        Select an answer
                                    </button>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full"
                            >
                                <AIChatInterface />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
