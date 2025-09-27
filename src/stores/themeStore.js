import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define dark themes for proper isDarkMode detection
const DARK_THEMES = [
  'synthwave', 'halloween', 'forest', 'black', 'luxury', 'dracula', 
  'night', 'coffee', 'business'
];

const useThemeStore = create(
  persist(
    (set, get) => ({
      // State
      theme: 'acid', // default light theme
      isDarkMode: false,
      isInitialized: false,

      // Actions
      setTheme: (newTheme) => {
        const isDark = DARK_THEMES.includes(newTheme);
        
        // Update HTML data-theme attribute immediately
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', newTheme);
          // Also update the class for additional styling if needed
          document.documentElement.className = isDark ? 'dark' : 'light';
        }
        
        set({ 
          theme: newTheme,
          isDarkMode: isDark,
          isInitialized: true
        });
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'acid' ? 'synthwave' : 'acid';
        get().setTheme(newTheme);
      },

      initializeTheme: () => {
        if (typeof document !== 'undefined') {
          const { theme } = get();
          const isDark = DARK_THEMES.includes(theme);
          
          // Set theme attributes
          document.documentElement.setAttribute('data-theme', theme);
          document.documentElement.className = isDark ? 'dark' : 'light';
          
          // Update state to reflect initialization
          set({ 
            isDarkMode: isDark,
            isInitialized: true
          });
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