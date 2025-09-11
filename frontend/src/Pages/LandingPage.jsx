import React from 'react';
import Header from '../Components/Header';
import Hero from '../Components/Hero';
import Menu from '../Components/Menu';
import Plans from '../Components/Plans';
import Contact from '../Components/Contact';
import Footer from '../Components/Footer';

function LandingPage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: '"Work Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="flex flex-1 justify-center py-8 xs:py-12 sm:py-16 px-2 xs:px-4 sm:px-6 lg:px-8">
          <div className="layout-content-container flex flex-col max-w-7xl w-full flex-1 gap-8 xs:gap-12 sm:gap-16">
            <Hero />
            <Menu />
            <Plans />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
