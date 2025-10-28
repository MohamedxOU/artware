"use client";
import { useEffect, useState } from 'react';
import { useThemeStore, useAuthStore } from '@/stores';

export default function StoreInitializer({ children }) {
  const { initializeTheme } = useThemeStore();
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize theme immediately
    initializeTheme();
    
    // Check authentication status
    checkAuth();
    
    // Mark as ready
    setIsReady(true);
  }, [initializeTheme, checkAuth]);

  // Return children immediately to prevent flash
  return <>{children}</>;
}