import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        VANTA: any;
        THREE: any;
    }
}

export const LiveBackground: React.FC = () => {
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<any>(null);

    useEffect(() => {
        if (!vantaRef.current) return;

        // Wait for scripts to load
        const initVanta = () => {
            if (window.VANTA && window.THREE) {
                vantaEffect.current = window.VANTA.NET({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x3b82f6,
                    backgroundColor: 0x030305,
                    points: 10.00,
                    maxDistance: 20.00,
                    spacing: 15.00
                });
            }
        };

        // Check if scripts are already loaded
        if (window.VANTA && window.THREE) {
            initVanta();
        } else {
            // Wait for scripts to load
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
