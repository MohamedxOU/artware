"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useThemeStore, useUIStore } from '@/stores';

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
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
    id: 'cells',
    label: 'Cells',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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

export default function DashboardAppBar({ 
  user, 
  activeSection, 
  setActiveSection, 
  onLogout, 
  isLoading, 
  notifications = [],
  children
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Determine logo source based on theme
  const getLogoSource = () => {
    if (!isMounted || !isInitialized) {
      return "/logos/ArtwareLogo.png";
    }
    
    return isDarkMode ? "/logos/ArtwareLogo-darkMode.png" : "/logos/ArtwareLogo.png";
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

  return (
    <div className="flex h-screen bg-transparent">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-base-200/90 backdrop-blur-md border-r border-base-300/50 transition-all duration-300 z-40 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-base-300">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h2 className="text-lg font-semibold text-base-content">Menu</h2>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="btn btn-ghost btn-sm btn-circle hidden lg:flex"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
              </svg>
            </button>
            {/* Close button for mobile */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-ghost btn-sm btn-circle lg:hidden"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col h-full">
          {/* Main Navigation */}
          <nav className="flex-1 mt-4 px-2 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-3 py-3 mb-2 rounded-lg transition-all duration-200 group ${
                  activeSection === item.id 
                    ? 'bg-primary text-primary-content shadow-lg' 
                    : 'text-base-content hover:bg-base-300'
                }`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                {!sidebarCollapsed && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
                {activeSection === item.id && !sidebarCollapsed && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-primary-content rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </nav>

          {/* Logout Button at Bottom - Always Visible */}
          <div className="px-2 py-4 border-t border-base-300/50 mt-auto">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full flex items-center px-3 py-3 rounded-lg text-error hover:bg-error/10 transition-all duration-200 group"
              title={sidebarCollapsed ? 'Logout' : ''}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {!sidebarCollapsed && (
                <span className="ml-3 font-medium">
                  {isLoading ? 'Déconnexion...' : 'Déconnexion'}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        {/* App Bar */}
        <header className="fixed top-0 right-0 left-0 bg-base-100/90 backdrop-blur-md border-b border-base-300/50 shadow-sm z-30" style={{
          left: sidebarCollapsed ? '4rem' : '16rem'
        }}>
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            {/* Left - Mobile Menu Button and Logo */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="btn btn-ghost btn-circle lg:hidden"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo */}
              <div className="flex items-center">
                <Image 
                  src={getLogoSource()}
                  alt="Artware Logo" 
                  width={100} 
                  height={40}  
                  className="h-8 lg:h-10 w-auto" 
                  priority
                />
              </div>
            </div>

            {/* Right - Notifications, User Info & Profile */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Notifications */}
              <div className="relative notifications-dropdown">
                <button 
                  className="btn btn-ghost btn-circle relative"
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfileMenu(false);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 lg:size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>

                  {unreadNotifications.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-error rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
                      </span>
                    </div>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-base-100 border border-base-300 rounded-xl shadow-lg z-50">
                    <div className="p-4 border-b border-base-300">
                      <h3 className="text-lg font-semibold text-base-content">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.length > 0 ? (
                        mockNotifications.slice(0, 5).map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-base-300 hover:bg-base-200 cursor-pointer ${
                              !notification.read ? 'bg-primary/5' : ''
                            }`}
                            onClick={() => setShowNotifications(false)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                !notification.read ? 'bg-primary' : 'bg-base-300'
                              }`}></div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-base-content">
                                  {notification.title}
                                </h4>
                                <p className="text-sm text-base-content/70 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-base-content/50 mt-2">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-base-content/60">
                          <p className="text-sm">Aucune notification</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Name (hidden on small screens) */}
              <div className="hidden lg:block text-right">
                <div className="text-sm font-medium text-base-content">
                  {user?.first_name} {user?.last_name}
                </div>
                <div className="text-xs text-base-content/60">
                  {user?.email}
                </div>
              </div>

              {/* Profile Image */}
              <div className="relative profile-dropdown">
                <button 
                  className="btn btn-ghost btn-circle avatar"
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                  }}
                >
                  {user?.profile_image_url ? (
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden">
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
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-content text-sm font-medium">
                        {user?.first_name?.[0]}{user?.last_name?.[0]}
                      </span>
                    </div>
                  )}
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2  bg-base-100 border border-base-300 rounded-xl shadow-lg z-50">
                    <ul className="menu p-2">
                      <li className="px-3 py-2 border-b border-base-300">
                        <div className="text-sm">
                          <div className="font-medium text-base-content">
                            {user?.first_name} {user?.last_name}
                          </div>
                          <div className="text-base-content/60">
                            {user?.email}
                          </div>
                        </div>
                      </li>
                      <li>
                        <button 
                          onClick={() => {
                            setActiveSection('profile');
                            setShowProfileMenu(false);
                          }}
                          className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg hover:bg-base-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Profile</span>
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => {
                            setActiveSection('reclamation');
                            setShowProfileMenu(false);
                          }}
                          className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg hover:bg-base-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <span>Réclamation</span>
                        </button>
                      </li>
                      <li className="border-t border-base-300 mt-2 pt-2">
                        <button 
                          onClick={() => {
                            handleLogout();
                            setShowProfileMenu(false);
                          }}
                          disabled={isLoading}
                          className="flex items-center space-x-2 text-error hover:bg-error/10 w-full px-3 py-2 rounded-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>{isLoading ? 'Déconnexion...' : 'Déconnexion'}</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 pt-16 lg:pt-20 bg-transparent">
          {children || (
            <div className="p-4 lg:p-6 h-full">
              {/* Default content when no children provided */}
              <div className="text-center py-20">
                <p className="text-base-content/60">Select a section from the sidebar</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}