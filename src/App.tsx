import React, { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { CryptoTable } from './components/CryptoTable';
import { AnalyticsSummary } from './components/AnalyticsSummary';
import { ExportButton } from './components/ExportButton';
import { CryptoData, CryptoAnalysis } from './types/crypto';
import { analyzeCryptoData } from './utils/cryptoUtils';

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

function App() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [analysis, setAnalysis] = useState<CryptoAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=false'
      );
      const data = await response.json();
      setCryptoData(data);
      const newAnalysis = analyzeCryptoData(data);
      setAnalysis(newAnalysis);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin">
          <RefreshCw className="w-8 h-8 text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cryptocurrency Dashboard</h1>
            {lastUpdated && (
              <p className="text-sm text-gray-500 mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="flex space-x-4">
            <ExportButton data={cryptoData} />
            <button
              onClick={fetchCryptoData}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {analysis && <AnalyticsSummary analysis={analysis} />}
        <CryptoTable data={cryptoData} />
      </div>
    </div>
  );
}

export default App;