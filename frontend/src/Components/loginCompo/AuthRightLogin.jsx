import { useNavigate } from "react-router-dom";

export default function AuthRight() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted ✅");
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-1 items-center justify-center ml-8 lg:p-12 w-full lg:w-[30vw] bg-white">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-transparent rounded-full">
            <img src="/login_logo3.gif" alt="login_logo3" className="w-40" />
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
              className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-10 pl-5 text-base 
                         focus:border-[#ff9770] focus:ring-2 focus:ring-[#ff9770] outline-none 
                         placeholder:text-gray-400 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-10  pl-5 text-base 
                         focus:border-[#ff9770] focus:ring-2 focus:ring-[#ff9770] outline-none 
                         placeholder:text-gray-400 transition"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-[#ff9770] text-[#ff9770] focus:ring-[#ff9770]"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="font-medium text-[#ff7849] hover:text-[#e76f51] transition"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 rounded-lg shadow-sm text-sm font-bold text-white 
                       bg-[#ff9770] hover:bg-[#ff7849] focus:ring-2 focus:ring-offset-2 focus:ring-[#ffcdb2] 
                       transition duration-150 ease-in-out"
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
            className="font-medium text-[#ff7849] hover:text-[#e76f51] transition"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
