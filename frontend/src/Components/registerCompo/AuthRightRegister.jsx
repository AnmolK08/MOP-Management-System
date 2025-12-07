import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignup } from "../../Redux/Slices/authSlice";
import { useState } from "react";
import { toast } from 'react-toastify';
import { Eye, EyeOff } from "lucide-react";

export default function AuthRightRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [disable, setDisable] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true)
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const toastId = toast.loading("Creating your account...");

    try {
      await dispatch(userSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })).unwrap();

      toast.update(toastId, { render: "Please verify your email", type: "success", isLoading: false, autoClose: 3000 });
      navigate("/email-verification", {
        state: { email: formData.email }
      });
    } catch (error) {
      toast.update(toastId, { render: error || "Registration failed", type: "error", isLoading: false, autoClose: 3000 });
    }
    finally {
      setDisable(false)
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center w-full">
      <div className="w-full max-w-sm sm:max-w-md"> {/* narrower like login */}
        {/* Header */}
        <div className="text-center">
          <div className="inline-block mb-3">
            <img
              src="/coffee_bean.gif"
              alt="Bean Animation"
              className="w-12 h-12 object-contain mx-auto"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-1 mb-4">
            Please fill in the details to sign up.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-11 pl-4 text-base 
                       focus:border-[#d06842] focus:ring-2 focus:ring-[#ff9770] outline-none
                       placeholder:text-gray-400 transition"
            required
          />

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-11 pl-4 text-base 
                       focus:border-[#c76542] focus:ring-2 focus:ring-[#ff9770] outline-none
                       placeholder:text-gray-400 transition"
            required
          />
          <div className="w-full relative">
            <input
              id="password"
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-11 pl-4 pr-10 text-base 
                         focus:border-[#e36335] focus:ring-2 focus:ring-[#ff9770] outline-none
                         placeholder:text-gray-400 transition"
              required
            />
            {formData.password && (
              <button
                type="button"
                aria-label={showPass ? "Hide password" : "Show password"}
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPass ? <Eye /> : <EyeOff />}
              </button>
            )}
          </div>

          <div className="w-full relative mt-3">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-11 pl-4 pr-10 text-base 
                         focus:border-[#b95835] focus:ring-2 focus:ring-[#ff9770] outline-none
                         placeholder:text-gray-400 transition"
              required
            />
            {formData.confirmPassword && (
              <button
                type="button"
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showConfirm ? <Eye /> : <EyeOff />}
              </button>
            )}
          </div>



          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-sm font-bold text-white 
                       bg-[#e7764e] hover:bg-[#e24d1b] focus:ring-2 focus:ring-offset-2 
                       focus:ring-[#ffcdb2] transition ${disable ? "pointer-events-none" : ""}`}
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
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
