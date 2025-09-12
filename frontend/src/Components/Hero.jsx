import React from 'react'
import heroBg from '../assets/heroBg.png';

// Hero Section Component
const Hero = () => {
  return (
    <div className="@container w-full mt-15 sm:mt-12">
      <div className="p-0 sm:p-4">
        <div 
          className="flex min-h-[350px] xs:min-h-[400px] sm:min-h-[520px] flex-col gap-4 xs:gap-6 sm:gap-8 items-center justify-center rounded-lg sm:rounded-2xl p-3 xs:p-4 sm:p-8 text-center relative overflow-hidden" 
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="flex flex-col gap-3 xs:gap-4 w-full max-w-3xl px-2 xs:px-4 sm:px-6">
            <h1 className="text-white text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
              Home-Style Meals, Delivered to Your Doorstep
            </h1>
            <p className="text-white/90 text-sm xs:text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
              Enjoy fresh, healthy, and delicious meals prepared with love and delivered right to your home. Choose from a variety of plans to suit your lifestyle and dietary needs.
            </p>
          </div>
          <div className="w-full px-3 xs:px-4 sm:px-0 sm:w-auto max-w-md">
            <a href="#plans"><button className="w-full sm:w-auto min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 xs:h-12 px-4 xs:px-6 bg-[#ec6d13] text-white text-base xs:text-lg font-bold leading-normal tracking-[0.015em] hover:bg-orange-600 transition-colors flex">
              <span className="truncate">View Plans</span>
            </button></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero