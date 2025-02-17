import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { subYears } from 'date-fns';
import { useStockStore } from '@/store/stock';

function RangeButton() {
  const [searchRangeValue, setSearchRangeValue] = useState('5');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(new Date());
  const [customEndDate, setCustomEndDate] = useState(new Date());
  const stockInfo = useStockStore((state) => state.stockInfo);
  const fetchStockMonthRevenue = useStockStore(
    (state) => state.fetchStockMonthRevenue
  );

  const handleRangeChange = (event: SelectChangeEvent) => {
    if (event.target.value !== '-1') {
      const endDate = new Date();
      const startDate = subYears(endDate, parseInt(event.target.value));
      setSearchRangeValue(event.target.value);
      handleFetchStockMonthRevenue(startDate, endDate);
    }
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleCustomRange = () => {
    if (customStartDate && customEndDate) {
      // The January's revenue is released on 2/1
      const newStartDate = new Date(customStartDate.getFullYear(), 1, 1);
      // The December's revenue is released on 1/1 of the next year
      const newEndDate = new Date(customEndDate.getFullYear() + 1, 0, 1);
      toggleDialog();
      setSearchRangeValue('-1');
      handleFetchStockMonthRevenue(newStartDate, newEndDate);
    }
  };

  const handleFetchStockMonthRevenue = (startDate: Date, endDate: Date) => {
    if (stockInfo) {
      fetchStockMonthRevenue(stockInfo?.stock_id, startDate, endDate);
    }
  };

  useEffect(() => {
    const endDate = new Date();
    const startDate = subYears(endDate, parseInt(searchRangeValue));
    handleFetchStockMonthRevenue(startDate, endDate);
  }, [stockInfo?.stock_id]);

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={toggleDialog}>
        <DialogTitle>自訂區間</DialogTitle>
        <DialogContent>
          <div className="flex flex-col">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                className="!my-2"
                views={['year']}
                value={customStartDate}
                onChange={(newValue) =>
                  setCustomStartDate(newValue || new Date())
                }
                label="起始年度"
                minDate={new Date('2002-01-01')}
                maxDate={new Date()}
              />
              <MobileDatePicker
                className="!my-2"
                views={['year']}
                value={customEndDate}
                onChange={(newValue) =>
                  setCustomEndDate(newValue || new Date())
                }
                label="結束年度"
                minDate={customStartDate || new Date('2002-01-01')}
                maxDate={new Date()}
              />
            </LocalizationProvider>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>取消</Button>
          <Button
            onClick={handleCustomRange}
            disabled={customEndDate < customStartDate}
          >
            確定
          </Button>
        </DialogActions>
      </Dialog>
      <Select
        className="bg-primary-main h-10 !rounded-sm !border-opacity-0 !font-bold !text-white"
        value={searchRangeValue}
        onChange={handleRangeChange}
      >
        <MenuItem value={'3'}>近 3 年</MenuItem>
        <MenuItem value={'5'}>近 5 年</MenuItem>
        <MenuItem value={'8'}>近 8 年</MenuItem>
        <MenuItem onClick={toggleDialog} value={'-1'}>
          自訂
        </MenuItem>
      </Select>
    </div>
  );
}

export default RangeButton;
