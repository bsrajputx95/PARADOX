import { useState, useEffect, RefObject } from 'react';

export interface ParallaxOptions {
    speed?: number; // Parallax speed multiplier (0-1 for slower, >1 for faster)
    direction?: 'vertical' | 'horizontal' | 'both';
}

export const useParallax = (
    ref: RefObject<HTMLElement>,
    options: ParallaxOptions = {}
) => {
    const { speed = 0.5, direction = 'vertical' } = options;
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const scrollY = window.scrollY;
            const elementTop = rect.top + scrollY;
            const windowHeight = window.innerHeight;

            // Calculate parallax offset
            const scrollProgress = (scrollY + windowHeight - elementTop) / (windowHeight + rect.height);
            const parallaxY = (scrollProgress - 0.5) * 100 * speed;
            const parallaxX = (scrollProgress - 0.5) * 100 * speed;

            if (direction === 'vertical') {
                setOffset({ x: 0, y: parallaxY });
            } else if (direction === 'horizontal') {
                setOffset({ x: parallaxX, y: 0 });
            } else {
                setOffset({ x: parallaxX, y: parallaxY });
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial calculation

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [ref, speed, direction]);

    return {
        style: {
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            willChange: 'transform',
        },
        offset,
    };
};
