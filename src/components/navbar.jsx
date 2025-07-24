import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg'; // place your logo in src/assets/

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      
      if (scrollTop > 50) {
        setIsScrolled(true);
        if (!isHovering) {
          setShowTopBar(false);
        }
      } else {
        setIsScrolled(false);
        setShowTopBar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setShowTopBar(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (isScrolled) {
      setShowTopBar(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Contact Bar - Slides up/down */}
      <div 
        className={`bg-gray-50 border-b border-gray-200 transition-all duration-300 ease-in-out transform ${
          showTopBar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-xs text-gray-600">
            <div className="flex items-center space-x-4">
              <p>
                <span className="font-semibold">24/7 Emergency Care:</span>
                <a href="tel:+919455234541" className="ml-1 text-green-700 hover:text-green-800 transition-colors">
                  +91-9455234541
                </a>
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="/find-doctor" className="hover:text-green-700 transition-colors">Find a Doctor</a>
              <a href="/locations" className="hover:text-green-700 transition-colors">Locations</a>
              <a href="/patients" className="hover:text-green-700 transition-colors">For Patients</a>
              <a href="/careers" className="hover:text-green-700 transition-colors">Careers</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div 
        className={`bg-white transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50' 
            : 'bg-white border-b border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img 
                  src={logo} 
                  alt="Sahib Logo" 
                  className={`transition-all duration-300 ${
                    isScrolled ? 'h-10' : 'h-12'
                  }`} 
                />
              </a>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="/" 
                className="text-yellow-600 font-semibold border-b-2 border-yellow-600 pb-1 transition-colors"
              >
                HOME
              </a>
              <a 
                href="/services" 
                className="text-white bg-green-700 px-4 py-2 rounded-md font-medium hover:bg-green-800 transition-colors"
              >
                SERVICES
              </a>
              <a 
                href="/prana-ai" 
                className="text-white bg-green-700 px-4 py-2 rounded-md font-medium hover:bg-green-800 transition-colors"
              >
                PRANA AI
              </a>
              <a 
                href="/about" 
                className="text-white bg-green-700 px-4 py-2 rounded-md font-medium hover:bg-green-800 transition-colors"
              >
                ABOUT
              </a>
              <a 
                href="/contact" 
                className="text-white bg-green-700 px-4 py-2 rounded-md font-medium hover:bg-green-800 transition-colors"
              >
                CONTACT
              </a>
            </nav>

            {/* Appointment Button */}
            <div className="flex items-center space-x-4">
              <div className="text-right text-sm text-gray-700 hidden lg:block">
                <p className="italic text-xs">Request an</p>
                <p className="text-green-800 font-bold text-sm">GET APPOINTMENT</p>
              </div>
              <button className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
                BOOK NOW
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none p-2">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

