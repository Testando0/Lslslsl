"use client";

import { useState, useEffect, useRef } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import ButterflyMenu from './components/ButterflyMenu';
import { MdOutlineComputer } from 'react-icons/md'; // Ícone para a IA

interface Message {
    id: number;
    role: 'user' | 'ai';
    content: string;
    isImage?: boolean;
}

export default function HomePage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentMode, setCurrentMode] = useState<string>('amigavel'); // amigavel, profissional, professora, supremo, bunix
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (prompt: string) => {
        const newMessage: Message = { id: Date.now(), role: 'user', content: prompt };
        setMessages((prev) => [...prev, newMessage]);
        setIsLoading(true);

        if (currentMode === 'bunix') {
            await generateImage(prompt);
        } else {
            await getChatResponse(prompt);
        }
        setIsLoading(false);
    };

    const getChatResponse = async (prompt: string) => {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, mode: currentMode }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao obter resposta da Crisálida.');
            }

            const data = await response.json();
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, role: 'ai', content: data.response || 'Não consegui gerar uma resposta.' },
            ]);
        } catch (error: any) {
            console.error('Erro no chat:', error);
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, role: 'ai', content: `Ops! Algo deu errado: ${error.message || 'Erro desconhecido.'}` },
            ]);
        }
    };

    const generateImage = async (prompt: string) => {
        try {
            const response = await fetch('/api/image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao gerar imagem com Bunix.');
            }

            const data = await response.json();
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, role: 'ai', content: `![Imagem gerada por Bunix](${data.imageUrl})`, isImage: true },
            ]);
        } catch (error: any) {
            console.error('Erro na geração de imagem:', error);
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, role: 'ai', content: `Ops! Erro ao gerar imagem: ${error.message || 'Erro desconhecido.'}` },
            ]);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-950 text-white">
            <header className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
                <h1 className="text-2xl font-bold text-purple-400">Crisálida AI</h1>
                <span className="text-sm text-gray-400">Modo: {currentMode === 'bunix' ? 'Bunix (Gerar Imagens)' : currentMode.charAt(0).toUpperCase() + currentMode.slice(1)}</span>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <MdOutlineComputer className="w-16 h-16 mb-4 text-purple-500" />
                        <p className="text-lg">Olá! Eu sou Crisálida. Escolha um modo e vamos começar.</p>
                        <p className="text-sm">Use o botão da borboleta para mudar meu comportamento.</p>
                    </div>
                )}
                {messages.map((msg) => (
                    <div key={msg.id}>
                        {msg.isImage ? (
                            <div className="flex items-start gap-4 p-4 justify-start">
                                <div className="flex-shrink-0">
                                    <MdOutlineComputer className="w-8 h-8 text-purple-400" />
                                </div>
                                <div className="max-w-xl p-3 rounded-lg shadow-md bg-gray-800">
                                    <p className="text-gray-300 mb-2">Imagem gerada por Bunix:</p>
                                    {/* Remove a sintaxe Markdown para renderizar apenas a imagem */}
                                    <img
                                        src={msg.content.match(/\(([^)]+)\)/)?.[1]}
                                        alt="Imagem gerada pela IA"
                                        className="max-w-full h-auto rounded-lg"
                                    />
                                </div>
                            </div>
                        ) : (
                            <ChatMessage role={msg.role} message={msg.content} />
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-4 p-4 justify-start">
                        <div className="flex-shrink-0">
                            <MdOutlineComputer className="w-8 h-8 text-purple-400 animate-pulse" />
                        </div>
                        <div className="max-w-3xl p-3 rounded-lg shadow-md bg-gray-800 text-gray-100">
                            <p className="animate-pulse">Crisálida pensando...</p>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            <div className="relative p-4 bg-gray-900 border-t border-gray-700 flex items-center justify-center">
                <div className="absolute left-4 bottom-4">
                    <ButterflyMenu
                        onSelectMode={setCurrentMode}
                        onSelectImageMode={() => setCurrentMode('bunix')}
                        currentMode={currentMode}
                    />
                </div>
                <div className="flex-grow max-w-3xl">
                    <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}
