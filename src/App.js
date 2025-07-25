import React from 'react';
import Navbar from './components/navbar.jsx';
import HomePage from './components/HomePage.jsx';
import { DarkModeProvider } from './contexts/DarkModeContext';

function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <HomePage />
      </div>
    </DarkModeProvider>
  );
}

export default App;
