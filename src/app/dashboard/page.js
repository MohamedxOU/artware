"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore, useUIStore, useThemeStore } from '@/stores';
import { useProtectedRoute } from '@/hooks/useAuth';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import DashboardHome from '@/components/dashboard/DashboardHome';
import CellsSection from '@/components/dashboard/CellsSection';
import EventsSection from '@/components/dashboard/EventsSection';
import DocumentsSection from '@/components/dashboard/DocumentsSection';

function DashboardContent() {
  const router = useRouter();
  const { user, logout, isLoading: authLoading } = useAuthStore();
  const { addNotification } = useUIStore();
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // Route protection - redirect unauthenticated users
  const { isAuthenticated, isLoading } = useProtectedRoute();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">Chargement...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will be redirected)
  if (!isAuthenticated) {
    return null;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome user={user} />;
      case 'cells':
        return <CellsSection />;
      case 'events':
        return <EventsSection />;
      case 'documents':
        return <DocumentsSection />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <DashboardNavbar 
        user={user}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={logout}
        isLoading={authLoading}
      />
      
      <main className="pt-16">
        {renderActiveSection()}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}