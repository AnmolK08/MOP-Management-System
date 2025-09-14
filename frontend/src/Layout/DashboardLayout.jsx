import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import EditProfileModal from '../Components/EditProfileModal';
import { RiDashboardLine, RiMenuLine, RiFileListLine, RiCalendarLine, RiFileTextLine, RiNotification3Line, RiCloseLine, RiUserLine } from 'react-icons/ri';
import { LogoIcon } from '../Components/SvgIcons';

const DashboardLayout = () => {
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();
    const dropdownRef = React.useRef(null);

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

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems = [
        { path: "/u", icon: RiDashboardLine, label: "Dashboard", end: true },
        { path: "/u/menu", icon: RiMenuLine, label: "Menu" },
        { path: "/u/orders", icon: RiFileListLine, label: "Order History" },
        { path: "/u/attendance", icon: RiCalendarLine, label: "Attendance" },
        { path: "/u/billing", icon: RiFileTextLine, label: "Billing" },
        { path: "/u/profile", icon: RiUserLine, label: "Profile Settings" }
    ];

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:relative inset-y-0 left-0 z-30
                w-[280px] md:w-64 min-h-screen 
                bg-white shadow-lg md:shadow-none
                transform transition-transform duration-200 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
            `}>
                <div className="flex items-center justify-between p-4">
                    <div className='flex items-center gap-2'>
                        <div className="size-6 text-[#ec6d13]">
                                <LogoIcon />
                    </div>
                    <h2 className="text-[#181411] text-xl font-bold leading-tight tracking-[-0.015em]">Minipahadganj</h2>
                    </div>
                    <button 
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <RiCloseLine className="w-6 h-6" />
                    </button>
                </div>
                
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) => `
                                        flex items-center gap-3 px-4 py-3 rounded-lg
                                        transition-colors duration-200
                                        ${isActive 
                                            ? 'bg-blue-50 text-blue-600' 
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    <item.icon className="w-5 h-5 flex-shrink-0" />
                                    <span className="font-medium">{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navbar */}
                <header className="bg-white border-b border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button 
                            onClick={() => setSidebarOpen(true)} 
                            className="text-gray-500 hover:text-gray-700 md:hidden focus:outline-none"
                        >
                            <RiMenuLine className="w-6 h-6" />
                        </button>

                        <div className="flex items-center ml-auto gap-4">
                            <button className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                                <RiNotification3Line className="w-6 h-6" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-3 focus:outline-none"
                                >
                                    <img 
                                        src="https://i.pravatar.cc/40" 
                                        alt="User" 
                                        className="w-8 h-8 rounded-full ring-2 ring-gray-200 hover:ring-gray-300 transition-all"
                                    />
                                </button>
                                <div 
                                    className={`
                                        absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50
                                        transition-all duration-200 origin-top-right
                                        ${isDropdownOpen 
                                            ? 'opacity-100 scale-100' 
                                            : 'opacity-0 scale-95 pointer-events-none'}
                                    `}
                                >
                                    <Link
                                        to="/u/profile"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        Profile Settings
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            // Add logout logic here
                                        }}
                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
            
            <EditProfileModal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)} />
        </div>
    );
};

export default DashboardLayout;
