import React from 'react';
import { Link } from 'react-router-dom';

const MenuCard = ({ menu }) => (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col h-full">
            <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Today's Menu ({menu.type})</h3>
                <p className="text-sm text-gray-500">Date: {new Date(menu.date).toLocaleDateString()}</p>
            </div>
            <ul className="space-y-2 mb-6 flex-grow">
                {menu.options.map((option, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        {option}
                    </li>
                ))}
            </ul>
            <button className="w-full bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Order Now
            </button>
        </div>
    </div>
);

const DashboardPage = () => {
    // Dummy Data
    const menu = {
        options: ["Aloo Paratha", "Dahi", "Pickle"],
        type: "Breakfast",
        date: new Date(),
    };
    
    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, Alex</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Last login:</span>
                    <span className="font-medium">Today, 9:30 AM</span>
                </div>
            </div>

            {/* Latest Menu & Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <MenuCard menu={menu} />
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4">Quick Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600">Active Plan</p>
                            <p className="text-xl font-semibold text-blue-600">Monthly</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600">Days Remaining</p>
                            <p className="text-xl font-semibold text-green-600">22</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Overview */}
            <section className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-semibold text-lg mb-2">Order History</h4>
                        <p className="text-gray-600 text-sm mb-4">Review your past orders and favorites.</p>
                        <Link 
                            to="/u/orders" 
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                            View History
                            <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-semibold text-lg mb-2">Attendance Calendar</h4>
                        <p className="text-gray-600 text-sm mb-4">Check your monthly attendance record.</p>
                        <Link 
                            to="/u/attendance" 
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                            View Calendar
                            <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-semibold text-lg mb-2">Monthly Bill Summary</h4>
                        <p className="text-gray-600 text-sm mb-4">View your current month's bill status.</p>
                        <a 
                            href="#" 
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                            View Summary
                            <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
