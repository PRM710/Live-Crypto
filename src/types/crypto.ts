export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  last_updated: string;
}

export interface CryptoAnalysis {
  averagePrice: number;
  highestPriceChange: {
    name: string;
    change: number;
  };
  lowestPriceChange: {
    name: string;
    change: number;
  };
}