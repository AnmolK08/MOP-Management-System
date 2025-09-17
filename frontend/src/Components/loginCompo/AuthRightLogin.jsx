import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthRight() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted ✅", credentials);
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-1 items-center justify-center w-full">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto  rounded-full flex items-center justify-center">
              <img
                src="/login_logo3.gif"
                alt="plate Animation"
                className="w-16 sm:w-20"
              />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
            Please enter your credentials to log in.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Username */}
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-11 sm:h-12 pl-3 sm:pl-4 text-sm sm:text-base
                       focus:border-[#ff9770] focus:ring-2 focus:ring-[#ff9770] outline-none
                       placeholder:text-gray-400 transition"
            required
          />

          {/* Password */}
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-11 sm:h-12 pl-3 sm:pl-4 text-sm sm:text-base
                       focus:border-[#ff9770] focus:ring-2 focus:ring-[#ff9770] outline-none
                       placeholder:text-gray-400 transition"
            required
          />

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm">
            <label className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-[#ff9770] text-[#ff9770] focus:ring-[#ff9770]"
              />
              <span className="ml-2 text-gray-900">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="font-medium text-[#ff7849] hover:text-[#e76f51] transition"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 px-4 rounded-lg shadow-sm text-sm sm:text-base font-bold text-white 
                       bg-[#ff9770] hover:bg-[#ff7849] focus:ring-2 focus:ring-offset-2 focus:ring-[#ffcdb2] 
                       transition duration-150 ease-in-out"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="font-medium text-[#ff7849] hover:text-[#e76f51] transition"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
