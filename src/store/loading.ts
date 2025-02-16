import { create } from 'zustand';

type LoadingStore = {
  loadingCount: number;
  pushLoading: () => void;
  popLoading: () => void;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  loadingCount: 0,
  pushLoading: () => {
    set((state) => ({ loadingCount: state.loadingCount + 1 }));
  },
  popLoading: () => {
    set((state) => ({ loadingCount: state.loadingCount - 1 }));
  },
}));
