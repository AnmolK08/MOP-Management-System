import React, { useState } from 'react';

const OrderHistoryPage = () => {
    // Dummy Data
    const orders = [
        { orderNumber: "#12345", date: "2024-07-15", total: 45.50, status: "Delivered", items: 2 },
        { orderNumber: "#12344", date: "2024-07-10", total: 22.75, status: "Delivered", items: 1 },
        { orderNumber: "#12343", date: "2024-07-05", total: 30.00, status: "Approved", items: 3 },
        { orderNumber: "#12342", date: "2024-06-28", total: 15.20, status: "Placed", items: 1 },
        { orderNumber: "#12341", date: "2024-06-20", total: 55.00, status: "Canceled", items: 4 },
    ];
    
    const [filter, setFilter] = useState('All');

    const filteredOrders = orders.filter(order => {
        if (filter === 'All') return true;
        return order.status === filter;
    });

    const getStatusClass = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Approved': return 'bg-yellow-100 text-yellow-800';
            case 'Placed': return 'bg-blue-100 text-blue-800';
            case 'Canceled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-2">Order History</h2>
            <p className="text-gray-600 mb-6">View your past orders and their current status.</p>

            <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                <input type="text" placeholder="Search by order number or item" className="p-2 border rounded-md w-full md:w-auto flex-grow" />
                <select className="p-2 border rounded-md">
                    <option>Sort by Date</option>
                </select>
                <div className="flex space-x-2">
                    <button onClick={() => setFilter('All')} className={`px-4 py-2 rounded-md ${filter === 'All' ? 'bg-blue-500 text-white' : 'bg-white'}`}>All</button>
                    <button onClick={() => setFilter('Delivered')} className={`px-4 py-2 rounded-md ${filter === 'Delivered' ? 'bg-blue-500 text-white' : 'bg-white'}`}>Delivery</button>
                    <button onClick={() => setFilter('Pickup')} className={`px-4 py-2 rounded-md ${filter === 'Pickup' ? 'bg-blue-500 text-white' : 'bg-white'}`}>Pickup</button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left py-3 px-4">Order #</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Total</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Items</th>
                            <th className="text-left py-3 px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order.orderNumber} className="border-b">
                                <td className="py-3 px-4">{order.orderNumber}</td>
                                <td className="py-3 px-4">{order.date}</td>
                                <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusClass(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4">{order.items} items</td>
                                <td className="py-3 px-4"><a href="#" className="text-blue-500 hover:underline">View</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistoryPage;
