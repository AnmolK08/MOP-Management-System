import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, togglePremiumStatus } from "../../Redux/Slices/providerSlice";
import { toast } from "react-hot-toast";
import { updateProviderOrders } from "../../Redux/Slices/orderSlice";

const ProviderUsersPage = () => {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.providerSlice.users);
  const {providerOrders} = useSelector((state)=> state.orderSlice);

  useEffect(() => {
    if (!users || users.length === 0) dispatch(getAllUsers());
  }, [dispatch, users]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const togglePremium = (customerId) => {
    const toastId = toast.loading("Toggling premium status...");
    if(!customerId)
      toast.error("Customer ID is missing");

    dispatch(togglePremiumStatus(customerId))
    .then((res) => {
      if (res.error) {
        toast.error(res.error.message || "Failed to toggle premium status", { id: toastId });
      } else {
        toast.success("Premium status toggled successfully", { id: toastId });
        if(providerOrders.length !== 0)
          dispatch(updateProviderOrders({Id : customerId}));
      }
    })
    .catch(() => {
      toast.error("An unexpected error occurred", { id: toastId });
    });
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "premium" && user.customer.premium) ||
      (filter === "normal" && !user.customer.premium);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg flex-grow"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="all">All Users</option>
          <option value="premium">Premium</option>
          <option value="normal">Normal</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Premium Status</th>
              <th className="text-left p-3">Wallet</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      user.customer.premium
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.customer.premium ? "Premium" : "Normal"}
                  </span>
                </td>
                <td className="p-3">{user.customer.wallet}</td>
                <td className="p-3">
                  <button
                    onClick={() => togglePremium(user.customer.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Toggle Premium
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderUsersPage;
