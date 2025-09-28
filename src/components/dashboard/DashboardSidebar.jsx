"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useThemeStore, useUIStore } from '@/stores';

const sidebarItems = [
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

const additionalItems = [
  {
    id: 'library',
    label: 'Library',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    id: 'account',
    label: 'Account',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a.5.5 0 010-.707L20 9h-5M9 12a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

export default function DashboardSidebar({ user, activeSection, setActiveSection, onLogout, isLoading, isMobileOpen, onCloseMobile, onCollapseChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { addNotification } = useUIStore();

  const handleCollapseToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapseChange) {
      onCollapseChange(newCollapsedState);
    }
  };

  const handleLogout = async () => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (!confirmed) return;

    try {
      await onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const mockNotifications = [
    {
      id: 1,
      title: "Nouveau membre",
      message: "Marie Martin a rejoint le club",
      time: "Il y a 2h",
      read: false,
      type: "user"
    },
    {
      id: 2,
      title: "Événement à venir",
      message: "Workshop React dans 3 jours",
      time: "Il y a 4h",
      read: false,
      type: "event"
    },
    {
      id: 3,
      title: "Document partagé",
      message: "Guide JavaScript mis à jour",
      time: "Hier",
      read: true,
      type: "document"
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onCloseMobile}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-base-100 border-r border-base-300 shadow-lg transition-all duration-300 z-50 ${
        isCollapsed ? 'w-20' : 'w-64'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:block`}>
      <div className="flex flex-col h-full">
        
        {/* Header with Logo */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <Image 
              src={isDarkMode ? "/logos/ArtwareLogo-darkMode.png" : "/logos/ArtwareLogo.png"}
              alt="Artware Logo" 
              width={isCollapsed ? 32 : 128} 
              height={120}  
              className="rounded-full flex-shrink-0" 
            />
            
          </div>
          <button
            onClick={handleCollapseToggle}
            className="p-2 hover:bg-base-200 rounded-lg transition-colors hidden lg:flex"
          >
            <svg className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4">
          <nav className="space-y-1 px-3">
            {/* Main Navigation */}
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-content shadow-lg'
                      : 'text-base-content/70 hover:text-base-content hover:bg-base-200'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.label : ''}
                >
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Separator */}
            <div className="my-4 border-t border-base-300"></div>

            {/* Additional Items */}
            <div className="space-y-1">
              {additionalItems.map((item) => (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => {
                      if (item.id === 'notifications') {
                        setShowNotifications(!showNotifications);
                      } else {
                        setActiveSection(item.id);
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                      activeSection === item.id || (item.id === 'notifications' && showNotifications)
                        ? 'bg-primary text-primary-content shadow-lg'
                        : 'text-base-content/70 hover:text-base-content hover:bg-base-200'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <div className="flex-shrink-0 relative">
                      {item.icon}
                      {item.id === 'notifications' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></div>
                      )}
                    </div>
                    {!isCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {item.id === 'notifications' && showNotifications && !isCollapsed && (
                    <div className="absolute right-full top-0 mr-2 w-80 bg-base-100 border border-base-300 rounded-xl shadow-lg z-50">
                      <div className="p-4 border-b border-base-300">
                        <h3 className="text-lg font-semibold text-base-content">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {mockNotifications.map((notification) => (
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
                        ))}
                      </div>
                      <div className="p-3 text-center border-t border-base-300">
                        <a href="#" className="text-sm text-primary hover:text-primary/80">
                          Voir toutes les notifications
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-base-300">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 bg-base-200 rounded-xl`}>
            {user?.avatar ? (
              <div className="avatar">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image 
                    src={user.avatar} 
                    alt={`${user.first_name} ${user.last_name}`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    unoptimized={user.avatar.includes('unsplash.com')}
                  />
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-content text-sm font-medium">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </span>
              </div>
            )}
            {!isCollapsed && user && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-base-content truncate">
                  {user.first_name} {user.last_name}
                </div>
                <div className="text-xs text-base-content/60 truncate">
                  {user.role === 'admin' ? 'Administrateur' : 'Membre'}
                </div>
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full mt-3 flex items-center justify-center space-x-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>{isLoading ? 'Déconnexion...' : 'Logout'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
}