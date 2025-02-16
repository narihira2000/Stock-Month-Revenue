'use client';
import Header from '@/components/Header';
import { useParams } from 'next/navigation';
import RangeButton from '@/components/RangeButton';

function StockMonthRevenuePage() {
  const params = useParams<{ id: string }>();
  return (
    <div className="flex h-screen w-screen flex-col bg-[#ededed]">
      <Header />
      <div className="my-2 flex w-1/2 self-center rounded-sm border border-gray-300 bg-[#fafafa]">
        <div className="px-4 py-2 text-xl font-bold">{params.id}</div>
      </div>
      <div className="mt-4 flex w-1/2 flex-col self-center rounded-sm border border-gray-300 bg-white p-4">
        <div className="mb-4 flex justify-between">
          <div className="h-10 self-center rounded-sm bg-[#0386f4] px-4 py-2 font-bold text-white">
            每月營收
          </div>
          <RangeButton />
        </div>
      </div>
    </div>
  );
}

export default StockMonthRevenuePage;
