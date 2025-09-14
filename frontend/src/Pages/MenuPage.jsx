import React, { useState } from 'react';
import OrderDialog from '../Components/OrderDialog';

const MenuPage = () => {
    const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);
    
    // Dummy Data
    const menu = {
        options: ["Dal", "Rajma", "Alu Tamatar" , "Baigan Barta" , "Chole" , "Kadhi"],
        type: "Breakfast",
        date: new Date(),
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Today's Menu</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Last updated:</span>
                    <span className="text-sm font-medium">2 hours ago</span>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {menu.type} Menu
                        </h3>
                        <span className="text-sm text-gray-500">
                            {new Date(menu.date).toLocaleDateString()}
                        </span>
                    </div>
                    <ul className="space-y-3 mb-6">
                        {menu.options.map((option, index) => (
                            <li key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                <span className="text-gray-700">{option}</span>
                            </li>
                        ))}
                    </ul>
                    <button 
                        onClick={() => setOrderDialogOpen(true)}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                        Place New Order
                    </button>
                </div>

                {/* Menu Statistics */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Overview</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600">Orders Placed</p>
                                <p className="text-2xl font-semibold text-blue-600">24</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600">Availability</p>
                                <p className="text-2xl font-semibold text-green-600">76%</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meals</h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="font-medium text-gray-900">Lunch</p>
                                <p className="text-sm text-gray-600">Available at 1:00 PM</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="font-medium text-gray-900">Dinner</p>
                                <p className="text-sm text-gray-600">Available at 8:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <OrderDialog 
                isOpen={isOrderDialogOpen} 
                onClose={() => setOrderDialogOpen(false)} 
                menu={menu}
            />
        </div>
    );
};

export default MenuPage;
