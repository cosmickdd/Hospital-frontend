import React from 'react';
import MeditationFigureEnhanced from './components/MeditationFigureEnhanced';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Ayurvedic Meditation Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience the harmony of ancient Ayurvedic wisdom through our interactive chakra meditation guide. 
            Hover over each chakra point to discover their authentic Sanskrit names and healing properties.
          </p>
        </div>

        {/* Enhanced Meditation Figure */}
        <div className="relative flex justify-center items-center min-h-[500px] bg-white/50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <MeditationFigureEnhanced />
        </div>

        {/* Information Panel */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Interactive Experience
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hover over each chakra point to see authentic Sanskrit names, symbolic meanings, and healing mantras used in traditional Ayurvedic practice.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Authentic Ayurveda
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              From Muladhara (Root) to Sahasrara (Crown), each chakra is presented with traditional Sanskrit terminology and spiritual significance.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Enhanced Animations
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Featuring smooth animations, energy flow effects, and guided breathing exercises for an immersive meditation experience.
            </p>
          </div>
        </div>

        {/* Chakra Reference Guide */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center flex items-center justify-center">
            <svg className="w-8 h-8 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Seven Chakras (Saptachakra) Reference
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50">
              <div className="w-4 h-4 rounded-full bg-purple-600"></div>
              <div>
                <p className="font-semibold">Sahasrara</p>
                <p className="text-gray-600">Crown • OM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-50">
              <div className="w-4 h-4 rounded-full bg-indigo-600"></div>
              <div>
                <p className="font-semibold">Ajna</p>
                <p className="text-gray-600">Third Eye • AUM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <div>
                <p className="font-semibold">Vishuddha</p>
                <p className="text-gray-600">Throat • HAM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <div>
                <p className="font-semibold">Anahata</p>
                <p className="text-gray-600">Heart • YAM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-50">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <div>
                <p className="font-semibold">Manipura</p>
                <p className="text-gray-600">Solar Plexus • RAM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <div>
                <p className="font-semibold">Svadhisthana</p>
                <p className="text-gray-600">Sacral • VAM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-red-50">
              <div className="w-4 h-4 rounded-full bg-red-600"></div>
              <div>
                <p className="font-semibold">Muladhara</p>
                <p className="text-gray-600">Root • LAM</p>
              </div>
            </div>
            <div className="flex items-center justify-center p-3 rounded-lg bg-gradient-to-r from-yellow-100 to-orange-100">
              <div className="text-gray-700 font-medium text-center">
                <div className="text-lg mb-1">🙏</div>
                <div className="text-sm">Namaste</div>
                <div className="text-xs text-gray-600">Sacred energy centers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
