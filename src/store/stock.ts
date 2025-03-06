import { api } from '@/api';
import { create } from 'zustand';
import { useLoadingStore } from './loading';
import { useErrorStore } from './error';
import { format, subYears } from 'date-fns';
import { StockStore } from '@/types/store';
import { ErrorText } from '@/enum/error';

export const useStockStore = create<StockStore>((set) => ({
  stockInfo: null,
  stockInfos: null,
  stockMonthRevenue: null,
  resetStockInfo: () => {
    set({ stockInfo: null });
  },
  fetchStockInfo: async (stockId) => {
    useLoadingStore.getState().pushLoading();
    const data = await api.getStockInfo(stockId);
    if (data && data?.length > 0) {
      set({ stockInfo: data[0] });
    } else {
      useErrorStore.getState().setError(ErrorText.STOCK_INFO_NOT_FOUND);
    }
    useLoadingStore.getState().popLoading();
  },
  fetchStockInfos: async () => {
    useLoadingStore.getState().pushLoading();
    const data = await api.getStockInfo('');
    if (data) {
      set({ stockInfos: data });
    } else {
      useErrorStore.getState().setError(ErrorText.STOCK_INFO_NOT_FOUND);
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
    } else {
      useErrorStore
        .getState()
        .setError(ErrorText.STOCK_MONTH_REVENUE_NOT_FOUND);
    }
    useLoadingStore.getState().popLoading();
  },
}));
