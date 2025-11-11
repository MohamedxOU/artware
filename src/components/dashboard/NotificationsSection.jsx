"use client";
import { useState } from 'react';

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    title: "Nouveau événement: Hackathon IA 2024",
    message: "Un nouveau hackathon sur l'Intelligence Artificielle vient d'être programmé pour le 12 octobre.",
    type: "event",
    time: "Il y a 2 heures",
    read: false,
    avatar: "🎯"
  },
  {
    id: 2,
    title: "Invitation rejoindre la cellule Web",
    message: "You have been invited to join the Web Development cell. Do you accept this invitation?",
    type: "invitation",
    time: "Il y a 5 heures",
    read: false,
    avatar: "💻"
  },
  {
    id: 3,
    title: "Document partagé: Guide React",
    message: "Un nouveau document 'Guide complet React 2024' a été partagé dans la bibliothèque.",
    type: "document",
    time: "Hier",
    read: true,
    avatar: "📄"
  },
  {
    id: 4,
    title: "Félicitations! Projet approuvé",
    message: "Votre projet 'Application de gestion des événements' a été approuvé par l'équipe dirigeante.",
    type: "success",
    time: "Il y a 2 jours",
    read: true,
    avatar: "🎉"
  },
  {
    id: 5,
    title: "Rappel: Réunion bureau demain",
    message: "N'oubliez pas la réunion du bureau prévue demain à 14h en salle de conférence.",
    type: "reminder",
    time: "Il y a 3 jours",
    read: true,
    avatar: "⏰"
  },
  {
    id: 6,
    title: "Mise à jour système",
    message: "Le système de gestion des membres a été mis à jour. Nouvelles fonctionnalités disponibles.",
    type: "system",
    time: "Il y a 1 semaine",
    read: true,
    avatar: "🔧"
  }
];

const notificationStats = {
  total: 24,
  unread: 5,
  today: 3,
  thisWeek: 12
};

