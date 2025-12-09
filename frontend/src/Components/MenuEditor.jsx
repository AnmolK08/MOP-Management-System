import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../Redux/Slices/menuSlice"; // Adjust path
import MenuDialog from "./MenuDialog";
import { toast } from 'react-toastify';
import ConfirmationDialog from "./ConfirmationDialog";

const MenuEditor = () => {
  const dispatch = useDispatch();
  // 1. Get state from Redux store
  const {
    menu: activeMenu,
    loading,
    error,
  } = useSelector((state) => state.menuSlice);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [menuToEdit, setMenuToEdit] = useState(null);
  const [isConformationDialogOpen, setIsConformationDialogOpen] = useState(false);

  // 2. Fetch the menu when the component loads
  useEffect(() => {
    dispatch(fetchMenu())
  }, [dispatch]);

  // Handle and display errors from Redux
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleOpenAddDialog = () => {
    setMenuToEdit(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = () => {
    setMenuToEdit(activeMenu);
    setIsDialogOpen(true);
  };

  // 3. Dispatch deleteMenu action
  const handleDeleteMenu = () => {
    if (!activeMenu?.id) return;

    const toastId = toast.loading("Deleting menu...");

    dispatch(deleteMenu(activeMenu.id))
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          toast.update(toastId, { render: res.payload || "Failed to delete menu!", type: "error", isLoading: false, autoClose: 3000 });
        } else {
          toast.update(toastId, { render: "Menu deleted successfully!", type: "success", isLoading: false, autoClose: 3000 });
        }
      })
      .catch((error) => {
        console.error("Error deleting menu:", error);
        toast.update(toastId, { render: "An unexpected error occurred!", type: "error", isLoading: false, autoClose: 3000 });
      });
  };


  // 4. Dispatch createMenu or updateMenu actions
  const handleSaveMenu = (menuData) => {
    const toastId = toast.loading(
      menuToEdit?.id ? "Updating menu..." : "Creating menu..."
    );

    const action = menuToEdit?.id
      ? updateMenu({ menuId: menuToEdit.id, ...menuData })
      : createMenu(menuData);

    dispatch(action)
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          toast.update(toastId, {
            render: res.payload || "Something went wrong!",
            type: "error",
            isLoading: false,
            autoClose: 3000
          });
        } else {
          toast.update(toastId, {
            render: menuToEdit?.id
              ? "Menu updated successfully!"
              : "Menu created successfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.update(toastId, { render: "An unexpected error occurred!", type: "error", isLoading: false, autoClose: 3000 });
      })
      .finally(() => {
        setIsDialogOpen(false);
      });
  };


  // UI for loading state
  if (loading && !activeMenu) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm mt-6 text-center">
        <p className="text-gray-500">Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mt-6 w-full sm:w-1/2">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Manage Today's Menu
        </h3>
        {activeMenu && (
          <p className="text-xs text-gray-500 mt-2 sm:mt-0">
            Last Updated: {new Date(activeMenu.date).toLocaleTimeString()}
          </p>
        )}
      </div>

      {activeMenu ? (
        // Display when a menu is active
        <div>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-bold text-lg text-blue-800">
              {activeMenu.type} Menu
            </h4>
          </div>
          <ul className="space-y-2 mb-4">
            {activeMenu.options.map((item, index) => (
              <li
                key={index}
                className="p-3 bg-gray-50 rounded-lg text-gray-700"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={handleOpenEditDialog}
              className="flex-1 bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 font-semibold cursor-pointer"
            >
              Edit Menu
            </button>
            <button
              onClick={() => setIsConformationDialogOpen(true)}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 font-semibold cursor-pointer"
            >
              Delete Menu
            </button>
          </div>

          {/* Delete Confirmation Dialog */}
          <ConfirmationDialog
            isOpen={isConformationDialogOpen}
            onClose={() => setIsConformationDialogOpen(false)}
            onConfirm={handleDeleteMenu}
            title="Delete Menu"
            message="Are you sure you want to delete today's menu? This action cannot be undone."
          />
        </div>
      ) : (
        // Display when no menu is active
        <div className="text-center py-8 border-2 border-dashed rounded-lg">
          <p className="text-gray-500 mb-4">
            No menu has been published for today.
          </p>
          <button
            onClick={handleOpenAddDialog}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 cursor-pointer"
          >
            Add New Menu
          </button>
        </div>
      )}

      <MenuDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveMenu}
        existingMenu={menuToEdit}
      />
    </div>
  );
};

export default MenuEditor;
