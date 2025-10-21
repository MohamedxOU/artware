"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useThemeStore, useUIStore } from '@/stores';

export default function DashboardAppBar({ 
  user, 
  onLogout, 
  isLoading, 
  activeSection = "dashboard",
  mobileMenuOpen = false,
  setMobileMenuOpen,
  className = ""
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isDarkMode, theme, isInitialized } = useThemeStore();
  const { addNotification } = useUIStore();

  // Set mounted state and check if mobile
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown
      if (showProfileMenu && !event.target.closest('.profile-dropdown')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showProfileMenu]);

  const handleLogout = async () => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (!confirmed) return;

    try {
      await onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Function to get the display title for the active section
  const getSectionTitle = (section) => {
    const titles = {
      dashboard: 'Dashboard',
      events: 'Événements',
      cells: 'Cellules',
      documents: 'Documents',
      settings: 'Paramètres',
      profile: 'Profile'
    };
    return titles[section] || 'Dashboard';
  };

  return (
    <header className={`bg-white dark:bg-gray-900 shadow-sm ${className}`}>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Left - Mobile Menu Button and Section Title */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen && setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Section Title */}
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white truncate">
            {getSectionTitle(activeSection)}
          </h1>
        </div>
        {/* Right - Profile */}
        <div className="flex items-center">
          {/* Profile Menu */}
          <div className="relative profile-dropdown">
            <button 
              className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {user?.profile_image_url ? (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                  <Image 
                    src={user.profile_image_url} 
                    alt={`${user.first_name} ${user.last_name}`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    unoptimized={user.profile_image_url.includes('imagekit.io')}
                  />
                </div>
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-medium">
                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                  </span>
                </div>
              )}
              
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-32 lg:max-w-none">
                  {user?.first_name} {user?.last_name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-32 lg:max-w-none">
                  {user?.email}
                </div>
              </div>

              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showProfileMenu && !isMobile && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-sm sm:w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    {user?.profile_image_url ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          src={user.profile_image_url} 
                          alt={`${user.first_name} ${user.last_name}`}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                          unoptimized={user.profile_image_url.includes('imagekit.io')}
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-lg font-medium">
                          {user?.first_name?.[0]}{user?.last_name?.[0]}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="font-medium text-gray-900 dark:text-white truncate">
                        {user?.first_name} {user?.last_name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <button 
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    View Profile
                  </button>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  
                  <button 
                    onClick={() => {
                      handleLogout();
                      setShowProfileMenu(false);
                    }}
                    disabled={isLoading}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {isLoading ? 'Déconnexion...' : 'Sign out'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Profile Modal */}
      {showProfileMenu && isMobile && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setShowProfileMenu(false)}>
          <div className="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
            
            {/* Profile Header */}
            <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-4">
                {user?.profile_image_url ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image 
                      src={user.profile_image_url} 
                      alt={`${user.first_name} ${user.last_name}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized={user.profile_image_url.includes('imagekit.io')}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-2xl font-medium">
                      {user?.first_name?.[0]}{user?.last_name?.[0]}
                    </span>
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {user?.first_name} {user?.last_name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-4">
              <button 
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center w-full px-6 py-4 text-base text-gray-700 dark:text-gray-300 active:bg-gray-50 dark:active:bg-gray-800"
              >
                <svg className="w-6 h-6 mr-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                View Profile
              </button>
              
              <div className="border-t border-gray-200 dark:border-gray-800 my-2"></div>
              
              <button 
                onClick={() => {
                  handleLogout();
                  setShowProfileMenu(false);
                }}
                disabled={isLoading}
                className="flex items-center w-full px-6 py-4 text-base text-red-600 active:bg-red-50 dark:active:bg-red-900/20"
              >
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {isLoading ? 'Déconnexion...' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}