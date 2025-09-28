"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useThemeStore, useUIStore } from '@/stores';

export default function DashboardAppBar({ user, onLogout, isLoading, onToggleMobileSidebar }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-base-100 border-b border-base-300 shadow-sm z-30">
      <div className="flex items-center justify-between h-full px-6">
        
        {/* Mobile Menu Button + Search Bar */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Mobile Menu Button */}
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 text-base-content/70 hover:text-base-content hover:bg-base-200 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="What do you want to find?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors placeholder-base-content/50"
            />
          </div>
        </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-base-content/70 hover:text-base-content hover:bg-base-200 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a.5.5 0 010-.707L20 9h-5M9 12a3 3 0 100-6 3 3 0 000 6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-base-100 border border-base-300 rounded-xl shadow-lg z-50">
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

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 text-base-content/70 hover:text-base-content hover:bg-base-200 rounded-lg transition-colors"
          >
            {isDarkMode ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Messages */}
          <button className="relative p-2 text-base-content/70 hover:text-base-content hover:bg-base-200 rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-3 p-2 hover:bg-base-200 rounded-lg transition-colors"
            >
              {user?.avatar ? (
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image 
                      src={user.avatar} 
                      alt={`${user.first_name} ${user.last_name}`}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                      unoptimized={user.avatar.includes('unsplash.com')}
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
                  {user?.role === 'admin' ? 'Admin' : 'Member'}
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
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-base-content hover:bg-base-200 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings</span>
                  </button>
                  
                  <div className="border-t border-base-300 my-1"></div>
                  
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
    </header>
  );
}