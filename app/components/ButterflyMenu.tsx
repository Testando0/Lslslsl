import React, { useState } from 'react';
import Image from 'next/image';
import { MdClose } from 'react-icons/md'; // Importa um ícone de fechar

interface ButterflyMenuProps {
    onSelectMode: (mode: string) => void;
    onSelectImageMode: () => void;
    currentMode: string;
}

const ButterflyMenu: React.FC<ButterflyMenuProps> = ({ onSelectMode, onSelectImageMode, currentMode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const modes = [
        { id: 'amigavel', name: 'Amigável' },
        { id: 'profissional', name: 'Profissional' },
        { id: 'professora', name: 'Professora' },
        { id: 'supremo', name: 'Supremo' },
    ];

    const handleModeClick = (modeId: string) => {
        onSelectMode(modeId);
        setIsOpen(false);
    };

    const handleImageModeClick = () => {
        onSelectImageMode();
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full shadow-lg transition-all duration-300"
                aria-label="Menu de Modos"
            >
                <Image src="/butterfly_icon.svg" alt="Butterfly Icon" width={24} height={24} className="filter invert" />
            </button>

            {isOpen && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-60 bg-gray-900 p-4 rounded-lg shadow-xl border border-gray-700 z-50">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        aria-label="Fechar menu"
                    >
                        <MdClose className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-semibold text-white mb-3 text-center">Modos da Crisálida</h3>
                    <div className="flex flex-col gap-2">
                        {modes.map((mode) => (
                            <button
                                key={mode.id}
                                onClick={() => handleModeClick(mode.id)}
                                className={`block w-full text-left p-2 rounded-md transition-colors text-white
                                            ${currentMode === mode.id ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-gray-700 bg-gray-800'}`}
                            >
                                {mode.name}
                            </button>
                        ))}
                        <button
                            onClick={handleImageModeClick}
                            className={`block w-full text-left p-2 rounded-md transition-colors mt-2 text-white
                                        ${currentMode === 'bunix' ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-gray-700 bg-gray-800'}`}
                        >
                            Gerar Imagem (Bunix)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ButterflyMenu;
