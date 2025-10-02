import React, { useEffect, useState } from "react";
import OrderDetailsModal from "../../Components/OrderDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderOrders, markOrdersDelivered, markOrdersSeen } from "../../Redux/Slices/orderSlice";
import toast from "react-hot-toast";

const ProviderOrdersPage = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orderSlice.providerOrders);

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(fetchProviderOrders());
    }
  }, [dispatch, orders]);

  const [filter, setFilter] = useState("All");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");
  const [mark, setMark] = useState("")

  const filteredOrders = orders
    .filter((order) => {
      if (type !== "All" && order.type !== type) {
        return false;
      }
      if (filter !== "All" && order.status !== filter) return false;
      if (search) {
        const searchLower = search.toLowerCase();
        return order.customer.user.name.toLowerCase().includes(searchLower);
      }
      return true;
    })

  const getStatusClass = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "SEEN":
        return "bg-yellow-100 text-yellow-800";
      case "PLACED":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const [selectForSeen, setSelectForSeen] = useState(false);
  const [selectForDelivered, setSelectForDelivered] = useState(false);

  const [selectedOrders, setSelectedOrders] = useState({});

  const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleMark = (e) =>{
    e.preventDefault()
    setMark(e.target.value)
    if(e.target.value=="MarkSeen"){
      setSelectForSeen(true)
      setSelectForDelivered(false)
    }else if(e.target.value=="MarkDelivered"){
      setSelectForSeen(false)
      setSelectForDelivered(true)
    }else{
      setSelectForSeen(false)
      setSelectForDelivered(false)
    }
    setSelectedOrders({})
  }

  const markAs=()=>{
    if(selectForSeen){
      const orderIds = Object.keys(selectedOrders).filter((key) => selectedOrders[key]);
      dispatch(markOrdersSeen({orderIds}))
      .then((res)=>{
        if(res.error){
          toast.error(res.error.message)
        }else{
          toast.success("Orders marked as seen")
          setSelectedOrders({})
          setSelectForSeen(false)
          setMark("")
        }
      })
  }
  else if(selectForDelivered){
      const orderIds = Object.keys(selectedOrders).filter((key) => selectedOrders[key]);
      dispatch(markOrdersDelivered({orderIds}))
      .then((res)=>{
        if(res.error){
          toast.error(res.error.message)
        }else{
          toast.success("Orders marked as delivered")
          setSelectedOrders({})
          setSelectForDelivered(false)
          setMark("")
        } 
    })
  }
}

  const cancelSelect = ()=>{
    setSelectedOrders({})
    setSelectForDelivered(false)
    setSelectForSeen(false)
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Order History</h2>
      <p className="text-gray-600 mb-6">
        All orders for the lastest Menu and their current status.
      </p>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row flex-wrap items-stretch md:items-center justify-start mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by User name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md w-full md:w-auto flex-grow"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded-md w-full md:w-auto"
        >
          <option value="All">All Type</option>
          <option value="LUNCH">Lunch</option>
          <option value="DINNER">Dinner</option>
        </select>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md w-full md:w-auto"
        >
          <option value="All">All Status</option>
          <option value="DELIVERED">Delivered</option>
          <option value="SEEN">Seen</option>
          <option value="PLACED">Placed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <select
          value={mark}
          onChange={(e) => handleMark(e)}
          className="p-2 border rounded-md w-full md:w-auto bg-green-500 text-white"
        >
          <option className="bg-white text-black" value="">--Select Mark For--</option>
          <option className="bg-white text-black" value="MarkSeen">Mark Seen</option>
          <option className="bg-white text-black" value="MarkDelivered">Mark Delivered</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {(selectForSeen || selectForDelivered) && (
                <th className="text-left py-3 px-4">Select</th>
              )}
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Items</th>
              <th className="text-left py-3 px-4">Type</th>
              <th className="text-left py-3 px-4">Premium</th>
              <th className="text-left py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  {(selectForSeen || selectForDelivered) && (
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        disabled={selectForSeen? order.status !== "PLACED"?true:false: selectForDelivered && (order.status !== "PLACED" && order.status !== "SEEN")?true:false}
                        className="h-4 w-4 text-blue-600"
                        checked={ selectForSeen?
                          (order.status !== "PLACED"
                            ? true
                            : selectedOrders[order.id] || false):
                            selectForDelivered && (order.status !== "PLACED" && order.status !== "SEEN"
                            ? true
                            : selectedOrders[order.id] || false)
                        }
                        onChange={() => handleCheckboxChange(order.id)}
                      />
                    </td>
                  )}
                  <td className="py-3 px-4">{order.customer.user.name}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1 sm:flex-row flex-col">
                      {order.items.map((item) => (
                        <span
                          key={item}
                          className="text-nowrap bg-amber-100 rounded-full px-4 text-amber-800 font-semibold"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">{order.type}</td>
                  <td className="py-3 px-4">
                    {order.customer.premium ? "Premium" : "Regular"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No matching orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {(selectForSeen || selectForDelivered) && <div className="w-full flex justify-end mt-4">
        <div className="flex gap-2">
        <button className="p-3 rounded-xl text-white bg-red-500" onClick={cancelSelect}>Cancel</button>
        <button className="p-3 rounded-xl text-white bg-blue-500" onClick={markAs}>Mark As {selectForSeen?"Seen":"Delivered"}</button>
        </div>
      </div>}
    </div>
  );
};

export default ProviderOrdersPage;
