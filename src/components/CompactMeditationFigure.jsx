import React, { useState } from 'react';
import meditationSvg from '../assets/Group 17.svg';

const CompactMeditationFigure = () => {
  const [hoveredChakra, setHoveredChakra] = useState(null);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [isAnimating, setIsAnimating] = useState(false);

  // Enhanced chakra data with precise positioning for SVG alignment
  const chakras = [
    {
      id: 'sahasrara',
      name: 'Sahasrara',
      english: 'Crown Chakra',
      color: '#8B5CF6',
      position: { x: 50, y: 12 }, // Adjusted for crown alignment
      description: 'Spiritual Connection',
      element: 'Thought',
      benefit: 'Enhances clarity and purpose'
    },
    {
      id: 'ajna',
      name: 'Ajna',
      english: 'Third Eye Chakra',
      color: '#6366F1',
      position: { x: 50, y: 22 }, // Adjusted for forehead alignment
      description: 'Inner Wisdom',
      element: 'Light',
      benefit: 'Improves focus and intuition'
    },
    {
      id: 'vishuddha',
      name: 'Vishuddha',
      english: 'Throat Chakra',
      color: '#3B82F6',
      position: { x: 50, y: 34 }, // Adjusted for throat alignment
      description: 'Clear Expression',
      element: 'Sound',
      benefit: 'Enhances communication skills'
    },
    {
      id: 'anahata',
      name: 'Anahata',
      english: 'Heart Chakra',
      color: '#10B981',
      position: { x: 50, y: 46 }, // Adjusted for heart center alignment
      description: 'Love & Compassion',
      element: 'Air',
      benefit: 'Reduces stress and anxiety'
    },
    {
      id: 'manipura',
      name: 'Manipura',
      english: 'Solar Plexus',
      color: '#F59E0B',
      position: { x: 50, y: 58 }, // Adjusted for solar plexus alignment
      description: 'Personal Power',
      element: 'Fire',
      benefit: 'Boosts confidence and energy'
    },
    {
      id: 'svadhisthana',
      name: 'Svadhisthana',
      english: 'Sacral Chakra',
      color: '#F97316',
      position: { x: 50, y: 70 }, // Adjusted for sacral alignment
      description: 'Creative Flow',
      element: 'Water',
      benefit: 'Enhances creativity and passion'
    },
    {
      id: 'muladhara',
      name: 'Muladhara',
      english: 'Root Chakra',
      color: '#DC2626',
      position: { x: 50, y: 82 }, // Adjusted for root alignment
      description: 'Grounding & Stability',
      element: 'Earth',
      benefit: 'Provides stability and grounding'
    }
  ];

  const startBreathingAnimation = () => {
    setIsAnimating(true);
    const breathingInterval = setInterval(() => {
      setBreathingPhase(prev => prev === 'inhale' ? 'exhale' : 'inhale');
    }, 4000); // 4 second cycles

    // Stop after 1 minute
    setTimeout(() => {
      clearInterval(breathingInterval);
      setIsAnimating(false);
    }, 60000);

    return () => clearInterval(breathingInterval);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-full h-full flex flex-col transform transition-all duration-300 hover:shadow-3xl hover:-translate-y-1"
         style={{ 
           aspectRatio: '4/5', 
           minHeight: '500px',
           maxHeight: '100%'
         }}>
      
      {/* Professional Header with Clear CTA */}
      <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 text-white p-3 lg:p-4 text-center flex-shrink-0">
        <h3 className="text-base lg:text-lg font-bold mb-1">Interactive Chakra Assessment</h3>
        <p className="text-teal-50 text-xs lg:text-sm opacity-90">Discover your energy centers and their therapeutic benefits</p>
      </div>

      {/* Figure with Enhanced Chakra Points */}
      <div className="relative flex-1 p-3 lg:p-4 flex flex-col justify-center min-h-0 bg-gradient-to-b from-gray-50 to-white">
        
        {/* Instruction Banner */}
        <div className="absolute top-2 lg:top-3 left-2 lg:left-3 right-2 lg:right-3 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 lg:px-3 py-1.5 lg:py-2 text-center shadow-lg border border-gray-200">
            <p className="text-xs lg:text-sm text-gray-700 font-medium">
              <span className="inline-flex items-center">
                <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <span className="text-blue-600 font-semibold">Click the glowing chakra points</span>
              </span>
              <span className="text-gray-600 ml-1 hidden lg:inline">to explore healing properties</span>
            </p>
          </div>
        </div>

        <div 
          className={`transition-all duration-[4000ms] ease-in-out mx-auto flex-1 flex items-center justify-center ${
            isAnimating 
              ? breathingPhase === 'inhale' 
                ? 'scale-102' 
                : 'scale-98'
              : 'scale-100'
          }`}
          style={{ 
            width: '100%', 
            maxWidth: '280px',
            height: '100%',
            maxHeight: '350px',
            marginTop: '30px'
          }}
        >
          {/* SVG Figure */}
          <img 
            src={meditationSvg} 
            alt="Meditation Figure with Chakra System" 
            className="w-full h-full object-contain drop-shadow-lg"
          />
          
          {/* Enhanced Interactive Chakra Points */}
          {chakras.map((chakra, index) => {
            // Determine tooltip position based on chakra location
            const isLeftSide = chakra.position.x <= 50;
            const tooltipLeft = isLeftSide ? '120%' : '-20px';
            const tooltipTransform = isLeftSide ? 'translateX(0%)' : 'translateX(-100%)';
            
            return (
              <div
                key={chakra.id}
                className="absolute cursor-pointer transition-all duration-300 group"
                style={{
                  left: `${chakra.position.x}%`,
                  top: `${chakra.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredChakra(chakra.id)}
                onMouseLeave={() => setHoveredChakra(null)}
              >
                {/* Pulsing Attraction Effect */}
                <div 
                  className="absolute inset-0 rounded-full animate-ping opacity-30"
                  style={{ 
                    backgroundColor: chakra.color,
                    animationDelay: `${index * 0.3}s`,
                    animationDuration: '3s'
                  }}
                />
                
                {/* Main Chakra Point */}
                <div 
                  className="w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 border-white transition-all duration-300 relative shadow-lg cursor-pointer"
                  style={{ 
                    backgroundColor: chakra.color,
                    opacity: hoveredChakra === chakra.id ? 1 : 0.9,
                    boxShadow: hoveredChakra === chakra.id 
                      ? `0 0 25px ${chakra.color}, 0 0 40px ${chakra.color}60, inset 0 0 10px rgba(255,255,255,0.9)` 
                      : `0 0 12px ${chakra.color}80, inset 0 0 6px rgba(255,255,255,0.7)`,
                    transform: hoveredChakra === chakra.id ? 'scale(1.3)' : 'scale(1)',
                  }}
                >
                  {/* Inner glow */}
                  <div 
                    className="absolute inset-1 rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      opacity: hoveredChakra === chakra.id ? 1 : 0.7
                    }}
                  />
                  
                  {/* Click indicator */}
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-white rounded-full shadow-md flex items-center justify-center">
                    <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Floating Tooltip Box on Hover */}
                {hoveredChakra === chakra.id && (
                  <div 
                    className="absolute top-1/2 z-30 pointer-events-none animate-fade-in"
                    style={{
                      left: tooltipLeft,
                      transform: `translateY(-50%) ${tooltipTransform}`,
                      width: '180px'
                    }}
                  >
                    {/* Connection Line */}
                    <div
                      className="absolute top-1/2 h-0.5 transition-all duration-300"
                      style={{
                        width: '16px',
                        left: isLeftSide ? '-16px' : '180px',
                        transform: 'translateY(-50%)',
                        background: `linear-gradient(${isLeftSide ? 'to right' : 'to left'}, ${chakra.color}, transparent)`,
                        boxShadow: `0 0 4px ${chakra.color}60`
                      }}
                    />
                    
                    {/* Elegant Tooltip Card */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-lg shadow-xl border border-gray-200/80 p-3 relative">
                      
                      {/* Arrow pointing to chakra */}
                      <div 
                        className="absolute top-1/2 transform -translate-y-1/2"
                        style={{
                          left: isLeftSide ? '-6px' : 'calc(100% - 0px)',
                          width: 0,
                          height: 0,
                          borderTop: '6px solid transparent',
                          borderBottom: '6px solid transparent',
                          borderLeft: isLeftSide ? 'none' : `10px solid rgba(255,255,255,0.95)`,
                          borderRight: isLeftSide ? `10px solid rgba(255,255,255,0.95)` : 'none',
                          filter: `drop-shadow(0 0 3px ${chakra.color}40)`
                        }}
                      />
                      
                      {/* Compact Content */}
                      <div className="text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="w-5 h-5 rounded-full ring-2 ring-white shadow-lg flex items-center justify-center"
                            style={{ backgroundColor: chakra.color }}
                          >
                            <div className="w-2.5 h-2.5 bg-white rounded-full opacity-90"></div>
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-gray-800 leading-tight">
                              {chakra.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {chakra.english}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <p className="text-xs font-medium text-gray-700">
                            {chakra.description}
                          </p>
                          
                          <div className="bg-blue-50 rounded-md p-1.5">
                            <p className="text-xs text-blue-700 font-medium">
                              ✨ {chakra.benefit}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between pt-1 text-xs">
                            <span className="text-gray-500">
                              Element: <span className="font-medium text-gray-700">{chakra.element}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Professional Controls */}
      <div className="p-3 lg:p-4 space-y-3 bg-gradient-to-t from-gray-50 to-white border-t border-gray-100 flex-shrink-0">
        
        {/* Breathing Controls */}
        <div className="text-center">
          {!isAnimating ? (
            <button
              onClick={startBreathingAnimation}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-xs lg:text-sm w-full flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
              </svg>
              Start Guided Breathing
            </button>
          ) : (
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm lg:text-base font-bold text-gray-800 capitalize">
                  {breathingPhase === 'inhale' ? 'Breathe In' : 'Breathe Out'}
                </span>
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className={`bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-[4000ms] ${
                    breathingPhase === 'inhale' ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
              <p className="text-xs text-gray-600">
                {breathingPhase === 'inhale' ? 'Fill your lungs slowly' : 'Release and let go'}
              </p>
            </div>
          )}
        </div>

        {/* Simplified Information Display */}
        {hoveredChakra ? (
          <div className="text-center bg-gradient-to-r from-gray-50 to-blue-50 p-2 lg:p-3 rounded-lg border border-gray-100 flex-shrink-0">
            {(() => {
              const chakra = chakras.find(c => c.id === hoveredChakra);
              return (
                <div className="flex items-center justify-center gap-2">
                  <div 
                    className="w-4 h-4 lg:w-5 lg:h-5 rounded-full ring-2 ring-white shadow-md flex-shrink-0"
                    style={{ backgroundColor: chakra.color }}
                  />
                  <div className="text-left min-w-0 flex-1">
                    <h4 className="text-xs lg:text-sm font-bold text-gray-800 truncate">{chakra.name}</h4>
                    <p className="text-xs text-gray-600 truncate">{chakra.english}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-2 lg:p-3 rounded-lg border border-blue-100 flex-shrink-0">
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-800 text-xs lg:text-sm">Discover Energy Centers</h4>
                <p className="text-xs text-gray-600">
                  Hover over <span className="text-blue-600 font-medium">chakra points</span> for healing benefits
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Professional Footer */}
        <div className="text-center text-xs text-gray-500 pt-1 border-t border-gray-100 flex-shrink-0">
          Based on traditional Ayurvedic chakra system
        </div>
      </div>
    </div>
  );
};

export default CompactMeditationFigure;
