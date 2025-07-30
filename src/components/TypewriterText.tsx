import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
    text: string;
    speed?: number; // milliseconds per character
    onComplete?: () => void;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    speed = 30,
    onComplete
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Reset when text changes
        setDisplayedText('');
        setCurrentIndex(0);
    }, [text]);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (currentIndex === text.length && onComplete) {
            onComplete();
        }
    }, [currentIndex, text, speed, onComplete]);

    return (
        <span className="inline">
            {displayedText}
            {currentIndex < text.length && (
                <span className="inline-block w-[2px] h-4 bg-purple-400 animate-pulse ml-[1px]" />
            )}
        </span>
    );
};
