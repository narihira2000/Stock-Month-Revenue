import { StockInfo, StockMonthRevenue } from './stock';

export type LoadingStore = {
  loadingCount: number;
  pushLoading: () => void;
  popLoading: () => void;
};

export type StockStore = {
  stockInfo: StockInfo | null;
  stockMonthRevenue: StockMonthRevenue[] | null;
  resetStockInfo: () => void;
  fetchStockInfo: (stockId: string) => void;
  fetchStockMonthRevenue: (
    stockId: string,
    startDate: Date,
    endDate: Date
  ) => void;
};

export type ErrorStore = {
  error: string | null;
  setError: (error: string) => void;
  clearError: () => void;
};
