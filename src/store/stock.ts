import { api } from '@/api';
import { StockInfo, StockMonthRevenue } from '@/types/stock';
import { create } from 'zustand';
import { useLoadingStore } from './loading';
import { format, subYears } from 'date-fns';

type StockStore = {
  stockInfo: StockInfo | null;
  stockMonthRevenue: StockMonthRevenue[] | null;
  fetchStockInfo: (stockId: string) => void;
  fetchStockMonthRevenue: (
    stockId: string,
    startDate: Date,
    endDate: Date
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
    // To get each month's annual growth rate, we need to fetch the revenue of the previous year
    const fetchStartDate = subYears(startDate, 1);
    const fetchStartDateString = format(fetchStartDate, 'yyyy-MM-01');
    const fetchEndDateString = format(endDate, 'yyyy-MM-01');
    const data = await api.getStockMonthRevenue(
      stockId,
      fetchStartDateString,
      fetchEndDateString
    );
    if (data) {
      // Calculate annual growth rate
      for (let i = 12; i < data.length; i++) {
        if (data[i - 12].revenue === 0) {
          data[i].annual_growth_rate = 0;
          continue;
        }
        data[i].annual_growth_rate =
          (data[i].revenue / data[i - 12].revenue - 1) * 100;
      }
      const startDateString = format(startDate, 'yyyy-MM-01');
      const filteredData = data.filter((item) => item.date >= startDateString);
      set({ stockMonthRevenue: filteredData });
    }
    useLoadingStore.getState().popLoading();
  },
}));
