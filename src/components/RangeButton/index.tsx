import { useState } from 'react';
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
import { format, subYears, subMonths } from 'date-fns';

function RangeButton() {
  const [searchRangeValue, setSearchRangeValue] = useState('5');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(new Date());
  const [customEndDate, setCustomEndDate] = useState(new Date());
  const handleRangeChange = (event: SelectChangeEvent) => {
    if (event.target.value !== '-1') {
      const now = new Date();
      const endDate = subMonths(now, 1);
      const startDate = subYears(endDate, parseInt(event.target.value));
      console.log(format(startDate, 'yyyy-MM-01'));
      console.log(format(endDate, 'yyyy-MM-01'));
      setSearchRangeValue(event.target.value);
    } else {
      toggleDialog();
    }
  };
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  const handleCustomRange = () => {
    if (customStartDate && customEndDate) {
      console.log(format(customStartDate, 'yyyy-01-01'));
      console.log(format(customEndDate, 'yyyy-01-01'));
      toggleDialog();
      setSearchRangeValue('-1');
    }
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown open={isDialogOpen} onClose={toggleDialog}>
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
          <Button onClick={handleCustomRange}>確定</Button>
        </DialogActions>
      </Dialog>
      <Select
        className="h-10 !rounded-sm !border-opacity-0 bg-[#0386f4] !font-bold !text-white"
        value={searchRangeValue}
        onChange={handleRangeChange}
      >
        <MenuItem value={'3'}>近 3 年</MenuItem>
        <MenuItem value={'5'}>近 5 年</MenuItem>
        <MenuItem value={'8'}>近 8 年</MenuItem>
        <MenuItem value={'-1'}>自訂</MenuItem>
      </Select>
    </div>
  );
}

export default RangeButton;
