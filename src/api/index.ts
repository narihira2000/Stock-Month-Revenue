import { StockInfoResponse, StockMonthRevenueResponse } from '@/types/stock';

const API_URL = process.env.NEXT_PUBLIC_FINMIND_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_FINMIND_API_TOKEN;

export const api = {
  getStockInfo: (stockId: string) => {
    const url = `${API_URL}/data`;
    const params = new URLSearchParams({
      dataset: 'TaiwanStockInfo',
      data_id: stockId,
      token: API_TOKEN || '',
    });
    return fetch(`${url}?${params}`)
      .then((res) => res.json())
      .then((responseJson: StockInfoResponse) => {
        if (
          responseJson.msg === 'success' &&
          responseJson.data &&
          responseJson.data.length > 0
        ) {
          return responseJson.data[0];
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
  getStockMonthRevenue: (
    stockId: string,
    startDate: string,
    endDate: string
  ) => {
    const url = `${API_URL}/data`;
    const params = new URLSearchParams({
      dataset: 'TaiwanStockMonthRevenue',
      data_id: stockId,
      start_date: startDate,
      end_date: endDate,
      token: API_TOKEN || '',
    });
    return fetch(`${url}?${params}`)
      .then((res) => res.json())
      .then((responseJson: StockMonthRevenueResponse) => {
        if (responseJson.msg === 'success' && responseJson.data) {
          return responseJson.data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
