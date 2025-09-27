import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set, get) => ({
      // State
      theme: 'acid', // default light theme
      isDarkMode: false,

      // Actions
      setTheme: (newTheme) => {
        const isDark = newTheme !== 'acid';
        
        // Update HTML data-theme attribute
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', newTheme);
        }
        
        set({ 
          theme: newTheme,
          isDarkMode: isDark
        });
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'acid' ? 'synthwave' : 'acid';
        get().setTheme(newTheme);
      },

      initializeTheme: () => {
        if (typeof document !== 'undefined') {
          const storedTheme = get().theme;
          document.documentElement.setAttribute('data-theme', storedTheme);
        }
      },

      // Available themes
      themes: {
        light: 'acid',
        dark: 'synthwave',
        // Add more themes as needed
        cupcake: 'cupcake',
        bumblebee: 'bumblebee',
        emerald: 'emerald',
        corporate: 'corporate',
        retro: 'retro',
        cyberpunk: 'cyberpunk',
        valentine: 'valentine',
        halloween: 'halloween',
        garden: 'garden',
        forest: 'forest',
        aqua: 'aqua',
        lofi: 'lofi',
        pastel: 'pastel',
        fantasy: 'fantasy',
        wireframe: 'wireframe',
        black: 'black',
        luxury: 'luxury',
        dracula: 'dracula',
        cmyk: 'cmyk',
        autumn: 'autumn',
        business: 'business',
        night: 'night',
        coffee: 'coffee',
        winter: 'winter'
      }
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ 
        theme: state.theme,
        isDarkMode: state.isDarkMode
      }),
    }
  )
);

export default useThemeStore;