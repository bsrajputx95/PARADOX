import React, { ReactNode } from 'react';
import { useTilt, TiltOptions } from '@/hooks/useTilt';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    options?: TiltOptions;
    glare?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
    children,
    className = '',
    options = {},
    glare = true,
}) => {
    const { ref, style, handlers, isHovering, tilt } = useTilt(options);

    return (
        <div
            ref={ref}
            className={`relative ${className}`}
            style={{
                ...style,
                transformStyle: 'preserve-3d',
            }}
            {...handlers}
        >
            {children}

            {glare && isHovering && (
                <div
                    className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
                    style={{
                        background: `radial-gradient(circle at ${50 - tilt.y * 2}% ${50 + tilt.x * 2}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                        transform: 'translateZ(1px)',
                    }}
                />
            )}
        </div>
    );
};
