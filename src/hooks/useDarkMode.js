// src/hooks/useDarkMode.js

import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedMode = localStorage.getItem('theme');
    return savedMode ? savedMode === 'dark' : false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  return [isDark, toggleDarkMode];
};

export default useDarkMode;
