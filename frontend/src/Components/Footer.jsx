import React from 'react'
import { FacebookIcon, InstagramIcon, LogoIcon, TwitterIcon } from './SvgIcons';

const Footer = () => {
    return (
        <footer className="bg-stone-100 px-5 py-16 text-center">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex items-center gap-4 text-[#181411]">
                        <div className="size-6 text-[#ec6d13]">
                           <LogoIcon />
                        </div>
                        <h2 className="text-[#181411] text-xl font-bold leading-tight">Minipahadganj</h2>
                    </div>
                    <p className="text-stone-600 text-base leading-relaxed mt-4 max-w-xs">Home-style meals, delivered with love. Fresh ingredients, healthy recipes, and the taste of home.</p>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-stone-900 text-lg font-semibold mb-4">Quick Links</h3>
                    <div className="flex flex-col gap-3">
                        <a className="text-stone-600 hover:text-[#ec6d13] text-base font-normal leading-normal transition-colors" href="/">Home</a>
                        <a className="text-stone-600 hover:text-[#ec6d13] text-base font-normal leading-normal transition-colors" href="#menu">Menu</a>
                        <a className="text-stone-600 hover:text-[#ec6d13] text-base font-normal leading-normal transition-colors" href="#plans">Plans</a>
                        <a className="text-stone-600 hover:text-[#ec6d13] text-base font-normal leading-normal transition-colors" href="#contact">Contact</a>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-stone-900 text-lg font-semibold mb-4">Contact Info</h3>
                    <div className="flex flex-col gap-3 text-center md:text-left">
                        <p className="text-stone-600 text-base leading-normal">Near Pakwaan Restaurant , Muradnagar Ghaziabad Uttar Pradesh</p>
                        <p className="text-stone-600 text-base leading-normal">Email: minnipahadganjrestaurant@gmail.com</p>
                        <p className="text-stone-600 text-base leading-normal">Phone: +91 9990651919</p>
                    </div>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-6">
                <p className="text-stone-500 text-base font-normal leading-normal">© 2025 Minipahadganj. All rights reserved.</p>
                <div className="flex justify-center gap-6">
                    <a className="text-stone-500 hover:text-[#ec6d13] transition-colors" href="#"><InstagramIcon /></a>
                    <a className="text-stone-500 hover:text-[#ec6d13] transition-colors" href="#"><FacebookIcon /></a>
                    <a className="text-stone-500 hover:text-[#ec6d13] transition-colors" href="#"><TwitterIcon /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer