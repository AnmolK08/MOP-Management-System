import { useNavigate } from "react-router-dom";

export default function AuthRightRegister() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register submitted ✅");
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-1 items-center justify-center p-6 lg:p-12 w-full lg:w-1/2 bg-white">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center">
          <div className="inline-block mb-2 rounded-full">
            <img
                src="/coffee_bean.gif"
                alt="Chef Animation"
                className="w-10 lg:w-25"
              />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">
            Please fill in the details to sign up.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <input
            id="fullname"
            name="fullname"
            type="text"
            placeholder="Full Name"
            className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-10 pl-5 text-base 
                       focus:border-[#d06842] focus:ring-2 focus:ring-[#ff9770] outline-none 
                       placeholder:text-gray-400 transition"
          />

          {/* Email */}
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-10 pl-5 text-base 
                       focus:border-[#c76542] focus:ring-2 focus:ring-[#ff9770] outline-none 
                       placeholder:text-gray-400 transition"
          />

          {/* Password */}
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-10 pl-5 text-base 
                       focus:border-[#e36335] focus:ring-2 focus:ring-[#ff9770] outline-none 
                       placeholder:text-gray-400 transition"
          />

          {/* Confirm Password */}
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-10 pl-5 text-base 
                       focus:border-[#b95835] focus:ring-2 focus:ring-[#ff9770] outline-none 
                       placeholder:text-gray-400 transition"
          />

          {/* Terms & Conditions */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-[#ff9770] text-[#ff9770] focus:ring-[#ff9770]"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{" "}
              <span className="text-[#c1532f] hover:underline cursor-pointer">
                Terms & Conditions
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 rounded-lg shadow-sm text-sm font-bold text-white 
                       bg-[#e7764e] hover:bg-[#e24d1b] focus:ring-2 focus:ring-offset-2 focus:ring-[#ffcdb2] 
                       transition duration-150 ease-in-out"
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
            className="font-medium text-[#db5326] hover:text-[#d45839] transition"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
