"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllAnnouncements } from '@/api/announcements';
import { getAllEvents } from '@/api/events';

export default function DashboardHome({ user, stats = {}, recentActivities = [] }) {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState([]);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  // Fetch announcements from API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoadingAnnouncements(true);
        const response = await getAllAnnouncements();
        
        // Sort by date (newest first) and take only 5 most recent
        const sortedAnnouncements = (response.announcements || [])
          .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
          .slice(0, 5);
        
        setAnnouncements(sortedAnnouncements);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
        setAnnouncements([]);
      } finally {
        setIsLoadingAnnouncements(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Fetch upcoming events from API
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setIsLoadingEvents(true);
        const response = await getAllEvents();
        
        // Filter events with dates yet to come
        const now = new Date();
        const futureEvents = (response.events || [])
          .filter(event => {
            if (!event.date_start) return false;
            const eventDate = new Date(event.date_start);
            return eventDate > now;
          })
          .sort((a, b) => new Date(a.date_start) - new Date(b.date_start))
          .slice(0, 3) // Take only first 3 upcoming events
          .map(event => ({
            id: event.event_id,
            title: event.title,
            subtitle: event.eventType === 'workshop' ? 'Workshop' : 
                     event.eventType === 'conference' ? 'Conférence' :
                     event.eventType === 'hackathon' ? 'Hackathon' : 'Événement',
            date: new Date(event.date_start).toLocaleDateString('fr-FR', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            }),
            time: event.time_start || '',
            location: event.location || 'À définir',
            icon: event.eventType === 'workshop' ? '🎓' :
                  event.eventType === 'conference' ? '🎤' :
                  event.eventType === 'hackathon' ? '💻' : '📅',
            image: event.image
          }));
        
        setUpcomingEvents(futureEvents);
      } catch (error) {
        console.error('Failed to fetch upcoming events:', error);
        setUpcomingEvents([]);
      } finally {
        setIsLoadingEvents(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  // Mock data matching the dashboard image
  const overviewStats = [
    { label: "Événements participés", value: 18, color: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-900/20" },
    { label: "Événements à venir", value: 97, color: "text-green-500", bgColor: "bg-green-50 dark:bg-green-900/20" },
    { label: "Cellules rejointes", value: 62, color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Certificats", value: 245, color: "text-pink-500", bgColor: "bg-pink-50 dark:bg-pink-900/20" },
  ];

  // Helper function to format announcement date
  const formatAnnouncementDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 1) {
      return "À l'instant";
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours}h`;
    } else if (diffInDays === 1) {
      return "Hier";
    } else if (diffInDays < 7) {
      return `Il y a ${diffInDays}j`;
    } else {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

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

      {/* Announcements and Events */}
      <div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Annonces</h2>
              {announcements.length > 0 && (
                <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold">
                  {announcements.length} NOUVELLE{announcements.length > 1 ? 'S' : ''}
                </span>
              )}
            </div>
            
            {isLoadingAnnouncements ? (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Chargement des annonces...</p>
              </div>
            ) : announcements.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {announcements.map((announcement) => (
                  <div 
                    key={announcement.id} 
                    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer flex-shrink-0 w-full lg:w-[600px] snap-start"
                    onClick={() => announcement.url && window.open(announcement.url, '_blank')}
                  >
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
                          {announcement.subtitle}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Publié {formatAnnouncementDate(announcement.published_at)}</span>
                          </div>
                          {announcement.url && (
                            <span className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center">
                              En savoir plus
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Aucune annonce</h3>
                <p className="text-gray-500 dark:text-gray-400">Il n'y a pas d'annonces pour le moment.</p>
              </div>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Événements à venir</h2>
              
            </div>
            
            {isLoadingEvents ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Chargement des événements...</p>
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className="space-y-6">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col lg:flex-row">
                      {/* Left side - Event Image */}
                      <div className="w-full lg:w-1/3 relative h-48 lg:h-auto lg:min-h-[280px]">
                        {event.image ? (
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                            <div className="text-6xl opacity-80">{event.icon}</div>
                          </div>
                        )}
                      </div>

                      {/* Right side - Event Details */}
                      <div className="w-full lg:w-2/3 p-6 relative flex flex-col">
                        {/* Date Badge */}
                        <div className="absolute top-4 right-4 text-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {event.date.split(' ')[2] || 'NOV'}
                          </div>
                          <div className="text-2xl font-bold text-pink-500">
                            {event.date.split(' ')[0] || '15'}
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

                        {/* Event Date */}
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <div className="text-lg font-bold text-pink-500">
                              {event.date}
                            </div>
                            {event.time && (
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {event.time}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Aucun événement à venir</h3>
                <p className="text-gray-500 dark:text-gray-400">Les prochains événements apparaîtront ici.</p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}