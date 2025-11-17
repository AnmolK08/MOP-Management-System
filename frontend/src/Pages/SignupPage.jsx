import BackButton from "../Components/BackButton";
import AuthLeft from "../Components/registerCompo/AuthLeftRegister";
import AuthRightRegister from "../Components/registerCompo/AuthRightRegister";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      {/* Back button at top */}
      <div className="absolute top-4 left-4 z-10">
        <BackButton location={""} />
      </div>

      <div className="relative w-full max-w-4xl">
        {/* Background shadow */}
        <div className="absolute inset-0 rounded-2xl bg-black/5 blur-2xl -z-10"></div>

        {/* Card */}
        <div className="relative flex w-full bg-white rounded-2xl shadow-xl overflow-hidden flex-col lg:flex-row">
          {/* Left side (hidden on small) */}
          <div className="hidden lg:flex w-2/5 justify-center items-center  p-6">
            <AuthLeft />
          </div>

          {/* Right side (always visible) */}
          <div className="flex w-full lg:w-3/5 p-6 sm:p-8 lg:p-10">
            <AuthRightRegister />
          </div>
        </div>
      </div>

      {/* Footer text below card */}
      <div className="mt-4 text-center text-xs sm:text-sm text-gray-400">
        MADE WITH ❤️ BY THE MINI TEAM
      </div>
    </div>
  );
}
