import { create } from 'zustand';
import { LoadingStore } from '@/types/store';

export const useLoadingStore = create<LoadingStore>((set) => ({
  loadingCount: 0,
  pushLoading: () => {
    set((state) => ({ loadingCount: state.loadingCount + 1 }));
  },
  popLoading: () => {
    set((state) => ({ loadingCount: state.loadingCount - 1 }));
  },
}));
