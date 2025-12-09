import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { userLogin } from '../../Redux/Slices/authSlice';
import { Eye, EyeOff } from "lucide-react";

export default function AuthRight() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false)
  const [disable, setDisable] = useState(false)

  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Show a toast message if the user was just redirected from email verification
    if (searchParams.get('verified') === 'true') {
      toast.success('Email verified successfully! Please log in.');
    }

  }, [searchParams]);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setCredentials((prev) => ({ ...prev, email: storedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true)
    const toastId = toast.loading("Logging in...");

    try {
      await dispatch(userLogin(credentials)).unwrap().then((res) => {
        toast.update(toastId, { render: "Logged in successfully", type: "success", isLoading: false, autoClose: 3000 });
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", credentials.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        if (res.user.role === "PROVIDER") {
          navigate("/a", { replace: true });
        }
        else {
          navigate("/u", { replace: true });
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = typeof error === 'string' ? error : (error?.message || "Login failed");
      toast.update(toastId, { render: errorMessage, type: "error", isLoading: false, autoClose: 3000 });
    }
    finally {
      setDisable(false)
    }
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
          {/* Email */}
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-11 sm:h-12 pl-3 sm:pl-4 text-sm sm:text-base
                       focus:border-[#ff9770] focus:ring-2 focus:ring-[#ff9770] outline-none
                       placeholder:text-gray-400 transition"
            required
          />

          {/* Password */}
          <div className="w-full relative">
            <input
              id="password"
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-11 sm:h-12 pl-3 sm:pl-4 text-sm sm:text-base
                       focus:border-[#ff9770] focus:ring-2 focus:ring-[#ff9770] outline-none
                       placeholder:text-gray-400 transition"
              required
            />
            <div className="absolute right-5 top-3 text-gray-600 cursor-pointer" onClick={() => setShowPass(!showPass)}>
              {!showPass ? <EyeOff />
                : <Eye />}
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm">
            <label className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-[#ff9770] text-[#ff9770] focus:ring-[#ff9770] cursor-pointer"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="ml-2 text-gray-900">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className={`font-medium text-[#ff7849] hover:text-[#e76f51] transition cursor-pointer`}
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-2.5 sm:py-3 px-4 rounded-lg shadow-sm text-sm sm:text-base font-bold text-white 
                       bg-[#ff9770] hover:bg-[#ff7849] focus:ring-2 focus:ring-offset-2 focus:ring-[#ffcdb2] 
                       transition duration-150 ease-in-out cursor-pointer ${disable ? "pointer-events-none" : ""}`}
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
            className="font-medium text-[#ff7849] hover:text-[#e76f51] transition cursor-pointer"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
