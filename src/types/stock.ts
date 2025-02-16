import { ApiResponse } from './api';

export interface StockMonthRevenue {
  date: string;
  stock_id: string;
  country: string;
  revenue: number;
  revenue_month: number;
  revenue_year: number;
}

export interface StockInfo {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
}

export type StockMonthRevenueResponse = ApiResponse<StockMonthRevenue>;
export type StockInfoResponse = ApiResponse<StockInfo>;
