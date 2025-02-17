'use client';
import Header from '@/components/Header';
import CombinedChart from '@/components/CombinedChart';
import { useParams } from 'next/navigation';
import { ChartData } from '@/types/chart';
import RangeButton from '@/components/RangeButton';
import Loading from '@/components/Loading';
import { useEffect } from 'react';
import { useStockStore } from '@/store/stock';

function StockMonthRevenuePage() {
  const params = useParams<{ id: string }>();
  const { stockInfo, stockMonthRevenue, fetchStockInfo } = useStockStore();
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
    }
  }, [params?.id]);
  return (
    <div className="flex h-screen w-screen flex-col bg-[#ededed]">
      <Loading />
      <Header />
      <div className="my-2 flex w-1/2 self-center rounded-sm border border-gray-300 bg-[#fafafa]">
        <div className="px-4 py-2 text-xl font-bold">
          {stockInfo?.stock_name} ({stockInfo?.stock_id})
        </div>
      </div>
      <div className="mt-2 flex w-1/2 flex-col self-center rounded-sm border border-gray-300 bg-white p-4">
        <div className="mb-4 flex justify-between">
          <div className="h-10 self-center rounded-sm bg-[#0386f4] px-4 py-2 font-bold text-white">
            每月營收
          </div>
          <RangeButton />
        </div>
        <CombinedChart labels={labels} barData={barData} lineData={lineData} />
      </div>
    </div>
  );
}

export default StockMonthRevenuePage;
