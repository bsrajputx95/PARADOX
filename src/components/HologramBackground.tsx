import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        VANTA: any;
        THREE: any;
    }
}

export const HologramBackground: React.FC = () => {
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<any>(null);

    useEffect(() => {
        if (!vantaRef.current) return;

        const initVanta = () => {
            if (window.VANTA && window.THREE) {
                vantaEffect.current = window.VANTA.DOTS({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    backgroundColor: 0x030305,
                    color: 0x8b5cf6,
                    size: 3.00,
                    spacing: 25.00
                });
            }
        };

        if (window.VANTA && window.THREE) {
            initVanta();
        } else {
            const checkInterval = setInterval(() => {
                if (window.VANTA && window.THREE) {
                    clearInterval(checkInterval);
                    initVanta();
                }
            }, 100);

            return () => {
                clearInterval(checkInterval);
                if (vantaEffect.current) {
                    vantaEffect.current.destroy();
                }
            };
        }

        return () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
            }
        };
    }, []);

    return (
        <div
            ref={vantaRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
        />
    );
};
