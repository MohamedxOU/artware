"use client";
import { useEffect, useState } from 'react';
import { useThemeStore, useAuthStore } from '@/stores';

export default function StoreInitializer({ children }) {
  const { initializeTheme, isInitialized } = useThemeStore();
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsClientReady(true);
      
      // Initialize theme on app load
      initializeTheme();
      
      // Check authentication status on app load
      checkAuth();
    }, 50);

    return () => clearTimeout(timer);
  }, [initializeTheme, checkAuth]);

  // Show minimal loading to prevent flash
  if (!isClientReady || !isInitialized) {
    return (
      <div style={{ opacity: 0.7 }}>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}