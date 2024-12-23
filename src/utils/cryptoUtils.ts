import { CryptoData, CryptoAnalysis } from '../types/crypto';

export const analyzeCryptoData = (data: CryptoData[]): CryptoAnalysis => {
  const averagePrice = data.reduce((acc, curr) => acc + curr.current_price, 0) / data.length;

  const sortedByPriceChange = [...data].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );

  return {
    averagePrice,
    highestPriceChange: {
      name: sortedByPriceChange[0].name,
      change: sortedByPriceChange[0].price_change_percentage_24h,
    },
    lowestPriceChange: {
      name: sortedByPriceChange[sortedByPriceChange.length - 1].name,
      change: sortedByPriceChange[sortedByPriceChange.length - 1].price_change_percentage_24h,
    },
  };
};

export const formatNumber = (num: number, decimals = 2): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
};

export const formatMarketCap = (num: number): string => {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toFixed(2)}`;
};