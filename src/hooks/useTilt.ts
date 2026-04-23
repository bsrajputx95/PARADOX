import { useState, useRef, MouseEvent } from 'react';

export interface TiltOptions {
    max?: number; // Maximum tilt angle
    perspective?: number; // Perspective value
    scale?: number; // Scale on hover
    speed?: number; // Transition speed
}

export const useTilt = (options: TiltOptions = {}) => {
    const { max = 15, perspective = 1000, scale = 1.05, speed = 400 } = options;

    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const tiltX = ((y - centerY) / centerY) * max;
        const tiltY = ((centerX - x) / centerX) * max;

        setTilt({ x: tiltX, y: tiltY });
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setTilt({ x: 0, y: 0 });
    };

    const getTransform = () => {
        const scaleValue = isHovering ? scale : 1;
        return `perspective(${perspective}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scaleValue})`;
    };

    return {
        ref,
        style: {
            transform: getTransform(),
            transition: `transform ${speed}ms ease-out`,
        },
        handlers: {
            onMouseMove: handleMouseMove,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
        },
        tilt,
        isHovering,
    };
};
