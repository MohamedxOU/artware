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
  notifications = [] 
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
      if (!event.target.closest('.dropdown')) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
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

  // Handle navigation clicks
  const handleNavClick = (itemId) => {
    setActiveSection(itemId);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-base-100 border-b border-base-300 shadow-sm backdrop-blur-md">
      <div className="max-w-full mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Left - Logo */}
        <div className="flex items-center">
          <Image 
            src={getLogoSource()}
            alt="Artware Logo" 
            width={120} 
            height={120}  
            className="rounded-full" 
            priority
          />
        </div>

        {/* Middle - Animated Navigation */}
        <div className="hidden md:flex items-center space-x-1  rounded-2xl p-2 backdrop-blur-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                relative flex flex-col items-center px-4 py-3 rounded-xl transition-all duration-300 ease-out
                hover:bg-base-300/50 hover:scale-105 hover:shadow-lg
                ${activeSection === item.id 
                  ? 'bg-primary text-primary-content shadow-lg scale-105 animate-pulse' 
                  : 'text-base-content hover:text-primary'
                }
                group
              `}
            >
              {/* Icon with animation */}
              <div className={`
                transition-all duration-300 ease-out
                ${activeSection === item.id ? 'scale-110 animate-bounce' : 'group-hover:scale-110'}
              `}>
                {item.icon}
              </div>
              
              {/* Label with animation */}
              <span className={`
                text-xs font-medium mt-1 transition-all duration-300 ease-out
                ${activeSection === item.id ? 'font-bold' : 'group-hover:font-semibold'}
              `}>
                {item.label}
              </span>
              
              {/* Active indicator dot */}
              {activeSection === item.id && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-content rounded-full animate-ping" />
              )}
              
              {/* Hover effect background */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </button>
          ))}
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className="md:hidden relative">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left flex items-center space-x-3 ${
                      activeSection === item.id ? 'active text-primary bg-primary/10' : ''
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right - Notifications & Profile */}
        <div className="flex items-center space-x-4">
          
          {/* Notifications */}
          <div className="relative dropdown dropdown-end">
            <label 
              tabIndex={0} 
              className="btn btn-ghost btn-circle relative"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a.5.5 0 010-.707L20 9h-5M9 12a3 3 0 100-6 3 3 0 000 6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {unreadNotifications.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-error rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
                  </span>
                </div>
              )}
            </label>
            
            {showNotifications && (
              <div className="dropdown-content mt-2 w-80 bg-base-100 border border-base-300 rounded-xl shadow-lg z-50">
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
                {mockNotifications.length > 5 && (
                  <div className="p-3 text-center border-t border-base-300">
                    <button 
                      onClick={() => {
                        setActiveSection('notifications');
                        setShowNotifications(false);
                      }}
                      className="text-sm text-primary hover:text-primary/80 underline"
                    >
                      Voir toutes les notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Avatar & Dropdown */}
          <div className="relative dropdown dropdown-end">
            <label 
              tabIndex={0} 
              className="btn btn-ghost btn-circle avatar"
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
            >
              {user?.profile_image_url ? (
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
              ) : (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-content text-sm font-medium">
                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                  </span>
                </div>
              )}
            </label>
            
            {showProfileMenu && (
              <ul className="dropdown-content mt-2 menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
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
                    className="flex items-center space-x-2"
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
                    className="flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>Réclamation</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      handleLogout();
                    }}
                    disabled={isLoading}
                    className="flex items-center space-x-2 text-error hover:bg-error/10"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>{isLoading ? 'Déconnexion...' : 'Logout'}</span>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}