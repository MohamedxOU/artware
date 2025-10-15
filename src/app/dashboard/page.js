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
        return <CellsSection user={user} />;
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
    <div className="min-h-screen bg-base-100 relative">
      {/* Global Background Patterns for Dashboard */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Large primary circles */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary/12 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-36 h-36 bg-primary/10 rounded-full blur-2xl"></div>
        
        {/* Secondary color patterns */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-secondary/18 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-20 w-44 h-44 bg-secondary/12 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/3 w-28 h-28 bg-secondary/15 rounded-full blur-xl"></div>
        
        {/* Accent patterns */}
        <div className="absolute top-3/4 left-1/3 w-24 h-24 bg-accent/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-10 right-1/4 w-38 h-38 bg-accent/14 rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 left-1/2 w-30 h-30 bg-accent/12 rounded-full blur-xl"></div>
        
        {/* Additional geometric patterns */}
        <div className="absolute top-40 left-1/3 w-20 h-60 bg-primary/8 rounded-full blur-2xl rotate-45"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-50 bg-secondary/10 rounded-full blur-xl -rotate-45"></div>
        <div className="absolute top-1/2 right-20 w-18 h-45 bg-accent/12 rounded-full blur-lg rotate-12"></div>
        
        {/* Small scattered dots */}
        <div className="absolute top-16 left-1/2 w-12 h-12 bg-primary/25 rounded-full blur-sm"></div>
        <div className="absolute top-1/3 left-20 w-8 h-8 bg-secondary/30 rounded-full blur-sm"></div>
        <div className="absolute bottom-1/3 right-16 w-10 h-10 bg-accent/25 rounded-full blur-sm"></div>
        <div className="absolute top-2/3 left-16 w-14 h-14 bg-primary/20 rounded-full blur-md"></div>
        <div className="absolute bottom-16 left-1/2 w-16 h-16 bg-secondary/18 rounded-full blur-md"></div>
        
        {/* Overlapping larger shapes */}
        <div className="absolute top-0 left-1/4 w-56 h-56 bg-primary/6 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-52 h-52 bg-secondary/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-48 h-48 bg-accent/7 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-50 h-50 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
      {/* Dashboard Layout with Sidebar + App Bar */}
      <div className="relative z-10">
        <DashboardAppBar 
          user={user}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onLogout={logout}
          isLoading={authLoading}
          notifications={[]} // Replace with real notifications from your API
        >
          {/* Main Content Area is now inside DashboardAppBar */}
          <div className="p-6 h-full overflow-y-auto">
            {renderActiveSection()}
          </div>
        </DashboardAppBar>
      </div>
      
      {/* Floating Theme Switcher */}
      <FloatingThemeSwitcher />
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}