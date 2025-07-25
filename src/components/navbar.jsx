import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg'; // place your logo in src/assets/
import { useDarkMode } from '../contexts/DarkModeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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

  // Close mobile menu on resize to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen) {
        const mobileMenuContainer = document.querySelector('.mobile-menu-container');
        const hamburgerButton = document.querySelector('[aria-label*="mobile menu"]');
        
        if (mobileMenuContainer && hamburgerButton &&
            !mobileMenuContainer.contains(event.target) && 
            !hamburgerButton.contains(event.target)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

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

  const toggleMobileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Hamburger menu clicked, current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Smooth scrolling function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsMobileMenuOpen(false); // Close mobile menu if open
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
      {/* Top Contact Bar - Slides up/down */}
      <div 
        className={`bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out transform ${
          showTopBar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-4">
              <p>
                <span className="font-semibold">24/7 Emergency Care:</span>
                <a href="tel:+919455234541" className="ml-1 text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors">
                  +91-9455234541
                </a>
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="/find-doctor" className="hover:text-green-700 dark:hover:text-green-400 transition-colors">Find a Doctor</a>
              <a href="/locations" className="hover:text-green-700 dark:hover:text-green-400 transition-colors">Locations</a>
              <a href="/patients" className="hover:text-green-700 dark:hover:text-green-400 transition-colors">For Patients</a>
              <a href="/careers" className="hover:text-green-700 dark:hover:text-green-400 transition-colors">Careers</a>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50' 
            : 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'
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
              <button 
                onClick={() => scrollToSection('home')}
                className="text-yellow-600 dark:text-yellow-400 font-semibold border-b-2 border-yellow-600 dark:border-yellow-400 pb-1 transition-colors"
              >
                HOME
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-white bg-green-700 dark:bg-green-600 px-4 py-2 rounded-md font-medium hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
              >
                SERVICES
              </button>
              <button 
                onClick={() => scrollToSection('prana-ai')}
                className="text-white bg-green-700 dark:bg-green-600 px-4 py-2 rounded-md font-medium hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
              >
                PRANA AI
              </button>
              <button 
                onClick={() => scrollToSection('doctors')}
                className="text-white bg-green-700 dark:bg-green-600 px-4 py-2 rounded-md font-medium hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
              >
                DOCTORS
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-white bg-green-700 dark:bg-green-600 px-4 py-2 rounded-md font-medium hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
              >
                ABOUT
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white bg-green-700 dark:bg-green-600 px-4 py-2 rounded-md font-medium hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
              >
                CONTACT
              </button>
            </nav>

            {/* Appointment Button - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right text-sm text-gray-700 dark:text-gray-300 hidden lg:block">
                <p className="italic text-xs">Request an</p>
                <p className="text-green-800 dark:text-green-400 font-bold text-sm">GET APPOINTMENT</p>
              </div>
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
                BOOK NOW
              </button>
            </div>

            {/* Mobile Right Section */}
            <div className="flex md:hidden items-center space-x-3">
              {/* Dark Mode Toggle - Mobile */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Mobile Book Now Button */}
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-2.5 px-5 rounded-md shadow-md transition-all duration-300 text-sm touch-manipulation min-h-[44px]">
                BOOK
              </button>

              {/* Mobile menu button */}
              <button 
                type="button"
                onClick={toggleMobileMenu}
                className="relative text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 p-2 transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center bg-transparent border-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <svg 
                  className={`h-6 w-6 transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16"></path>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden mobile-menu-container relative transition-all duration-300 ease-in-out transform origin-top ${
            isMobileMenuOpen 
              ? 'max-h-[500px] opacity-100 visible scale-y-100' 
              : 'max-h-0 opacity-0 invisible overflow-hidden scale-y-0'
          }`}
        >
          <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-xl">
            <nav className="px-4 py-6 space-y-2">
              <button 
                onClick={() => scrollToSection('home')}
                className="w-full flex items-center text-yellow-600 dark:text-yellow-400 font-semibold py-3 px-4 rounded-lg border-l-4 border-yellow-600 dark:border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 transition-all duration-200 touch-manipulation min-h-[48px]"
              >
                <span className="ml-2">HOME</span>
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="w-full flex items-center text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 py-3 px-4 rounded-lg transition-all duration-200 touch-manipulation min-h-[48px]"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <span>SERVICES</span>
              </button>
              <button 
                onClick={() => scrollToSection('prana-ai')}
                className="w-full flex items-center text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 py-3 px-4 rounded-lg transition-all duration-200 touch-manipulation min-h-[48px]"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>PRANA AI</span>
              </button>
              <button 
                onClick={() => scrollToSection('doctors')}
                className="w-full flex items-center text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 py-3 px-4 rounded-lg transition-all duration-200 touch-manipulation min-h-[48px]"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
                <span>DOCTORS</span>
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="w-full flex items-center text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 py-3 px-4 rounded-lg transition-all duration-200 touch-manipulation min-h-[48px]"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>ABOUT</span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="w-full flex items-center text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 py-3 px-4 rounded-lg transition-all duration-200 touch-manipulation min-h-[48px]"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>CONTACT</span>
              </button>
              
              {/* Mobile Menu Footer */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                <button 
                  onClick={closeMobileMenu}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:shadow-xl touch-manipulation"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M8 7H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7"></path>
                    </svg>
                    BOOK APPOINTMENT
                  </span>
                </button>
                
                {/* Emergency Contact in Mobile Menu */}
                <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">24/7 Emergency Care</p>
                  <a 
                    href="tel:+919455234541" 
                    className="text-green-700 dark:text-green-400 font-bold text-lg hover:text-green-800 dark:hover:text-green-300 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    +91-9455234541
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      </header>
    </>
  );
};

export default Navbar;