import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4 p-4 bg-gray-900 border-t border-gray-700">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLoading ? "Crisálida pensando..." : "Pergunte à Crisálida ou gere uma imagem..."}
                className="flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                disabled={isLoading}
            />
            <button
                type="submit"
                className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
            >
                <IoSend className="w-6 h-6" />
            </button>
        </form>
    );
};

export default ChatInput;
