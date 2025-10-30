"use client";
import Home from '../components/home/home';
import { useGuestRoute } from '@/hooks/useAuth';

export default function Page() {
  // Route protection - redirect authenticated users to dashboard
  const { isLoading } = useGuestRoute();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-300 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content ">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <Home />
    </div>
  );
}
