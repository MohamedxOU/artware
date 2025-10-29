"use client";
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores';

export default function StoreInitializer({ children }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check authentication status
    checkAuth();
    
    // Mark as ready
    setIsReady(true);
  }, [checkAuth]);

  // Return children immediately to prevent flash
  return <>{children}</>;
}