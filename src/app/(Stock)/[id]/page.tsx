'use client';
import Header from '@/components/Header';
import { useParams } from 'next/navigation';

function StockMonthRevenuePage() {
  const params = useParams<{ id: string }>();
  return (
    <div className="flex flex-col bg-[#ededed]">
      <Header />
      <div className="my-2 flex w-1/2 self-center rounded-sm border border-gray-300 bg-[#fafafa]">
        <div className="px-4 py-2 text-xl font-bold">{params.id}</div>
      </div>
    </div>
  );
}

export default StockMonthRevenuePage;
