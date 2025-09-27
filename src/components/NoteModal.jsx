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
                    h-[calc(100vh-4rem)]
                    p-8 md:p-10
                    transform transition-all duration-300 ease-out
                    scale-100 opacity-100
                    flex flex-col 
                    "
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-400 p-1 rounded-full bg-zinc-700 hover:bg-zinc-600"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                </button>
                {children}
            </div>
        </div>
    );
};

export default NoteModal;