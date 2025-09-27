import React, { useState, useEffect } from 'react';
import NewNoteButton from '../components/NewNoteButton.jsx';
import NoteModal from "../components/NoteModal.jsx";
import Note from '../components/Note.jsx';
import ConfirmationDialog from '../components/ConfirmationDialog.jsx';

const LOCAL_STORAGE_KEY = import.meta.env.REACT_APP_LOCAL_STORAGE_KEY || 'CornellNotes';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [noteToDeleteId, setNoteToDeleteId] = useState(null);

    const [notes, setNotes] = useState(() => {
        try {
            const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedNotes ? JSON.parse(savedNotes) : [];
        } catch (error) {
            console.error("Failed to load notes from local storage:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
        } catch (error) {
            console.error("Failed to save notes to local storage:", error);
        }
    }, [notes]);

    const handleNewNoteClick = () => {
        setCurrentNote({
            id: Date.now(),
            title: '',
            cues: '',
            mainNotes: '',
            summary: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
        setIsModalOpen(true);
    };

    const handleEditNote = (noteToEdit) => {
        setCurrentNote(noteToEdit);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentNote(null);
    };

    const handleSaveNote = (updatedNote) => {
        setNotes(prevNotes => {
            const existingNoteIndex = prevNotes.findIndex(note => note.id === updatedNote.id);
            if (existingNoteIndex > -1) {
                const newNotes = [...prevNotes];
                newNotes[existingNoteIndex] = updatedNote;
                return newNotes;
            } else {
                return [...prevNotes, updatedNote];
            }
        });
    };

    const handleDeleteNotePrompt = (id) => {
        setNoteToDeleteId(id);
        setIsConfirmDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteToDeleteId));
        setIsConfirmDialogOpen(false);
        setNoteToDeleteId(null);
    };
    const handleCancelDelete = () => {
        setIsConfirmDialogOpen(false); // Close the dialog
        setNoteToDeleteId(null); // Clear the ID
    };
    const handleDeleteNote = (idToDelete) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            setNotes(prevNotes => prevNotes.filter(note => note.id !== idToDelete));
        }
    };

    return (
        <div >
            <h1 className="text-4xl px-4 py-4 font-bold underline">
                Cornell Notes App
            </h1>

            <div className="flex flex-wrap gap-4 mt-8 pl-4">
                <NewNoteButton onClick={handleNewNoteClick} />

                {notes.length === 0 ? (
                    // Empty State Message
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg text-gray-400 w-full max-w-lg">
                        <p className="text-lg text-center mb-4">
                            You don't have any notes yet!
                        </p>
                        <p className="text-md text-center">
                            Click the '+' button to create your first note.
                        </p>
                    </div>
                ) : (
                    notes.map(note => (
                        <div
                            key={note.id}
                            className="
                            relative
                            w-48 h-48 bg-zinc-800 text-zinc-100 rounded-lg shadow-lg
                            hover:bg-zinc-700 hover:shadow-xl
                            transition-all duration-200 ease-in-out
                            p-4 cursor-pointer flex flex-col justify-between
                        "
                            onClick={() => handleEditNote(note)}
                        >
                            <h3 className="font-bold text-lg mb-2 truncate">{note.title || 'Untitled Note'}</h3>
                            <p className="text-sm text-gray-400 flex-grow overflow-hidden text-ellipsis line-clamp-3">
                                {note.mainNotes.substring(0, 100)}{note.mainNotes.length > 100 ? '...' : ''}
                            </p>
                            <div className="text-xs text-gray-500 mt-2">
                                Updated: {new Date(note.updatedAt).toLocaleDateString()}
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent modal from opening when clicking delete
                                    handleDeleteNotePrompt(note.id); // Call the new prompt function
                                }}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-400 p-1 rounded-full bg-zinc-700 hover:bg-zinc-600"
                                aria-label="Delete note"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )
                    ))}
            </div>

            <NoteModal isOpen={isModalOpen} onClose={handleCloseModal}>
                {currentNote && (
                    <Note initialNote={currentNote} onSave={handleSaveNote} />
                )}
            </NoteModal>

            <ConfirmationDialog
                isOpen={isConfirmDialogOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Deleting Note..."
                message="Are you sure you want to delete this note?"
            />

        </div>
    );
};

export default HomePage;