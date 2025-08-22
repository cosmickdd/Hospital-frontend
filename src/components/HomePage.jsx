import React, { useState, useEffect, useRef } from 'react';
import CompactMeditationFigure from './CompactMeditationFigure';
import { useDarkMode } from '../contexts/DarkModeContext';
import PranaAICharacter from './PranaAICharacter';
import hospitalVideo from '../assets/videos/hospitalvideo.mp4';
import { motion } from 'framer-motion';

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
    if (progressRef.current) {
        cancelAnimationFrame(progressRef.current);
    }
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
      const cardWidth = 320; // w-80 is 20rem = 320px
      const gap = 24; // gap-6 is 1.5rem = 24px
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
            <div className="flex justify-center lg:justify-end order-1 lg:order-2 h-full">
              <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
                <div className="w-full" style={{ aspectRatio: '4/5', minHeight: '500px', maxHeight: '650px' }}>
                  <CompactMeditationFigure />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-20 left-10 w-12 h-12 bg-teal-200 dark:bg-teal-700 rounded-full opacity-30 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-20 right-20 w-8 h-8 bg-emerald-200 dark:bg-emerald-700 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1.5s'}}></div>
      </section>

      {/* Prana AI Section - Redesigned */}
      <section id="prana-ai" className="py-20 lg:py-28 bg-gradient-to-br from-cyan-50 via-sky-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800/50 dark:to-indigo-900/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 dark:opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-300 dark:bg-cyan-700 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-700 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-300 dark:bg-indigo-700 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-md">
                <PranaAICharacter />
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col space-y-8 text-center lg:text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-800 dark:text-gray-100">
                  Meet Prana, Your Ayurvedic
                  <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-indigo-600 dark:from-cyan-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent block">
                    Health Companion
                  </span>
                </h2>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Blending ancient wisdom with modern AI for your personalized wellness journey. Prana is here to guide you, answer your questions, and help you achieve holistic well-being.
                </p>
              </div>

              <motion.div 
                className="grid sm:grid-cols-2 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ staggerChildren: 0.2, delayChildren: 0.4 }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                  }}
                  className="group relative p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-700/80 hover:shadow-xl hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50 cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Instant Dosha Analysis</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Discover your unique mind-body type instantly.</p>
                    </div>
                  </div>
                </motion.div>
                                
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                  }}
                  className="group relative p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-700/80 hover:shadow-xl hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50 cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Personalized Remedies</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Get custom-tailored diet and lifestyle advice.</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              >
                <button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                  Try Prana AI Now
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
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
          <div className="relative">
            <div 
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                            
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
            <div className="flex justify-center mt-4">
              <div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-400 dark:to-emerald-400 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse"></div>
                <span>Auto-scrolling</span>
              </div>
            </div>
          </div>
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

      {/* About Us Section */}
      <section id="about" className="py-20 lg:py-28 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
              <video
                src={hospitalVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100">
                A Sanctuary for <span className="text-teal-600 dark:text-teal-400">Holistic Healing</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Sahib Hospital integrates the ancient science of Ayurveda with modern medical practices. Our state-of-the-art facility is a sanctuary for healing, offering comprehensive and personalized care.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Our collaborative team of Ayurvedic and modern medical specialists focuses on root-cause treatment, providing compassionate care tailored to each patient's needs.
              </p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100">Our Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
              We offer a wide range of services to meet your health needs, combining the best of Ayurvedic and modern medicine.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-2">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 dark:bg-teal-900/50 mb-6 mx-auto transition-all duration-300 group-hover:scale-110">
                <svg className="h-10 w-10 text-teal-600 dark:text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.121-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.121-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-4">Ayurvedic Consultations</h3>
              <p className="text-gray-600 dark:text-gray-300">Expert Ayurvedic doctors create tailored wellness plans based on your unique constitution.</p>
            </div>
            <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-2">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-6 mx-auto transition-all duration-300 group-hover:scale-110">
                <svg className="h-10 w-10 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">Panchakarma Therapy</h3>
              <p className="text-gray-600 dark:text-gray-300">A complete detox program to cleanse the body, eliminate toxins, and restore natural balance.</p>
            </div>
            <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-2">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/50 mb-6 mx-auto transition-all duration-300 group-hover:scale-110">
                <svg className="h-10 w-10 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">Modern Diagnostics</h3>
              <p className="text-gray-600 dark:text-gray-300">Advanced diagnostic tools, including AI-powered analysis, for precise and timely health assessments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-20 lg:py-28 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100">Meet Our Experts</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
              Our team of dedicated and experienced doctors is committed to your well-being.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Doctor Card 1 */}
            <div className="group text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-full transition-transform duration-300 group-hover:scale-105"></div>
                <img className="relative w-full h-full object-cover rounded-full p-2 bg-white dark:bg-gray-900" src="https://i.pravatar.cc/150?img=68" alt="Dr. Anjali Sharma" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Dr. Anjali Sharma</h3>
              <p className="text-teal-600 dark:text-teal-400 font-medium mb-2">Ayurveda Specialist (Vaidya)</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                15+ years in Ayurveda, specializing in Panchakarma and chronic disease management.
              </p>
            </div>
            {/* Doctor Card 2 */}
            <div className="group text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full transition-transform duration-300 group-hover:scale-105"></div>
                <img className="relative w-full h-full object-cover rounded-full p-2 bg-white dark:bg-gray-900" src="https://i.pravatar.cc/150?img=60" alt="Dr. Rajan Verma" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Dr. Rajan Verma</h3>
              <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-2">Cardiologist (MBBS, MD)</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                A cardiologist focused on preventive care and holistic heart wellness.
              </p>
            </div>
            {/* Doctor Card 3 */}
            <div className="group text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full transition-transform duration-300 group-hover:scale-105"></div>
                <img className="relative w-full h-full object-cover rounded-full p-2 bg-white dark:bg-gray-900" src="https://i.pravatar.cc/150?img=32" alt="Dr. Priya Desai" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Dr. Priya Desai</h3>
              <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">Wellness & Yoga Therapist</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Certified therapist specializing in yoga and meditation for mind-body harmony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 lg:py-28 bg-teal-50 dark:bg-gray-800/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full text-teal-200 dark:text-teal-800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <circle cx="400" cy="400" r="400" fill="currentColor" opacity="0.1"/>
            <circle cx="200" cy="200" r="200" fill="currentColor" opacity="0.1"/>
            <circle cx="600" cy="600" r="300" fill="currentColor" opacity="0.1"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100">
              What Our <span className="text-teal-600 dark:text-teal-400">Patients Say</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
              Real stories from people who have experienced our transformative care.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Main Testimonial */}
            <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl transform lg:-rotate-2 transition-transform duration-300 hover:rotate-0 hover:scale-105">
              <div className="flex items-center mb-4">
                <img className="w-16 h-16 rounded-full mr-4 border-4 border-teal-200 dark:border-teal-500" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Priya Sharma" />
                <div>
                  <p className="font-bold text-xl text-gray-800 dark:text-gray-100">Priya Sharma</p>
                  <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">Chronic Fatigue Recovery</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                "The personalized care I received was exceptional. The doctors took the time to understand my health concerns and created a treatment plan that worked wonders for me. I have my energy back, and I feel like a new person."
              </p>
            </div>

            {/* Other Testimonials */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <img className="w-12 h-12 rounded-full mr-4" src="https://i.pravatar.cc/150?u=a042581f4e29026704e" alt="Rajesh Kumar" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Rajesh Kumar</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Wellness Program</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">"A perfect blend of modern medicine and ancient Ayurvedic traditions. I felt rejuvenated and balanced."</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <img className="w-12 h-12 rounded-full mr-4" src="https://i.pravatar.cc/150?u=a042581f4e29026704f" alt="Anjali Mehta" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Anjali Mehta</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Prana AI User</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">"The Prana AI tool was surprisingly accurate. It gave me insights into my health I'd never considered."</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <img className="w-12 h-12 rounded-full mr-4" src="https://i.pravatar.cc/150?u=a042581f4e29026704a" alt="Vikram Singh" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Vikram Singh</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Panchakarma Patient</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">"The Panchakarma therapy was a life-changing experience. The staff was incredibly supportive."</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <img className="w-12 h-12 rounded-full mr-4" src="https://i.pravatar.cc/150?u=a042581f4e29026704b" alt="Sunita Desai" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Sunita Desai</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Yoga & Meditation</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">"The serene environment and expert guidance in the yoga sessions have greatly improved my mental peace."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tour Section - REMOVED */}

      {/* Contact & Location Section */}
      <section id="contact" className="py-20 lg:py-28 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white">
              Contact Us
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column: Map and Info */}
            <div className="flex flex-col space-y-8">
              <div className="aspect-w-16 aspect-h-10 rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.969511961195!2d77.1983536753846!3d28.48021897575109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1e396e77a56f%3A0x134733338f4046a!2sVarun%20Farm%20Gate%2C%202%2C%20Gaushala%20Rd%2C%20Rajpur%2C%20Satbari%2C%20Delhi%2C%20New%20Delhi%2C%20Delhi%20110068!5e0!3m2!1sen!2sin!4v1678888"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sahib Hospital Location"
                ></iframe>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Address</h4>
                    <p className="text-gray-600 dark:text-gray-400">Varun Farm Gate, 2, Gaushala Rd, Rajpur, Satbari, Delhi, New Delhi, Delhi 110068, India</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-400">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400">contact@sahibhospital.com</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column: Contact Form */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-8 lg:p-12 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input type="text" id="name" className="w-full px-5 py-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input type="email" id="email" className="w-full px-5 py-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea id="message" rows="5" className="w-full px-5 py-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition" placeholder="Your message..."></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-teal-400">Sahib Hospital</h4>
              <p className="text-sm text-gray-300">Your sanctuary for holistic healing.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-200">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-teal-400 transition-colors duration-300">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-teal-400 transition-colors duration-300">About Us</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-teal-400 transition-colors duration-300">Services</button></li>
                <li><button onClick={() => scrollToSection('doctors')} className="hover:text-teal-400 transition-colors duration-300">Doctors</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-teal-400 transition-colors duration-300">Contact</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-200">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-teal-400 transition-colors duration-300">Privacy Policy</button></li>
                <li><button className="hover:text-teal-400 transition-colors duration-300">Terms of Service</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-200">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Facebook</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
                <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Instagram</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.316 1.363.364 2.427.048 1.067.06 1.407.06 3.808s-.012 2.741-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.316-2.427.364-1.067.048-1.407.06-3.808.06s-2.741-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.316-1.363-.364-2.427C2.013 14.741 2 14.4 2 12s.012-2.741.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.485 2.525c.636-.247 1.363-.316 2.427-.364C8.95 2.013 9.284 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" /></svg></a>
                <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Twitter</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Sahib Hospital. All rights reserved. Designed with care.</p>
          </div>
        </div>
      </footer>
    </div>
  );    
};

export default HomePage;
