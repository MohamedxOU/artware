"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAllEvents } from '@/api/events';

// Mock data for demonstration
const mockEvents = [
  {
    id: 1,
    title: "Hackathon Intelligence Artificielle 2024",
    date: "Samedi, 12 Oct",
    location: "ISS École, Fès",
    price: "Gratuit",
    image: "/events/hackathon-ai.jpg",
    attendees: 45,
    category: "Intelligence Artificielle",
    type: "upcoming"
  },
  {
    id: 2,
    title: "Workshop React & Next.js Avancé",
    date: "Vendredi, 18 Oct",
    location: "ISS École, Fès",
    price: "Gratuit",
    image: "/events/workshop-react.jpg",
    attendees: 32,
    category: "Développement Web",
    type: "upcoming"
  },
  {
    id: 3,
    title: "Conférence Cybersécurité & Éthique",
    date: "Mercredi, 25 Sep",
    location: "ISS École, Fès",
    price: "Gratuit",
    image: "/events/conference-cyber.jpg",
    attendees: 28,
    category: "Cybersécurité",
    type: "attended"
  },
  {
    id: 4,
    title: "Formation Machine Learning",
    date: "Lundi, 23 Sep",
    location: "En ligne",
    price: "Gratuit",
    image: "/events/formation-ml.jpg",
    attendees: 22,
    category: "Machine Learning",
    type: "attended"
  },
  {
    id: 5,
    title: "DevFest Mobile & Flutter",
    date: "Dimanche, 03 Nov",
    location: "ISS École, Fès",
    price: "Gratuit",
    image: "/events/devfest-mobile.jpg",
    attendees: 67,
    category: "Développement Mobile",
    type: "upcoming"
  }
];

