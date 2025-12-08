import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../Redux/Slices/profileSlice";
import profileImg from "../assets/UserProfile.png";
import { toast } from 'react-toastify';
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { fetchUser } from "../Redux/Slices/authSlice";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    oldPass: "",
    newPass: "",
    confPass: "",
  });

  // states for toggling show/hide passwords
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);

  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state) => state.authSlice
  );

  useEffect(() => {
    if (!user) dispatch(fetchUser());
  }, [dispatch, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPass !== formData.confPass) {
      toast.error("New Password and Confirm Password must match");
      return;
    }

    const toastId = toast.loading("Updating password...");
    dispatch(updateProfile({ oldPass: formData.oldPass, newPass: formData.newPass, confPass: formData.confPass })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.update(toastId, { render: "Password updated successfully", type: "success", isLoading: false, autoClose: 3000 });
        setFormData({ oldPass: "", newPass: "", confPass: "" });
      } else {
        toast.update(toastId, { render: res.payload || "Failed to update password", type: "error", isLoading: false, autoClose: 3000 });
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b bg-gray-50">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Profile Settings
          </h1>
          <p className="mt-2 text-gray-600">Manage your account info</p>
        </div>

        {/* Profile Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Left Side - Profile Info */}
            <div className="flex flex-col items-center sm:items-start space-y-4 sm:w-1/3">
              <div className="relative">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-32 h-32 rounded-full ring-4 ring-gray-100"
                />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold text-gray-900">
                  {user?.name}
                </h2>
                <p className="text-gray-500">Role: {user?.role}</p>
                <p className="text-gray-500">Email: {user?.email}</p>
              </div>
            </div>

            {/* Right Side - Update Password */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Update Password
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Old Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Old Password
                  </label>
                  <div className="relative">
                    <input
                      type={showOld ? "text" : "password"}
                      value={formData.oldPass}
                      onChange={(e) =>
                        setFormData({ ...formData, oldPass: e.target.value })
                      }
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOld(!showOld)}
                      className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showOld ? <RiEyeOffLine /> : <RiEyeLine />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={formData.newPass}
                      onChange={(e) =>
                        setFormData({ ...formData, newPass: e.target.value })
                      }
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNew ? <RiEyeOffLine /> : <RiEyeLine />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConf ? "text" : "password"}
                      value={formData.confPass}
                      onChange={(e) =>
                        setFormData({ ...formData, confPass: e.target.value })
                      }
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConf(!showConf)}
                      className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConf ? <RiEyeOffLine /> : <RiEyeLine />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full sm:w-auto px-6 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {"Update Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
