
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Header } from './components/Header';
import { ParallaxBackground } from './components/ParallaxBackground';
import { SearchControls } from './components/SearchControls';
import { ResultsDisplay } from './components/ResultsDisplay';
import { MagnifyingCursor } from './components/MagnifyingCursor';
import { generateAcademicAnalysis } from './services/geminiService';

const images = [
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop', // Forest path
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop', // Mountains and lake
    'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?q=80&w=1942&auto=format&fit=crop', // Rolling hills
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop', // Misty mountains
];

const App: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<string>('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isCursorOverInteractiveArea, setIsCursorOverInteractiveArea] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 7000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (isCursorOverInteractiveArea) {
            document.body.style.cursor = 'auto';
        } else {
            document.body.style.cursor = 'none';
        }
        // Cleanup function to restore the cursor when the component unmounts
        return () => {
            document.body.style.cursor = 'auto';
        };
    }, [isCursorOverInteractiveArea]);

    const handleFileChange = (selectedFile: File | null) => {
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setFileContent(text);
            };
            reader.onerror = () => {
                setError('Falha ao ler o arquivo.');
                setFileContent('');
            };
            reader.readAsText(selectedFile);
        } else {
            setFileContent('');
        }
    };

    const handleSubmit = useCallback(async () => {
        if (!query && !fileContent) {
            setError('Por favor, insira uma consulta ou carregue um documento para analisar.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult('');

        try {
            // SECURITY: Use environment variable for API key
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

            if (!apiKey) {
                throw new Error('API Key não configurada. Configure VITE_GEMINI_API_KEY nas variáveis de ambiente.');
            }

            const ai = new GoogleGenAI({ apiKey });
            const analysis = await generateAcademicAnalysis(ai, query, fileContent);
            setResult(analysis);
        } catch (err) {
            if (err instanceof Error) {
                setError(`Ocorreu um erro: ${err.message}.`);
            } else {
                setError('Ocorreu um erro desconhecido.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [query, fileContent]);

    return (
        <div className="relative min-h-screen overflow-x-hidden">
            {!isCursorOverInteractiveArea && <MagnifyingCursor images={images} currentImageIndex={currentImageIndex} />}
            <ParallaxBackground images={images} currentImageIndex={currentImageIndex} />

            <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl flex flex-col items-center">
                    <Header />

                    <main className="w-full flex flex-col items-center justify-start pt-2 pb-12">
                        <div
                            className="w-full bg-black/20 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8"
                            onMouseEnter={() => setIsCursorOverInteractiveArea(true)}
                            onMouseLeave={() => setIsCursorOverInteractiveArea(false)}
                        >
                            <SearchControls
                                query={query}
                                onQueryChange={setQuery}
                                file={file}
                                onFileChange={handleFileChange}
                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                            />

                            <ResultsDisplay
                                isLoading={isLoading}
                                error={error}
                                result={result}
                            />
                        </div>
                        <footer className="text-center mt-8 text-slate-500 text-sm">
                            <p>Desenvolvido por Agenor & Google Gemini</p>
                        </footer>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;