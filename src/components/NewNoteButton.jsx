import React from 'react';

const NewNoteButton = ({ onClick }) => {
    return (
        <div className='pl-4'>
            <button
                onClick={onClick}
                className="
                    flex items-center justify-center
                    w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32
                    bg-zinc-800 text-zinc-100
                    rounded-lg
                    shadow-lg
                    hover:bg-zinc-600 hover:shadow-xl
                    transition-all duration-200 ease-in-out
                    mt-2
                "
                aria-label="Create new note"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    );
};
export default NewNoteButton;