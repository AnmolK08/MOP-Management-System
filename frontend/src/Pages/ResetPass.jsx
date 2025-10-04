import BackButton from "../Components/BackButton";
import ResetLeft from "../Components/resetCompo/Resetleft";
import ResetRight from "../Components/resetCompo/ResetRight";

export default function ResetPass() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
          {/* Back button at top */}
          <div className="absolute top-4 left-4 z-10">
            <BackButton location={""}/>
          </div>
      <div className="relative w-full max-w-4xl">
        {/* Background shadow */}
        <div className="absolute inset-0 rounded-2xl bg-black/5 blur-2xl -z-10"></div>

        {/* Card */}
        <div className="relative flex flex-col lg:flex-row w-full bg-white rounded-2xl shadow-xl overflow-hidden min-h-[300px] sm:min-h-[450px]">
          
          {/* Left Side - Hidden on small screens */}
          <div className="hidden lg:flex lg:w-5/12 items-center justify-center p-4">
            <ResetLeft />
          </div>

          {/* Right Side */}
          <div className="flex w-full lg:w-7/12 items-center justify-center p-6 sm:p-8">
            <ResetRight />
          </div>
        </div>
      </div>
    </div>
  );
}
