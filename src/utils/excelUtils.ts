import { utils, writeFile } from 'xlsx';
import { CryptoData } from '../types/crypto';

export const exportToExcel = (data: CryptoData[]) => {
  const worksheet = utils.json_to_sheet(
    data.map(crypto => ({
      Name: crypto.name,
      Symbol: crypto.symbol.toUpperCase(),
      Price: crypto.current_price,
      '24h Change (%)': crypto.price_change_percentage_24h,
      'Market Cap': crypto.market_cap,
      'Volume (24h)': crypto.total_volume,
      'Last Updated': new Date(crypto.last_updated).toLocaleString()
    }))
  );

  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Crypto Data');

  writeFile(workbook, 'crypto-data.xlsx');
};