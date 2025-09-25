import React, { useState, useEffect, useRef } from 'react';
import FormattingToolbar from './FormattingToolbar.jsx';
import jsPDF from 'jspdf';

const Note = ({ initialNote = {}, onSave }) => {

    const contentAreaRef = useRef(null);

    const [noteContent, setNoteContent] = useState(() => ({
        id: initialNote.id || Date.now(),
        title: initialNote.title || '', 
        cues: initialNote.cues || '',
        mainNotes: initialNote.mainNotes || '',
        summary: initialNote.summary || '',
        createdAt: initialNote.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }));

    useEffect(() => {
        setNoteContent(prevContent => ({
            ...prevContent,
            ...initialNote,
            title: initialNote.title || '', 
            updatedAt: new Date().toISOString(),
        }));
    }, [initialNote]);

    const [currentFont, setCurrentFont] = useState('font-old-standard-tt');
    const [currentSize, setCurrentSize] = useState('text-lg');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);

    const resizeTextarea = (textarea) => {
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px'; 
        }
    };

    useEffect(() => {
        if (contentAreaRef.current) {
            const textareas = contentAreaRef.current.querySelectorAll('textarea');
            textareas.forEach(resizeTextarea);
        }
    }, [noteContent]); 


    const handleFontChange = (fontValue) => setCurrentFont(fontValue);
    const handleSizeChange = (sizeValue) => setCurrentSize(sizeValue);
    const handleBoldToggle = () => setIsBold(prev => !prev);
    const handleItalicToggle = () => setIsItalic(prev => !prev);
    const handleUnderlineToggle = () => setIsUnderline(prev => !prev);
    const handleDownloadPdf = () => {
        const doc = new jsPDF(); 

        const { title, cues, mainNotes, summary } = noteContent;

        let yPos = 20; 

        // Add Title
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold'); // Using a standard font for jsPDF compatibility
        doc.text(title || 'Untitled Note', 20, yPos);
        yPos += 10;
        doc.line(20, yPos, 190, yPos); // Line below title
        yPos += 15;

        // Add Cues and Main Notes (simple layout for now)
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');

        // Split mainNotes and cues into lines
        const mainNotesLines = doc.splitTextToSize(mainNotes, 120); 
        const cuesLines = doc.splitTextToSize(cues, 50); 

        // Determine max height needed for this section
        const mainNotesHeight = mainNotesLines.length > 0 ? mainNotesLines.length * 7 : 0; 
        const cuesHeight = cuesLines.length > 0 ? cuesLines.length * 7 : 0;
        const maxContentHeight = Math.max(mainNotesHeight, cuesHeight);

        // Cues Column
        doc.text('Cues/Questions:', 20, yPos);
        if (cuesLines.length > 0) {
            doc.text(cuesLines, 20, yPos + 7); 
        }


        // Main Notes Column
        doc.text('Main Notes:', 80, yPos);
        if (mainNotesLines.length > 0) {
            doc.text(mainNotesLines, 80, yPos + 7); 
        }


        yPos += maxContentHeight + 20; 
        doc.line(20, yPos, 190, yPos); 
        yPos += 15;


        // Add Summary
        doc.setFontSize(14);
        doc.setFont('times', 'bold'); // Using a standard font for jsPDF compatibility
        doc.text('Summary:', 20, yPos);
        yPos += 7;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const summaryLines = doc.splitTextToSize(summary, 170); // Max width 170mm
        if (summaryLines.length > 0) {
            doc.text(summaryLines, 20, yPos);
        }

        // --- Save the PDF ---
        const filename = (title ? title.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'untitled_note') + '.pdf';
        doc.save(filename);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNoteContent(prevContent => ({
            ...prevContent,
            [name]: value,
            updatedAt: new Date().toISOString(),
        }));
        // Resize the textarea immediately after its content changes
        resizeTextarea(e.target);
    };

    const getTextareaClasses = () => {
        let classes = `${currentFont} ${currentSize}`;
        if (isBold) classes += ' font-bold';
        if (isItalic) classes += ' italic';
        if (isUnderline) classes += ' underline';
        return classes;
    }

    return (
        <div className="flex flex-col h-full relative">

            <div className="sticky top-0 z-10"> 
                <FormattingToolbar
                    onFontChange={handleFontChange}
                    onSizeChange={handleSizeChange}
                    onBoldToggle={handleBoldToggle}
                    onItalicToggle={handleItalicToggle}
                    onUnderlineToggle={handleUnderlineToggle}
                    onDownloadPdf={handleDownloadPdf}
                    isBoldActive={isBold}
                    isItalicActive={isItalic}
                    isUnderlineActive={isUnderline}
                    selectedFont={currentFont}
                    selectedSize={currentSize}
                />
            </div>

            <div
                className="flex-grow overflow-y-auto pt-4 -mx-6 md:-mx-8 px-6 md:px-8 custom-scrollbar"
                ref={contentAreaRef} 
            >
                {/* Note Title Input */}
                <input
                    type="text"
                    name="title"
                    value={noteContent.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="
                    w-full p-2 mb-2
                    bg-transparent border-b-2 border-zinc-700
                    text-3xl font-bold font-old-standard-tt text-gray-100
                    focus:outline-none focus:border-zinc-600
                    placeholder-gray-500
                "
                />
                {/* Cues and Main Notes Section (using Grid for layout) */}
                <div className="flex-grow grid grid-cols-[1fr_2px_3fr] min-h-[40vh] mb-2">
                    {/* Cues/Keywords Section */}
                    <textarea
                        name="cues"
                        value={noteContent.cues}
                        onChange={handleChange}
                        placeholder="Cue Questions"
                        className={`
                        w-full p-4
                        bg-transparent text-gray-200
                        focus:outline-none
                        resize-none
                        h-auto overflow-hidden // Crucial for auto-expanding without scrollbars
                        placeholder-gray-500
                        ${getTextareaClasses()}`}
                        rows={1} 
                    ></textarea>

                    {/* Vertical Divider */}
                    <div className="bg-zinc-700 h-full"></div>

                    {/* Main Note-Taking Area */}
                    <textarea
                        name="mainNotes"
                        value={noteContent.mainNotes}
                        onChange={handleChange}
                        placeholder="Main notes..."
                        className={`
                            w-full p-4
                            bg-transparent text-gray-200
                            focus:outline-none
                            resize-none
                            h-auto overflow-hidden // Crucial for auto-expanding without scrollbars
                            placeholder-gray-500
                            ${getTextareaClasses()}
                        `}
                        rows={1} // Start with 1 row, then JS will adjust height
                    ></textarea>
                </div>

                {/* Horizontal Line above Summary */}
                <hr className="border-zinc-700" />

                {/* Summary Section */}
                <textarea
                    name="summary"
                    value={noteContent.summary}
                    onChange={handleChange}
                    placeholder="Summary..."
                    className={`
                        w-full p-4
                        bg-transparent text-gray-200
                        focus:outline-none
                        resize-none
                        h-auto overflow-hidden // Crucial for auto-expanding without scrollbars
                        placeholder-gray-500
                        min-h-[15vh]
                        ${getTextareaClasses()}
                    `}
                    rows={1} // Start with 1 row, then JS will adjust height
                ></textarea>

            </div>
        </div >
    );
};

export default Note;