import React from 'react';

interface ParallaxBackgroundProps {
    images: string[];
    currentImageIndex: number;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ images, currentImageIndex }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-slate-900">
            {images.map((src, index) => (
                <div
                    key={src}
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-[4000ms] ease-in-out filter grayscale animate-kenburns"
                    style={{
                        backgroundImage: `url(${src})`,
                        opacity: index === currentImageIndex ? 1 : 0,
                        animationDelay: `-${index * 10}s`,
                        willChange: 'transform, opacity',
                    }}
                />
            ))}
             <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
        </div>
    );
};
