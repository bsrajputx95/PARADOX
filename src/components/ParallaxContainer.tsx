import React, { ReactNode, useRef } from 'react';
import { useParallax, ParallaxOptions } from '@/hooks/useParallax';

interface ParallaxContainerProps {
    children: ReactNode;
    className?: string;
    options?: ParallaxOptions;
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
    children,
    className = '',
    options = {},
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { style } = useParallax(ref, options);

    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    );
};
