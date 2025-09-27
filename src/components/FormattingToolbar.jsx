import React from 'react';
import {
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
    ArrowDownTrayIcon,
    XMarkIcon,
    Bars3BottomLeftIcon,
    DocumentIcon
} from '@heroicons/react/24/outline';

const ToolbarButton = ({ icon, label, onClick, isActive }) => (
    <button
        onClick={onClick}
        className={`
            flex items-center justify-center
            h-10 w-10 
            p-2 rounded-xl 
            ${isActive ? 'bg-zinc-600 text-white' : 'text-gray-400 hover:bg-zinc-700 hover:text-white'}
            `}
        aria-label={label}
        title={label}
    >
        {icon}
    </button>
);

const FormattingToolbar = ({ onFontChange, onSizeChange, onBoldToggle, onItalicToggle, onUnderlineToggle, onDownloadPdf,
    isBoldActive, isItalicActive, isUnderlineActive,
    selectedFont, selectedSize
}) => {

    const fonts = [
        { label: 'Roboto', value: 'font-roboto' },
        { label: 'Montserrat', value: 'font-montserrat' },
        { label: 'SUSE Mono', value: 'font-suse' },
        { label: 'Schoolbell', value: 'font-schoolbell' },
        { label: 'Old Standard TT', value: 'font-old-standard-tt' },
    ];

    const sizes = [
        { label: 'Small', value: 'text-base' },
        { label: 'Medium', value: 'text-lg' },
        { label: 'Large', value: 'text-2xl' },
    ];

    return (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-zinc-900 rounded-lg mb-6">
            {/* Font Selector */}
            <select
                value={selectedFont}
                onChange={(e) => onFontChange(e.target.value)}
                className={`
                    bg-zinc-800 text-gray-200 rounded-md py-2 h-10 
                    focus:outline-none 
                    cursor-pointer
                    w-1/7
                    ${selectedFont}
                    `}
                aria-label="Select font"
            >
                {fonts.map((font) => (
                    <option key={font.value} value={font.value} className={font.value}>
                        {font.label}
                    </option>
                ))}
            </select>

            {/* Size Selector */}
            <select
                value={selectedSize}
                onChange={(e) => onSizeChange(e.target.value)}
                className="
                    bg-zinc-800 text-gray-200 rounded-md py-2 h-10
                    focus:outline-none 
                    cursor-pointer
                    "
                aria-label="Select text size"
            >
                {sizes.map((size) => (
                    <option key={size.value} value={size.value}>
                        {size.label}
                    </option>
                ))}
            </select>
            
            {/*Bold Button*/}
            <ToolbarButton
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinejoin="round" d="M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z" />
                </svg>


                }
                label="Bold"
                onClick={onBoldToggle}
                isActive={isBoldActive}
            />

            {/* Italic Button */}
            <ToolbarButton
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803" />
                </svg>

                }
                label="Italic"
                onClick={onItalicToggle}
                isActive={isItalicActive}
            />

            {/* Underline Button*/}
            <ToolbarButton
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.995 3.744v7.5a6 6 0 1 1-12 0v-7.5m-2.25 16.502h16.5" />
                </svg>

                }
                label="Underline"
                onClick={onUnderlineToggle}
                isActive={isUnderlineActive}
            />

            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Download PDF Button */}
            <ToolbarButton
                icon={<ArrowDownTrayIcon className="h-5 w-5" />}
                label="Download as PDF"
                onClick={onDownloadPdf}
            />
        </div>
    );
};

export default FormattingToolbar;