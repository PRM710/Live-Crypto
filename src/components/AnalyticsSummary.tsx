import React from 'react';
import { TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { CryptoAnalysis } from '../types/crypto';
import { formatCurrency, formatNumber } from '../utils/cryptoUtils';

interface Props {
  analysis: CryptoAnalysis;
}

export const AnalyticsSummary: React.FC<Props> = ({ analysis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-full">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Average Price</p>
            <p className="text-xl font-semibold">{formatCurrency(analysis.averagePrice)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-full">
            <ArrowUpRight className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Highest 24h Change</p>
            <p className="text-xl font-semibold text-green-600">
              {analysis.highestPriceChange.name} (+{formatNumber(analysis.highestPriceChange.change)}%)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-red-100 rounded-full">
            <ArrowDownRight className="w-6 h-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Lowest 24h Change</p>
            <p className="text-xl font-semibold text-red-600">
              {analysis.lowestPriceChange.name} ({formatNumber(analysis.lowestPriceChange.change)}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};