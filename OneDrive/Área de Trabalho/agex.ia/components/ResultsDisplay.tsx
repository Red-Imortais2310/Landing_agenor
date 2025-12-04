import React from 'react';
import { renderMarkdown } from '../utils/markdown';

interface ResultsDisplayProps {
    isLoading: boolean;
    error: string | null;
    result: string;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-slate-700/50 rounded w-1/4"></div>
        <div className="h-3 bg-slate-700/50 rounded w-full"></div>
        <div className="h-3 bg-slate-700/50 rounded w-5/6"></div>
        <div className="h-4 bg-slate-700/50 rounded w-1/3 mt-6"></div>
        <div className="h-3 bg-slate-700/50 rounded w-full"></div>
        <div className="h-3 bg-slate-700/50 rounded w-full"></div>
        <div className="h-3 bg-slate-700/50 rounded w-4/6"></div>
    </div>
);


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, error, result }) => {
    
    const shouldDisplay = isLoading || error || result;

    if (!shouldDisplay) {
        return null;
    }

    return (
        <div className="mt-8 p-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-lg min-h-[200px] w-full">
            {isLoading && <LoadingSkeleton />}
            {error && <div className="text-red-400 bg-red-900/30 p-4 rounded-lg">{error}</div>}
            {!isLoading && !error && result && (
                 <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-h1:text-sky-300 prose-h2:text-sky-400 prose-strong:text-slate-100 prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
                    {renderMarkdown(result)}
                </div>
            )}
        </div>
    );
};