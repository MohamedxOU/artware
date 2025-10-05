"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore, useUIStore, useThemeStore } from '@/stores';
import { useProtectedRoute } from '@/hooks/useAuth';
import DashboardAppBar from '@/components/dashboard/DashboardAppBar';
import FloatingThemeSwitcher from '@/components/dashboard/FloatingThemeSwitcher';
import DashboardHome from '@/components/dashboard/DashboardHome';
import CellsSection from '@/components/dashboard/CellsSection';
import EventsSection from '@/components/dashboard/EventsSection';
import DocumentsSection from '@/components/dashboard/DocumentsSection';
import NotificationsSection from '@/components/dashboard/NotificationsSection';
import ProfileSection from '@/components/dashboard/ProfileSection';
import ReclamationSection from '@/components/dashboard/ReclamationSection';
import TargetCursor from '@/components/TargetCursor.jsx';

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
        return <DashboardHome 
          user={user} 
          stats={{}} 
          recentActivities={[]} 
        />;
      case 'cells':
        return <CellsSection />;
      case 'events':
        return <EventsSection />;
      case 'documents':
        return <DocumentsSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'profile':
        return <ProfileSection user={user} />;
      case 'reclamation':
        return <ReclamationSection user={user} />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      {/* App Bar Navigation */}
      <DashboardAppBar 
        user={user}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={logout}
        isLoading={authLoading}
        notifications={[]} // Replace with real notifications from your API
      />
      
      {/* Main Content */}
      <main className="min-h-screen pt-20">
        <div className="p-6">
          {renderActiveSection()}
        </div>
      </main>
      
      {/* Floating Theme Switcher */}
      <FloatingThemeSwitcher />
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}