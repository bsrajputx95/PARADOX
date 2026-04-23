import React, { useState, useEffect } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

interface SpotlightEffectProps {
    className?: string;
    size?: number;
    color?: string;
    opacity?: number;
}

export const SpotlightEffect: React.FC<SpotlightEffectProps> = ({
    className = '',
    size = 600,
    color = 'rgba(59, 130, 246, 0.15)',
    opacity = 1,
}) => {
    const mousePosition = useMousePosition();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 pointer-events-none ${className}`}
            style={{
                background: `radial-gradient(${size}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${color}, transparent 40%)`,
                opacity,
                zIndex: 1,
                mixBlendMode: 'lighten',
            }}
        />
    );
};
