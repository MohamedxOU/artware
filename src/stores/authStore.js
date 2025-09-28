import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as authAPI from '@/api/auth';
import { authenticateUser, getUserByToken } from '@/mock/users';

// Enable mock mode for development
const USE_MOCK_DATA = process.env.NODE_ENV === 'development' || true;

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
          let result;
          
          if (USE_MOCK_DATA) {
            // Use mock authentication
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
            result = authenticateUser(email, password);
          } else {
            // Use real API
            result = await authAPI.login(email, password);
          }
          
          // Check if login was successful
          if (result && result.success && result.user) {
            // For mock data, check if user is active
            if (!result.user.is_active) {
              set({ 
                isLoading: false, 
                error: 'Your account has been deactivated. Please contact admin.'
              });
              return { success: false, error: 'Your account has been deactivated. Please contact admin.' };
            }

            // Store token in localStorage for mock mode
            if (USE_MOCK_DATA && result.token) {
              localStorage.setItem('auth_token', result.token);
            }

            set({ 
              user: result.user,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            return { success: true, user: result.user };
          } else {
            const errorMessage = result?.error || 'Invalid credentials. Please try again.';
            set({ 
              isLoading: false, 
              error: errorMessage
            });
            return { success: false, error: errorMessage };
          }
        } catch (error) {
          console.error('Login failed:', error);
          
          let errorMessage = 'Login failed. Please try again.';
          if (error.message) {
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
          if (USE_MOCK_DATA) {
            // Mock logout - just clear local data
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
            localStorage.removeItem('auth_token');
          } else {
            // Real API logout
            const result = await authAPI.logout();
            if (!result.success) {
              throw new Error('Logout failed');
            }
          }
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false, 
            error: null 
          });
          
          // Clear any additional session data
          sessionStorage.removeItem('intendedRoute');
          
          return { success: true };
        } catch (error) {
          console.error('Logout failed:', error);
          
          // Even if API fails, clear local state for security
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false, 
            error: null 
          });
          
          // Clear session data anyway
          sessionStorage.removeItem('intendedRoute');
          if (USE_MOCK_DATA) {
            localStorage.removeItem('auth_token');
          }
          
          return { success: false, error: error.message };
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });
        
        try {
          if (USE_MOCK_DATA) {
            // Mock auth check using stored token
            const token = localStorage.getItem('auth_token');
            if (token) {
              const user = getUserByToken(token);
              if (user && user.is_active) {
                set({ 
                  user,
                  isAuthenticated: true,
                  isLoading: false,
                  error: null
                });
                return;
              }
            }
            // No valid token or inactive user
            set({ 
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null
            });
          } else {
            // Real API auth check
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