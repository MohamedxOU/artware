"use client";
import { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopBar from './DashboardTopBar';

export default function DashboardLayout({ 
  user, 
  activeSection, 
  setActiveSection, 
  onLogout, 
  isLoading, 
  notifications = [],
  children
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-base-100">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <DashboardSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={onLogout}
        isLoading={isLoading}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        className={`${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static z-50 lg:z-auto transition-transform duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
        } w-64`}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Bar */}
        <DashboardTopBar
          user={user}
          activeSection={activeSection}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-base-100">
          <div className="container mx-auto px-6 py-8">
            {children || (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-primary  rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-base-content mb-2">
                    Welcome to your Dashboard
                  </h3>
                  <p className="text-base-content ">
                    Select a section from the sidebar to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}