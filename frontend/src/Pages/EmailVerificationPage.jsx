import React from "react";
import { useLocation } from "react-router-dom";
import { RiMailCheckLine, RiMailOpenLine } from "react-icons/ri";
import imgx from "../assets/Order-food-bro.png";

const EmailVerificationPage = () => {
  const location = useLocation();
  const email = location.state?.email || "your email";

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full h-3/4 max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Section (Image - hidden on mobile) */}
        <div className="hidden md:flex bg-blue-50 items-center justify-center p-6 md:w-1/2">
          <img
            src={imgx}
            alt="Email verification illustration"
            className="w-56 lg:w-72"
          />
        </div>

        {/* Right Section (Content) */}
        <div className="flex-1 p-6 space-y-4 text-center md:text-center flex flex-col justify-center items-center">
          <div className="animate-bounce">
            <RiMailOpenLine className="w-12 h-12 mx-auto md:mx-0 text-[#d06842]" />
          </div>

          <h1 className="text-xl font-bold text-gray-900">Verify Your Email</h1>

          <p className="text-gray-600 text-sm">We sent a link to:</p>
          <p className="font-medium text-[#d06842] break-all text-sm">{email}</p>

          <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-600">
            Click the link in your inbox to complete registration.
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-500">Didn’t get it?</p>
            <button
              className="cursor-pointer text-[#d06842] hover:text-[#d06842] font-medium text-sm transition-colors"
              onClick={() =>
                alert("Resend functionality will be implemented")
              }
            >
              Resend Email
            </button>
          </div>

          <div className="text-xs text-gray-500 flex items-center justify-center md:justify-start">
            <RiMailCheckLine className="mr-1 text-green-500" />
            Check spam if you don’t see it.
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
