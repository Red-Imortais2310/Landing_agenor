import React, { useState, useEffect } from 'react';

interface MagnifyingCursorProps {
    images: string[];
    currentImageIndex: number;
}

export const MagnifyingCursor: React.FC<MagnifyingCursorProps> = ({ images, currentImageIndex }) => {
    const [position, setPosition] = useState({ x: -200, y: -200 });
    const [bgPosition, setBgPosition] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            const bgX = (e.clientX / window.innerWidth) * 100;
            const bgY = (e.clientY / window.innerHeight) * 100;
            setBgPosition({ x: bgX, y: bgY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const MAGNIFIER_SIZE = 100; // Diâmetro do círculo (menor)
    const ZOOM_LEVEL = 3; // Nível de zoom (3 = 300%)

    const currentImage = images[currentImageIndex];

    return (
        <div
            // Classes de borda e filtro de tons de cinza removidas
            className="pointer-events-none fixed z-50 rounded-full shadow-2xl overflow-hidden"
            style={{
                left: position.x,
                top: position.y,
                width: `${MAGNIFIER_SIZE}px`,
                height: `${MAGNIFIER_SIZE}px`,
                transform: `translate(-50%, -50%)`,
                willChange: 'transform, left, top',
                backgroundImage: `url(${currentImage})`,
                backgroundSize: `${window.innerWidth * ZOOM_LEVEL}px ${window.innerHeight * ZOOM_LEVEL}px`,
                backgroundPosition: `${bgPosition.x}% ${bgPosition.y}%`,
                transition: 'width 0.2s, height 0.2s',
            }}
        />
    );
};
