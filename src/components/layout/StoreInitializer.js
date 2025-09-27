"use client";
import { useEffect } from 'react';
import { useThemeStore, useAuthStore } from '@/stores';

export default function StoreInitializer({ children }) {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // Initialize theme on app load
    initializeTheme();
    
    // Check authentication status on app load
    checkAuth();
  }, [initializeTheme, checkAuth]);

  return <>{children}</>;
}