import AuthLeft from "../Components/loginCompo/AuthLeftLogin";
import AuthRight from "../Components/loginCompo/AuthRightLogin";

// Main LoginPage Component
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-6xl">
        {/* Background shadow */}
        <div className="absolute inset-0 rounded-2xl bg-black/5 blur-2xl -z-10"></div>

        {/* Card */}
        <div className="relative flex w-full bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px]">
          {/* Left Side - Hidden on small screens */}
          <div className="hidden lg:flex w-1/2">
            <AuthLeft />
          </div>

          {/* Right Side - Always visible */}
          <div className="flex w-full lg:w-1/2">
            <AuthRight />
          </div>
        </div>
      </div>
    </div>
  );
}
