import React from 'react';

const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

    const getStatusClass = (status) => {
        switch (status) {
            case "Delivered": return "bg-green-100 text-green-800";
            case "Approved": return "bg-yellow-100 text-yellow-800";
            case "Placed": return "bg-blue-100 text-blue-800";
            case "Canceled": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-[calc(100%-2rem)] sm:max-w-md md:max-w-lg max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden">
          <div className="flex justify-between items-center p-4 sm:p-6 border-b">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Order Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium mt-1">
                  {new Date(order.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium mt-1">${order.totalAmt}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Order Type</p>
                <p className="font-medium mt-1">{order.type}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Payment</p>
                <p className="font-medium mt-1">
                  {order.paid ? "Paid" : "Pending"}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Items</h3>
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="p-2 bg-white rounded-md text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end p-4 sm:p-6 border-t mt-auto">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 sm:px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
};

export default OrderDetailsModal;
