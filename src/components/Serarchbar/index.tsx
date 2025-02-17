'use client';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { useStockStore } from '@/store/stock';

function Searchbar() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const resetStockInfo = useStockStore((state) => state.resetStockInfo);

  const handleSearch = () => {
    console.log(searchText);
    router.push(`/${searchText}`);
    resetStockInfo();
  };

  return (
    <div className="flex justify-center">
      <div className="flex w-2/5 flex-row justify-between rounded-sm border border-solid border-gray-400 bg-[#fafafa] px-4">
        <InputBase
          className="w-full"
          placeholder="輸入台股代號，查看公司價值"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <IconButton
          className="flex items-end"
          onClick={handleSearch}
          type="submit"
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Searchbar;
