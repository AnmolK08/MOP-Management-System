import React, { useState } from 'react';
import { RiUserLine, RiMailLine, RiPhoneLine, RiMapPinLine } from 'react-icons/ri';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(true);
    const [formData, setFormData] = useState({
        name: 'Alex Thompson',
        email: 'alex@example.com',
        phone: '+1 234 567 890',
        address: '123 Street, City, Country'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        // Add your update logic here
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Header */}
                <div className="p-6 sm:p-8 border-b bg-gray-50">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile Settings</h1>
                    <p className="mt-2 text-gray-600">Manage your account information and preferences</p>
                </div>

                {/* Profile Content */}
                <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row gap-8">
                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center sm:items-start space-y-4">
                            <div className="relative">
                                <img 
                                    src="https://i.pravatar.cc/150" 
                                    alt="Profile" 
                                    className="w-32 h-32 rounded-full ring-4 ring-gray-100"
                                />
                                <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                                    <RiUserLine className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="text-center sm:text-left">
                                <h2 className="text-xl font-semibold text-gray-900">{formData.name}</h2>
                                <p className="text-gray-500">Basic Plan</p>
                            </div>
                        </div>

                        {/* Profile Form */}
                        <div className="flex-1">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <div className="relative">
                                            <RiUserLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input 
                                                type="text"
                                                disabled={!isEditing}
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <div className="relative">
                                            <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input 
                                                type="email"
                                                disabled={!isEditing}
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <div className="relative">
                                            <RiPhoneLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input 
                                                type="tel"
                                                disabled={!isEditing}
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <div className="relative">
                                            <RiMapPinLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input 
                                                type="text"
                                                disabled={!isEditing}
                                                value={formData.address}
                                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    {isEditing ? (
                                        <>
                                            <button 
                                                type="submit"
                                                className="w-full sm:w-auto px-6 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                                            >
                                                Save Changes
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button 
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className="w-full sm:w-auto px-6 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;