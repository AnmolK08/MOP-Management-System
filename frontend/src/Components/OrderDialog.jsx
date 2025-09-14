import React, { useState, useEffect } from "react";
import { RiCloseLine, RiAddLine, RiSubtractLine } from "react-icons/ri";

const OrderDialog = ({ isOpen, onClose, menu, onPlaceOrder, editingOrder }) => {
    const [selectedItems, setSelectedItems] = useState({});
    const [riceOption, setRiceOption] = useState("Roti only");
    const REQUIRED_SELECTIONS = 2;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // If editing, populate the state from the order being edited
            if (editingOrder) {
                const itemsCount = {};
                let rice = "Roti only"; // default
                editingOrder.items.forEach(item => {
                    if (item === "Roti and Rice") {
                        rice = "Roti and Rice";
                    } else if (item !== "Roti only") {
                        itemsCount[item] = (itemsCount[item] || 0) + 1;
                    }
                });
                setSelectedItems(itemsCount);
                setRiceOption(rice);
            }
        } else {
            // Reset state when closing
            document.body.style.overflow = "";
            setSelectedItems({});
            setRiceOption("Roti only");
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen, editingOrder]);

    const totalSelections = Object.values(selectedItems).reduce((sum, count) => sum + count, 0);

    if (!isOpen) return null;

    const handleItemCount = (item, increment) => {
        setSelectedItems((prev) => {
            const currentCount = prev[item] || 0;
            const newCount = increment ? currentCount + 1 : Math.max(0, currentCount - 1);
            
            const newItems = { ...prev };
            if (newCount === 0) {
                delete newItems[item];
            } else {
                newItems[item] = newCount;
            }
            return newItems;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderItems = Object.entries(selectedItems).flatMap(([item, count]) => Array(count).fill(item));
        
        const orderData = {
            items: [...orderItems, riceOption],
            type: menu.type,
        };
        onPlaceOrder(orderData);
    };
    
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative flex flex-col max-h-[calc(100vh-2rem)]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">{editingOrder ? 'Edit' : 'Place'} Order</h2>
                    <button onClick={onClose}><RiCloseLine size={24} /></button>
                </div>
                
                <div className="bg-blue-50 p-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium text-blue-900">{menu?.type} Menu</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {totalSelections}/{REQUIRED_SELECTIONS} Selected
                        </span>
                    </div>
                </div>

                {/* Form Body */}
                <form id="order-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div>
                        <h3 className="font-medium mb-3">Select Items (Total {REQUIRED_SELECTIONS})</h3>
                        <div className="space-y-3">
                            {menu?.options.map((item) => (
                                <div key={item} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                    <span>{item}</span>
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => handleItemCount(item, false)} disabled={!selectedItems[item]} className="disabled:opacity-50"><RiSubtractLine size={20} /></button>
                                        <span className="w-8 text-center font-medium">{selectedItems[item] || 0}</span>
                                        <button type="button" onClick={() => handleItemCount(item, true)} disabled={totalSelections >= REQUIRED_SELECTIONS} className="disabled:opacity-50"><RiAddLine size={20} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium mb-3">Select Rice Option</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button type="button" onClick={() => setRiceOption("Roti only")} className={`p-3 rounded-lg text-center ${riceOption === "Roti only" ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 border-2 border-transparent'}`}>
                                Roti Only
                            </button>
                            <button type="button" onClick={() => setRiceOption("Roti and Rice")} className={`p-3 rounded-lg text-center ${riceOption === "Roti and Rice" ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 border-2 border-transparent'}`}>
                                Roti and Rice
                            </button>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-4 border-t bg-white">
                    <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-100 rounded-lg">Cancel</button>
                    <button type="submit" form="order-form" disabled={totalSelections !== REQUIRED_SELECTIONS} className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50">
                        {totalSelections === REQUIRED_SELECTIONS ? (editingOrder ? 'Update Order' : 'Place Order') : `Select ${REQUIRED_SELECTIONS - totalSelections} More`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDialog;
