import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchProviderAllOrders, updateProviderOrders } from "../Redux/Slices/orderSlice";
import { addAmtInWallet, getAllUsers, togglePremiumStatus } from "../Redux/Slices/providerSlice";


const BillingPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderSlice.allOrders);
  const providerOrders = useSelector((state) => state.orderSlice.providerOrders);
  const users = useSelector((state) => state.providerSlice.users);

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [walletAmount, setWalletAmount] = useState("");

  useEffect(() => {
    if (!orders?.length) dispatch(fetchProviderAllOrders());
    if (!users?.length) dispatch(getAllUsers());
  }, [dispatch]);

  // Filter users by search input
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // Filter orders for selected user
  const userOrders = selectedUser
    ? orders.filter((order) => order.customerId === selectedUser.customer.id)
    : [];

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSearch("");
  };

  // const handleTogglePremium = () => {
  //   const customerId = selectedUser?.customer?.id;

  //   const toastId = toast.loading("Toggling premium status...");
  //   if (!customerId) {
  //     toast.error("Customer ID is missing");
  //     return;
  //   }

  //   dispatch(togglePremiumStatus(customerId))
  //     .then((res) => {
  //       if (res.error) {
  //         toast.error(res.error.message || "Failed to toggle premium status", {
  //           id: toastId,
  //         });
  //       } else {
  //         toast.success("Premium status toggled successfully", { id: toastId });
  //         if (providerOrders.length !== 0) {
  //           dispatch(updateProviderOrders({ Id: customerId }));
  //         }        
  //       }
  //     })
  //     .catch(() => {
  //       toast.error("An unexpected error occurred", { id: toastId });
  //     });
  // };

  const handleAddWallet = () => {
    if (!selectedUser) return toast.error("Select a user first!");
    if (!walletAmount || isNaN(walletAmount))
      return toast.error("Enter valid amount");

    const toastId = toast.loading("Adding wallet amount...");
    dispatch(addAmtInWallet({ customerId: selectedUser.customer.id, amount: Number(walletAmount) }))
      .then((res) => {
        if (res.error) toast.error(res.payload || "Failed to add wallet amount", { id: toastId });
        else {
          toast.success("Wallet amount added successfully!", { id: toastId });
          setWalletAmount("");
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

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Billing & User Management</h2>
      <p className="text-gray-600 mb-6">
        Search users, manage premium status, and add wallet credits.
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
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-md shadow mb-6">
          <div className="flex flex-row md:flex-row md:items-center gap-6">
            <div>
              <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
            <p className="text-gray-600">{selectedUser.email}</p>
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
          
          </div>
         
          <div className="flex items-center gap-4">
            
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Amount"
                value={walletAmount}
                onChange={(e) => setWalletAmount(e.target.value)}
                className="p-2 border rounded-md w-32"
              />
              <button
                onClick={handleAddWallet}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Add Wallet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
      {selectedUser && (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Status</th>
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
  );
};

export default BillingPage;
