import { useNavigate } from "react-router-dom";

export default function AuthRight() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted ✅");
    // Example: navigate to dashboard after login
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-1 items-center justify-center p-6 lg:p-12 w-full lg:w-1/2 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <svg
              className="h-8 w-8 text-blue-600"
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
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">
            Please enter your credentials to log in.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="relative">
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 h-10 pl-5 text-base 
                         focus:border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border h-10 pl-5 border-gray-300 bg-gray-50  text-base 
                         focus:border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
