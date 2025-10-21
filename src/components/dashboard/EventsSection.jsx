"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAllEvents, getUserRegistredEvents, getUserAttendedEvents, registerForEvent, unregisterFromEvent } from '@/api/events';
import useAuthStore from '@/stores/authStore';

// Mock data for demonstration




export default function EventsSection() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [attendedEvents, setAttendedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();
  const [actionLoading, setActionLoading] = useState(null); // Track which event is being processed
  const [notification, setNotification] = useState({ show: false, type: '', message: '', title: '' });
  const [confirmModal, setConfirmModal] = useState({ show: false, title: '', message: '', onConfirm: null });
  
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    registeredEvents: 0,
    attendedEvents: 0,
    totalParticipants: 0
  });

  // Transform event data helper function
  const transformEvent = (event, isRegistered = false) => {
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
      price: "Gratuit",
      image: event.image_url,
      attendees: Math.floor(Math.random() * 50) + 15,
      category: event.cellule_name || event.type,
      description: event.description,
      responsable: event.responsable,
      timeStart: event.time_start,
      timeEnd: event.time_end,
      celluleName: event.cellule_name,
      eventType: event.type,
      registrationId: event.registration_id,
      registeredAt: event.registered_at
    };
  };

  

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch all events (upcoming)
        const allEventsResponse = await getAllEvents();
        const currentDate = new Date();
        
        let registeredEventIds = [];
        
        // Fetch registered events if user is logged in
        if (user?.user_id) {
          console.log('Fetching registered events for user:', user.user_id);
          try {
            const registeredResponse = await getUserRegistredEvents(user.user_id);
            console.log('Registered events response:', registeredResponse);
            const registered = registeredResponse.user.map(event => transformEvent(event, true));
            console.log('Transformed registered events:', registered);
            setRegisteredEvents(registered);
            
            // Get IDs of registered events to filter them out from upcoming
            registeredEventIds = registered.map(e => e.id);
          } catch (err) {
            console.error('Failed to fetch registered events:', err);
            setRegisteredEvents([]);
          }

          // Fetch attended events
          try {
            const attendedResponse = await getUserAttendedEvents(user.user_id);
            console.log('Attended events response:', attendedResponse);
            const attended = attendedResponse.user.map(event => transformEvent(event));
            console.log('Transformed attended events:', attended);
            setAttendedEvents(attended);
          } catch (err) {
            console.error('Failed to fetch attended events:', err);
            setAttendedEvents([]);
          }
        } else {
          console.log('No user logged in or user.user_id is missing:', user);
        }
        
        // Filter upcoming events to exclude registered events
        const upcoming = allEventsResponse.event
          .filter(event => {
            const isUpcoming = new Date(event.date) > currentDate;
            const isNotRegistered = !registeredEventIds.includes(event.id);
            return isUpcoming && isNotRegistered;
          })
          .map(event => transformEvent(event));
        setUpcomingEvents(upcoming);
        
        // Calculate stats - need to wait for state updates or use local variables
        const totalParticipants = [...upcoming].reduce((acc, e) => acc + e.attendees, 0);
        
        // Use local counts since state might not be updated yet
        let registeredCount = 0;
        let attendedCount = 0;
        
        if (user?.user_id) {
          try {
            const registeredResponse = await getUserRegistredEvents(user.user_id);
            registeredCount = registeredResponse.user?.length || 0;
          } catch (err) {
            console.error('Error counting registered events:', err);
          }
          
          try {
            const attendedResponse = await getUserAttendedEvents(user.user_id);
            attendedCount = attendedResponse.user?.length || 0;
          } catch (err) {
            console.error('Error counting attended events:', err);
          }
        }
        
        console.log('Setting stats:', {
          totalEvents: allEventsResponse.event.length,
          upcomingEvents: upcoming.length,
          registeredEvents: registeredCount,
          attendedEvents: attendedCount
        });
        
        setStats({
          totalEvents: allEventsResponse.event.length,
          upcomingEvents: upcoming.length,
          registeredEvents: registeredCount,
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
  }, [user?.user_id]);

  // Get events based on active tab
  const getCurrentEvents = () => {
    switch(activeTab) {
      case 'upcoming':
        return upcomingEvents;
      case 'registered':
        return registeredEvents;
      case 'attended':
        return attendedEvents;
      default:
        return [];
    }
  };

  const filteredEvents = getCurrentEvents();

  // Show notification
  const showNotification = (type, title, message) => {
    setNotification({ show: true, type, title, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', title: '', message: '' });
    }, 4000);
  };

  // Show confirm modal
  const showConfirm = (title, message, onConfirm) => {
    setConfirmModal({ show: true, title, message, onConfirm });
  };

  // Close confirm modal
  const closeConfirm = () => {
    setConfirmModal({ show: false, title: '', message: '', onConfirm: null });
  };

  // Handle event registration
  const handleRegisterEvent = async (eventId) => {
    if (!user?.user_id) {
      showNotification('error', 'Erreur', 'Vous devez être connecté pour vous inscrire');
      return;
    }

    try {
      setActionLoading(eventId);
      await registerForEvent(user.user_id, eventId);
      
      // Refresh registered events first
      const registeredResponse = await getUserRegistredEvents(user.user_id);
      const registered = registeredResponse.user.map(event => transformEvent(event, true));
      setRegisteredEvents(registered);
      
      // Get IDs of registered events
      const registeredEventIds = registered.map(e => e.id);
      
      // Refresh events after registration and filter out registered ones
      const allEventsResponse = await getAllEvents();
      const currentDate = new Date();
      const upcoming = allEventsResponse.event
        .filter(event => {
          const isUpcoming = new Date(event.date) > currentDate;
          const isNotRegistered = !registeredEventIds.includes(event.id);
          return isUpcoming && isNotRegistered;
        })
        .map(event => transformEvent(event));
      setUpcomingEvents(upcoming);
      
      showNotification('success', 'Succès', 'Inscription réussie! Votre place est confirmée.');
    } catch (err) {
      console.error('Failed to register for event:', err);
      showNotification('error', 'Erreur', 'Échec de l\'inscription: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // Handle event unregistration
  const handleUnregisterEvent = async (eventId) => {
    if (!user?.user_id) return;

    showConfirm(
      'Annuler l\'inscription',
      'Êtes-vous sûr de vouloir annuler votre inscription à cet événement?',
      async () => {
        closeConfirm();
        try {
          setActionLoading(eventId);
          await unregisterFromEvent(user.user_id, eventId);
          
          // Refresh registered events first
          const registeredResponse = await getUserRegistredEvents(user.user_id);
          const registered = registeredResponse.user.map(event => transformEvent(event, true));
          setRegisteredEvents(registered);
          
          // Get IDs of registered events
          const registeredEventIds = registered.map(e => e.id);
          
          // Refresh upcoming events and filter out registered ones
          const allEventsResponse = await getAllEvents();
          const currentDate = new Date();
          const upcoming = allEventsResponse.event
            .filter(event => {
              const isUpcoming = new Date(event.date) > currentDate;
              const isNotRegistered = !registeredEventIds.includes(event.id);
              return isUpcoming && isNotRegistered;
            })
            .map(event => transformEvent(event));
          setUpcomingEvents(upcoming);
          
          showNotification('success', 'Annulation réussie', 'Votre inscription a été annulée avec succès');
        } catch (err) {
          console.error('Failed to unregister from event:', err);
          showNotification('error', 'Erreur', 'Échec de l\'annulation: ' + err.message);
        } finally {
          setActionLoading(null);
        }
      }
    );
  };

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

        <div className="backdrop-blur-sm bg-gradient-to-br from-purple-50/80 to-purple-100/80 dark:from-purple-900/40 dark:to-purple-800/40 rounded-2xl p-4 lg:p-6 border border-purple-200/30 dark:border-purple-700/30 shadow-lg">
          <div className="flex items-center justify-between mb-2 lg:mb-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.registeredEvents}</h3>
            <p className="text-purple-600 dark:text-purple-400 text-xs lg:text-sm font-medium">Événements inscrits</p>
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

        <div className="backdrop-blur-sm bg-gradient-to-br from-orange-50/80 to-orange-100/80 dark:from-orange-900/40 dark:to-orange-800/40 rounded-2xl p-4 lg:p-6 border border-orange-200/30 dark:border-orange-700/30 shadow-lg">
          <div className="flex items-center justify-between mb-2 lg:mb-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-orange-700 dark:text-orange-300">{stats.attendedEvents}</h3>
            <p className="text-orange-600 dark:text-orange-400 text-xs lg:text-sm font-medium">Événements assistés</p>
          </div>
        </div>
      </div>

      {/* Event Tabs */}
      <div className="backdrop-blur-sm bg-base-100/5 rounded-2xl shadow-lg border border-base-300/30 overflow-hidden relative z-10">
        {/* Tab Navigation */}
        <div className="border-b border-base-100/10 bg-base-100/10 backdrop-blur-sm">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 lg:px-6 py-4 font-medium transition-all duration-200 border-b-2 whitespace-nowrap text-sm lg:text-base ${
                activeTab === 'upcoming'
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-base-content/70 hover:text-base-content hover:bg-base-200'
              }`}
            >
              À venir
            </button>
            <button
              onClick={() => setActiveTab('registered')}
              className={`px-4 lg:px-6 py-4 font-medium transition-all duration-200 border-b-2 whitespace-nowrap text-sm lg:text-base ${
                activeTab === 'registered'
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-base-content/70 hover:text-base-content hover:bg-base-200'
              }`}
            >
              Mes inscriptions
            </button>
            <button
              onClick={() => setActiveTab('attended')}
              className={`px-4 lg:px-6 py-4 font-medium transition-all duration-200 border-b-2 whitespace-nowrap text-sm lg:text-base ${
                activeTab === 'attended'
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-base-content/70 hover:text-base-content hover:bg-base-200'
              }`}
            >
              Événements assistés
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
                {activeTab === 'upcoming' && 'Aucun événement à venir'}
                {activeTab === 'registered' && 'Aucune inscription'}
                {activeTab === 'attended' && 'Aucun événement suivi'}
              </h3>
              <p className="text-base-content/60">
                {activeTab === 'upcoming' && 'Les prochains événements apparaîtront ici.'}
                {activeTab === 'registered' && 'Les événements auxquels vous êtes inscrit apparaîtront ici.'}
                {activeTab === 'attended' && 'Les événements auxquels vous avez participé apparaîtront ici.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row">
                    {/* Left side - Profile/Event Image */}
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
                        <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Right side - Event Details */}
                    <div className="w-full lg:w-2/3 p-6 relative flex flex-col">
                      {/* Date Badge */}
                      <div className="absolute top-4 right-4 text-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {event.date.split(' ')[2] || 'OCT'}
                        </div>
                        <div className="text-2xl font-bold text-pink-500">
                          {event.date.split(' ')[1] || '21'}
                        </div>
                      </div>

                      {/* Event Title and Type */}
                      <div className="pr-16 mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {event.eventType === 'workshop' ? 'Workshop' : 
                           event.eventType === 'conference' ? 'Conférence' :
                           event.eventType === 'hackathon' ? 'Hackathon' : 'Événement'}
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
                            {event.celluleName} 
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
                          {event.timeStart && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {event.timeStart}{event.timeEnd && ` - ${event.timeEnd}`}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-auto">
                        {activeTab === 'upcoming' && (
                          <>
                            <button 
                              onClick={() => handleRegisterEvent(event.id)}
                              disabled={actionLoading === event.id}
                              className="cursor-target w-full py-3 border-2 border-pink-500 text-pink-500 rounded-lg font-medium hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionLoading === event.id ? 'Inscription...' : 'S\'inscrire à l\'événement'}
                            </button>
                            <p className="text-xs text-gray-400 text-center mt-2 italic">
                              *Places limitées, inscription obligatoire
                            </p>
                          </>
                        )}
                        
                        {activeTab === 'registered' && (
                          <div className="flex flex-col gap-2">
                            <button 
                              onClick={() => handleUnregisterEvent(event.id)}
                              disabled={actionLoading === event.id}
                              className="cursor-target w-full py-3 border-2 border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionLoading === event.id ? 'Annulation...' : 'Annuler l\'inscription'}
                            </button>
                          </div>
                        )}
                        
                        {activeTab === 'attended' && (
                          <button className="cursor-target w-full py-3 border-2 border-pink-500 text-pink-500 rounded-lg font-medium hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors duration-200">
                            Voir les détails
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className={`rounded-xl shadow-2xl border-2 p-4 min-w-[320px] max-w-md backdrop-blur-md ${
            notification.type === 'success' 
              ? 'bg-green-50/95 dark:bg-green-900/95 border-green-500' 
              : 'bg-red-50/95 dark:bg-red-900/95 border-red-500'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                notification.type === 'success' 
                  ? 'bg-green-500' 
                  : 'bg-red-500'
              }`}>
                {notification.type === 'success' ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-base mb-1 ${
                  notification.type === 'success' 
                    ? 'text-green-900 dark:text-green-100' 
                    : 'text-red-900 dark:text-red-100'
                }`}>
                  {notification.title}
                </h4>
                <p className={`text-sm ${
                  notification.type === 'success' 
                    ? 'text-green-800 dark:text-green-200' 
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => setNotification({ show: false, type: '', message: '', title: '' })}
                className={`flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors ${
                  notification.type === 'success' 
                    ? 'text-green-700 dark:text-green-300' 
                    : 'text-red-700 dark:text-red-300'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1-1.968-1-2.732 0L3.732 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {confirmModal.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300">
                {confirmModal.message}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
              <button
                onClick={closeConfirm}
                className="flex-1 py-3 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}