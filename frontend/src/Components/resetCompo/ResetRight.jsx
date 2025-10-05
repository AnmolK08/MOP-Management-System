import React from 'react'
import { axiosInstance } from '../../libs/axios';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

function ResetRight() {

    const navigate = useNavigate();

    const handleResetPass = async (e) => {
    e.preventDefault();
    const newPass = e.target.newPass.value;
    const confPass = e.target.confPass.value;
    const param = new URLSearchParams(window.location.search);
    const token = param.get("token");

    if (newPass !== confPass) {
        toast.error("New password and confirmation password do not match");
        return;
    }

    const toastId = toast.loading("Resetting your password...");

    try {
        const response = await axiosInstance.post("/profile/resetPass", {
        newPass,
        confPass,
        token,
        });
        toast.success(response.data.message || "Password reset successfully!", {
        id: toastId,
        });
        navigate("/login");
    } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "An error occurred. Please try again.", {
        id: toastId,
        });
    }
    };

    
return (
    <div className="w-full bg-white p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Reset Password</h2>
        <form className="space-y-6" onSubmit={(e)=>handleResetPass(e)}>
            <p className="text-gray-700 text-center mb-4">
                Enter your new password below.
            </p>
            <div>
                <label htmlFor="newPass" className="block text-sm font-medium text-orange-700 mb-1">
                    New Password
                </label>
                <input
                    type="password"
                    id="newPass"
                    name="newPass"
                    required
                    className="mt-1 p-2 w-full border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-[#fff5f2]"
                    placeholder="Enter new password"
                />
            </div>
            <div>
                <label htmlFor="confPass" className="block text-sm font-medium text-orange-700 mb-1">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confPass"
                    name="confPass"
                    required
                    className="mt-1 p-2 w-full border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-[#fff5f2]"
                    placeholder="Confirm new password"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 font-semibold"
            >
                Reset Password
            </button>
        </form>
    </div>
)
}

export default ResetRight