'use client';
import Header from '@/components/Header';
import CombinedChart from '@/components/CombinedChart';
import { useParams } from 'next/navigation';
import { ChartData } from '@/types/chart';
import RangeButton from '@/components/RangeButton';
import Loading from '@/components/Loading';
import { useEffect } from 'react';
import { useStockStore } from '@/store/stock';
import ColumnPinnedTable from '@/components/ColumnPinnedTable';
import ErrorAlert from '@/components/ErrorAlert';
import { useErrorStore } from '@/store/error';
import { ErrorText } from '@/enum/error';

function StockMonthRevenuePage() {
  const params = useParams<{ id: string }>();
  const stockInfo = useStockStore((state) => state.stockInfo);
  const stockMonthRevenue = useStockStore((state) => state.stockMonthRevenue);
  const fetchStockInfo = useStockStore((state) => state.fetchStockInfo);
  const setError = useErrorStore((state) => state.setError);

  const labels =
    stockMonthRevenue?.map(
      (data) => new Date(data.revenue_year, data.revenue_month - 1)
    ) || [];

  const barData: ChartData = {
    label: '每月營收',
    axisTitle: '千元',
    data: stockMonthRevenue?.map((data) => data.revenue / 1000) || [],
  };

  const lineData: ChartData = {
    label: '每月營收年增率',
    axisTitle: '百分比',
    data: stockMonthRevenue?.map((data) => data?.annual_growth_rate || 0) || [],
  };

  useEffect(() => {
    if (parseInt(params.id) && params.id.length === 4) {
      fetchStockInfo(params.id);
    } else {
      setError(ErrorText.STOCK_INFO_NOT_FOUND);
    }
  }, [params?.id]);

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center bg-zinc-100">
      <ErrorAlert />
      <Loading />
      <Header />
      {stockInfo && (
        <>
          <div className="my-2 flex w-1/2 rounded-sm border border-gray-300 bg-zinc-50">
            <div className="px-4 py-2 text-xl font-bold">
              {stockInfo?.stock_name} ({stockInfo?.stock_id})
            </div>
          </div>
          <div className="my-2 flex w-1/2 flex-col rounded-sm border border-gray-300 bg-white p-4">
            <div className="mb-4 flex justify-between">
              <div className="bg-primary-main h-10 self-center rounded-sm px-4 py-2 font-bold text-white">
                每月營收
              </div>
              <RangeButton />
            </div>
            <CombinedChart
              labels={labels}
              barData={barData}
              lineData={lineData}
            />
          </div>
          <div className="mb-4 flex w-1/2 flex-col rounded-sm border border-gray-300 bg-white p-4">
            <div className="bg-primary-main mb-4 h-10 self-start rounded-sm px-4 py-2 font-bold text-white">
              詳細數據
            </div>
            <ColumnPinnedTable
              months={labels}
              revenues={barData.data}
              annualGrowths={lineData.data}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default StockMonthRevenuePage;
