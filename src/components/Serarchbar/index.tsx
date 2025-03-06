'use client';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import { useStockStore } from '@/store/stock';
import { useDebounce } from 'use-debounce';

function Searchbar() {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const resetStockInfo = useStockStore((state) => state.resetStockInfo);
  const stockInfos = useStockStore((state) => state.stockInfos);
  const filteredStockInfos = stockInfos?.filter(
    (stockInfo) =>
      debouncedSearchText !== '' &&
      !stockInfo.industry_category.includes('ETF') &&
      stockInfo.stock_id.length === 4 &&
      stockInfo.stock_id.includes(debouncedSearchText)
  );

  const handleSearch = (text: string = '') => {
    if (text !== '') {
      console.log(text);
      router.push(`/${text}`);
    } else {
      console.log(searchText);
      router.push(`/${searchText}`);
    }
    resetStockInfo();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="flex w-2/5 flex-row justify-between rounded-sm border border-solid border-gray-400 bg-zinc-50 px-4">
        <InputBase
          className="w-full"
          placeholder="輸入台股代號，查看公司價值"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <IconButton
          className="flex items-end"
          onClick={() => handleSearch()}
          type="submit"
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </div>
      {isFocused && filteredStockInfos && filteredStockInfos.length > 0 && (
        <div className="absolute top-full z-10 flex h-80 w-2/5 flex-col overflow-y-auto rounded-sm rounded-t-none border border-t-0 border-solid border-gray-400 bg-white">
          {filteredStockInfos.map((stockInfo) => (
            <MenuItem
              key={`${stockInfo.industry_category}_${stockInfo.stock_id}_${stockInfo.type}`}
              className="flex !justify-between border-b border-gray-300 px-4 py-2"
              divider
              onMouseDown={handleMouseDown}
              onClick={() => handleSearch(stockInfo.stock_id)}
            >
              <div>{stockInfo.stock_name}</div>
              <div>{stockInfo.stock_id}</div>
            </MenuItem>
          ))}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
