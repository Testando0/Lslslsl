import React from 'react';
import { MdOutlineComputer, MdOutlinePerson } from 'react-icons/md';

interface ChatMessageProps {
    role: 'user' | 'ai';
    message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, message }) => {
    const isUser = role === 'user';
    return (
        <div className={`flex items-start gap-4 p-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="flex-shrink-0">
                    <MdOutlineComputer className="w-8 h-8 text-purple-400" />
                </div>
            )}
            <div className={`max-w-3xl p-3 rounded-lg shadow-md ${isUser ? 'bg-purple-700 text-white' : 'bg-gray-800 text-gray-100'}`}>
                <p className="whitespace-pre-wrap">{message}</p>
            </div>
            {isUser && (
                <div className="flex-shrink-0">
                    <MdOutlinePerson className="w-8 h-8 text-white" />
                </div>
            )}
        </div>
    );
};

export default ChatMessage;
