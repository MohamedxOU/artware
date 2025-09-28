"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore, useUIStore, useThemeStore } from '@/stores';
import { useProtectedRoute } from '@/hooks/useAuth';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import FloatingThemeSwitcher from '@/components/dashboard/FloatingThemeSwitcher';
import DashboardHome from '@/components/dashboard/DashboardHome';
import CellsSection from '@/components/dashboard/CellsSection';
import EventsSection from '@/components/dashboard/EventsSection';
import DocumentsSection from '@/components/dashboard/DocumentsSection';
import NotificationsSection from '@/components/dashboard/NotificationsSection';
import TargetCursor from '@/components/TargetCursor.jsx';

function DashboardContent() {
  const router = useRouter();
  const { user, logout, isLoading: authLoading } = useAuthStore();
  const { addNotification } = useUIStore();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
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
      {/* Sidebar Navigation */}
      <DashboardSidebar 
        user={user}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={logout}
        isLoading={authLoading}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onCollapseChange={setIsSidebarCollapsed}
        notifications={[]} // Replace with real notifications from your API
      />
      
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-3 bg-base-100 border border-base-300 rounded-lg shadow-lg text-base-content/70 hover:text-base-content hover:bg-base-200 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Main Content */}
      <main className={`min-h-screen transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        <div className="p-6 pt-20 lg:pt-6">
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