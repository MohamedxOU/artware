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
          
          // Handle backend response format: { accessToken: "...", user: {...} }
          if (result && result.accessToken && result.user) {
            const { accessToken, user } = result;
            
            // Check if user is active
            if (user.hasOwnProperty('is_active') && !user.is_active) {
              set({ 
                isLoading: false, 
                error: 'Your account has been deactivated. Please contact admin.'
              });
              return { success: false, error: 'Your account has been deactivated. Please contact admin.' };
            }

            // Check if user status is allowed
            if (user.status && user.status !== 'allowed') {
              set({ 
                isLoading: false, 
                error: 'Your account access is restricted. Please contact admin.'
              });
              return { success: false, error: 'Your account access is restricted. Please contact admin.' };
            }

            // Store access token in localStorage
            localStorage.setItem('auth_token', accessToken);
            
            // Update store with user data and authentication status
            set({ 
              user: user,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            
            console.log('Login successful, token stored:', accessToken);
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
          
          // Clear access token from localStorage
          localStorage.removeItem('auth_token');
          
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
          // Clear access token from localStorage
          localStorage.removeItem('auth_token');
          
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
          // Check if we have an access token
          const token = localStorage.getItem('auth_token');
          if (!token) {
            set({ 
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null
            });
            return;
          }

          // Real API auth check using refresh token
          const result = await authAPI.refreshToken();
          
          // Backend only returns { accessToken }, not user data
          if (result && result.accessToken) {
            // Update the stored token
            localStorage.setItem('auth_token', result.accessToken);
            
            // Get current user from store (it should still be there from login)
            const currentState = get();
            if (currentState.user) {
              // Keep existing user data and update auth status
              set({ 
                user: currentState.user,
                isAuthenticated: true,
                isLoading: false,
                error: null
              });
            } else {
              // No user data in store, need to re-login
              localStorage.removeItem('auth_token');
              set({ 
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
              });
            }
          } else {
            // Invalid token or refresh failed, clear it
            localStorage.removeItem('auth_token');
            set({ 
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null
            });
          }
        } catch (error) {
          // Silently handle auth check failures (like CORS issues)
          // Clear token if there's an error
          localStorage.removeItem('auth_token');
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
        user: state.user ? {
          // Only store necessary user data, exclude sensitive information
          user_id: state.user.user_id,
          first_name: state.user.first_name,
          last_name: state.user.last_name,
          email: state.user.email,
          phone_number: state.user.phone_number,
          gender: state.user.gender,
          level: state.user.level,
          specialty: state.user.specialty,
          is_active: state.user.is_active,
          profile_image_url: state.user.profile_image_url,
          status: state.user.status,
          role_id: state.user.role_id,
          // Exclude password_hash and other sensitive data
        } : null,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);

export default useAuthStore;