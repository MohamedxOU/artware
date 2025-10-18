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
    { id: 1, name: "Design Community, USA", members: "112K Members", icon: "🎨", color: "bg-teal-500" },
    { id: 2, name: "SEO Helpline 24/7", members: "78K Members", icon: "📈", color: "bg-purple-500" },
    { id: 3, name: "UI/UX Worldwide", members: "498K Members", icon: "🌍", color: "bg-orange-500" },
    { id: 4, name: "UI Hunter", members: "212K Members", icon: "🎯", color: "bg-blue-500" },
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
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Annonces</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="col-span-4">Titre</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Auteur</div>
                  <div className="col-span-2">Priorité</div>
                </div>
              </div>
              
              {/* Table Body */}
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Titre */}
                      <div className="col-span-4 flex items-center space-x-3">
                        <div className={`w-10 h-10 ${announcement.color} rounded-lg flex items-center justify-center text-white text-lg`}>
                          {announcement.icon}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{announcement.title}</span>
                      </div>
                      
                      {/* Type */}
                      <div className="col-span-2 text-gray-600 dark:text-gray-400">
                        {announcement.type}
                      </div>
                      
                      {/* Date */}
                      <div className="col-span-2 text-gray-600 dark:text-gray-400">
                        {announcement.date}
                      </div>
                      
                      {/* Auteur */}
                      <div className="col-span-2 flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                            {announcement.author[0]}
                          </span>
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">{announcement.author}</span>
                      </div>
                      
                      {/* Priorité */}
                      <div className="col-span-2 flex justify-end">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          announcement.priority === 'Urgent' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : announcement.priority === 'Important'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {announcement.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended for you */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Événements à venir</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-0 overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Image Section */}
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-6 flex items-center justify-center relative">
                    <div className="text-6xl opacity-80">{event.icon}</div>
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="absolute bottom-6 left-6 w-2 h-2 bg-white/20 rounded-full"></div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6">
                    {/* Category Label */}
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
                      Fireside chat
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                      {event.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      Apprenez des fondateurs qui ont réussi à développer leurs startups et découvrez des stratégies pour croître durablement.
                    </p>
                    
                    {/* View Details Button */}
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors w-full">
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Upcoming Tests and Community */}
        <div className="space-y-8">
          {/* Upcoming Tests */}
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

          {/* Community Groups */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Community Groups</h2>
              <button className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              {communityGroups.map((group) => (
                <div key={group.id} className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`w-12 h-12 ${group.color} rounded-xl flex items-center justify-center text-white text-xl font-semibold`}>
                    {group.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{group.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{group.members}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}