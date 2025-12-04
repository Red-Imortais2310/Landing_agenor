
import React, { ReactNode } from 'react';

const applyFormatting = (text: string): ReactNode => {
    // Bold: **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = text.split(boldRegex);

    return parts.map((part, index) => {
        if (index % 2 === 1) { // It's a match for bold
            return <strong key={index}>{part}</strong>;
        }
        return part;
    });
};

export const renderMarkdown = (markdown: string): ReactNode[] => {
    const lines = markdown.split('\n');
    const elements: ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 my-2">
                    {listItems.map((item, i) => (
                        <li key={i}>{applyFormatting(item)}</li>
                    ))}
                </ul>
            );
            listItems = [];
        }
    };

    lines.forEach((line, index) => {
        // Headings
        if (line.startsWith('#### ')) {
            flushList();
            elements.push(<h4 key={index} className="text-lg font-semibold mt-4 mb-2">{applyFormatting(line.substring(5))}</h4>);
        } else if (line.startsWith('### ')) {
            flushList();
            elements.push(<h3 key={index} className="text-xl font-semibold mt-5 mb-2">{applyFormatting(line.substring(4))}</h3>);
        } else if (line.startsWith('## ')) {
            flushList();
            elements.push(<h2 key={index} className="text-2xl font-bold mt-6 mb-3 border-b border-slate-700 pb-2">{applyFormatting(line.substring(3))}</h2>);
        } else if (line.startsWith('# ')) {
            flushList();
            elements.push(<h1 key={index} className="text-3xl font-bold mt-6 mb-4 border-b-2 border-slate-600 pb-2">{applyFormatting(line.substring(2))}</h1>);
        }
        // Unordered lists
        else if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
            listItems.push(line.trim().substring(2));
        }
        // Paragraphs
        else {
            flushList();
            if (line.trim() !== '') {
                elements.push(<p key={index} className="my-2">{applyFormatting(line)}</p>);
            }
        }
    });

    flushList(); // Make sure the last list is rendered
    return elements;
};
