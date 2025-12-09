import React, { useEffect, useState, useRef } from "react";
import OrderDetailsModal from "../Components/OrderDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../Redux/Slices/orderSlice";

const OrderHistoryPage = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orderSlice.userOrders);

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, orders.length]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [sortBy, setSortBy] = useState("dateDesc");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dateInputRef = useRef(null);

  const handleViewClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const filteredOrders = orders
    .filter((order) => {
      const formattedDate = new Date(order.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      if (filter !== "All" && order.status !== filter) return false;
      if (search) {
        const searchLower = search.toLowerCase();
        return formattedDate.toLowerCase().includes(searchLower);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "dateAsc") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === "dateDesc") {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

  const getStatusClass = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "APPROVED":
        return "bg-yellow-100 text-yellow-800";
      case "PLACED":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaidClass = (paid) => {
    return paid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Order History</h2>
      <p className="text-gray-600 mb-6">
        View your past orders and their current status.
      </p>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <div className="flex items-center border rounded-md w-full md:w-2/6 overflow-hidden">
          <button
            type="button"
            onClick={() => {
              if (dateInputRef.current) {
                // Try to open the native date picker where supported
                if (typeof dateInputRef.current.showPicker === "function") {
                  dateInputRef.current.showPicker();
                } else {
                  dateInputRef.current.focus();
                }
              }
            }}
            className="cursor-pointer px-3 py-2 bg-gray-50 border-r flex items-center justify-center text-gray-600"
          >
            <span role="img" aria-label="Open calendar">
              📅
            </span>
          </button>
          <input
            type="text"
            placeholder="Search by date Example:(25 Dec 2025)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 flex-grow outline-none bg-white cursor-default"
          />
          {/* Hidden native date input that drives the calendar */}
          <input
            ref={dateInputRef}
            type="date"
            value={searchDate}
            onChange={(e) => {
              const value = e.target.value;
              setSearchDate(value);
              if (value) {
                const dateObj = new Date(value);
                const formatted = dateObj.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                setSearch(formatted);
              } else {
                setSearch("");
              }
            }}
            className="absolute w-0 h-0 opacity-0 pointer-events-none"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-md w-full md:w-2/6"
        >
          <option value="dateDesc">Sort by Date (Latest first)</option>
          <option value="dateAsc">Sort by Date (Oldest first)</option>
        </select>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md w-full md:w-1/6"
        >
          <option value="All">All Status</option>
          <option value="DELIVERED">Delivered</option>
          <option value="SEEN">Seen</option>
          <option value="PLACED">Placed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <button
          type="button"
          onClick={() => {
            setSearch("");
            setSearchDate("");
            setFilter("All");
            setSortBy("dateDesc");
          }}
          className="cursor-pointer px-4 py-2 rounded-md border bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
        >
          Reset
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Payment</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Items</th>
              <th className="text-left py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-3 px-4">
                    {new Date(order.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${getPaidClass(
                        order.paid
                      )}`}
                    >
                      {order.paid ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4">{order.items.length} items</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleViewClick(order)}
                      className="cursor-pointer text-orange-500 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No matching orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Render the modal */}
      <OrderDetailsModal order={selectedOrder} onClose={handleCloseModal} />
    </div>
  );
};

export default OrderHistoryPage;
