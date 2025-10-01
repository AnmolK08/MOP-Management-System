import React, { useEffect } from "react";
import MenuEditor from "../../Components/MenuEditor";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderOrders } from "../../Redux/Slices/orderSlice";

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

    const dispatch = useDispatch();
  
    const orders = useSelector((state) => state.orderSlice.providerOrders);

    useEffect(() => {
      if (!orders || orders.length === 0) {
        dispatch(fetchProviderOrders());
      }
    }, [dispatch, orders]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Orders Today"
          value={orders.length}
        />
        <StatCard
          title="Customer Attendance"
          value={orders.length - orders.filter(order => order.status != "CANCELLED").length}
        />
        <StatCard
          title="Payments Received"
          value="NA"
        />
      </div>

      {/* Menu Editor */}
      <MenuEditor />
    </div>
  );
};

export default ProviderDashboardPage;