export default function NotificationsSection({ notifications = mockNotifications, stats = notificationStats }) {
  const [filter, setFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const markAsRead = (id) => {
    // In a real app, this would make an API call
   
  };

  const markAllAsRead = () => {
    // In a real app, this would make an API call
  
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'event': return 'border-blue-200 bg-blue-50  dark:border-blue-800 dark:bg-blue-900 ';
      case 'invitation': return 'border-purple-200 bg-purple-50  dark:border-purple-800 dark:bg-purple-900 ';
      case 'document': return 'border-green-200 bg-green-50  dark:border-green-800 dark:bg-green-900 ';
      case 'success': return 'border-emerald-200 bg-emerald-50  dark:border-emerald-800 dark:bg-emerald-900 ';
      case 'reminder': return 'border-orange-200 bg-orange-50  dark:border-orange-800 dark:bg-orange-900 ';
      case 'system': return 'border-gray-200 bg-gray-50  dark:border-gray-800 dark:bg-gray-900 ';
      default: return 'border-base-300 bg-base-100 ';
    }
  };

  return (
    <div className="w-full relative">
      {/* Background Patterns - Similar to Login Screen */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large primary circles */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary/12 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-36 h-36 bg-primary  rounded-full blur-2xl"></div>
        
        {/* Secondary color patterns */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-secondary/18 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-20 w-44 h-44 bg-secondary/12 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/3 w-28 h-28 bg-secondary/15 rounded-full blur-xl"></div>
        
        {/* Accent patterns */}
        <div className="absolute top-3/4 left-1/3 w-24 h-24 bg-accent  rounded-full blur-lg"></div>
        <div className="absolute bottom-10 right-1/4 w-38 h-38 bg-accent/14 rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 left-1/2 w-30 h-30 bg-accent/12 rounded-full blur-xl"></div>
        
        {/* Additional geometric patterns */}
        <div className="absolute top-40 left-1/3 w-20 h-60 bg-primary/8 rounded-full blur-2xl rotate-45"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-50 bg-secondary  rounded-full blur-xl -rotate-45"></div>
        <div className="absolute top-1/2 right-20 w-18 h-45 bg-accent/12 rounded-full blur-lg rotate-12"></div>
        
        {/* Small scattered dots */}
        <div className="absolute top-16 left-1/2 w-12 h-12 bg-primary/25 rounded-full blur-sm"></div>
        <div className="absolute top-1/3 left-20 w-8 h-8 bg-secondary   rounded-full blur-sm"></div>
        <div className="absolute bottom-1/3 right-16 w-10 h-10 bg-accent/25 rounded-full blur-sm"></div>
        <div className="absolute top-2/3 left-16 w-14 h-14 bg-primary  rounded-full blur-md"></div>
        <div className="absolute bottom-16 left-1/2 w-16 h-16 bg-secondary/18 rounded-full blur-md"></div>
        
        {/* Overlapping larger shapes */}
        <div className="absolute top-0 left-1/4 w-56 h-56 bg-primary/6 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-52 h-52 bg-secondary/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-48 h-48 bg-accent/7 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-50 h-50 bg-primary  rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="mb-8 relative z-10">
        <div className="backdrop-blur-sm bg-base-100  rounded-2xl p-6 border border-base-300  shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-base-content mb-2">Notifications</h1>
              <p className="text-base-content ">Restez au courant de toutes les activités du club</p>
            </div>
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-primary hover:bg-primary-focus text-primary-content rounded-xl transition-colors text-sm font-medium"
            >
              Tout marquer comme lu
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
        <div className="backdrop-blur-sm bg-blue-500  rounded-2xl p-6 border border-blue-500  shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.total}</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total</p>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-red-500  rounded-2xl p-6 border border-red-500  shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-red-700 dark:text-red-300">{stats.unread}</h3>
            <p className="text-red-600 dark:text-red-400 text-sm font-medium">Non lues</p>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-green-500  rounded-2xl p-6 border border-green-500  shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.today}</h3>
            <p className="text-green-600 dark:text-green-400 text-sm font-medium">Aujourd'hui</p>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-purple-500  rounded-2xl p-6 border border-purple-500  shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.thisWeek}</h3>
            <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Cette semaine</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 relative z-10">
        <div className="backdrop-blur-sm bg-base-100  rounded-2xl p-4 border border-base-300  shadow-sm">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'Toutes', count: stats.total },
              { key: 'unread', label: 'Non lues', count: stats.unread },
              { key: 'read', label: 'Lues', count: stats.total - stats.unread }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === filterOption.key
                    ? 'bg-primary text-primary-content shadow-sm'
                    : 'bg-base-200  text-base-content  hover:bg-base-200'
                }`}
              >
                {filterOption.label} ({filterOption.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4 relative z-10">
        {filteredNotifications.length === 0 ? (
          <div className="backdrop-blur-sm bg-base-100  rounded-2xl p-8 text-center border border-base-300  shadow-sm">
            <div className="w-16 h-16 bg-base-300  rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-base-content " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-base-content mb-2">Aucune notification</h3>
            <p className="text-base-content ">
              {filter === 'unread' ? 'Toutes vos notifications ont été lues.' : 
               filter === 'read' ? 'Aucune notification lue pour le moment.' :
               'Aucune notification disponible.'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`backdrop-blur-sm rounded-2xl p-6 border shadow-sm transition-all hover:shadow-md cursor-pointer ${
                getNotificationColor(notification.type)
              } ${!notification.read ? 'ring-2 ring-primary ' : ''}`}
              onClick={() => {
                setSelectedNotification(notification);
                if (!notification.read) markAsRead(notification.id);
              }}
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl flex-shrink-0">
                  {notification.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`text-base font-semibold ${!notification.read ? 'text-base-content' : 'text-base-content '}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2 mt-2"></div>
                    )}
                  </div>
                  <p className={`text-sm mb-3 ${!notification.read ? 'text-base-content ' : 'text-base-content '}`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-base-content ">{notification.time}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      notification.type === 'event' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900  dark:text-blue-300' :
                      notification.type === 'invitation' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900  dark:text-purple-300' :
                      notification.type === 'document' ? 'bg-green-100 text-green-700 dark:bg-green-900  dark:text-green-300' :
                      notification.type === 'success' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900  dark:text-emerald-300' :
                      notification.type === 'reminder' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900  dark:text-orange-300' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-900  dark:text-gray-300'
                    }`}>
                      {notification.type === 'event' ? 'Événement' :
                       notification.type === 'invitation' ? 'Invitation' :
                       notification.type === 'document' ? 'Document' :
                       notification.type === 'success' ? 'Succès' :
                       notification.type === 'reminder' ? 'Rappel' :
                       'Système'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}