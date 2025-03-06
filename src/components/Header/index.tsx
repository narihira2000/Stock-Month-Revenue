import Paper from '@mui/material/Paper';
import Searchbar from '../Serarchbar';
import { useEffect } from 'react';
import { useStockStore } from '@/store/stock';

function Header() {
  const fetchStockInfos = useStockStore((state) => state.fetchStockInfos);
  useEffect(() => {
    fetchStockInfos();
  }, []);
  return (
    <Paper elevation={2} className="mb-2 w-full justify-center py-4">
      <Searchbar />
    </Paper>
  );
}

export default Header;
