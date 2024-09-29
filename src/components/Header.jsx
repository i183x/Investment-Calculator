// src/components/Header.jsx

import React from 'react';
import useDarkMode from '../hooks/useDarkMode';

const Header = () => {
  const [isDark, toggleDarkMode] = useDarkMode();

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Investment Calculator</h1>
      <button
        onClick={toggleDarkMode}
        className="text-gray-800 dark:text-white focus:outline-none"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
    </header>
  );
};

export default Header;
