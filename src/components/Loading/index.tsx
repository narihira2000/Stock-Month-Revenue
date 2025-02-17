import { useLoadingStore } from '@/store/loading';
import { CircularProgress } from '@mui/material';

function Loading() {
  const loadingCount = useLoadingStore((state) => state.loadingCount);
  return (
    loadingCount > 0 && (
      <div className="fixed top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-gray-50 opacity-70">
        <CircularProgress />
      </div>
    )
  );
}

export default Loading;
