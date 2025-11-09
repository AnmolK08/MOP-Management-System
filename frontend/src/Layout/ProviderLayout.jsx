import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  RiDashboardLine,
  RiFileListLine,
  RiUserLine,
  RiSettingsLine,
  RiMenuLine,
  RiCloseLine,
  RiNotification3Line,
  RiFileTextLine,
} from "react-icons/ri";
import NotificationPanel from "../Components/NotificationPanel";
import { LogoIcon } from "../Components/SvgIcons";
import { userLogout } from "../Redux/Slices/authSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../assets/UserProfile.png";
import { getSocket } from "../socket";
import { updateOrdersInProvider, updateCancelStatus, addOrdersInProvider } from "../Redux/Slices/orderSlice";
import { addNotification, clearAllNotifications, deleteNotification, getAllNotifications } from "../Redux/Slices/notificationSlice";

const ProviderLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifPanelOpen, setIsNotifPanelOpen] = useState(false);

  const location = useLocation();
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
    const notifications = useSelector((state) => state.notificationSlice.notifications);
  
    useEffect(() => {
      if (!notifications || notifications.length === 0) dispatch(getAllNotifications());
    }, [dispatch]);
  
    const deleteNotificationHandler = (id) => {
      if(!id) toast.error("Invalid Notification ID");
  
      const toastId = toast.loading("Deleting Notification...");
  
      dispatch(deleteNotification(id)).then((res) => {
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
        }
        else {
          toast.success("Notification Deleted", { id: toastId });
        }
      }).catch((err) => {
        toast.error(err.message || "Something went wrong", { id: toastId });
      });
    };
  
    const clearAllNotificationsHandler = () => {
  
      const toastId = toast.loading("Clearing Notifications...");
      dispatch(clearAllNotifications()).then((res) => {
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
        }
        else {
          toast.success("All Notifications Cleared", { id: toastId });
        }
      }).catch((err) => {
        toast.error(err.message || "Something went wrong", { id: toastId });
      });
    };
  

  // Close sidebars on route change
  useEffect(() => {
    setSidebarOpen(false);
    setIsDropdownOpen(false);
    setIsNotifPanelOpen(false);
  }, [location]);

  // Socket connection for real-time orders/notifications
  useEffect(() => {
    const socket = getSocket();

    socket.on("newOrder", (data) => {
      // Show toast notification
      toast.success(`${data.notification?.message || data.message || 'New order received'}`);
      
      // Update orders
      if (data.order) {
        dispatch(addOrdersInProvider(data.order));
      }
      
      // Add notification to store - handle both data structures
      const notification = data.notification || data;
      dispatch(addNotification(notification));
    });

    socket.on("cancelOrder" , ({updatedOrder , notification})=>{
        toast.success(notification.message);
        dispatch(addNotification(notification));
        dispatch(updateCancelStatus({Id: updatedOrder.id}));
    })

    socket.on("updateOrderNotification" , ({notification , updatedOrder})=>{
        toast.success(notification.message);
        dispatch(addNotification(notification));
        dispatch(updateOrdersInProvider(updatedOrder));
    })

    return () => {
      socket.off("newOrder");
      socket.off("cancelOrder");
      socket.off("updateOrderNotification");
    };
  }, [dispatch]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }

      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    const toastId = toast.loading("Logging Out...");
    dispatch(userLogout());
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out", { id: toastId });
  };

  const navItems = [
    { path: "/a", icon: RiDashboardLine, label: "Dashboard", end: true },
    { path: "/a/orders", icon: RiFileListLine, label: "Today's Orders" },
    { path: "/a/users", icon: RiUserLine, label: "Users" },
    { path: "/a/billing", icon: RiFileTextLine, label: "Billing" },
    { path: "/a/profile", icon: RiSettingsLine, label: "Profile Settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Overlay for mobile view */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="size-7 text-[#ec6d13]">
              <LogoIcon />
            </div>
            <h2 className="text-[#181411] text-xl font-bold">Minipahadganj</h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <RiCloseLine size={24} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden">
              <RiMenuLine size={24} />
            </button>

            <div className="flex items-center ml-auto gap-4">
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setIsNotifPanelOpen(!isNotifPanelOpen)}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Toggle notifications"
                >
                  <RiNotification3Line size={24} className="text-gray-700" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      {notifications.length > 99 ? '99+' : notifications.length}
                    </span>
                  )}
                </button>

                {/* Enhanced Notification Panel */}
                <NotificationPanel
                  notifications={notifications}
                  onDelete={deleteNotificationHandler}
                  onClearAll={clearAllNotificationsHandler}
                  isOpen={isNotifPanelOpen}
                />
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={profileImg}
                    alt="Admin"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden sm:inline font-medium">Admin</span>
                </button>

                <div
                  className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 ${
                    isDropdownOpen ? "block" : "hidden"
                  }`}
                >
                  <NavLink
                    to="/a/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProviderLayout;
