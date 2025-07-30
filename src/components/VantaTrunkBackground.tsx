import React, { useEffect, useRef } from 'react';

// Vanta will be loaded via CDN or npm
declare global {
    interface Window {
        VANTA: any;
        THREE: any;
    }
}

export const VantaTrunkBackground: React.FC = () => {
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<any>(null);

    useEffect(() => {
        // Dynamically load Vanta if not already loaded
        const loadVanta = async () => {
            if (!window.VANTA) {
                // Load THREE.js first
                const threeScript = document.createElement('script');
                threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
                document.head.appendChild(threeScript);

                await new Promise((resolve) => {
                    threeScript.onload = resolve;
                });

                // Load Vanta TRUNK
                const vantaScript = document.createElement('script');
                vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.trunk.min.js';
                document.head.appendChild(vantaScript);

                await new Promise((resolve) => {
                    vantaScript.onload = resolve;
                });
            }

            // Initialize Vanta effect
            if (vantaRef.current && window.VANTA && !vantaEffect.current) {
                vantaEffect.current = window.VANTA.TRUNK({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x6d7de5,
                    backgroundColor: 0x151517,
                    spacing: 15.00,
                    chaos: 3.00
                });
            }
        };

        loadVanta();

        // Cleanup
        return () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
            }
        };
    }, []);

    return (
        <div
            ref={vantaRef}
            className="fixed inset-0 w-full h-full"
            style={{ zIndex: 0 }}
        />
    );
};
