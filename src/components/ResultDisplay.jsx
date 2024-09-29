// src/components/ResultDisplay.jsx

import React from 'react';

const formatIndianStyle = (amount) => {
  return Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  const { netAmount, profit, years, totalInvested } = result;

  return (
    <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow-inner">
      <p className="text-lg text-gray-800 dark:text-gray-100">
        Net amount after {years} {years === 1 ? 'year' : 'years'}: <span className="font-semibold">₹{formatIndianStyle(netAmount)}</span>
      </p>
      <p className="text-lg text-gray-800 dark:text-gray-100">
        Total invested: <span className="font-semibold">₹{formatIndianStyle(totalInvested)}</span>
      </p>
      <p className="text-lg text-gray-800 dark:text-gray-100">
        Total profit: <span className="font-semibold">₹{formatIndianStyle(profit)}</span>
      </p>
    </div>
  );
};

export default ResultDisplay;
