
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="py-6 w-full flex justify-center">
            <div className="p-4 bg-black/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-exo animated-gradient-text">
                    Agex.Ia
                </h1>
            </div>
        </header>
    );
};