import { create } from 'zustand';
import { ErrorStore } from '@/types/store';

export const useErrorStore = create<ErrorStore>((set) => ({
  error: null,
  setError: (error) => {
    set({ error });
  },
  clearError: () => {
    set({ error: null });
  },
}));
