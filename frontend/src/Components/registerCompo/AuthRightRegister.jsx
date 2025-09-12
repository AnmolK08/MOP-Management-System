import { useNavigate } from "react-router-dom";

export default function AuthRightRegister() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register submitted ✅");
    // Example: navigate to dashboard after register
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-1 items-center justify-center p-6 lg:p-12 w-full lg:w-1/2 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2172 25.7818 4 24C14.2172 22.2182 22.2182 14.2173 24 4Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">
            Please fill in the details to sign up.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Full Name"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 h-10 pl-5 text-base 
                         focus:border-green-300 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 h-10 pl-5 text-base 
                         focus:border-green-300 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 h-10 pl-5 text-base 
                         focus:border-green-300 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 h-10 pl-5 text-base 
                         focus:border-green-300 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{" "}
              <span className="text-green-600 hover:underline cursor-pointer">
                Terms & Conditions
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 rounded-lg shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-green-600 hover:text-green-500"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
