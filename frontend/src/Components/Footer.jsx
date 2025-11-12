import React from 'react'
import { FacebookIcon, InstagramIcon, LogoIcon, TwitterIcon } from './SvgIcons';

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-orange-300 via-gray-100 to-gray-200 px-6 sm:px-8 lg:px-12 py-20 sm:py-24 overflow-hidden">
            {/* Headline */}
            <div className="max-w-7xl mx-auto mb-16 sm:mb-20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight max-w-3xl">
                    Let's deliver your next delicious meal together.
                </h2>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-gray-300">
                    {/* PRIMARY Section */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-300">
                            PRIMARY
                        </h3>
                        <nav className="flex flex-col gap-2">
                            <a href="/" className="text-gray-900 hover:text-[#ec6d13] transition-colors text-base font-medium">Home</a>
                            <a href="#menu" className="text-gray-900 hover:text-[#ec6d13] transition-colors text-base font-medium">Today's Menu</a>
                            <a href="#plans" className="text-gray-900 hover:text-[#ec6d13] transition-colors text-base font-medium">Plans</a>
                            <a href="#contact" className="text-gray-900 hover:text-[#ec6d13] transition-colors text-base font-medium">Contact</a>
                        </nav>
                    </div>

                    {/* GO DEEPER Section */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-300">
                            GO DEEPER
                        </h3>
                        <nav className="flex flex-col gap-2">
                            <a href="#" className="text-gray-900 hover:text-[#ec6d13] transition-colors text-base font-medium">About Us</a>
                            <a href="#" className="text-gray-900 hover:text-[#ec6d13] transition-colors text-base font-medium">Our Story</a>
                            <a href="#" className="text-gray-900 hover:text-[#ec6d13] transition-colors text-base font-medium">Nutrition</a>
                        </nav>
                    </div>

                    {/* SOCIAL Section */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-300">
                            SOCIAL
                        </h3>
                        <nav className="flex flex-col gap-2">
                            <a href="#" className="text-gray-900 hover:text-[#ec6d13] transition-colors text-base font-medium">Instagram</a>
                            <a href="#" className="text-gray-900 hover:text-[#ec6d13] transition-colors text-base font-medium">Facebook</a>
                            <a href="#" className="text-gray-900 hover:text-[#ec6d13] transition-colors text-base font-medium">Twitter</a>
                        </nav>
                    </div>

                    {/* WANT TO ORDER? Section */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-300">
                            WANT TO ORDER?
                        </h3>
                        <a href="mailto:minnipahadganjrestaurant@gmail.com" className="text-gray-900 hover:text-[#ec6d13] transition-colors text-base font-medium">
                            minnipahadganjrestaurant@gmail.com
                        </a>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 space-y-6">
                    {/* Address and Phone - First Row */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm pb-6 border-b border-gray-300">
                        <div className="flex-1">
                            <p className="text-gray-500 uppercase text-xs mb-1">LOCATION</p>
                            <p className="text-gray-900 font-medium text-sm leading-relaxed">
                                NEAR PAKWAAN RESTAURANT<br />
                                MURADNAGAR GHAZIABAD, UP
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500 uppercase text-xs mb-1">PHONE</p>
                            <p className="text-gray-900 font-medium">+91 9990651919</p>
                        </div>
                    </div>
                    
                    {/* Copyright - Second Row */}
                    <div>
                        <p className="text-sm text-gray-600">
                            &copy; COPYRIGHT 2025 MINIPAHADGANJ ALL RIGHT RESERVED
                        </p>
                    </div>
                </div>
            </div>

            {/* Large Brand Text at Bottom - Made Responsive */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 left-auto bottom-auto -rotate-90 origin-right pointer-events-none opacity-10 sm:rotate-0 sm:origin-bottom-right sm:bottom-0 sm:right-0 sm:top-auto sm:left-auto sm:translate-y-0">
                <h1 className="text-[6rem] xs:text-[7rem] sm:text-[7rem] md:text-[8rem] lg:text-[11rem] xl:text-[14.5rem] font-black text-gray-900 leading-none whitespace-nowrap -mr-4 sm:-mr-8">
                    Minipahadganj
                </h1>
            </div>
        </footer>
    );
};

export default Footer