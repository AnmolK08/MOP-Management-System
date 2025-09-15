import React from "react";
import MenuEditor from "../../Components/MenuEditor";

// A simple card for displaying stats
const StatCard = ({ title, value, change }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      {change && (
        <p
          className={`text-sm font-medium ${
            change.startsWith("+") ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </p>
      )}
    </div>
  </div>
);


const ProviderDashboardPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Orders Today"
          value="125"
          change="+10%"
        />
        <StatCard
          title="Customer Attendance"
          value="87"
          change="-5%"
        />
        <StatCard
          title="Payments Received"
          value="$2,500"
          change="+15%"
        />
      </div>

      {/* Menu Editor */}
      <MenuEditor />
    </div>
  );
};

export default ProviderDashboardPage;
