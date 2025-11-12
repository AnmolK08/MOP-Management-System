import React, { useEffect, useState } from 'react';
import { LogoIcon } from './SvgIcons';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete?.(), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-100 via-gray-100 to-gray-200">
      {/* Logo and Brand */}
      <div className="flex flex-col items-center gap-8 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 text-[#ec6d13]">
            <LogoIcon />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Minipahadganj
          </h1>
        </div>

        {/* Progress Bar Container */}
        <div className="w-72 sm:w-96 md:w-[500px]">
          {/* Progress Text */}
          <div className="flex justify-end mb-2">
            <span className="text-sm font-medium text-gray-700 tabular-nums">
              {progress}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-0.5 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gray-900 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
