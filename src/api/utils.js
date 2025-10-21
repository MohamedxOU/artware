// API utility functions for authenticated requests
import { getAuthToken, removeAuthToken } from '@/utils/cookies';

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3500';

// Get authentication headers with access token
export const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

// Make authenticated API request
export const authenticatedFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const defaultOptions = {
    headers: getAuthHeaders(),
    credentials: "include",
  };
  
  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, finalOptions);
    
    // Handle 401 Unauthorized - token might be expired
    if (response.status === 401) {
      // Clear invalid token
      removeAuthToken();
      // Redirect to login or trigger auth refresh
      throw new Error('Authentication expired. Please login again.');
    }
    
    return response;
  } catch (error) {
    console.error('Authenticated API request failed:', error);
    throw error;
  }
};

// Parse JSON response safely
export const parseJsonResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  return await response.text();
};

// Handle API response with error checking
export const handleApiResponse = async (response) => {
  if (response.ok) {
    return await parseJsonResponse(response);
  } else {
    const errorData = await parseJsonResponse(response);
    const errorMessage = typeof errorData === 'object' ? 
      (errorData.message || errorData.error || 'API request failed') : 
      errorData || 'API request failed';
    throw new Error(errorMessage);
  }
};