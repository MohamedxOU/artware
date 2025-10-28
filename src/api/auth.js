import { API_BASE } from './utils';
import { getAuthToken } from '@/utils/cookies';

//login api with retry logic
export async function login(email, password) {
  try {
    const url = `${API_BASE}/login`;
    if (typeof window !== 'undefined') {
      console.log('[auth.login] API_BASE:', API_BASE, 'URL:', url);
    }
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify({ email, password }),
    });
    
    console.log('Login response status:', response.status);
    console.log('Login response headers:', Object.fromEntries(response.headers.entries()));
    
    // Handle different response types
    if (response.ok) {
      const data = await response.json();
      console.log('Login response data:', data);
      return data;
    } else {
      // Handle error responses
      const contentType = response.headers.get('content-type');
      console.log('Error response content-type:', contentType);
      
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        console.log('Error response data:', errorData);
        throw new Error(errorData.message || 'Login failed');
      } else {
        // Handle plain text responses like "Unauthorized"
        const errorText = await response.text();
        console.log('Error response text:', errorText);
        if (response.status === 401) {
          throw new Error('Invalid email or password');
        }
        throw new Error(errorText || 'Login failed');
      }
    }
  } catch (error) {
    console.error('Login error caught:', error);
    
    // Retry once if it's a network error and we haven't already retried
    if (error.message.includes('Failed to fetch') && retryCount < 1) {
      console.log('Retrying login request...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      return login(email, password, retryCount + 1);
    }
    
    // If it's a network error, provide a more user-friendly message
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to server. Please check your internet connection.');
    }
    
    throw error;
  }
};


//logout api
export const logout = async () => {
    const token = getAuthToken();
    const headers = {};
    
    // Add Authorization header if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}/logout`, {
      method: "GET",
      credentials: "include",
      headers: headers,
    });
    
    // Handle successful logout responses
    if (response.status === 204 || response.ok) {
      return { success: true };
    } 
    // Handle 401 Unauthorized - token might be expired/invalid but logout should still succeed
    else if (response.status === 401) {
      // Even if server says unauthorized, we treat logout as successful from client perspective
      // The user wants to logout, so we should respect that regardless of token validity
      return { success: true, warning: 'Session was already expired' };
    }
    // Handle server errors
    else if (response.status === 500) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        // For server errors during logout, we still logout locally but warn the user
        return { success: true, warning: errorData.message || 'Server error during logout, but logged out locally' };
      } else {
        return { success: true, warning: 'Server error during logout, but logged out locally' };
      }
    } 
    // Handle other errors
    else {
      return { success: true, warning: 'Logout completed locally, server logout may have failed' };
    }
  }

//refresh token
export const refreshToken = async () => {
    // Refresh token comes from HttpOnly cookies, not Authorization header
    const response = await fetch(`${API_BASE}/refresh`, {
      method: "GET",
      credentials: "include", // This sends cookies automatically
    });
    
    if (response.ok) {
      return response.json();
    } else {
      // Handle refresh token failure silently
      throw new Error('Token refresh failed');
    }
}


//register api

export const register = async (formData) => {
    const url = `${API_BASE}/register`;
    if (typeof window !== 'undefined') {
      console.log('[auth.register] API_BASE:', API_BASE, 'URL:', url);
    }
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    
    if (response.ok) {
      return response.json();
    } else {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      } else {
        throw new Error('Registration failed');
      }
    }
  };



//reset password api
export const requestResetPassword = async (email) => {
    const response = await fetch(`${API_BASE}/reset/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    
    if (response.ok) { 
      return response.json();
    } else {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset request failed');
      } else {
        throw new Error('Password reset request failed');
      }
    }
  }

//confirm password reset api

export const confirmResetPassword = async (token, newPassword) => {
    const response = await fetch(`${API_BASE}/reset/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    
    if (response.ok) {
      return response.json();
    } else {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset confirmation failed');
      } else {
        throw new Error('Password reset confirmation failed');
      }
    }
  }
