// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 bg-gray-200 dark:bg-gray-800 text-center">
      <p className="text-sm text-gray-700 dark:text-gray-300">
        &copy; {new Date().getFullYear()} Investment Calculator. All rights reserved.
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Made with ❤️ by{' '}
        <a
          href="https://www.linkedin.com/in/i183x/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Krishna Purwar
        </a>
      </p>
    </footer>
  );
};

export default Footer;
