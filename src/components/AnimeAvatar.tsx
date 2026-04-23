import React from 'react';

interface AnimeAvatarProps {
    color: string;
    size?: number;
    variant?: 'nova' | 'atlas' | 'spark' | 'luna' | 'pixel' | 'default';
}

export const AnimeAvatar: React.FC<AnimeAvatarProps> = ({ color, size = 80, variant = 'default' }) => {
    const getAvatarPath = () => {
        switch (variant) {
            case 'nova':
                return (
                    <>
                        {/* Head */}
                        <circle cx="50" cy="45" r="28" fill={color} opacity="0.9" />
                        {/* Hair - Purple bun */}
                        <circle cx="50" cy="25" r="15" fill="#7c3aed" />
                        <ellipse cx="50" cy="20" rx="18" ry="12" fill="#6d28d9" />
                        {/* Face */}
                        <circle cx="50" cy="45" r="22" fill="#ffd9b3" />
                        {/* Eyes - anime style */}
                        <ellipse cx="42" cy="42" rx="4" ry="6" fill="#1a1a1a" />
                        <ellipse cx="58" cy="42" rx="4" ry="6" fill="#1a1a1a" />
                        <circle cx="43" cy="40" r="2" fill="white" />
                        <circle cx="59" cy="40" r="2" fill="white" />
                        {/* Smile */}
                        <path d="M 42 50 Q 50 54 58 50" stroke="#ff6b9d" strokeWidth="2" fill="none" strokeLinecap="round" />
                        {/* Blush */}
                        <circle cx="38" cy="48" r="3" fill="#ff6b9d" opacity="0.3" />
                        <circle cx="62" cy="48" r="3" fill="#ff6b9d" opacity="0.3" />
                        {/* Body */}
                        <ellipse cx="50" cy="75" rx="22" ry="18" fill={color} opacity="0.8" />
                    </>
                );
            case 'atlas':
                return (
                    <>
                        {/* Head */}
                        <circle cx="50" cy="45" r="26" fill="#ffd9b3" />
                        {/* Hair - grey short */}
                        <ellipse cx="50" cy="28" rx="26" ry="18" fill="#9ca3af" />
                        {/* Glasses */}
                        <circle cx="42" cy="42" r="6" fill="none" stroke="#3b82f6" strokeWidth="2" />
                        <circle cx="58" cy="42" r="6" fill="none" stroke="#3b82f6" strokeWidth="2" />
                        <line x1="48" y1="42" x2="52" y2="42" stroke="#3b82f6" strokeWidth="2" />
                        {/* Eyes */}
                        <circle cx="42" cy="42" r="3" fill="#1a1a1a" />
                        <circle cx="58" cy="42" r="3" fill="#1a1a1a" />
                        <circle cx="43" cy="41" r="1.5" fill="white" />
                        <circle cx="59" cy="41" r="1.5" fill="white" />
                        {/* Smile */}
                        <path d="M 42 52 Q 50 55 58 52" stroke="#666" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        {/* Body */}
                        <ellipse cx="50" cy="75" rx="24" ry="18" fill={color} opacity="0.8" />
                    </>
                );
            case 'spark':
                return (
                    <>
                        {/* Head */}
                        <circle cx="50" cy="45" r="26" fill="#ffd9b3" />
                        {/* Hair - spiky orange */}
                        <path d="M 30 35 L 25 20 L 35 30 L 32 15 L 38 28 L 40 12 L 45 26 L 48 10 L 52 26 L 55 12 L 60 28 L 62 15 L 65 30 L 68 20 L 70 35"
                            fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
                        {/* Eyes - excited */}
                        <ellipse cx="42" cy="40" rx="5" ry="7" fill="#1a1a1a" />
                        <ellipse cx="58" cy="40" rx="5" ry="7" fill="#1a1a1a" />
                        <circle cx="44" cy="38" r="2.5" fill="white" />
                        <circle cx="60" cy="38" r="2.5" fill="white" />
                        <circle cx="44" cy="41" r="1" fill="white" />
                        <circle cx="60" cy="41" r="1" fill="white" />
                        {/* Big smile */}
                        <path d="M 38 50 Q 50 58 62 50" stroke="#ff6b00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        {/* Body */}
                        <ellipse cx="50" cy="75" rx="24" ry="18" fill={color} opacity="0.8" />
                    </>
                );
            case 'luna':
                return (
                    <>
                        {/* Head */}
                        <circle cx="50" cy="45" r="26" fill="#ffd9b3" />
                        {/* Hair - long silver */}
                        <ellipse cx="50" cy="30" rx="28" ry="20" fill="#d1d5db" />
                        <path d="M 25 45 Q 22 60 25 70" stroke="#d1d5db" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <path d="M 75 45 Q 78 60 75 70" stroke="#d1d5db" strokeWidth="8" fill="none" strokeLinecap="round" />
                        {/* Eyes - calm */}
                        <ellipse cx="42" cy="42" rx="3.5" ry="5" fill="#1a1a1a" />
                        <ellipse cx="58" cy="42" rx="3.5" ry="5" fill="#1a1a1a" />
                        <circle cx="43" cy="40" r="1.5" fill="white" />
                        <circle cx="59" cy="40" r="1.5" fill="white" />
                        {/* Gentle smile */}
                        <path d="M 42 52 Q 50 54 58 52" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        {/* Body */}
                        <ellipse cx="50" cy="75" rx="24" ry="18" fill={color} opacity="0.8" />
                    </>
                );
            case 'pixel':
                return (
                    <>
                        {/* Head */}
                        <circle cx="50" cy="45" r="26" fill="#ffd9b3" />
                        {/* Hair - short pink with headphones */}
                        <ellipse cx="50" cy="30" rx="26" ry="18" fill="#ec4899" />
                        {/* Headphones */}
                        <circle cx="28" cy="42" r="8" fill="#1a1a1a" opacity="0.7" />
                        <circle cx="72" cy="42" r="8" fill="#1a1a1a" opacity="0.7" />
                        <circle cx="28" cy="42" r="5" fill="#00d9ff" />
                        <circle cx="72" cy="42" r="5" fill="#00d9ff" />
                        <path d="M 30 35 Q 50 32 70 35" stroke="#1a1a1a" strokeWidth="3" fill="none" />
                        {/* Eyes - cool */}
                        <ellipse cx="42" cy="44" rx="4" ry="5" fill="#1a1a1a" />
                        <ellipse cx="58" cy="44" rx="4" ry="5" fill="#1a1a1a" />
                        <circle cx="43" cy="42" r="2" fill="white" />
                        <circle cx="59" cy="42" r="2" fill="white" />
                        {/* Smile */}
                        <path d="M 42 54 Q 50 57 58 54" stroke="#ec4899" strokeWidth="2" fill="none" strokeLinecap="round" />
                        {/* Body */}
                        <ellipse cx="50" cy="75" rx="24" ry="18" fill={color} opacity="0.8" />
                    </>
                );
            default:
                return (
                    <>
                        {/* Robot head */}
                        <rect x="30" y="30" width="40" height="35" rx="8" fill={color} opacity="0.9" />
                        {/* Antenna */}
                        <line x1="50" y1="30" x2="50" y2="20" stroke={color} strokeWidth="2" />
                        <circle cx="50" cy="18" r="4" fill="#00d9ff" />
                        {/* Eyes */}
                        <circle cx="40" cy="45" r="5" fill="#00d9ff" />
                        <circle cx="60" cy="45" r="5" fill="#00d9ff" />
                        {/* Smile line */}
                        <path d="M 38 56 L 62 56" stroke="#00d9ff" strokeWidth="2" strokeLinecap="round" />
                        {/* Body */}
                        <rect x="32" y="65" width="36" height="22" rx="6" fill={color} opacity="0.8" />
                    </>
                );
        }
    };

    return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="mx-auto">
            {getAvatarPath()}
        </svg>
    );
};
