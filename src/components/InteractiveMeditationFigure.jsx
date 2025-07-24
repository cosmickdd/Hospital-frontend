import React, { useState } from 'react';
import meditationSvg from '../assets/Group 17.svg';

const InteractiveMeditationFigure = () => {
  const [hoveredChakra, setHoveredChakra] = useState(null);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [isAnimating, setIsAnimating] = useState(false);

  // Chakra data with positions mapped to your SVG
  const chakras = [
    {
      id: 'crown',
      name: 'Crown Energy Center',
      color: '#9D4EDD',
      position: { x: 316, y: 120 },
      description: 'Neurological health and cognitive function assessment',
      affirmation: 'Optimal brain health and mental clarity'
    },
    {
      id: 'third-eye',
      name: 'Third Eye Center',
      color: '#4E148C',
      position: { x: 316, y: 160 },
      description: 'Pineal gland function and sleep pattern evaluation',
      affirmation: 'Balanced circadian rhythms and mental focus'
    },
    {
      id: 'throat',
      name: 'Throat Energy Center',
      color: '#118AB2',
      position: { x: 316, y: 220 },
      description: 'Thyroid function and respiratory health monitoring',
      affirmation: 'Clear communication and healthy metabolism'
    },
    {
      id: 'heart',
      name: 'Heart Center',
      color: '#06D6A0',
      position: { x: 316, y: 300 },
      description: 'Cardiovascular health and emotional well-being',
      affirmation: 'Strong heart and emotional balance'
    },
    {
      id: 'solar-plexus',
      name: 'Solar Plexus Center',
      color: '#FFD60A',
      position: { x: 316, y: 380 },
      description: 'Digestive system and metabolic health evaluation',
      affirmation: 'Healthy digestion and energy metabolism'
    },
    {
      id: 'sacral',
      name: 'Sacral Energy Center',
      color: '#FF8500',
      position: { x: 316, y: 450 },
      description: 'Reproductive health and hormonal balance assessment',
      affirmation: 'Balanced hormones and reproductive wellness'
    },
    {
      id: 'root',
      name: 'Root Energy Center',
      color: '#E63946',
      position: { x: 316, y: 520 },
      description: 'Immune system strength and physical stability',
      affirmation: 'Strong foundation and robust immunity'
    }
  ];

  // Start breathing animation
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
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
          <span className="text-blue-600">Modern Hospital</span>
          <br />
          <span className="text-green-600">Ayurvedic Care</span>
          <br />
          <span className="text-purple-600">AI Enhanced</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Integrating traditional Ayurvedic healing with modern medical care.
          Explore chakra-based wellness assessment powered by Prana AI.
        </p>
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl w-full">
        
        {/* SVG Figure with Chakra Points */}
        <div className="relative">
          <div 
            className={`transition-transform duration-[4000ms] ease-in-out ${
              isAnimating 
                ? breathingPhase === 'inhale' 
                  ? 'scale-105' 
                  : 'scale-95'
                : 'scale-100'
            }`}
          >
            {/* Your Original SVG */}
            <img 
              src={meditationSvg} 
              alt="Meditation Figure" 
              className="w-96 h-auto drop-shadow-lg"
            />
            
            {/* Chakra Points Overlay */}
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 632 707"
              preserveAspectRatio="xMidYMid meet"
            >
              {chakras.map((chakra, index) => (
                <g key={chakra.id}>
                  {/* Chakra Point */}
                  <circle
                    cx={chakra.position.x}
                    cy={chakra.position.y}
                    r={hoveredChakra === chakra.id ? 18 : 12}
                    fill={chakra.color}
                    className={`cursor-pointer transition-all duration-300 ${
                      hoveredChakra === chakra.id ? 'drop-shadow-lg' : ''
                    } ${
                      isAnimating ? 'animate-pulse' : ''
                    }`}
                    style={{
                      filter: hoveredChakra === chakra.id 
                        ? `drop-shadow(0 0 20px ${chakra.color})` 
                        : 'none',
                      animationDelay: `${index * 0.5}s`
                    }}
                    onMouseEnter={() => setHoveredChakra(chakra.id)}
                    onMouseLeave={() => setHoveredChakra(null)}
                  />
                  
                  {/* Chakra Energy Rings */}
                  {hoveredChakra === chakra.id && (
                    <>
                      <circle
                        cx={chakra.position.x}
                        cy={chakra.position.y}
                        r={25}
                        fill="none"
                        stroke={chakra.color}
                        strokeWidth="2"
                        opacity="0.6"
                        className="animate-ping"
                      />
                      <circle
                        cx={chakra.position.x}
                        cy={chakra.position.y}
                        r={35}
                        fill="none"
                        stroke={chakra.color}
                        strokeWidth="1"
                        opacity="0.3"
                        className="animate-ping"
                        style={{ animationDelay: '0.5s' }}
                      />
                    </>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Information Panel */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          {/* Breathing Controls */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Wellness Assessment
            </h3>
            {!isAnimating ? (
              <button
                onClick={startBreathingAnimation}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Energy Assessment
              </button>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {breathingPhase === 'inhale' ? 'Inhale' : 'Exhale'}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Follow the breathing pattern for accurate assessment
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-[4000ms] ${
                      breathingPhase === 'inhale' ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Chakra Information */}
          {hoveredChakra ? (
            <div className="border-t pt-6">
              {(() => {
                const chakra = chakras.find(c => c.id === hoveredChakra);
                return (
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg shadow-lg"
                      style={{ backgroundColor: chakra.color }}
                    >
                      ॐ
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      {chakra.name}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {chakra.description}
                    </p>
                    <div 
                      className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4"
                      style={{ borderLeftColor: chakra.color }}
                    >
                      <p className="text-sm italic text-gray-700">
                        "{chakra.affirmation}"
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="border-t pt-6 text-center">
              <div className="text-6xl mb-4">🏥</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Energy Center Assessment
              </h4>
              <p className="text-gray-600">
                Hover over the energy points to learn about chakra-based wellness evaluation. 
                Our hospital uses Prana AI to provide personalized health insights.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-6 max-w-4xl w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Hospital Wellness Services - Powered by Prana AI
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🔬</div>
            <h4 className="font-semibold text-gray-700 mb-2">Medical Assessment</h4>
            <p className="text-sm text-gray-600">
              Advanced energy center analysis for comprehensive health evaluation
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🏥</div>
            <h4 className="font-semibold text-gray-700 mb-2">Integrated Treatment</h4>
            <p className="text-sm text-gray-600">
              Combining modern medicine with traditional Ayurvedic healing methods
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">�</div>
            <h4 className="font-semibold text-gray-700 mb-2">AI-Powered Insights</h4>
            <p className="text-sm text-gray-600">
              Prana AI provides personalized wellness recommendations for patients
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMeditationFigure;
