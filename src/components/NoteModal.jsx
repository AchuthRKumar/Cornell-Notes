import React from 'react';

const NoteModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-opacity-70 
                backdrop-blur-sm 
            "
            onClick={onClose} 
        >
            <div
                className="
                    relative
                    bg-zinc-800 text-gray-100
                    rounded-xl
                    shadow-2xl
                    w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl
                    h-[calc(100vh-4rem)] overflow-y-auto
                    p-6 md:p-8
                    transform transition-all duration-300 ease-out
                    scale-100 opacity-100
                    "
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="
                    absolute top-4 right-4
                    text-gray-400 hover:text-white
                    text-2xl font-bold
                    leading-none
                    hover:bg-zinc-600
                    rounded-full
                "
                    aria-label="Close modal"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default NoteModal;