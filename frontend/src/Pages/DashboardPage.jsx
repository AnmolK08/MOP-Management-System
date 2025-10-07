import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderDialog from "../Components/OrderDialog"; // Import the dialog
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../Redux/Slices/menuSlice";
import {
  cancelOrder,
  fetchUserOrders,
  placeOrder,
  updateOrder,
} from "../Redux/Slices/orderSlice";
import toast from "react-hot-toast";
import ConfirmationDialog from "../Components/ConfirmationDialog";

// Child components for better organization
const MenuCard = ({ menu, onOrderNow }) => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          Today's Menu [{menu.type}]
        </h3>
        <p className="text-sm text-gray-500">
          Date:{" "}
          {new Date(menu.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          })}
        </p>
      </div>
      <ul className="space-y-2 mb-6 flex-grow">
        {menu.options.map((option, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-600">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            {option}
          </li>
        ))}
      </ul>
      <button
        onClick={onOrderNow}
        className="w-full bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
      >
        Order Now
      </button>
    </div>
  </div>
);

const LatestOrderCard = ({ order, onEdit, onCancel }) => {
   const [isOpen, setIsOpen] = useState(false);

  return(
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
    <div className="flex flex-col justify-between w-full gap-2 mb-4">
      <h3 className="text-lg sm:text-xl font-semibold ">
        Your Latest Order{" "}[{order.type}]
      </h3>
      <p className="text-sm text-gray-500">
          Date:{" "}
          {new Date(order.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          })}
        </p>
    </div>

    <ul className="space-y-2 mb-6 flex-grow">
      {order.items?.map((item, index) => (
        <li key={index} className="flex items-center gap-2 text-gray-600">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          {item}
        </li>
      ))}
    </ul>
    <div className="flex justify-between items-center mt-4 text-sm">
      <p className="font-medium">
        Status: <span className="text-green-600">{order.status}</span>
      </p>
    </div>
    {order.status == "PLACED" && (
      <div className="flex gap-3 mt-4">
        <button
          onClick={onEdit}
          className="flex-1 bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500"
        >
          Edit Order
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Cancel Order
        </button>

        <ConfirmationDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={onCancel}
          title="Cancel Order"
          message="Are you sure you want to cancel this order? This action cannot be undone."
          />
      </div>
    )}
  </div>
);}

const DashboardPage = () => {
  const { userOrders, loading: userLoading } = useSelector(
    (state) => state.orderSlice
  );
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState(
    userOrders[userOrders.length - 1]
  );
  const [editingOrder, setEditingOrder] = useState(null);

  const dispatch = useDispatch();
  const { menu, loading } = useSelector((state) => state.menuSlice);
  const user = useSelector(
    (state) => state.authSlice.user
  );

  useEffect(() => {
    const fetch = () => {
      dispatch(fetchMenu());
    };

    if (menu == null) fetch();
  }, [menu, dispatch]);

  useEffect(() => {
    if (userOrders.length === 0) dispatch(fetchUserOrders());
    setLatestOrder(userOrders[userOrders.length - 1]);
  }, [userOrders.length, dispatch]);

  const handlePlaceOrder = (orderData) => {
    if (!editingOrder) {
      const toastId = toast.loading("Placing an order");
      dispatch(placeOrder(orderData)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          toast.error(res.payload, {
            id: toastId,
          });
        } else
          toast.success("Order placed", {
            id: toastId,
          });
        setLatestOrder(res.payload);
      });
    } else {
      const toastId = toast.loading("Updating the order");
      dispatch(updateOrder({ orderData, orderId: latestOrder.id })).then(
        (res) => {
          if (res.meta.requestStatus === "rejected") {
            toast.error(res.payload, {
              id: toastId,
            });
          } else
            toast.success("Order updated", {
              id: toastId,
            });
          setLatestOrder(res.payload);
        }
      );
    }
    setEditingOrder(null);
    setOrderDialogOpen(false);
  };

  const handleOpenEdit = () => {
    setEditingOrder(latestOrder);
    setOrderDialogOpen(true);
  };

  const handleCancel = () => {
    dispatch(cancelOrder(latestOrder.id)).then((res) => {
      setLatestOrder(res.payload);
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back
        </h2>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {menu != null ? (
          <MenuCard
            menu={menu}
            onOrderNow={() => {
              setEditingOrder(null);
              setOrderDialogOpen(true);
            }}
          />
        ) : loading ? (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-center items-center">
            <h1 className="text-gray-500">Loading Menu...</h1>
          </div>
        ) : (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-center items-center">
            <h1 className="text-gray-500">Menu not uploaded yet!!</h1>
          </div>
        )}
        {latestOrder ? (
          <LatestOrderCard
            order={latestOrder}
            onEdit={handleOpenEdit}
            onCancel={handleCancel}
          />
        ) : userLoading ? (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-center items-center">
            <h1 className="text-gray-500">Loading Latest Order...</h1>
          </div>
        ) : (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm flex items-center justify-center text-gray-500">
            <p>Your latest order will appear here.</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Active Plan</p>
            <p className="text-xl font-semibold text-blue-600">
              {" "}
              {user === null
                ? "Loading..."
                : user.customer?.premium
                ? "Premium"
                : "Normal"}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Wallet</p>
            <p className="text-xl font-semibold text-green-600">
              {" "}
              {user === null
                ? "Loading..."
                : user.customer?.wallet || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-lg mb-2">Order History</h4>
            <p className="text-gray-600 text-sm mb-4">
              Review your past orders and favorites.
            </p>
            <Link
              to="/u/orders"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              View History
              <svg
                className="w-4 h-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-lg mb-2">Attendance Calendar</h4>
            <p className="text-gray-600 text-sm mb-4">
              Check your monthly attendance record.
            </p>
            <Link
              to="/u/attendance"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              View Calendar
              <svg
                className="w-4 h-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-lg mb-2">Monthly Bill Summary</h4>
            <p className="text-gray-600 text-sm mb-4">
              View your current month's bill status.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              View Summary
              <svg
                className="w-4 h-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <OrderDialog
        isOpen={isOrderDialogOpen}
        onClose={() => setOrderDialogOpen(false)}
        menu={menu}
        onPlaceOrder={handlePlaceOrder}
        editingOrder={editingOrder}
      />
    </div>
  );
};

export default DashboardPage;
