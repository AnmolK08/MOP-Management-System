import React, { useState, useEffect } from 'react';
import { RiCloseLine } from 'react-icons/ri';

const MenuDialog = ({ isOpen, onClose, onSave, existingMenu }) => {
    const [options, setOptions] = useState([]);
    const [newOption, setNewOption] = useState('');
    const [type, setType] = useState('LUNCH');
    const [special, setSpecial] = useState(false);


    useEffect(() => {
        // Populate form if we are editing an existing menu
        if (isOpen && existingMenu) {
            setOptions(existingMenu.options);
            setType(existingMenu.type);
        } 
        // Reset form when opening to create a new menu
        else if (isOpen) {
            setOptions([]);
            setType('LUNCH');
            setNewOption('');
        }
    }, [isOpen, existingMenu]);

    const handleAddItem = () => {
        if (newOption.trim()) {
            setOptions([...options, newOption.trim()]);
            setNewOption('');
        }
    };

    const handleRemoveItem = (indexToRemove) => {
        setOptions(options.filter((_, index) => index !== indexToRemove));
    };


    const handleSave = () => {
        onSave({ options, type , special});
        onClose(); // Close the dialog after saving
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose} // Close on overlay click
        >
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Dialog Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {existingMenu ? 'Edit Menu' : 'Add New Menu'}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 cursor-pointer hover:text-gray-800"><RiCloseLine size={24} /></button>
                </div>

                {/* Dialog Body (Scrollable) */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    {/* Menu Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Menu Type</label>
                        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50">
                            <option>LUNCH</option>
                            <option>DINNER</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Food Type</label>
                        <select value={special} onChange={(e) => setSpecial(e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50">
                            <option value={false}>REGULAR</option>
                            <option value={true}>SPECIAL</option>
                        </select>
                    </div>

                    {/* Menu Items Management */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Menu Items</label>
                        <div className="space-y-2 mb-3">
                            {options.map((item, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                                    <span className="text-gray-800">{item}</span>
                                    <button onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-700 cursor-pointer font-bold">✕</button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={newOption}
                                onChange={(e) => setNewOption(e.target.value)}
                                placeholder="Add an item"
                                className="flex-grow p-2 border rounded-lg"
                                onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                            />
                            <button onClick={handleAddItem} className="bg-blue-500 text-white px-4 cursor-pointer rounded-lg font-semibold">Add</button>
                        </div>
                    </div>
                </div>

                {/* Dialog Footer */}
                <div className="flex justify-end gap-3 p-4 border-t bg-gray-50 rounded-b-xl">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        {existingMenu ? 'Update Menu' : 'Publish Menu'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuDialog;
