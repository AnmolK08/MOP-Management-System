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
} from "react-icons/ri";
import { LogoIcon } from "../Components/SvgIcons"; // Assuming you have this icon
import { userLogout } from "../Redux/Slices/authSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const ProviderLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setSidebarOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { path: "/a", icon: RiDashboardLine, label: "Dashboard", end: true },
    { path: "/a/orders", icon: RiFileListLine, label: "Today's Orders" },
    { path: "/a/users", icon: RiUserLine, label: "Users" },
    { path: "/a/profile", icon: RiSettingsLine, label: "Profile Settings" },
  ];

  const handleLogout = () => {
    const toastId = toast.loading("Logging Out");
    dispatch(userLogout());

    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out", {
      id: toastId,
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
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
                    `flex items-center gap-3 px-4 py-3 rounded-lg ${
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
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden">
              <RiMenuLine size={24} />
            </button>
            <div className="flex items-center ml-auto gap-4">
              <button className="relative p-2">
                <RiNotification3Line size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2"
                >
                  <img
                    src="https://i.pravatar.cc/40?u=admin"
                    alt="Admin"
                    className="w-8 h-8 rounded-full"
                  />{" "}
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
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProviderLayout;
