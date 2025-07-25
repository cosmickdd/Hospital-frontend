import React, { useState, useEffect, useRef } from 'react';
import CompactMeditationFigure from './CompactMeditationFigure';
import { useDarkMode } from '../contexts/DarkModeContext';

const HomePage = () => {
  // Therapy slider state and auto-scroll functionality
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef(null);
  const progressRef = useRef(null);
  const therapyCards = 5; // Total number of therapy cards
  const autoScrollInterval = 4000; // 4 seconds
  const { isDarkMode } = useDarkMode();

  // Smooth scrolling function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Progress bar animation
  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / autoScrollInterval) * 100;
      
      if (newProgress >= 100) {
        setProgress(100);
      } else {
        setProgress(newProgress);
        progressRef.current = requestAnimationFrame(animate);
      }
    };

    progressRef.current = requestAnimationFrame(animate);

    return () => {
      if (progressRef.current) {
        cancelAnimationFrame(progressRef.current);
      }
    };
  }, [currentSlide]);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % therapyCards);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [therapyCards]);

  // Scroll to specific slide
  useEffect(() => {
    if (sliderRef.current) {
      const cardWidth = 320; // 80 (w-80) * 4 (1rem = 4px in Tailwind)
      const gap = 24; // gap-6 = 1.5rem = 24px
      const scrollPosition = currentSlide * (cardWidth + gap);
      
      sliderRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 min-h-screen flex items-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <svg className="w-full h-full text-teal-600 dark:text-teal-400" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[85vh] py-8 lg:py-12">
            {/* Left Content */}
            <div className="space-y-8 lg:space-y-10 order-2 lg:order-1">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                  <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 dark:from-teal-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent block">
                    Transforming Healthcare
                  </span>
                  <span className="text-gray-700 dark:text-gray-200 block mt-2">
                    Through Ayurvedic
                  </span>
                  <span className="text-teal-700 dark:text-teal-300 block mt-2">
                    Intelligence
                  </span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                  From personalized therapies to AI-assisted diagnostics, Sahib Hospital provides a complete ecosystem for healing rooted in Ayurvedic tradition.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => scrollToSection('prana-ai')}
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                  Meet Prana AI
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="border-2 border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 hover:bg-teal-600 dark:hover:bg-teal-400 hover:text-white dark:hover:text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Explore Services
                </button>
              </div>

              {/* Hospital Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Advanced Medicine</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Evidence-Based Care</p>
                </div>
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Ayurvedic Integration</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Holistic Healing</p>
                </div>
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">AI Diagnostics</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Precision Medicine</p>
                </div>
              </div>
            </div>

            {/* Right Content - Meditation Figure with Interactive Chakras */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2 h-full">
              <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
                <div className="w-full" style={{ aspectRatio: '4/5', minHeight: '500px', maxHeight: '650px' }}>
                  <CompactMeditationFigure />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-12 h-12 bg-teal-200 dark:bg-teal-700 rounded-full opacity-30 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-20 right-20 w-8 h-8 bg-emerald-200 dark:bg-emerald-700 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1.5s'}}></div>
      </section>

      {/* Therapy Slider Section */}
      <section id="therapies" className="py-16 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Therapeutic <span className="bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">Solutions</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover our comprehensive range of traditional and modern therapeutic approaches
            </p>
          </div>

          {/* Therapy Cards Slider */}
          <div className="relative overflow-hidden">
            <div 
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              
              {/* Therapy Card 1 - Panchakarma */}
              <div className="flex-shrink-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 group snap-start">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <div className="h-48 bg-gradient-to-br from-saffron-100 via-orange-50 to-amber-100 dark:from-orange-900/30 dark:via-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center" style={{background: isDarkMode ? 'linear-gradient(135deg, #451a03 0%, #7c2d12 50%, #a16207 100%)' : 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fbbf24 100%)'}}>
                    <div className="w-20 h-20 bg-orange-600 dark:bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9H21ZM12 19C10.34 19 9 17.66 9 16S10.34 13 12 13 15 14.34 15 16 13.66 19 12 19Z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 px-3 py-1 rounded-full text-sm font-medium text-orange-700 dark:text-orange-300 shadow-sm">
                    पंचकर्म
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Panchakarma Detoxification</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    Traditional five-fold purification therapy including Vamana (therapeutic vomiting), Virechana (purgation), Basti (enema), and specialized treatments to eliminate toxins and restore dosha balance.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 dark:text-orange-400 font-semibold text-sm">21-28 day program</span>
                    <button className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium text-sm flex items-center gap-1">
                      Learn More <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Therapy Card 2 - Abhyanga */}
              <div className="flex-shrink-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 group snap-start">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <div className="h-48 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
                    <div className="w-20 h-20 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 7C13.66 7 15 8.34 15 10S13.66 13 12 13 9 11.66 9 10 10.34 7 12 7M12 15C14.76 15 17 16.79 17 19H7C7 16.79 9.24 15 12 15Z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 px-3 py-1 rounded-full text-sm font-medium text-emerald-700 dark:text-emerald-300 shadow-sm">
                    अभ्यंग
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Abhyanga Oil Massage</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    Full-body synchronized massage with warm herbal oils by trained therapists. Improves circulation, nourishes skin, calms Vata dosha, and promotes deep relaxation and rejuvenation.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">60-90 minutes</span>
                    <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm flex items-center gap-1">
                      Learn More <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Therapy Card 3 - Shirodhara */}
              <div className="flex-shrink-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 group snap-start">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
                    <div className="w-20 h-20 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8ZM12 18C15.31 18 18 20.69 18 24H6C6 20.69 8.69 18 12 18Z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 px-3 py-1 rounded-full text-sm font-medium text-indigo-700 dark:text-indigo-300 shadow-sm">
                    शिरोधारा
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Shirodhara Therapy</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    Continuous stream of warm medicated oil poured on the forehead (third eye). Deeply calms the nervous system, reduces stress, anxiety, and promotes mental clarity and spiritual awakening.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">45-60 minutes</span>
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm flex items-center gap-1">
                      Learn More <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Therapy Card 4 - Nasya */}
              <div className="flex-shrink-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 group snap-start">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <div className="h-48 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 flex items-center justify-center">
                    <div className="w-20 h-20 bg-rose-600 dark:bg-rose-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 11H7V9H9V11ZM13 11H11V9H13V11ZM17 11H15V9H17V11ZM19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM12 6C13.66 6 15 7.34 15 9S13.66 12 12 12 9 10.66 9 9 10.34 6 12 6ZM18 18H6V17C6 15 10 13.9 12 13.9S18 15 18 17V18Z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 px-3 py-1 rounded-full text-sm font-medium text-rose-700 dark:text-rose-300 shadow-sm">
                    नस्य
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Nasya Nasal Therapy</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    Medicated oil or herbal preparations administered through nostrils. Clears sinuses, improves breathing, treats headaches, and purifies head and neck region according to Ayurvedic principles.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-rose-600 dark:text-rose-400 font-semibold text-sm">30-45 minutes</span>
                    <button className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium text-sm flex items-center gap-1">
                      Learn More <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Therapy Card 5 - Swedana */}
              <div className="flex-shrink-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 group snap-start">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <div className="h-48 bg-gradient-to-br from-green-100 to-lime-100 dark:from-green-900/30 dark:to-lime-900/30 flex items-center justify-center">
                    <div className="w-20 h-20 bg-green-600 dark:bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.5 12C5.67 12 5 11.33 5 10.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12ZM9.5 8C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5 11 5.67 11 6.5 10.33 8 9.5 8ZM14.5 8C13.67 8 13 7.33 13 6.5S13.67 5 14.5 5 16 5.67 16 6.5 15.33 8 14.5 8ZM17.5 12C16.67 12 16 11.33 16 10.5S16.67 9 17.5 9 19 9.67 19 10.5 18.33 12 17.5 12ZM12 13C10.34 13 9 14.34 9 16S10.34 19 12 19 15 17.66 15 16 13.66 13 12 13Z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 px-3 py-1 rounded-full text-sm font-medium text-green-700 dark:text-green-300 shadow-sm">
                    स्वेदन
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Swedana Steam Therapy</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    Herbal steam therapy using medicinal plants and essential oils. Opens channels, eliminates toxins through sweat, improves circulation, and prepares body for other Panchakarma treatments.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 dark:text-green-400 font-semibold text-sm">20-30 minutes</span>
                    <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-sm flex items-center gap-1">
                      Learn More <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Scroll Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {[...Array(therapyCards)].map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-teal-600 dark:bg-teal-400 scale-125' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="flex justify-center mt-4">
              <div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-400 dark:to-emerald-400 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Auto-scroll Status */}
            <div className="flex justify-center mt-3">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse"></div>
                <span>Auto-scrolling</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <button 
              onClick={() => scrollToSection('services')}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl touch-manipulation"
            >
              Explore All Therapies
            </button>
          </div>
        </div>
      </section>

      {/* Prana AI Section */}
      <section id="prana-ai" className="py-20 lg:py-28 bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 backdrop-blur-sm">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-cyan-700 dark:text-cyan-300 text-sm font-medium">AI-Powered Healthcare Assistant</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-indigo-600 dark:from-cyan-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent block">
                    Meet Prana AI
                  </span>
                  <span className="text-gray-800 dark:text-gray-100 block mt-2">
                    Your Ayurvedic Health Companion
                  </span>
                </h2>
                
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Experience personalized healthcare with our AI assistant that seamlessly blends 5,000 years of Ayurvedic wisdom with cutting-edge technology for comprehensive health guidance and wellness optimization.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Instant Dosha Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered constitutional assessment based on Ayurvedic principles</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Personalized Remedies</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Custom herbal prescriptions and lifestyle recommendations</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">24/7 Health Monitoring</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Continuous wellness tracking and proactive care alerts</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Ancient Wisdom Integration</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Modern AI backed by traditional Ayurvedic knowledge</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="group relative bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    🧘‍♀️ Start Your AI Health Journey
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
                
                <button 
                  onClick={() => scrollToSection('about')}
                  className="group border-2 border-cyan-600 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-600 dark:hover:bg-cyan-400 hover:text-white dark:hover:text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center">
                    Learn How It Works
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Right Content - AI Character Space */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Main AI Character Container */}
              <div className="relative w-96 h-96 mx-auto">
                
                {/* Energy Aura Layers */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-indigo-500/20 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-500/10 via-purple-600/10 to-indigo-600/10 animate-spin-slow"></div>
                <div className="absolute inset-8 rounded-full border-2 border-dashed border-cyan-400/30 animate-pulse"></div>
                
                {/* Central AI Representation */}
                <div className="absolute inset-16 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600 flex items-center justify-center shadow-2xl">
                  
                  {/* AI Character Placeholder */}
                  <div className="relative w-32 h-32">
                    {/* Main Face/Head */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-200 via-purple-200 to-indigo-200 shadow-inner">
                      
                      {/* AI Pattern Overlay */}
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-300/50 to-purple-300/50 flex items-center justify-center">
                        <svg className="w-16 h-16 text-indigo-600 animate-pulse" viewBox="0 0 100 100">
                          <circle cx="30" cy="35" r="3" fill="currentColor">
                            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
                          </circle>
                          <circle cx="70" cy="35" r="3" fill="currentColor">
                            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
                          </circle>
                          <circle cx="50" cy="20" r="2" fill="currentColor">
                            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
                          </circle>
                          <circle cx="50" cy="65" r="2" fill="currentColor">
                            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
                          </circle>
                          
                          {/* Neural Network Lines */}
                          <line x1="30" y1="35" x2="50" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                          <line x1="70" y1="35" x2="50" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                          <line x1="30" y1="35" x2="50" y2="65" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                          <line x1="70" y1="35" x2="50" y2="65" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                          
                          {/* Om Symbol */}
                          <text x="50" y="50" textAnchor="middle" className="text-xs fill-current">🕉️</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold animate-bounce shadow-lg">
                  AI
                </div>
                <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg animate-bounce shadow-lg" style={{animationDelay: '0.5s'}}>
                  🧠
                </div>
                <div className="absolute top-1/4 -right-6 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm animate-pulse shadow-lg">
                  ✨
                </div>
                <div className="absolute bottom-1/4 -left-6 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm animate-pulse shadow-lg" style={{animationDelay: '1s'}}>
                  🌿
                </div>
                
                {/* Character Placeholder Text */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                    3D Character Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">5000+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Years of Wisdom</div>
            </div>
            <div className="space-y-2 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">3</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Doshas Balanced</div>
            </div>
            <div className="space-y-2 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">100+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Herbal Remedies</div>
            </div>
            <div className="space-y-2 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">24/7</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">AI Assistance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Medical Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive healthcare solutions integrating modern medicine with traditional healing practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-8 rounded-xl shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-teal-600 dark:bg-teal-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Preventive Medicine</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive health screenings, early detection protocols, and preventive care strategies to maintain optimal wellness and reduce disease risk.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-8 rounded-xl shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Behavioral Health</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Integrated mental health services including psychiatric evaluation, therapy, stress management, and mindfulness-based interventions.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-gradient-to-br from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/20 p-8 rounded-xl shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-600 dark:bg-green-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">AI-Enhanced Diagnostics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced artificial intelligence systems for precise medical diagnosis, treatment planning, and personalized healthcare recommendations.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 p-8 rounded-xl shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-slate-600 dark:bg-slate-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Clinical Nutrition</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Evidence-based nutritional counseling, therapeutic diet planning, and dietary interventions for disease management and optimal health.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 p-8 rounded-xl shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-cyan-600 dark:bg-cyan-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Integrative Medicine</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive wellness programs combining traditional Ayurvedic practices with modern therapeutic approaches for holistic patient care.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-8 rounded-xl shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
              <div className="w-16 h-16 bg-emerald-700 dark:bg-emerald-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Emergency & Critical Care</h3>
              <p className="text-gray-600 dark:text-gray-300">
                24/7 emergency medical services, critical care units, and telemedicine consultations for immediate healthcare needs and ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Doctors Section */}
      <section id="doctors" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.5) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30 rounded-full mb-6">
              <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-teal-700 to-blue-700 dark:from-white dark:via-teal-300 dark:to-blue-300 bg-clip-text text-transparent mb-6">
              Meet Our Expert Doctors
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our team of experienced medical professionals combines traditional healing wisdom with modern medical expertise 
              to provide you with the highest quality healthcare.
            </p>
          </div>

          {/* Doctors Carousel */}
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div className="doctors-carousel flex gap-6 pb-6" style={{ 
                overflowX: 'auto',
                scrollBehavior: 'smooth'
              }}>
                {/* Doctor Card 1 */}
                <div className="min-w-[320px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex flex-col items-center text-center">
                    {/* Doctor Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Dr. Raj Patel</h3>
                    <p className="text-teal-600 dark:text-teal-400 font-semibold mb-2">Chief Ayurveda Specialist</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">25+ years experience in traditional Ayurvedic medicine and holistic healing practices.</p>
                    
                    {/* Specializations */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs rounded-full">Panchakarma</span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">Herbal Medicine</span>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">(4.9/5)</span>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Book Consultation
                    </button>
                  </div>
                </div>

                {/* Doctor Card 2 */}
                <div className="min-w-[320px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Dr. Priya Sharma</h3>
                    <p className="text-purple-600 dark:text-purple-400 font-semibold mb-2">General Medicine & Wellness</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Expert in integrative medicine combining modern diagnostics with holistic treatments.</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">Integrative Medicine</span>
                      <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs rounded-full">Preventive Care</span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">(4.8/5)</span>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Book Consultation
                    </button>
                  </div>
                </div>

                {/* Doctor Card 3 */}
                <div className="min-w-[320px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Dr. Arun Kumar</h3>
                    <p className="text-green-600 dark:text-green-400 font-semibold mb-2">Orthopedic & Sports Medicine</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Specialized in joint health, sports injuries, and rehabilitation using natural healing methods.</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">Sports Medicine</span>
                      <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-full">Rehabilitation</span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">(4.9/5)</span>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Book Consultation
                    </button>
                  </div>
                </div>

                {/* Doctor Card 4 */}
                <div className="min-w-[320px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Dr. Meera Joshi</h3>
                    <p className="text-orange-600 dark:text-orange-400 font-semibold mb-2">Mental Health & Yoga Therapy</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Combines psychological counseling with ancient meditation and yoga practices for holistic mental wellness.</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full">Yoga Therapy</span>
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full">Mental Health</span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">(4.8/5)</span>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Book Consultation
                    </button>
                  </div>
                </div>

                {/* Doctor Card 5 */}
                <div className="min-w-[320px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Dr. Vikram Singh</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-2">Cardiology & Lifestyle Medicine</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Heart health specialist focusing on preventive cardiology and lifestyle modifications through natural approaches.</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded-full">Cardiology</span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">Lifestyle Medicine</span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">(4.9/5)</span>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Book Consultation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Department Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Expert Doctors</div>
            </div>
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">15+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Specializations</div>
            </div>
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Emergency Care</div>
            </div>
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">10k+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Happy Patients</div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-500 hover:via-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Book Appointment with Our Doctors
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* About Hospital Section */}
      <section id="about" className="py-20 lg:py-28 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 mb-6">
              <span className="text-teal-700 dark:text-teal-300 text-sm font-medium">About Sahib Hospital</span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Excellence in <span className="bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">Healthcare</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A state-of-the-art medical facility where traditional healing wisdom meets modern healthcare technology, 
              providing comprehensive and compassionate care to our community for over three decades.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center mb-20">
            
            {/* Left Content - Hospital Video/Interior */}
            <div className="space-y-8">
              {/* Video Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30">
                <div className="aspect-video bg-gradient-to-br from-teal-200 to-emerald-200 dark:from-teal-800 dark:to-emerald-800 flex items-center justify-center relative">
                  {/* Video Placeholder */}
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-10 h-10 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Hospital Tour Video</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Explore our modern facilities and amenities</p>
                    </div>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <button className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-all duration-300 group">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-teal-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </button>
                </div>
                
                {/* Video Info */}
                <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Inside Sahib Hospital</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Take a virtual tour of our comprehensive healthcare facilities, from emergency care to specialized treatment centers.</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">30+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years of Service</div>
                </div>
                <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">200+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Expert Doctors</div>
                </div>
                <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Beds Capacity</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hospital Features & Map */}
            <div className="space-y-8">
              {/* Features List */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Advanced Medical Technology</h4>
                    <p className="text-gray-600 dark:text-gray-300">State-of-the-art diagnostic equipment including MRI, CT scan, digital X-ray, and AI-powered analysis systems.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Integrated Ayurvedic Care</h4>
                    <p className="text-gray-600 dark:text-gray-300">Specialized Panchakarma center, herbal medicine preparation lab, and traditional therapy rooms alongside modern treatment facilities.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">24/7 Emergency Services</h4>
                    <p className="text-gray-600 dark:text-gray-300">Round-the-clock emergency care with trauma center, ICU, NICU, and rapid response teams for critical care.</p>
                  </div>
                </div>
              </div>

              {/* Hospital Structure/Map Placeholder */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Hospital Layout & Location
                </h4>
                
                {/* Interactive Map Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full" style={{
                      backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                       linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>
                  
                  {/* Map Content */}
                  <div className="text-center space-y-3 z-10">
                    <div className="w-16 h-16 bg-teal-600 dark:bg-teal-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200">Interactive Hospital Map</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Department locations and navigation guide</p>
                    </div>
                  </div>
                  
                  {/* Department Markers */}
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                    Emergency
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                    Ayurveda Wing
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    General Medicine
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Visit Our Hospital
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section id="contact" className="py-20 bg-teal-700 dark:bg-gray-900 relative overflow-hidden">
        {/* Background gradient overlay for dark mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-emerald-700 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 opacity-90"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Experience Excellence in Healthcare?
          </h2>
          <p className="text-lg text-teal-100 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Schedule your consultation with our medical experts and discover personalized healthcare solutions 
            tailored to your individual needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white dark:bg-gray-800 text-teal-700 dark:text-teal-400 font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border dark:border-gray-600 hover:border-teal-200 dark:hover:border-teal-500 touch-manipulation">
              Schedule Consultation
            </button>
            <button className="border-2 border-white dark:border-gray-400 text-white dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 hover:text-teal-700 dark:hover:text-teal-400 font-semibold py-4 px-8 rounded-lg transition-all duration-300 touch-manipulation">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-12 border-t dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Sahib Healthcare</h3>
              <p className="text-gray-300 dark:text-gray-400 text-sm">
                Integrating nature and nurturing health through comprehensive, holistic healthcare solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-teal-400 transition-colors">Home</a></li>
                <li><a href="/services" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-teal-400 transition-colors">Services</a></li>
                <li><a href="/about" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-teal-400 transition-colors">About</a></li>
                <li><a href="/contact" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-teal-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/services/preventive-care" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-teal-400 transition-colors">Preventive Care</a></li>
                <li><a href="/services/mental-wellness" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-teal-400 transition-colors">Mental Wellness</a></li>
                <li><a href="/prana-ai" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-teal-400 transition-colors">PRANA AI</a></li>
                <li><a href="/services/nutrition-therapy" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-teal-400 transition-colors">Nutrition Therapy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Contact Information</h4>
              <div className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V19a1 1 0 01-1 1h-2C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  Phone: +91-9455234541
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Email: info@sahibhealthcare.com
                </p>
                <p className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-teal-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Address: Healthcare Complex, Main Road
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 dark:border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400 dark:text-gray-500">
            <p>&copy; 2025 Sahib Healthcare. All rights reserved. | Designed with care for your wellness.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
