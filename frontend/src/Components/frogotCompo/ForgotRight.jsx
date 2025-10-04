import React from 'react'
import { axiosInstance } from '../../libs/axios';

function ForgotRight() {

    const handleForgetPass = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        try {
            const res = await axiosInstance.post('/profile/forgetPass', { email });
            if (res.status === 200) {
                alert('Password reset link sent to your email.');
            } else {
                alert('Error sending password reset link. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending password reset link. Please try again.');
        }
    }
    
return (
    <div className="w-full bg-white p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Forgot Password</h2>
        <form className="space-y-6" onSubmit={(e)=>handleForgetPass(e)}>
            <p className="text-gray-700 text-center mb-4">
                Enter your registered email address below to receive a password reset link.
            </p>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-orange-700 mb-1">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 p-2 w-full border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-[#fff5f2]"
                    placeholder="Enter your registered email"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 font-semibold"
            >
                Send Reset Link
            </button>
        </form>
    </div>
)
}

export default ForgotRight