import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as authAPI from '@/api/auth';
import { setAuthToken, removeAuthToken, getAuthToken } from '@/utils/cookies';

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

            // Store access token in cookie instead of localStorage
            setAuthToken(accessToken);
            
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
          
          // Clear access token from cookie
          removeAuthToken();
          
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
          // Clear access token from cookie
          removeAuthToken();
          
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
          // Get current state to check if we have persisted user data
          const currentState = get();
          
          // Check if we have an access token in cookie
          const token = getAuthToken();
          
          // If we have a token and persisted user data, keep them logged in
          if (token && currentState.user) {
            console.log('Token and user data found, keeping user logged in');
            set({ 
              user: currentState.user,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            return;
          }
          
          // If we have persisted user data but no token, log them out
          if (!token && currentState.user) {
            console.log('No token found, logging user out');
            removeAuthToken();
            set({ 
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null
            });
            return;
          }
          
          // If no token and no user, just set unauthenticated state
          if (!token) {
            set({ 
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null
            });
            return;
          }

          // We have a token but no user data (shouldn't happen normally)
          // Try to keep the token but mark as unauthenticated until login
          console.warn('Token exists but no user data in store');
          set({ 
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
        } catch (error) {
          console.error('CheckAuth error:', error);
          
          // Get current state
          const currentState = get();
          
          // If we have valid persisted data and token, keep user logged in
          const token = getAuthToken();
          if (token && currentState.user && currentState.isAuthenticated) {
            console.log('Error during auth check, but token exists - keeping user logged in');
            set({ 
              user: currentState.user,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          } else {
            // No valid session, clear everything
            removeAuthToken();
            set({ 
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null
            });
          }
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