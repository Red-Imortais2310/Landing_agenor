
import { GoogleGenAI } from '@google/genai';

export const generateAcademicAnalysis = async (
    ai: GoogleGenAI,
    query: string,
    fileContent: string
): Promise<string> => {
    const model = 'gemini-2.5-flash';

    const promptParts: string[] = [
        "Você é Agex.Ia, um assistente de pesquisa acadêmica de IA altamente avançado. Sua tarefa é analisar a consulta do usuário e o texto do documento fornecido para gerar uma análise acadêmica abrangente.",
        "Por favor, forneça o seguinte em formato markdown bem estruturado:"
    ];

    if (query) {
        promptParts.push(`\n**Consulta de Pesquisa do Usuário:** "${query}"`);
    }

    if (fileContent) {
        promptParts.push(`\n**Conteúdo do Documento Fornecido:**\n---\n${fileContent.substring(0, 15000)}\n---`);
    }

    promptParts.push(
        "\n**Estrutura da Análise:**\n" +
        "1.  **Resumo Executivo:** Um resumo conciso do documento em relação à consulta. Se nenhum documento for fornecido, resuma o tópico da consulta.\n" +
        "2.  **Principais Temas e Conceitos:** Uma lista com marcadores dos temas e conceitos mais importantes identificados.\n" +
        "3.  **Possíveis Perguntas de Pesquisa:** Três perguntas de pesquisa perspicazes e prospectivas baseadas na análise.\n" +
        "4.  **Palavras-chave Relevantes:** Uma lista de 5 a 10 palavras-chave relevantes para pesquisas em bases de dados."
    );

    const fullPrompt = promptParts.join('\n');

    const response = await ai.models.generateContent({
        model: model,
        contents: fullPrompt,
        config: {
            temperature: 0.5,
            topP: 0.95,
            topK: 64,
        }
    });

    if (response.text) {
        return response.text;
    } else {
        throw new Error('Nenhum conteúdo gerado pela API.');
    }
};