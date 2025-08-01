import React from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';
import PranaAICharacterImage from '../assets/pranaAI-character.svg';

const PranaAICharacter = () => {
  const { isDarkMode } = useDarkMode();

  const colors = {
    speechBubble: isDarkMode ? '#2D3748' : '#FFFFFF',
    text: isDarkMode ? '#F7FAFC' : '#2D3748',
  };

  // Combined variants for the character and bubble container
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: [-5, 5, -5], // Floating animation
      transition: {
        opacity: { duration: 0.7, ease: 'easeOut' },
        scale: { duration: 0.7, ease: 'easeOut' },
        y: {
          duration: 4,
          ease: 'easeInOut',
          repeat: Infinity,
        },
      },
    },
  };

  const speechBubbleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        delay: 0.5,
      },
    },
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {/* Decorative background glow */}
      <div className="absolute w-80 h-80 sm:w-96 sm:h-96 bg-blue-400/20 dark:bg-blue-800/30 rounded-full blur-3xl" />

      {/* Character and Bubble Container */}
      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Speech Bubble */}
        <motion.div
          className="absolute -top-12 left-1/2 w-44" // Positioned above the character
          style={{ x: '-50%' }} // Horizontally center
          variants={speechBubbleVariants}
        >
          <div
            className="text-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-lg shadow-lg"
            style={{
              background: colors.speechBubble,
              color: colors.text,
              padding: '10px 16px',
              borderRadius: '12px',
              position: 'relative',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            Hi, I'm Prana AI!
            {/* Triangle pointing down */}
            <div
              style={{
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                marginLeft: '-10px',
                borderWidth: '10px',
                borderStyle: 'solid',
                borderColor: `${colors.speechBubble} transparent transparent transparent`,
              }}
            />
          </div>
        </motion.div>

        {/* Character Image */}
        <motion.img
          src={PranaAICharacterImage}
          alt="Prana AI Character"
          className="w-64 sm:w-72 md:w-80"
          style={{
            height: 'auto',
            filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.2))'
          }}
        />
      </motion.div>
    </div>
  );
};

export default PranaAICharacter;