import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { fetchOrdersByUserId } from "../Redux/Slices/orderSlice";
import { addAmtInWallet, getAllUsers } from "../Redux/Slices/providerSlice";
import ConfirmationDialog from "../Components/ConfirmationDialog";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const BillingPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.providerSlice.users);
  const userOrders = useSelector((state) => state.orderSlice.billingUserOrders) || [];

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [walletAmount, setWalletAmount] = useState("");
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    if (!users?.length) dispatch(getAllUsers());
  }, [dispatch, users?.length]);

  useEffect(() => {
    if (selectedUser?.customer?.id) {
      dispatch(fetchOrdersByUserId({ userId: selectedUser.customer.id }));
      setShowOrders(false); 
    }
  }, [selectedUser, dispatch]);

  // Filter users by search input
  const filteredUsers = users?.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSearch("");
  };

  const handleAddWalletClick = () => {
    if (!selectedUser) return toast.error("Select a user first!");
    if (!walletAmount || isNaN(walletAmount))
      return toast.error("Enter valid amount");
    if (Number(walletAmount) <= 0)
      return toast.error("Amount must be greater than zero");

    setIsConfirmDialogOpen(true);
  };

  const handleAddWallet = () => {
    const toastId = toast.loading("Adding wallet amount...");
    dispatch(addAmtInWallet({ customerId: selectedUser.customer.id, amount: Number(walletAmount) }))
      .then((res) => {
        if (res.error) toast.update(toastId, { render: res.payload || "Failed to add wallet amount", type: "error", isLoading: false, autoClose: 3000 });
        else {
          toast.update(toastId, { render: "Wallet amount added successfully!", type: "success", isLoading: false, autoClose: 3000 });
          setWalletAmount("");
          dispatch(getAllUsers()); // Refresh to show new wallet balance
        }
      });
  };

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

  const getPaidClass = (paid) => {
    return paid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Billing & User Management</h2>
      <p className="text-gray-600 mb-6">
        Search users, manage wallet, and view orders.
      </p>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search user by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
        {search && filteredUsers.length > 0 && (
          <div className="absolute bg-white border w-full max-h-48 overflow-y-auto mt-1 rounded-md shadow-md z-10">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {user.name} ({user.email})
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Actions */}
      {selectedUser && (
        <div className="bg-gray-50 p-4 rounded-md shadow mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
              <p className="text-gray-600 text-sm">{selectedUser.email}</p>
              <div className="mt-2 flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full border ${selectedUser.customer?.premium ? 'bg-yellow-100 text-yellow-800 border-yellow-400' : 'bg-gray-100 text-gray-600 border-gray-300'}`}>
                    {selectedUser.customer?.premium ? "Premium User" : "Normal User"}
                  </span>
                  <p className="text-lg font-medium text-gray-700">
                    Balance: <span className={`font-bold ${selectedUser.customer?.wallet > 0 ? `text-green-600` : `text-red-600`}`}>₹{selectedUser.customer?.wallet || 0}</span>
                  </p>
                </div>
            </div>

            {/* <button
              onClick={handleTogglePremium}
              className={`px-4 py-2 rounded-md font-semibold ${
                selectedUser.customer.premium
                  ? "bg-yellow-100 text-yellow-800 border border-yellow-500"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {selectedUser.customer.premium ? "Remove Premium" : "Add Premium"}
            </button> */}

            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center w-full sm:w-auto">
              <input
                type="number"
                placeholder="Amount"
                value={walletAmount}
                onChange={(e) => setWalletAmount(e.target.value)}
                className="p-2 border rounded-md w-full sm:w-32"
              />
              <button
                onClick={handleAddWalletClick}
                className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors whitespace-nowrap"
              >
                Add To Wallet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table Dropdown */}
      {selectedUser && (
        <div className="mb-6">
          <button
            onClick={() => setShowOrders(!showOrders)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-lg text-gray-800">
              Order History {userOrders.length > 0 && `(${userOrders.length})`}
            </span>
            <span className="text-gray-500">
              {showOrders ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {showOrders && (
            <div className="bg-white border-t rounded-b-lg shadow overflow-x-auto mt-1 animate-fade-in">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Payment</th>
                    <th className="text-left py-3 px-4">Items</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders.length > 0 ? (
                    userOrders.map((order) => (
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

                        <td className="py-3 px-4">
                          {order.items.map((i) => (
                            <span
                              key={i}
                              className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm font-semibold mr-1"
                            >
                              {i}
                            </span>
                          ))}
                        </td>
                        <td className="py-3 px-4">{order.type}</td>
                        <td className="py-3 px-4">₹{order.totalAmt}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-500">
                        No orders found for this user.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleAddWallet}
        title="Add Wallet Amount"
        message={`Are you sure you want to add ₹${walletAmount} to ${selectedUser?.name}'s wallet?`}
      />
    </div>
  );
};

export default BillingPage;
