import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as authAPI from '@/api/auth';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const result = await authAPI.login(email, password);
          
          // Check if login was successful - API returns user object and accessToken
          if (result && result.user && result.accessToken) {
            // Check if user is allowed to login
            if (result.user.status !== 'allowed') {
              set({ 
                isLoading: false, 
                error: 'Your account is pending approval or has been suspended. Please contact admin.'
              });
              return { success: false, error: 'Your account is pending approval or has been suspended. Please contact admin.' };
            }

            // Check if user is active
            if (!result.user.is_active) {
              set({ 
                isLoading: false, 
                error: 'Your account has been deactivated. Please contact admin.'
              });
              return { success: false, error: 'Your account has been deactivated. Please contact admin.' };
            }

            set({ 
              user: result.user,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            return { success: true, user: result.user };
          } else if (result && result.error) {
            set({ 
              isLoading: false, 
              error: result.error
            });
            return { success: false, error: result.error };
          } else {
            set({ 
              isLoading: false, 
              error: 'Invalid credentials. Please try again.'
            });
            return { success: false, error: 'Invalid credentials. Please try again.' };
          }
        } catch (error) {
          console.error('Login failed:', error);
          let errorMessage = 'Login failed. Please try again.';
          
          if (error.message?.includes('Failed to fetch')) {
            errorMessage = 'Unable to connect to server. Please check if the backend is running.';
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          // Create FormData for multipart/form-data
          const formData = new FormData();
          Object.keys(userData).forEach(key => {
            formData.append(key, userData[key]);
          });
          
          const result = await authAPI.register(formData);
          
          if (result && !result.error) {
            set({ isLoading: false, error: null });
            return { success: true, data: result };
          } else {
            set({ 
              isLoading: false, 
              error: result.error || 'Registration failed. Please try again.'
            });
            return { success: false, error: result.error || 'Registration failed. Please try again.' };
          }
        } catch (error) {
          console.error('Registration failed:', error);
          let errorMessage = 'Registration failed. Please try again.';
          
          if (error.message?.includes('Failed to fetch')) {
            errorMessage = 'Unable to connect to server. Please check if the backend is running.';
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const result = await authAPI.logout();
          
          if (result.success) {
            // Successful logout (might have warnings)
            set({ 
              user: null, 
              isAuthenticated: false, 
              isLoading: false, 
              error: null 
            });
            
            // Clear any additional session data
            sessionStorage.removeItem('intendedRoute');
            
            return { 
              success: true, 
              warning: result.warning || null 
            };
          } else {
            throw new Error('Logout failed');
          }
        } catch (error) {
          console.error('Logout failed:', error);
          
          // Even if API fails, clear local state for security
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false, 
            error: 'Logout completed locally, but server logout may have failed' 
          });
          
          // Clear session data anyway
          sessionStorage.removeItem('intendedRoute');
          
          return { success: false, error: error.message };
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });
        
        try {
          const result = await authAPI.refreshToken();
          
          // Check if refresh was successful and user is still allowed/active
          if (result && result.user && result.accessToken) {
            // Verify user status
            if (result.user.status === 'allowed' && result.user.is_active) {
              set({ 
                user: result.user,
                isAuthenticated: true,
                isLoading: false,
                error: null
              });
            } else {
              // User status changed, logout
              set({ 
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
              });
            }
          } else {
            set({ 
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null
            });
          }
        } catch (error) {
          // Silently handle auth check failures (like CORS issues)
          set({ 
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
        }
      },

      clearError: () => set({ error: null }),

      // Reset store
      reset: () => set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);

export default useAuthStore;