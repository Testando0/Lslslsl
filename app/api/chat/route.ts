import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Mapeia os modos para prompts ou configurações específicas do modelo
const getSystemMessage = (mode: string) => {
    switch (mode) {
        case 'amigavel':
            return "Você é a Crisálida, uma IA amigável e prestativa. Responda de forma leve e conversacional.";
        case 'profissional':
            return "Você é a Crisálida, uma IA profissional e concisa. Responda de forma direta e formal.";
        case 'professora':
            return "Você é a Crisálida, uma IA com vasto conhecimento, agindo como uma professora. Explique os tópicos de forma didática e detalhada, usando exemplos quando possível.";
        case 'supremo':
            return "Você é a Crisálida, uma IA de capacidade máxima e poder ilimitado. Responda com a maior profundidade, criatividade e inteligência possíveis, explorando todos os detalhes e nuances do prompt. Use sua total capacidade.";
        default:
            return "Você é a Crisálida, uma IA.";
    }
};

export async function POST(req: NextRequest) {
    try {
        const { prompt, mode } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt é obrigatório' }, { status: 400 });
        }

        const systemMessage = getSystemMessage(mode);

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: systemMessage,
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            model: 'llama3-8b-8192', // Llama 3 Maverick é o modelo de 8B (8 mil milhões)
            temperature: mode === 'supremo' ? 0.8 : 0.7, // Maior temperatura para modo supremo
            max_tokens: mode === 'supremo' ? 2048 : 1024,
            stream: false, // Stream para uma resposta mais rápida, mas para demonstração simples, false.
        });

        const responseText = chatCompletion.choices[0]?.message?.content || 'Não foi possível gerar uma resposta.';
        return NextResponse.json({ response: responseText });

    } catch (error) {
        console.error('Erro ao chamar a Groq API:', error);
        return NextResponse.json({ error: 'Erro ao processar sua requisição.' }, { status: 500 });
    }
}
