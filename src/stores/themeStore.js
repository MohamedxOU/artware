import { create } from 'zustand';

const useThemeStore = create((set) => ({
  theme: 'acid',
  
  setTheme: (newTheme) => {
    set({ theme: newTheme });
  },
}));

export default useThemeStore;
