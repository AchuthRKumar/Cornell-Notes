import React from 'react';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-opacity-70 backdrop-blur-sm
            "
            onClick={onClose} // Allows clicking outside to close
        >
            <div
                className="
                    bg-zinc-800 text-gray-100
                    rounded-xl shadow-2xl
                    p-6 max-w-sm w-[90%] mx-4
                    transform transition-all duration-300 ease-out
                    scale-100 opacity-100
                "
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <p className="text-gray-300 mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="
                            px-4 py-2 rounded-md
                            bg-zinc-700 text-gray-200
                            hover:bg-zinc-600 transition-colors
                            focus:outline-none focus:ring-2 focus:ring-zinc-500
                        "
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="
                            px-4 py-2 rounded-md
                            bg-red-600 text-white
                            hover:bg-red-700 transition-colors
                            focus:outline-none focus:ring-2 focus:ring-red-500
                        "
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;