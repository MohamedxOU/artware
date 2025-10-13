import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores';

// Hook for protecting routes that require authentication
export function useProtectedRoute() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Store intended route for redirect after login
      sessionStorage.setItem('intendedRoute', pathname);
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  return { isAuthenticated, isLoading };
}

// Hook for routes that should redirect authenticated users (login, register)
export function useGuestRoute() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  return { isAuthenticated, isLoading };
}

// Hook for checking authentication status with loading states
export function useAuthCheck() {
  const { isAuthenticated, isLoading, user, checkAuth } = useAuthStore();

  useEffect(() => {
    // Check auth status on mount if we have a stored token but no user data
    const token = localStorage.getItem('auth_token');
    if (token && !isAuthenticated && !isLoading) {
      checkAuth();
    }
  }, [checkAuth, isAuthenticated, isLoading]);

  return { 
    isAuthenticated, 
    isLoading, 
    user,
    isAuthChecked: !isLoading
  };
}