const eventStats = {
  totalEvents: 12,
  upcomingEvents: 3,
  attendedEvents: 9,
  totalParticipants: 234
};

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    attendedEvents: 0,
    totalParticipants: 0
  });

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllEvents();
        
        // Transform API response to match component format
        const transformedEvents = response.event.map((event) => {
          const eventDate = new Date(event.date);
          const currentDate = new Date();
          const isUpcoming = eventDate > currentDate;
          
          // Format date for display
          const formattedDate = eventDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: '2-digit',
            month: 'short'
          });

          return {
            id: event.id,
            title: event.title,
            date: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
            location: event.location,
            price: "Gratuit", // Default to free
            image: event.image_url,
            attendees: Math.floor(Math.random() * 50) + 15, // Mock attendees since not in API
            category: event.cellule_name || event.type,
            type: isUpcoming ? 'upcoming' : 'attended',
            description: event.description,
            responsable: event.responsable,
            timeStart: event.time_start,
            timeEnd: event.time_end,
            celluleName: event.cellule_name,
            eventType: event.type
          };
        });
        
        setEvents(transformedEvents);
        
        // Calculate stats
        const upcomingCount = transformedEvents.filter(e => e.type === 'upcoming').length;
        const attendedCount = transformedEvents.filter(e => e.type === 'attended').length;
        const totalParticipants = transformedEvents.reduce((acc, e) => acc + e.attendees, 0);
        
        setStats({
          totalEvents: transformedEvents.length,
          upcomingEvents: upcomingCount,
          attendedEvents: attendedCount,
          totalParticipants: totalParticipants
        });
        
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => event.type === activeTab);

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto relative min-h-full">
        <div className="backdrop-blur-sm bg-base-100/80 rounded-2xl p-8 text-center border border-base-300/20 shadow-sm relative z-10">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-base-content/60">Chargement des événements...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto relative min-h-full">
        <div className="backdrop-blur-sm bg-base-100/80 rounded-2xl p-8 text-center border border-base-300/20 shadow-sm relative z-10">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-base-content mb-2">Erreur de chargement</h3>
          <p className="text-base-content/60 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-content rounded-lg text-sm font-medium transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto relative min-h-full">
      {/* Header */}
      <div className="mb-6 relative z-10">
        <div className="backdrop-blur-sm bg-base-100/70 rounded-2xl p-4 lg:p-6 border border-base-300/30 shadow-sm">
          <h1 className="text-2xl lg:text-3xl font-bold text-base-content mb-2">Événements</h1>
          <p className="text-base-content/60">Découvrez et participez aux événements du club</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 relative z-10">
        <div className="backdrop-blur-sm bg-gradient-to-br from-blue-50/60 to-blue-100/60 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-4 lg:p-6 border border-blue-200/40 dark:border-blue-700/40 shadow-lg">
          <div className="flex items-center justify-between mb-2 lg:mb-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.totalEvents}</h3>
            <p className="text-blue-600 dark:text-blue-400 text-xs lg:text-sm font-medium">Total des événements</p>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-gradient-to-br from-green-50/60 to-green-100/60 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-4 lg:p-6 border border-green-200/40 dark:border-green-700/40 shadow-lg">
          <div className="flex items-center justify-between mb-2 lg:mb-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-green-700 dark:text-green-300">{stats.upcomingEvents}</h3>
            <p className="text-green-600 dark:text-green-400 text-xs lg:text-sm font-medium">Événements à venir</p>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-gradient-to-br from-purple-50/80 to-purple-100/80 dark:from-purple-900/40 dark:to-purple-800/40 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.attendedEvents}</h3>
            <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Événements suivis</p>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-gradient-to-br from-orange-50/80 to-orange-100/80 dark:from-orange-900/40 dark:to-orange-800/40 rounded-2xl p-6 border border-orange-200/30 dark:border-orange-700/30 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-300">{stats.totalParticipants}</h3>
            <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">Total participants</p>
          </div>
        </div>
      </div>

      {/* Event Tabs */}
      <div className="backdrop-blur-sm bg-base-100/80 rounded-2xl shadow-lg border border-base-300/30 overflow-hidden relative z-10">
        {/* Tab Navigation */}
        <div className="border-b border-base-300/30 bg-base-200/60 backdrop-blur-sm">
          <div className="flex">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                activeTab === 'upcoming'
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-base-content/70 hover:text-base-content hover:bg-base-200'
              }`}
            >
              Événements à venir
            </button>
            <button
              onClick={() => setActiveTab('attended')}
              className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                activeTab === 'attended'
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-base-content/70 hover:text-base-content hover:bg-base-200'
              }`}
            >
              Vos événements
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="p-6 backdrop-blur-sm">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 backdrop-blur-sm bg-base-100/50 rounded-xl border border-base-300/20">
              <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-base-content mb-2">
                {activeTab === 'upcoming' ? 'Aucun événement à venir' : 'Aucun événement suivi'}
              </h3>
              <p className="text-base-content/60">
                {activeTab === 'upcoming' 
                  ? 'Les prochains événements apparaîtront ici.' 
                  : 'Les événements auxquels vous avez participé apparaîtront ici.'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="relative bg-gray-900 rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700"></div>
                    )}
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 h-80 flex flex-col justify-between text-white">
                    {/* Header with Date */}
                    <div className="flex justify-between items-start">
                      <div className="bg-blue-600/80 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium">
                        {event.category || event.celluleName}
                      </div>
                      <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                        <div className="text-xs text-gray-300 uppercase">
                          {new Date().toLocaleString('fr-FR', { month: 'short' }).toUpperCase()}
                        </div>
                        <div className="text-lg font-bold">
                          {event.date.split(' ')[1] || '24'}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 my-4">
                      <div>
                        <div className="text-xs text-gray-300 mb-1">Participants</div>
                        <div className="text-sm font-bold">{event.attendees}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-300 mb-1">Durée</div>
                        <div className="text-sm font-bold">
                          {event.timeStart && event.timeEnd 
                            ? `${Math.round((new Date(`2000-01-01 ${event.timeEnd}`) - new Date(`2000-01-01 ${event.timeStart}`)) / (1000 * 60 * 60))}h`
                            : '2h'
                          }
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-300 mb-1">Type</div>
                        <div className="text-sm font-bold">
                          {event.eventType === 'workshop' ? 'Workshop' : 
                           event.eventType === 'conference' ? 'Conférence' :
                           event.eventType === 'hackathon' ? 'Hackathon' : 'Événement'}
                        </div>
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activeTab === 'upcoming' ? 'bg-green-400' : 'bg-blue-400'
                      }`}></div>
                      <span className="text-xs text-gray-300 uppercase">
                        {activeTab === 'upcoming' ? 'À VENIR' : 'PARTICIPÉ'}
                      </span>
                    </div>

                    {/* Title and Location */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-1 line-clamp-2">{event.title}</h3>
                      <p className="text-sm text-gray-300 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4-4a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location} • {event.responsable}
                      </p>
                    </div>

                    {/* Bottom Section - Members and Action */}
                    <div className="flex items-center justify-between">
                      {/* Member Avatars */}
                      <div className="flex items-center -space-x-2">
                        {[...Array(Math.min(4, Math.floor(event.attendees / 5)))].map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-xs font-medium"
                          >
                            {String.fromCharCode(65 + i)}
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border-2 border-white flex items-center justify-center text-xs font-medium">
                          +{Math.max(0, event.attendees - 4)}
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className="px-6 py-2 rounded-lg font-medium transition-all duration-200 bg-yellow-500/80 hover:bg-yellow-500 backdrop-blur-sm text-black text-sm">
                        {activeTab === 'upcoming' ? 'Rejoindre' : 'Voir détails'}
                      </button>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {activeTab === 'attended' && (
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Participé
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}