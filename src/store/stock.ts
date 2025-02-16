import { api } from '@/api';
import { StockInfo, StockMonthRevenue } from '@/types/stock';
import { create } from 'zustand';
import { useLoadingStore } from './loading';

type StockStore = {
  stockInfo: StockInfo | null;
  stockMonthRevenue: StockMonthRevenue[] | null;
  fetchStockInfo: (stockId: string) => void;
  fetchStockMonthRevenue: (
    stockId: string,
    startDate: string,
    endDate: string
  ) => void;
};

export const useStockStore = create<StockStore>((set) => ({
  stockInfo: null,
  stockMonthRevenue: null,
  fetchStockInfo: async (stockId) => {
    useLoadingStore.getState().pushLoading();
    const data = await api.getStockInfo(stockId);
    if (data) {
      set({ stockInfo: data });
    }
    useLoadingStore.getState().popLoading();
  },
  fetchStockMonthRevenue: async (stockId, startDate, endDate) => {
    useLoadingStore.getState().pushLoading();
    const data = await api.getStockMonthRevenue(stockId, startDate, endDate);
    if (data) {
      set({ stockMonthRevenue: data });
    }
    useLoadingStore.getState().popLoading();
  },
}));
