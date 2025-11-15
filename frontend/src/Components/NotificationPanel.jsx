import React from "react";
import {
  RiCloseCircleLine,
  RiCheckboxCircleLine,
  RiInformationLine,
  RiAlertLine,
  RiTimeLine,
} from "react-icons/ri";

const NotificationPanel = ({
  notifications,
  onDelete,
  onClearAll,
  isOpen,
}) => {
  if (!isOpen) return null;

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Just now";
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "success":
        return <RiCheckboxCircleLine className="text-green-500" size={20} />;
      case "error":
      case "warning":
        return <RiAlertLine className="text-red-500" size={20} />;
      case "info":
      default:
        return <RiInformationLine className="text-blue-500" size={20} />;
    }
  };

  const sortedNotifications = [...notifications].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-slideDown">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-800 text-base">
            Notifications
          </h3>
          {notifications.length > 0 && (
            <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
              {notifications.length}
            </span>
          )}
        </div>
        {notifications.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-red-600 hover:text-red-700 font-medium hover:underline transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="max-h-[28rem] overflow-y-auto custom-scrollbar">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <RiInformationLine className="text-gray-400" size={32} />
            </div>
            <p className="text-center text-gray-500 text-sm font-medium">
              No new notifications
            </p>
            <p className="text-center text-gray-400 text-xs mt-1">
              We'll notify you when something arrives
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {sortedNotifications.map((notif, index) => (
              <li
                key={notif.id || index}
                className="group px-4 py-3 hover:bg-gray-50 transition-colors duration-150 relative"
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notif.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {notif.title && (
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        {notif.title}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 leading-relaxed break-words">
                      {notif.message}
                    </p>
                    
                    {/* Timestamp */}
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <RiTimeLine size={12} />
                      <span>{formatTimestamp(notif.createdAt || notif.time || notif.timestamp)}</span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => onDelete(notif.id)}
                    className="flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors opacity-100 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Delete notification"
                  >
                    <RiCloseCircleLine size={18} />
                  </button>
                </div>

                {/* Unread indicator */}
                {!notif.read && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r"></div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
