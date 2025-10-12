import React, { useState, useEffect, useRef } from "react";
import {
  NavLink,
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import EditProfileModal from "../Components/EditProfileModal";
import {
  RiDashboardLine,
  RiMenuLine,
  RiFileListLine,
  RiCalendarLine,
  RiNotification3Line,
  RiCloseLine,
  RiUserLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import { LogoIcon } from "../Components/SvgIcons";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../Redux/Slices/authSlice";
import profileImg from "../assets/UserProfile.png";
import { getSocket } from "../socket"; // ✅ Make sure you have this helper like in your ProviderLayout
import { addNotification, clearAllNotifications, deleteNotification, getAllNotifications } from "../Redux/Slices/notificationSlice";

const DashboardLayout = () => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
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


  // Close on route change
  useEffect(() => {
    setSidebarOpen(false);
    setIsDropdownOpen(false);
    setIsNotifPanelOpen(false);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Real-time notification handling via socket
  useEffect(() => {
    const socket = getSocket();

    socket.on("newNotification", (data) => {
      // Show popup for the new notification
      toast.success(`${data.message}`, { duration: 3000 });

      dispatch(addNotification(data));
    });

    return () => socket.off("newNotification");
  }, []);

  const handleLogout = () => {
    const toastId = toast.loading("Logging Out...");
    dispatch(userLogout());
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out", { id: toastId });
  };

  const navItems = [
    { path: "/u", icon: RiDashboardLine, label: "Dashboard", end: true },
    { path: "/u/menu", icon: RiMenuLine, label: "Menu" },
    { path: "/u/orders", icon: RiFileListLine, label: "Order History" },
    { path: "/u/attendance", icon: RiCalendarLine, label: "Attendance" },
    { path: "/u/profile", icon: RiUserLine, label: "Profile Settings" },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-30 w-[280px] md:w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="size-6 text-[#ec6d13]">
              <LogoIcon />
            </div>
            <h2 className="text-[#181411] text-xl font-bold">Minipahadganj</h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <RiCloseLine size={22} />
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
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm sm:text-base transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 md:hidden"
            >
              <RiMenuLine size={24} />
            </button>

            <div className="flex items-center gap-4 ml-auto">
              {/* Notification Section */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setIsNotifPanelOpen(!isNotifPanelOpen)}
                  className="relative p-2 hover:bg-gray-100 rounded-full"
                >
                  <RiNotification3Line size={22} />
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {/* Notification Panel */}
                {isNotifPanelOpen && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border rounded-lg shadow-xl z-50">
                    <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-50">
                      <h3 className="font-semibold text-gray-700 text-sm">
                        Notifications
                      </h3>
                      <button
                        onClick={clearAllNotificationsHandler}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>

                    {notifications.length === 0 ? (
                      <p className="text-center text-gray-500 py-4 text-sm">
                        No new notifications
                      </p>
                    ) : (
                      <ul className="max-h-64 overflow-y-auto divide-y">
                        {notifications.map((notif) => (
                          <li
                            key={notif.id}
                            className="flex justify-between items-start px-4 py-2 hover:bg-gray-50"
                          >
                            <div>
                              <p className="text-sm text-gray-700">
                                {notif.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notif.time}
                              </p>
                            </div>
                            <button
                              onClick={() => deleteNotificationHandler(notif.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <RiCloseCircleLine size={16} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={profileImg}
                    alt="User"
                    className="w-8 h-8 rounded-full ring-2 ring-gray-200 hover:ring-gray-300 transition-all"
                  />
                </button>

                <div
                  className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 transition-all duration-200 origin-top-right ${
                    isDropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/u/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
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

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <EditProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
};

export default DashboardLayout;
