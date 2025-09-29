import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignup } from "../../Redux/Slices/authSlice";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AuthRightRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

      toast.success("Please verify your email", { id: toastId });
      navigate("/email-verification", { 
        state: { email: formData.email }
      });
    } catch (error) {
      toast.error(error || "Registration failed", { id: toastId });
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

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-11 pl-4 text-base 
                       focus:border-[#e36335] focus:ring-2 focus:ring-[#ff9770] outline-none
                       placeholder:text-gray-400 transition"
            required
          />

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#ffd9c7] bg-[#fff5f2] h-11 pl-4 text-base 
                       focus:border-[#b95835] focus:ring-2 focus:ring-[#ff9770] outline-none
                       placeholder:text-gray-400 transition"
            required
          />


          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-sm font-bold text-white 
                       bg-[#e7764e] hover:bg-[#e24d1b] focus:ring-2 focus:ring-offset-2 
                       focus:ring-[#ffcdb2] transition"
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
