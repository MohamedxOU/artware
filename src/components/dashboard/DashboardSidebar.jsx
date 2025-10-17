"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useThemeStore } from '@/stores';

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    )
  },
  {
    id: 'events',
    label: 'Evenements',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    )
  },
  {
    id: 'cells',
    label: 'Cellules',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    )
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    )
  }
];



export default function DashboardSidebar({ 
  activeSection, 
  setActiveSection, 
  onLogout, 
  isLoading,
  mobileMenuOpen = false,
  setMobileMenuOpen,
  className = ""
}) {
  const [isMounted, setIsMounted] = useState(false);
  const { isDarkMode, isInitialized } = useThemeStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (!confirmed) return;

    try {
      await onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Determine logo source based on theme
  const getLogoSource = () => {
    if (!isMounted || !isInitialized) {
      return "/logos/ArtwareLogo.png";
    }
    
    return isDarkMode ? "/logos/ArtwareLogo-darkMode.png" : "/logos/ArtwareLogo.png";
  };

  return (
    <div className={`w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col ${className}`}>
      {/* Logo Section */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 lg:border-b-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image 
              src={getLogoSource()}
              alt="Artware Logo" 
              width={120} 
              height={40}  
              className="h-6 sm:h-8 w-auto" 
              priority
            />
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="mb-6">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
              OVERVIEW
            </h3>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    // Close mobile menu when item is selected
                    if (setMobileMenuOpen) {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeSection === item.id 
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-l-4 border-purple-500' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className={`mr-3 ${activeSection === item.id ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
}