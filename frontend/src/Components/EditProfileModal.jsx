import React from 'react';
import { RiCloseLine, RiUserLine, RiMailLine, RiLogoutBoxRLine } from 'react-icons/ri';

const EditProfileModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleClickOutside = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleClickOutside}
        >
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <RiCloseLine className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form className="p-4 sm:p-6">
                    <div className="mb-6">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <img 
                                    src="https://i.pravatar.cc/80" 
                                    alt="Profile" 
                                    className="w-20 h-20 rounded-full ring-4 ring-gray-100"
                                />
                                <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors">
                                    <RiUserLine className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <RiUserLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input 
                                        type="text" 
                                        defaultValue="Alex" 
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input 
                                        type="email" 
                                        defaultValue="alex@example.com" 
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4 border-t">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className="p-4 border-t">
                    <button className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-600 font-medium transition-colors">
                        <RiLogoutBoxRLine className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
