import React from 'react';

const NewNoteButton = ({ onClick }) => {
    return (
        <div>
            <button
                onClick={onClick}
                className="
                    flex items-center justify-center
                    w-48 h-48 
                    bg-zinc-800 text-zinc-100
                    rounded-lg
                    shadow-lg
                    hover:bg-zinc-600 hover:shadow-xl
                    transition-all duration-200 ease-in-out
                    
                "
                aria-label="Create new note"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-15">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

            </button>
        </div>
    );
};
export default NewNoteButton;