"use client";
import Image from 'next/image';
import { useState } from 'react';

export default function DashboardHome({ user, stats = {}, recentActivities = [] }) {
  // Mock data matching the dashboard image
  const overviewStats = [
    { label: "Événements participés", value: 18, color: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-900/20" },
    { label: "Événements à venir", value: 97, color: "text-green-500", bgColor: "bg-green-50 dark:bg-green-900/20" },
    { label: "Cellules rejointes", value: 62, color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Certificats", value: 245, color: "text-pink-500", bgColor: "bg-pink-50 dark:bg-pink-900/20" },
  ];

  const announcements = [
    { 
      id: 1, 
      title: "Nouvelle politique de sécurité", 
      type: "Politique", 
      date: "15 Nov 2024", 
      priority: "Important",
      author: "Admin",
      icon: "📋",
      color: "bg-red-500"
    },
    { 
      id: 2, 
      title: "Mise à jour du système", 
      type: "Technique", 
      date: "12 Nov 2024", 
      priority: "Normal",
      author: "Support",
      icon: "⚙️",
      color: "bg-blue-500"
    },
    { 
      id: 3, 
      title: "Nouvelle formation disponible", 
      type: "Formation", 
      date: "10 Nov 2024", 
      priority: "Info",
      author: "RH",
      icon: "�",
      color: "bg-green-500"
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Workshop Intelligence Artificielle",
      subtitle: "Machine Learning",
      date: "15 Nov 2024",
      time: "14:00",
      location: "Salle A",
      icon: "🤖"
    },
    {
      id: 2,
      title: "Conférence Cybersécurité",
      subtitle: "Sécurité des données",
      date: "18 Nov 2024",
      time: "10:00",
      location: "Amphithéâtre",
      icon: "�"
    },
    {
      id: 3,
      title: "Formation React Avancé",
      subtitle: "Développement Web",
      date: "22 Nov 2024",
      time: "09:00",
      location: "Lab Info",
      icon: "⚛️"
    },
  ];

  const attendedEvents = [
    { id: 1, title: "Séminaire Blockchain", subtitle: "Cryptomonnaies", date: "10 Oct", icon: "⛓️", color: "bg-purple-100" },
    { id: 2, title: "Workshop DevOps", subtitle: "CI/CD", date: "05 Oct", icon: "🔧", color: "bg-yellow-100" },
    { id: 3, title: "Conférence Big Data", subtitle: "Analytics", date: "28 Sep", icon: "�", color: "bg-blue-100" },
    { id: 4, title: "Formation IA", subtitle: "Machine Learning", date: "15 Sep", icon: "🤖", color: "bg-orange-100" },
  ];

  const communityGroups = [
    { id: 1, name: "Artificial Intelligence & Data", icon: "🤖", color: "bg-purple-500" },
    { id: 2, name: "Development & Innovation", icon: "�", color: "bg-blue-500" },
    { id: 3, name: "Coding & Competitive Programming", icon: "💻", color: "bg-green-500" },
    { id: 4, name: "Community & Solidarity", icon: "🤝", color: "bg-orange-500" },
  ];

  const recentDocuments = [
    { id: 1, name: "Guide des bonnes pratiques 2024", type: "PDF", size: "2.4 MB", date: "Il y a 2h", icon: "📄", color: "bg-red-500" },
    { id: 2, name: "Rapport annuel 2024", type: "DOC", size: "1.8 MB", date: "Hier", icon: "📘", color: "bg-blue-500" },
    { id: 3, name: "Budget prévisionnel", type: "XLS", size: "890 KB", date: "Il y a 3j", icon: "📊", color: "bg-green-500" },
    { id: 4, name: "Présentation projet AI", type: "PPT", size: "5.2 MB", date: "Il y a 1 sem", icon: "📑", color: "bg-orange-500" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-6">
      {/* Overview Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-2xl p-6 border border-gray-100 dark:border-gray-800`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</span>
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className={`h-1 ${stat.color.replace('text-', 'bg-')} rounded-full w-8`}></div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Course Taking */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Announcements</h2>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-colors">
                <span className="bg-white text-red-500 px-2 py-0.5 rounded text-xs font-bold">NEW</span>
                <span>New</span>
              </button>
            </div>
            
            <div className="space-y-6">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    {/* Icon */}
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-2xl p-4 flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        Check out our latest AI fundamentals course. Enroll now to get early access.
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Posted {announcement.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended for you */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Événements à venir</h2>
            </div>
            
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="flex">
                    {/* Left side - Event Image */}
                    <div className="w-1/3 relative min-h-[280px]">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                        <div className="text-6xl opacity-80">{event.icon}</div>
                      </div>
                    </div>

                    {/* Right side - Event Details */}
                    <div className="w-2/3 p-6 relative flex flex-col">
                      {/* Date Badge */}
                      <div className="absolute top-4 right-4 text-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Nov
                        </div>
                        <div className="text-2xl font-bold text-pink-500">
                          {event.date.split(' ')[1] || '15'}
                        </div>
                      </div>

                      {/* Event Title and Type */}
                      <div className="pr-16 mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {event.subtitle}
                        </p>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4-4a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <div className="text-lg font-bold text-pink-500 truncate">{event.location}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            ISS École, Maroc
                          </div>
                        </div>
                      </div>

                      {/* Countdown Timer */}
                      <div className="flex items-start gap-2 mb-6">
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm">
                            <span className="text-pink-500 font-bold">
                              5 jours 12 heures 30 minutes
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 ml-1">
                              avant l'événement!
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-auto">
                        <button className="w-full py-3 border-2 border-pink-500 text-pink-500 rounded-lg font-medium hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors duration-200">
                          S'inscrire à l'événement
                        </button>

                        {/* Small disclaimer */}
                        <p className="text-xs text-gray-400 text-center mt-2 italic">
                          *Places limitées, inscription obligatoire
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Upcoming Tests and Community */}
        <div className="space-y-8">
          {/* Community Groups */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Cellules de club</h2>
            </div>
            
            <div className="space-y-4">
              {communityGroups.map((group) => (
                <div key={group.id} className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`w-12 h-12 ${group.color} rounded-xl flex items-center justify-center text-white text-xl font-semibold`}>
                    {group.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{group.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Documents */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Documents récents</h2>
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`w-12 h-12 ${doc.color} rounded-xl flex items-center justify-center text-white text-2xl`}>
                    {doc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{doc.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attended Events */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Événements participés</h2>
            <div className="space-y-4 mb-6">
              {attendedEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${event.color} rounded-xl flex items-center justify-center text-xl`}>
                      {event.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{event.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{event.date}</p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                      Complété
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
              Voir tous les événements
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}