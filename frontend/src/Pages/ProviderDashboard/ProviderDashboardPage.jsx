import React, { useEffect, useState } from "react";
import MenuEditor from "../../Components/MenuEditor";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderOrders } from "../../Redux/Slices/orderSlice";
import { announcementMsg, getAllUsers } from "../../Redux/Slices/providerSlice";
import { IoMdMegaphone, IoMdClose, IoMdQrScanner } from "react-icons/io";
import { toast } from "react-toastify";
import QRCodeGenerator from "../../Components/QRCodeGenerator";

// A simple card for displaying stats
const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      {value && (
        <p
          className={`text-3xl font-bold ${value >= 0 ? "text-gray-600" : "text-red-500"
            }`}
        >
          {value}
        </p>
      )}
    </div>
  </div>
);

const AnnouncementModal = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    if (!message.trim()) return;
    const toastId = toast.loading("Announcement is being sent...");

    dispatch(announcementMsg(message)).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        toast.update(toastId, { render: res.payload, type: "error", isLoading: false, autoClose: 3000 });
      } else {
        toast.update(toastId, { render: "Announcement sent successfully", type: "success", isLoading: false, autoClose: 3000 });
      }
    });

    setMessage("");
    handleClose();
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="flex justify-end">
        <button
          onClick={handleOpen}
          className="flex items-center justify-center cursor-pointer gap-2 bg-orange-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-orange-600 transition-all font-medium"
        >
          <IoMdMegaphone className="text-xl" />
          <span className="hidden sm:inline">Make Announcement</span>
        </button>
      </div>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">

            {/* Header */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b">
              <h3 className="text-lg font-bold text-gray-800">New Announcement</h3>
              <button onClick={handleClose} className="text-gray-500 hover:text-red-500 transition-colors">
                <IoMdClose size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows="4"
                value={message}
                placeholder="Type your announcement regarding menu, timings, etc..."
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none text-gray-700"
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!message.trim()}
                className={`px-4 py-2 rounded-lg cursor-pointer text-white font-medium shadow-md transition-all ${message.trim()
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-orange-300 cursor-not-allowed"
                  }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


const ProviderDashboardPage = () => {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.providerSlice.users);
  const orders = useSelector((state) => state.orderSlice.providerOrders);
  const [isQRModalOpen, setQRModalOpen] = useState(false);


  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(fetchProviderOrders());
    }
    if (!users || users.length === 0) dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap sm:flex-row justify-between items-start sm:items-center gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h2>
        <div className="flex gap-2">
          <AnnouncementModal />
          <button
            onClick={() => setQRModalOpen(true)}
            className="flex items-center justify-center cursor-pointer gap-2 bg-orange-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-orange-600 transition-all font-medium"
          >
            <IoMdQrScanner className="text-xl" />
            <span className="hidden sm:inline">Generate QR Code</span>
          </button>
        </div>
      </div>

      <QRCodeGenerator isOpen={isQRModalOpen} onClose={() => setQRModalOpen(false)} />
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
