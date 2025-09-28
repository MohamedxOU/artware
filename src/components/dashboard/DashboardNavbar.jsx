"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useThemeStore, useUIStore } from '@/stores';

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0H8v0z" />
      </svg>
    )
  },
  {
    id: 'cells',
    label: 'Cells',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 'events',
    label: 'Events',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
];

export default function DashboardNavbar({ user, activeSection, setActiveSection, onLogout, isLoading }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { theme, isDarkMode, toggleTheme } = useThemeStore();
  const { addNotification } = useUIStore();

  const handleLogout = async () => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (!confirmed) return;

    try {
      const result = await onLogout();
      
      if (result.success) {
        addNotification({
          type: 'success',
          message: 'Déconnexion réussie. À bientôt !',
          duration: 3000
        });
      } else if (result.error) {
        addNotification({
          type: 'error',
          message: result.error,
          duration: 5000
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      addNotification({
        type: 'error',
        message: 'Erreur lors de la déconnexion',
        duration: 5000
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-base-100 border-b border-base-300 shadow-sm">
      <div className="max-w-full mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Left - Logo */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <Image 
                src={isDarkMode ? "/logos/ArtwareLogo-darkMode.png" : "/logos/ArtwareLogo.png"}
                alt="Artware Logo" 
                width={120} 
                height={120}  
                className="rounded-full" 
              />
             
            </div>

            {/* Navigation Items */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-base-200 text-base-content font-medium'
                      : 'text-base-content/70 hover:text-base-content hover:bg-base-200/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Notifications */}
            <button className="relative p-2 text-base-content/70 hover:text-base-content hover:bg-base-200 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a.5.5 0 010-.707L20 9h-5M9 12a3 3 0 100-6 3 3 0 000 6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 text-base-content/70 hover:text-base-content hover:bg-base-200 rounded-lg transition-colors"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-3 p-2 hover:bg-base-200 rounded-lg transition-colors"
              >
                {user?.profile_image_url ? (
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image 
                        src={user.profile_image_url} 
                        alt={`${user.first_name} ${user.last_name}`}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                        unoptimized={user.profile_image_url.includes('imagekit.io')}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-content text-sm font-medium">
                      {user?.first_name?.[0]}{user?.last_name?.[0]}
                    </span>
                  </div>
                )}
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-base-content">
                    {user?.first_name} {user?.last_name}
                  </div>
                  <div className="text-xs text-base-content/60">
                    {user?.email}
                  </div>
                </div>
                <svg className="w-4 h-4 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-base-300">
                      <div className="text-sm font-medium text-base-content">
                        {user?.first_name} {user?.last_name}
                      </div>
                      <div className="text-xs text-base-content/60">
                        {user?.email}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        // Navigate to profile
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-base-content hover:bg-base-200 transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Profile</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        handleLogout();
                      }}
                      disabled={isLoading}
                      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-base-200 transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>{isLoading ? 'Déconnexion...' : 'Logout'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-base-300">
        <div className="flex space-x-1 px-4 py-2 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-base-200 text-base-content font-medium'
                  : 'text-base-content/70 hover:text-base-content hover:bg-base-200/50'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}