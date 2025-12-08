import React from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message, title = 'Confirm Action' }) => {
    if (!isOpen) return null;

    const handleClickOutside = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
            onClick={handleClickOutside}
        >
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[calc(100%-2rem)] sm:max-w-md animate-fadeIn">
                {/* Header */}
                <div className="p-6 pb-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                            <RiErrorWarningLine className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 font-outfit">
                            {title}
                        </h3>
                    </div>
                    <p className="text-gray-600 text-sm text-center sm:text-base">
                        {message}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 px-6 py-4 bg-gray-50 rounded-b-xl">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full cursor-pointer sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="w-full cursor-pointer sm:w-auto px-4 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                    >
                        Yes, continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;