import AuthLeft from "../Components/loginCompo/AuthLeftLogin";
import AuthRight from "../Components/loginCompo/AuthRightLogin";


export default function LoginPage() {
  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="relative">
      {/* Background shadow */}
      <div className="absolute inset-0 rounded-2xl bg-black/10 blur-2xl"></div>

      {/* Card */}
      <div className="relative flex w-full max-w-fit bg-white rounded-2xl shadow-xl overflow-hidden">
        <AuthLeft />
        <AuthRight />
      </div>
    </div>
  </div>
  );
}


