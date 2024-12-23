import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { CryptoData } from '../types/crypto';
import { formatNumber, formatCurrency, formatMarketCap } from '../utils/cryptoUtils';

interface Props {
  data: CryptoData[];
}

export const CryptoTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume (24h)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((crypto, index) => (
            <tr key={crypto.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900">{crypto.name}</div>
                  <div className="text-sm text-gray-500 ml-2">{crypto.symbol.toUpperCase()}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatCurrency(crypto.current_price)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`flex items-center text-sm ${
                  crypto.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {crypto.price_change_percentage_24h >= 0 ? (
                    <ArrowUp className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 mr-1" />
                  )}
                  {formatNumber(Math.abs(crypto.price_change_percentage_24h))}%
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatMarketCap(crypto.market_cap)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatMarketCap(crypto.total_volume)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};