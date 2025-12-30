import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  isDarkMode: boolean;
  isLoading: boolean;
  notification: {
    type: 'success' | 'error' | 'info' | 'warning' | null;
    message: string;
  };

  // Actions
  toggleDarkMode: () => void;
  setIsDarkMode: (isDarkMode: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  showNotification: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
  clearNotification: () => void;
}

export const useAppStore = create<AppState>()(
  devtools((set) => ({
    isDarkMode: false,
    isLoading: false,
    notification: {
      type: null,
      message: '',
    },

    toggleDarkMode: () =>
      set((state) => ({ isDarkMode: !state.isDarkMode })),
    setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
    setIsLoading: (isLoading) => set({ isLoading }),
    showNotification: (type, message) =>
      set({ notification: { type, message } }),
    clearNotification: () =>
      set({ notification: { type: null, message: '' } }),
  }))
);
