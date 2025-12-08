import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers, togglePremiumStatus } from "../../Redux/Slices/providerSlice";
import { toast } from 'react-toastify';
import { deleteUserFromOrders, updateProviderOrders } from "../../Redux/Slices/orderSlice";
import ConfirmationDialog from "../../Components/ConfirmationDialog";
import { RiDeleteBin5Line } from "react-icons/ri";

const ProviderUsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.providerSlice.users);
  const { providerOrders } = useSelector((state) => state.orderSlice);

  useEffect(() => {
    if (!users || users.length === 0) dispatch(getAllUsers());
  }, [dispatch, users.length]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [paidFilter, setPaidFilter] = useState("all");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    userId: null,
    userName: "",
    isPremium: false,
  });

  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    userId: null,
    userName: "",
  });

  const handleTogglePremium = (customerId) => {
    const toastId = toast.loading("Toggling premium status...");
    if (!customerId) {
      toast.error("Customer ID is missing");
      return;
    }

    dispatch(togglePremiumStatus(customerId))
      .then((res) => {
        if (res.error) {
          toast.update(toastId, { render: res.error.message || "Failed to toggle premium status", type: "error", isLoading: false, autoClose: 3000 });
        } else {
          toast.update(toastId, { render: "Premium status toggled successfully", type: "success", isLoading: false, autoClose: 3000 });
          if (providerOrders.length !== 0) {
            dispatch(updateProviderOrders({ Id: customerId }));
          }
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        }
      })
      .catch(() => {
        toast.update(toastId, { render: "An unexpected error occurred", type: "error", isLoading: false, autoClose: 3000 });
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

    const paidsFilter =
      paidFilter === "all" ||
      (paidFilter === "paid" && user.customer.wallet >= 0) ||
      (paidFilter === "not-paid" && user.customer.wallet < 0);
    return matchesSearch && matchesFilter && paidsFilter;
  });

  const handleDeleteUser = (userId) => {
    const toastId = toast.loading("Deleting user...");
    if (!userId) {
      toast.error("User ID is missing", {
        id: toastId,
      });
      return;
    }
    dispatch(deleteUser(userId))
      .then((res) => {
        if (res.error) {
          toast.update(toastId, { render: res.error.message || "Failed to delete user", type: "error", isLoading: false, autoClose: 3000 });
        } else {
          toast.update(toastId, { render: "User deleted successfully", type: "success", isLoading: false, autoClose: 3000 });
          if (providerOrders.length !== 0) {
            dispatch(deleteUserFromOrders({ Id: userId }));
          }
        }
      })
      .catch(() => {
        toast.update(toastId, { render: "An unexpected error occurred", type: "error", isLoading: false, autoClose: 3000 });
      });
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-full sm:flex-1"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md w-full sm:w-auto"
        >
          <option value="all">Premium Status</option>
          <option value="premium">Premium</option>
          <option value="normal">Normal</option>
        </select>
        <select
          value={paidFilter}
          onChange={(e) => setPaidFilter(e.target.value)}
          className="p-2 border rounded-md w-full sm:w-auto"
        >
          <option value="all">Paid Status</option>
          <option value="paid">Paid</option>
          <option value="not-paid">Not Paid</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Premium</th>
              <th className="text-left p-3">Wallet</th>
              <th className="text-left p-3">Actions</th>
              <th className="text-left p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${user.customer.premium
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
                      onClick={() =>
                        setConfirmDialog({
                          isOpen: true,
                          userId: user.customer.id,
                          userName: user.name,
                          isPremium: user.customer.premium,
                        })
                      }
                      className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                    >
                      Toggle Premium
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      className="flex items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:bg-red-100 transition-colors"
                      title="Delete User"
                      onClick={() =>
                        setDeleteDialog({
                          isOpen: true,
                          userId: user.id,
                          userName: user.name,
                        })
                      }
                    >
                      <RiDeleteBin5Line color="red" size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Confirmation for Premium Toggle */}
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={() => handleTogglePremium(confirmDialog.userId)}
        title="Toggle Premium Status"
        message={
          <>
            Are you sure you want to{" "}
            <strong>{confirmDialog.isPremium ? "remove" : "add"}</strong>{" "}
            premium status for <strong>{confirmDialog.userName}</strong>?
          </>
        }
      />

      {/* 🔹 Confirmation for Delete User */}
      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={() => handleDeleteUser(deleteDialog.userId)}
        title="Delete User"
        message={
          <>
            Are you sure you want to delete{" "}
            <strong>{deleteDialog.userName}</strong>? This action cannot be
            undone.
          </>
        }
      />
    </div>
  );
};

export default ProviderUsersPage;
