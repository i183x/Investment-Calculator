// src/App.jsx

import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InvestmentForm from './components/InvestmentForm';
import ResultDisplay from './components/ResultDisplay';
import Visualization from './components/Visualization';
import { calculateInvestment } from './utils/calculations';

const App = () => {
  const [result, setResult] = useState(null);
  const [growthData, setGrowthData] = useState([]);

  const handleCalculate = useCallback((data) => {
    const { lump_sum, cagr, years, yearly_addition } = data;

    // Convert all inputs to numbers explicitly
    const lumpSumNum = parseFloat(lump_sum);
    const cagrNum = parseFloat(cagr);
    const yearsNum = parseInt(years, 10);
    const yearlyAdditionNum = parseFloat(yearly_addition);

    // Ensure all parsed numbers are valid
    if (
      isNaN(lumpSumNum) ||
      isNaN(cagrNum) ||
      isNaN(yearsNum) ||
      isNaN(yearlyAdditionNum) ||
      yearsNum <= 0
    ) {
      // Handle invalid inputs gracefully
      setResult(null);
      setGrowthData([]);
      return;
    }

    const calcResult = calculateInvestment(lumpSumNum, cagrNum, yearsNum, yearlyAdditionNum);
    setResult({
      netAmount: calcResult.netAmount,
      profit: calcResult.profit,
      years: yearsNum,
      totalInvested: calcResult.totalInvested,
    });

    setGrowthData(calcResult.growthData);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <InvestmentForm onCalculate={handleCalculate} />
        <ResultDisplay result={result} />
        {result && (
          <Visualization data={{ growthData, totalInvested: result.totalInvested, profit: result.profit }} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
