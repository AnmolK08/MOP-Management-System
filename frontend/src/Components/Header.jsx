import React from 'react'
import { LogoIcon, MenuIcon } from './SvgIcons';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 whitespace-nowrap border-b border-solid border-b-[#f4f2f0] bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 md:px-10 py-4">
        <div className="flex items-center gap-4 text-[#181411]">
          <div className="size-6 text-[#ec6d13]">
            <LogoIcon />
          </div>
          <h2 className="text-[#181411] text-xl font-bold leading-tight tracking-[-0.015em]">Minipahadganj</h2>
        </div>
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-stone-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon />
          </button>
          <div className="hidden md:flex flex-1 items-center gap-6">
            <nav className="flex items-center gap-8">
              <a className="text-stone-700 hover:text-[#ec6d13] text-base font-medium leading-normal transition-colors" href="/">Home</a>
              <a className="text-stone-700 hover:text-[#ec6d13] text-base font-medium leading-normal transition-colors" href="#menu">Menu</a>
              <a className="text-stone-700 hover:text-[#ec6d13] text-base font-medium leading-normal transition-colors" href="#plans">Plans</a>
              <a className="text-stone-700 hover:text-[#ec6d13] text-base font-medium leading-normal transition-colors" href="#contact">Contact</a>
            </nav>
            <a href="/loginpage">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-11 px-5 bg-[#ec6d13] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-orange-600 transition-colors">
              <span className="truncate">Login / Register</span>
            </button>
            </a>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} border-t border-stone-200`}>
        <nav className="flex flex-col py-4">
          <a className="px-4 py-2 text-stone-700 hover:text-[#ec6d13] text-base font-medium leading-normal transition-colors" href="/">Home</a>
          <a className="px-4 py-2 text-stone-700 hover:text-[#ec6d13] text-base font-medium leading-normal transition-colors" href="#menu">Menu</a>
          <a className="px-4 py-2 text-stone-700 hover:text-[#ec6d13] text-base font-medium leading-normal transition-colors" href="#plans">Plans</a>
          <a className="px-4 py-2 text-stone-700 hover:text-[#ec6d13] text-base font-medium leading-normal transition-colors" href="#contact">Contact</a>
          <div className="px-4 pt-2">
            <button className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-md h-11 px-5 bg-[#ec6d13] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-orange-600 transition-colors">
              <span className="truncate">Login / Register</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header