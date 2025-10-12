"use client";
import Image from 'next/image';
import { useState } from 'react';

export default function DashboardHome({ user, stats = {}, recentActivities = [] }) {
  // Mock data for alerts - in real app these would come from props or API
  const upcomingEvents = [
    { id: 1, title: "Workshop AI & Machine Learning", date: "2024-11-15", time: "14:00" },
    { id: 2, title: "Hackathon Spring 2024", date: "2024-11-20", time: "09:00" },
  ];

  const attendedEvents = [
    { id: 1, title: "Conférence Cybersécurité", date: "2024-10-28", attended: true },
    { id: 2, title: "Formation React Advanced", date: "2024-10-25", attended: true },
    { id: 3, title: "Meetup Design Thinking", date: "2024-10-20", attended: true },
    { id: 4, title: "Workshop DevOps", date: "2024-10-15", attended: true },
    { id: 5, title: "Séminaire Innovation", date: "2024-10-10", attended: true },
  ];

  const newDocuments = [
    { id: 1, title: "Guide des bonnes pratiques 2024", type: "Document", date: "2024-11-01" },
    { id: 2, title: "Nouvelle politique de sécurité", type: "Annonce", date: "2024-10-30" },
  ];

  const [showAllEventsModal, setShowAllEventsModal] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 relative min-h-full">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm rounded-3xl p-6 border border-base-300/20 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="text-3xl">👋</div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-base-content">
              Bienvenue, {user?.first_name} !
            </h1>
            <p className="text-base-content/70 text-base lg:text-lg mt-1">
              Ravi de vous revoir aujourd&apos;hui
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 relative z-10">
        {/* Left Column - Profile Card */}
        <div className="xl:col-span-1">
          <div className="relative group rounded-3xl overflow-hidden h-[420px] cursor-pointer shadow-2xl transition-all duration-700 ease-out hover:shadow-3xl">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/40"></div>
            
            {/* Image Container */}
            <div className="relative h-full overflow-hidden">
              {user?.profile_image_url ? (
                <Image
                  src={user.profile_image_url}
                  alt={`${user.first_name} ${user.last_name}`}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  unoptimized={user.profile_image_url.includes('imagekit.io')}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary via-primary/90 to-secondary flex items-center justify-center transition-all duration-700 group-hover:scale-105">
                  <span className="text-white text-6xl font-bold tracking-wide">
                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                  </span>
                </div>
              )}
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              
              {/* Content overlay - show details on hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 transform translate-y-full group-hover:translate-y-0">
                <div className="space-y-3">
                  <h3 className="text-white font-bold text-2xl transition-all duration-500 opacity-0 group-hover:opacity-100">
                    {user?.first_name} {user?.last_name}
                  </h3>
                  <p className="text-primary font-semibold text-base transition-all duration-500 delay-100 opacity-0 group-hover:opacity-100">
                    {user?.specialty?.replace('-', ' ') || 'Membre Artware'}
                  </p>
                  <div className="flex items-center space-x-2 transition-all duration-500 delay-150 opacity-0 group-hover:opacity-100">
                    <span className="text-white/90 text-sm">Niveau {user?.level || 'Expert'}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-400 text-sm font-medium">Actif</span>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed transition-opacity duration-500 delay-200 opacity-0 group-hover:opacity-100">
                    Membre passionné du club Artware, contribuant activement aux projets innovants et à la communauté technologique.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-4 transition-all duration-500 delay-300 opacity-0 group-hover:opacity-100">
                    <button className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-xl font-semibold transition-all duration-200">
                      View Profile
                    </button>
                    <button 
                      className="p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 rounded-xl transition-all duration-200"
                      onClick={() => document.getElementById('profile-image-input').click()}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating name for non-hover state */}
              <div className="absolute bottom-4 left-4 right-4 text-center transition-all duration-500 group-hover:opacity-0">
                <h3 className="text-white font-semibold text-lg mb-1 drop-shadow-lg">
                  {user?.first_name} {user?.last_name}
                </h3>
                <p className="text-white/90 text-sm font-medium drop-shadow-lg">
                  {user?.specialty?.replace('-', ' ') || 'Membre Artware'}
                </p>
              </div>

              {/* Modern decorative elements */}
              <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-primary transition-all duration-500 opacity-100 scale-100"></div>
              <div className="absolute top-6 left-6 w-1 h-8 bg-white/60 rounded-full transition-all duration-500 opacity-100"></div>
              
              {/* Status indicator */}
              <div className="absolute top-6 right-12 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white/80 text-xs font-medium drop-shadow-lg">En ligne</span>
              </div>

              {/* Hidden file input */}
              <input 
                id="profile-image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    console.log('Image selected:', file);
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Column - All Cards */}
        <div className="xl:col-span-2 space-y-6 relative z-10">
          {/* Upcoming Events Alert */}
          <div className="bg-blue-50/80 backdrop-blur-md dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  Événements à venir
                </h3>
              </div>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex justify-between items-center p-3 bg-white/50 dark:bg-blue-800/30 rounded-xl">
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">{event.title}</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">{event.date} à {event.time}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Attended Events Alert - Moved to right side */}
          <div className="bg-green-50/80 backdrop-blur-md dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                  Événements récents
                </h3>
              </div>
              <button 
                onClick={() => setShowAllEventsModal(true)}
                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 text-sm font-medium flex items-center gap-1"
              >
                Voir tout
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              {attendedEvents.slice(0, 2).map((event) => (
                <div key={event.id} className="flex justify-between items-center p-3 bg-white/50 dark:bg-green-800/30 rounded-xl">
                  <div>
                    <p className="font-medium text-green-900 dark:text-green-100">{event.title}</p>
                    <p className="text-sm text-green-700 dark:text-green-300">Participé le {event.date}</p>
                  </div>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Documents/Announcements Alert */}
          <div className="bg-amber-50/80 backdrop-blur-md dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                Nouveaux documents & annonces
              </h3>
            </div>
            <div className="space-y-3">
              {newDocuments.map((doc) => (
                <div key={doc.id} className="flex justify-between items-center p-3 bg-white/50 dark:bg-amber-800/30 rounded-xl">
                  <div>
                    <p className="font-medium text-amber-900 dark:text-amber-100">{doc.title}</p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">{doc.type} • {doc.date}</p>
                  </div>
                  <button className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All Events Modal */}
      {showAllEventsModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-base-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-base-content">
                    Tous les événements participés
                  </h3>
                  <p className="text-base-content/60 text-sm">
                    {attendedEvents.length} événements au total
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowAllEventsModal(false)}
                className="btn btn-ghost btn-circle"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {attendedEvents.map((event, index) => (
                  <div 
                    key={event.id} 
                    className="flex items-center justify-between p-4 bg-base-200 rounded-xl hover:bg-base-300 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-base-content">{event.title}</h4>
                        <p className="text-base-content/60 text-sm">Participé le {event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-green-600 dark:text-green-400 text-sm font-medium">Participé</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-base-300">
              <button 
                onClick={() => setShowAllEventsModal(false)}
                className="btn btn-primary"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}