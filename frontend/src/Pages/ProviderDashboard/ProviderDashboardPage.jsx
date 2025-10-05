import React, { useEffect } from "react";
import MenuEditor from "../../Components/MenuEditor";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderOrders } from "../../Redux/Slices/orderSlice";
import { getAllUsers } from "../../Redux/Slices/providerSlice";

// A simple card for displaying stats
const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      {value && (
        <p
          className={`text-3xl font-bold ${
            value >= 0 ? "text-gray-600" : "text-red-500"
          }`}
        >
          {value}
        </p>
      )}
    </div>
  </div>
);


const ProviderDashboardPage = () => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.providerSlice.users);
    const orders = useSelector((state) => state.orderSlice.providerOrders); 


    useEffect(() => {
      if (!orders || orders.length === 0) {
        dispatch(fetchProviderOrders());
      }
      if (!users || users.length === 0) dispatch(getAllUsers());
    }, [dispatch]);

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
          value={orders.length - orders.filter(order => order.status == "CANCELLED").length}
        />
        <StatCard
          title="Payments Pending"
          value={users.reduce((acc, user) => acc + (user.customer.wallet < 0 ? user.customer.wallet : 0), 0)}
        />
      </div>

      {/* Menu Editor */}
      <MenuEditor />
    </div>
  );
};

export default ProviderDashboardPage;
