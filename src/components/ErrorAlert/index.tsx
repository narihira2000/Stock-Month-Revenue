import { useEffect, useState } from 'react';
import { useErrorStore } from '@/store/error';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function Loading() {
  const error = useErrorStore((state) => state.error);
  const resetError = useErrorStore((state) => state.clearError);
  const [localError, setLocalError] = useState('');
  useEffect(() => {
    if (error) {
      // Prevent dialog's error text from being empty when closing the dialog
      setLocalError(error);
    }
  }, [error]);
  return (
    <Dialog open={!!error} onClose={resetError}>
      <DialogTitle>錯誤</DialogTitle>
      <DialogContent>{localError}</DialogContent>
      <DialogActions>
        <Button onClick={resetError}>確定</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Loading;
