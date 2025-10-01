import React, { useEffect, useState } from "react";
import OrderDetailsModal from "../../Components/OrderDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderOrders } from "../../Redux/Slices/orderSlice";

const ProviderOrdersPage = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orderSlice.providerOrders);
  console.log(orders);

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(fetchProviderOrders());
    }
  }, [dispatch, orders]);

  const [filter, setFilter] = useState("All");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("dateDesc");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const filteredOrders = orders
    .filter((order) => {
      if (type !== "All" && order.type !== type) {
        return false;
      }
      if (filter !== "All" && order.status !== filter) return false;
      if (search) {
        const searchLower = search.toLowerCase();
        return order.customer.user.name.toLowerCase().includes(searchLower);
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
      case "SEEN":
        return "bg-yellow-100 text-yellow-800";
      case "PLACED":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Order History</h2>
      <p className="text-gray-600 mb-6">
        All orders for the lastest Menu and their current status.
      </p>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row flex-wrap items-stretch md:items-center justify-start mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by User name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md w-full md:w-auto flex-grow"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded-md w-full md:w-auto"
        >
          <option value="All">All Type</option>
          <option value="LUNCH">Lunch</option>
          <option value="DINNER">Dinner</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-md w-full md:w-auto"
        >
          <option value="dateDesc">Sort by Date (Latest first)</option>
          <option value="dateAsc">Sort by Date (Oldest first)</option>
        </select>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md w-full md:w-auto"
        >
          <option value="All">All Status</option>
          <option value="DELIVERED">Delivered</option>
          <option value="SEEN">Seen</option>
          <option value="PLACED">Placed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4">User Name</th>
              <th className="text-left py-3 px-4">View Items</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Items</th>
              <th className="text-left py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-3 px-4">{order.customer.user.name}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleViewClick(order)}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </button>
                  </td>
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
                  <td className="py-3 px-4">{order.items.length} items</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
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

export default ProviderOrdersPage;
