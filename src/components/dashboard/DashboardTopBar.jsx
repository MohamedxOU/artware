"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useThemeStore, useUIStore } from '@/stores';

export default function DashboardAppBar({ 
  user, 
  onLogout, 
  isLoading, 
  notifications = [],
  activeSection = "dashboard",
  mobileMenuOpen = false,
  setMobileMenuOpen,
  className = ""
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isDarkMode, theme, isInitialized } = useThemeStore();
  const { addNotification } = useUIStore();

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close notifications dropdown
      if (showNotifications && !event.target.closest('.notifications-dropdown')) {
        setShowNotifications(false);
      }
      // Close profile dropdown
      if (showProfileMenu && !event.target.closest('.profile-dropdown')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showNotifications, showProfileMenu]);

  const handleLogout = async () => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (!confirmed) return;

    try {
      await onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Mock notifications for now
  const mockNotifications = notifications.length > 0 ? notifications : [
    {
      id: 1,
      title: "Nouveau événement",
      message: "Workshop AI & Machine Learning le 15/11",
      time: "Il y a 2h",
      read: false
    },
    {
      id: 2,
      title: "Document ajouté",
      message: "Guide des bonnes pratiques 2024",
      time: "Il y a 1 jour",
      read: true
    }
  ];

  const unreadNotifications = mockNotifications.filter(n => !n.read);

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
        {/* Right - Notifications and Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <div className="relative notifications-dropdown">
            <button 
              className="relative p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>

              {unreadNotifications.length > 0 && (
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs text-white font-medium">
                    {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
                  </span>
                </div>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications.length > 0 ? (
                    mockNotifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                          !notification.read ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                        }`}
                        onClick={() => setShowNotifications(false)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            !notification.read ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}></div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      <p className="text-sm">Aucune notification</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative profile-dropdown">
            <button 
              className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
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
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    {user?.profile_image_url ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden">
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
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-medium">
                          {user?.first_name?.[0]}{user?.last_name?.[0]}
                        </span>
                      </div>
                    )}
                    
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {user?.first_name} {user?.last_name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
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
                  
                  <button 
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
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
    </header>
  );
}