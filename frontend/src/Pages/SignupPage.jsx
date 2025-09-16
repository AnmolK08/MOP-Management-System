import AuthLeft from "../Components/registerCompo/AuthLeftRegister";
import AuthRightRegister from "../Components/registerCompo/AuthRightRegister";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-6xl">
        {/* Background shadow */}
        <div className="absolute inset-0 rounded-2xl bg-black/5 blur-2xl -z-10"></div>

        {/* Card */}
        <div className="relative flex w-full bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px]">
          {/* Left side (hidden on small) */}
          <div className="hidden lg:flex w-1/2 justify-center items-center">
            <AuthLeft />
          </div>

          {/* Right side (always visible) */}
          <div className="flex w-full lg:w-1/2">
            <AuthRightRegister />
          </div>
        </div>
      </div>
    </div>
  );
}
