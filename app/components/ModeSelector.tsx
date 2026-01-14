import React from 'react';

interface ModeSelectorProps {
    currentMode: string;
    onSelectMode: (mode: string) => void;
    onSelectImageMode: () => void;
}

const modes = [
    { id: 'amigavel', name: 'Amigável' },
    { id: 'profissional', name: 'Profissional' },
    { id: 'professora', name: 'Professora' },
    { id: 'supremo', name: 'Supremo' },
];

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onSelectMode, onSelectImageMode }) => {
    return (
        <div className="flex flex-col gap-2 p-4 bg-gray-900 border-r border-gray-700 text-white h-full">
            <h3 className="text-lg font-semibold mb-2">Modos da Crisálida</h3>
            {modes.map((mode) => (
                <button
                    key={mode.id}
                    onClick={() => onSelectMode(mode.id)}
                    className={`block w-full text-left p-2 rounded-md transition-colors 
                                ${currentMode === mode.id ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-gray-700 bg-gray-800'}`}
                >
                    {mode.name}
                </button>
            ))}
            <button
                onClick={onSelectImageMode}
                className={`block w-full text-left p-2 rounded-md transition-colors mt-4 
                            ${currentMode === 'bunix' ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-gray-700 bg-gray-800'}`}
            >
                Gerar Imagem (Bunix)
            </button>
        </div>
    );
};

export default ModeSelector;
