import React, { useState } from 'react';
import NewNoteButton from '../components/NewNoteButton.jsx';
import NoteModal from "../components/NoteModal.jsx";
import Note from '../components/Note.jsx';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    const handleNewNoteClick = () => {
        setCurrentNote({});
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentNote(null);
    };
    const handleSaveNote = (updatedNote) => {
        console.log(updatedNote);
    }

    return (
        <div className=''>
            <h1 className="text-4xl px-4 py-4 font-bold underline">
                Cornell Notes App
            </h1>

            <NewNoteButton className='' onClick={handleNewNoteClick} />

            <NoteModal isOpen={isModalOpen} onClose={handleCloseModal}>
                {currentNote && (
                    <Note initialNote={currentNote} onSave={handleSaveNote} />
                )}
            </NoteModal>

        </div>
    );
};

export default HomePage;