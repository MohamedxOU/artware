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
          // Use real API
          const result = await authAPI.login(email, password);
          console.log('AuthStore received result:', result);
          
          // Handle different response formats from backend
          // Some backends return { success: true, user: {...} }
          // Others return { user: {...} } directly
          // Others return { data: { user: {...} } }
          
          let user = null;
          let success = false;
          
          if (result) {
            // Format 1: { success: true, user: {...} }
            if (result.success && result.user) {
              user = result.user;
              success = true;
            }
            // Format 2: { user: {...} } - direct user object
            else if (result.user) {
              user = result.user;
              success = true;
            }
            // Format 3: { data: { user: {...} } }
            else if (result.data && result.data.user) {
              user = result.data.user;
              success = true;
            }
            // Format 4: Direct user object (no wrapper)
            else if (result.id || result.email || result.first_name) {
              user = result;
              success = true;
            }
            // Format 5: { message: "Login successful", user: {...} }
            else if (result.message && result.user) {
              user = result.user;
              success = true;
            }
          }
          
          console.log('Processed - success:', success, 'user:', user);
          
          if (success && user) {
            // Check if user is active (if the field exists)
            if (user.hasOwnProperty('is_active') && !user.is_active) {
              set({ 
                isLoading: false, 
                error: 'Your account has been deactivated. Please contact admin.'
              });
              return { success: false, error: 'Your account has been deactivated. Please contact admin.' };
            }

            set({ 
              user: user,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            return { success: true, user: user };
          } else {
            const errorMessage = result?.error || result?.message || 'Invalid credentials. Please try again.';
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
          // Real API logout
          const result = await authAPI.logout();
          if (!result.success) {
            throw new Error('Logout failed');
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
          
          return { success: false, error: error.message };
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });
        
        try {
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