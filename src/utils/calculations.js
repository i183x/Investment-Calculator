// src/utils/calculations.js

export const calculateInvestment = (lumpSum, cagr, years, yearlyAddition) => {
  // Ensure all inputs are numbers and are defined
  lumpSum = typeof lumpSum === 'number' && !isNaN(lumpSum) ? lumpSum : 0;
  cagr = typeof cagr === 'number' && !isNaN(cagr) ? cagr : 0;
  years = typeof years === 'number' && !isNaN(years) && years > 0 ? Math.floor(years) : 0;
  yearlyAddition = typeof yearlyAddition === 'number' && !isNaN(yearlyAddition) ? yearlyAddition : 0;

  let netAmount = lumpSum;
  const growthData = [netAmount]; // Starting with initial investment

  for (let year = 1; year <= years; year++) {
    netAmount = netAmount * (1 + cagr / 100) + yearlyAddition;
    growthData.push(parseFloat(netAmount.toFixed(2)));
  }

  const totalInvested = lumpSum + yearlyAddition * years;
  const profit = netAmount - totalInvested;

  return {
    netAmount: parseFloat(netAmount.toFixed(2)),
    profit: parseFloat(profit.toFixed(2)),
    totalInvested: parseFloat(totalInvested.toFixed(2)),
    growthData, // For visualization
  };
};
