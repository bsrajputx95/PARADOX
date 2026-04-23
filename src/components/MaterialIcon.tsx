// Material Icon wrapper component for professional Google icons
import React from 'react';

interface MaterialIconProps {
    name: string;
    className?: string;
    filled?: boolean;
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
    name,
    className = '',
    filled = false
}) => {
    return (
        <span
            className={`material-symbols-rounded ${className}`}
            style={{
                fontVariationSettings: filled
                    ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                    : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"
            }}
        >
            {name}
        </span>
    );
};
