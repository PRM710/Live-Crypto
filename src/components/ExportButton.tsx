import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { CryptoData } from '../types/crypto';
import { exportToExcel } from '../utils/excelUtils';

interface Props {
  data: CryptoData[];
}

export const ExportButton: React.FC<Props> = ({ data }) => {
  return (
    <button
      onClick={() => exportToExcel(data)}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
    >
      <FileSpreadsheet className="w-4 h-4 mr-2" />
      Export to Excel
    </button>
  );
};