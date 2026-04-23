import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, Check } from 'phosphor-react';
import { CinemaBackground } from './CinemaBackground';
import { AnimeAvatar } from './AnimeAvatar';
import { InteractiveVideoPlayer } from './InteractiveVideoPlayer';

interface CinemaModeFlowProps {
    onBack: () => void;
}

export const CinemaModeFlow: React.FC<CinemaModeFlowProps> = ({ onBack }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

    const characters = [
        { id: 'nova', name: 'Professor Nova', color: '#8b5cf6', description: 'Enthusiastic & Creative', variant: 'nova' as const },
        { id: 'atlas', name: 'Dr. Atlas', color: '#3b82f6', description: 'Wise & Methodical', variant: 'atlas' as const },
        { id: 'spark', name: 'Coach Spark', color: '#f59e0b', description: 'Energetic & Motivating', variant: 'spark' as const },
        { id: 'sage', name: 'Sage Luna', color: '#10b981', description: 'Calm & Patient', variant: 'luna' as const },
        { id: 'pixel', name: 'Pixel', color: '#ec4899', description: 'Tech-Savvy & Modern', variant: 'pixel' as const },
        { id: 'default', name: 'Default AI', color: '#6b7280', description: 'Neutral & Professional', variant: 'default' as const }
    ];

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
            setTimeout(() => setCurrentStep(2), 800);
        }
    };

    const handleCharacterSelect = (characterId: string) => {
        setSelectedCharacter(characterId);
        setTimeout(() => setCurrentStep(3), 600);
    };

    return (
        <div className="min-h-screen bg-gray-950 relative overflow-hidden">
            {/* Cinema-specific HALO Background */}
            <CinemaBackground />

            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={onBack}
                className="fixed top-6 left-6 z-50 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
            >
                <ArrowLeft size={20} className="text-gray-400 group-hover:text-white transition-colors" />
            </motion.button>

            {/* Progress Indicator */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <div className="flex items-center gap-3">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= step
                                ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                                : 'border-white/20 bg-white/5 text-gray-500'
                                }`}>
                                {currentStep > step ? (
                                    <Check size={18} weight="bold" />
                                ) : (
                                    <span className="text-sm font-semibold">{step}</span>
                                )}
                            </div>
                            {step < 3 && (
                                <div className={`w-12 h-0.5 transition-colors duration-300 ${currentStep > step ? 'bg-blue-500' : 'bg-white/20'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="container mx-auto px-6 py-20 flex items-center justify-center min-h-screen relative z-10">
                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <PDFUploadStep
                            key="step1"
                            onFileUpload={handleFileUpload}
                            uploadedFile={uploadedFile}
                        />
                    )}
                    {currentStep === 2 && (
                        <CharacterSelectStep
                            key="step2"
                            characters={characters}
                            selectedCharacter={selectedCharacter}
                            onCharacterSelect={handleCharacterSelect}
                        />
                    )}
                    {currentStep === 3 && (
                        <InteractiveVideoPlayer
                            key="step3"
                            character={characters.find(c => c.id === selectedCharacter)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// PDF Upload Step
const PDFUploadStep: React.FC<{
    onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    uploadedFile: File | null;
}> = ({ onFileUpload, uploadedFile }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-2xl text-center"
    >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Upload Your Material</h2>
        <p className="text-gray-400 text-lg mb-12">Upload a PDF to transform into an interactive video lesson</p>

        <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <input
                type="file"
                accept=".pdf"
                onChange={onFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="glass-panel p-16 border-2 border-dashed border-white/20 hover:border-blue-500 transition-colors">
                <Upload size={64} className="text-blue-400 mx-auto mb-6" weight="duotone" />
                <h3 className="text-xl font-semibold text-white mb-2">
                    {uploadedFile ? uploadedFile.name : 'Click or drag to upload'}
                </h3>
                <p className="text-gray-400">PDF files only • Max 50MB</p>
            </div>
        </motion.div>
    </motion.div>
);

// Character Selection Step
const CharacterSelectStep: React.FC<{
    characters: Array<{ id: string; name: string; color: string; description: string; variant: 'nova' | 'atlas' | 'spark' | 'luna' | 'pixel' | 'default' }>;
    selectedCharacter: string | null;
    onCharacterSelect: (id: string) => void;
}> = ({ characters, selectedCharacter, onCharacterSelect }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-5xl text-center"
    >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your AI Teacher</h2>
        <p className="text-gray-400 text-lg mb-12">Select a character to narrate your lesson</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {characters.map((character) => (
                <motion.button
                    key={character.id}
                    onClick={() => onCharacterSelect(character.id)}
                    className={`glass-panel p-6 text-center transition-all duration-300 ${selectedCharacter === character.id
                        ? 'ring-2 ring-blue-500 bg-white/10'
                        : 'hover:bg-white/10'
                        }`}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <AnimeAvatar color={character.color} size={100} variant={character.variant} />
                    <h3 className="text-lg font-semibold text-white mt-4 mb-1">{character.name}</h3>
                    <p className="text-sm text-gray-400">{character.description}</p>
                </motion.button>
            ))}
        </div>
    </motion.div>
);
