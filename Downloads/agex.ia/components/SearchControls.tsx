import React, { useRef, useCallback } from 'react';
import { SearchIcon, PaperclipIcon, XIcon } from './icons';

interface SearchControlsProps {
    query: string;
    onQueryChange: (query: string) => void;
    file: File | null;
    onFileChange: (file: File | null) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

export const SearchControls: React.FC<SearchControlsProps> = ({
    query,
    onQueryChange,
    file,
    onFileChange,
    onSubmit,
    isLoading
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        onFileChange(selectedFile);
    };

    const handleRemoveFile = () => {
        onFileChange(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    
    const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onQueryChange(event.target.value);
        const textarea = event.target;
        textarea.style.height = 'auto'; // Reset height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey && !isLoading) {
            event.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="space-y-4 mb-8">
            <div className="group relative w-full">
                {/* Borda animada com gradiente */}
                <div
                    className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 opacity-0 group-focus-within:opacity-100 transition duration-300"
                    style={{ backgroundSize: '300% 300%', animation: 'animated-gradient 4s ease infinite' }}
                    aria-hidden="true"
                ></div>
                
                {/* Contêiner de conteúdo principal */}
                <div className="relative flex items-start w-full bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-lg p-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelected}
                        className="hidden"
                        accept=".txt,.md,.text"
                    />
                    <button
                        onClick={handleFileButtonClick}
                        disabled={isLoading}
                        className="p-3 text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                        aria-label="Carregar documento"
                    >
                        <PaperclipIcon className={file ? "text-cyan-400" : ""} />
                    </button>
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={query}
                        onChange={handleQueryChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Faça uma pergunta ou analise um documento..."
                        className="w-full h-auto py-3 px-1 bg-transparent text-lg text-slate-100 placeholder-slate-500 focus:outline-none resize-none overflow-y-hidden max-h-48"
                        disabled={isLoading}
                    />
                    <button
                        onClick={onSubmit}
                        disabled={isLoading || (!query && !file)}
                        className="self-end ml-2 p-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 transition-all duration-200 transform hover:scale-105 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
                        aria-label="Analisar"
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            <SearchIcon />
                        )}
                    </button>
                </div>
            </div>

            {file && (
                <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                    <PaperclipIcon className="text-cyan-400" />
                    <span className="truncate max-w-xs font-medium">{file.name}</span>
                    <button onClick={handleRemoveFile} className="text-slate-500 hover:text-white transition-colors">
                        <XIcon />
                    </button>
                </div>
            )}
        </div>
    );
};