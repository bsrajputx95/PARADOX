import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const MagneticCursor: React.FC = () => {
    const [cursorSize, setCursorSize] = useState(10);
    const [cursorColor, setCursorColor] = useState('rgba(59, 130, 246, 0.6)');
    const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
    const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a')
            ) {
                setCursorSize(40);
                setCursorColor('rgba(139, 92, 246, 0.4)');
            } else if (target.closest('.card')) {
                setCursorSize(20);
                setCursorColor('rgba(59, 130, 246, 0.5)');
            } else {
                setCursorSize(10);
                setCursorColor('rgba(59, 130, 246, 0.6)');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className="fixed pointer-events-none z-[9999] rounded-full mix-blend-lighten"
                style={{
                    x: cursorX,
                    y: cursorY,
                    width: cursorSize,
                    height: cursorSize,
                    backgroundColor: cursorColor,
                    translateX: '-50%',
                    translateY: '-50%',
                    boxShadow: `0 0 ${cursorSize}px ${cursorSize / 2}px ${cursorColor}`,
                }}
                transition={{
                    width: { duration: 0.2 },
                    height: { duration: 0.2 },
                    backgroundColor: { duration: 0.2 },
                }}
            />

            <motion.div
                className="fixed pointer-events-none z-[9999] rounded-full border-2 border-primary-400/30"
                style={{
                    x: cursorX,
                    y: cursorY,
                    width: cursorSize * 1.5,
                    height: cursorSize * 1.5,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                transition={{
                    width: { duration: 0.2 },
                    height: { duration: 0.2 },
                }}
            />
        </>
    );
};
