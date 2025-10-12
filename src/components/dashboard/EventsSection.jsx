"use client";
import { useState } from 'react';
import Image from 'next/image';

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

export default function EventsSection({ events = mockEvents, stats = eventStats }) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const filteredEvents = events.filter(event => event.type === activeTab);

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="group backdrop-blur-sm bg-base-100/90 rounded-3xl shadow-lg border border-base-300/30 overflow-hidden hover:shadow-2xl hover:bg-base-100/95 transition-all duration-300 hover:-translate-y-1">
                  {/* Event Image with Date Badge */}
                  <div className="relative h-48 bg-primary overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.3)_0%,_transparent_50%)]"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]"></div>
                    </div>
                    
                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-white rounded-2xl p-3 shadow-lg min-w-[60px] text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {event.date.split(' ')[1]}
                      </div>
                      <div className="text-xs font-medium text-gray-600 uppercase">
                        {event.date.split(' ')[0].replace(',', '')}
                      </div>
                    </div>

                    {/* Heart Icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>

                    {/* Going indicator */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[...Array(Math.min(4, Math.floor(event.attendees / 10)))].map((_, i) => (
                          <div key={i} className="w-8 h-8 bg-white rounded-full border-2 border-white flex items-center justify-center">
                            <div className={`w-6 h-6 rounded-full ${
                              i === 0 ? 'bg-blue-500' : 
                              i === 1 ? 'bg-green-500' : 
                              i === 2 ? 'bg-purple-500' : 'bg-orange-500'
                            }`}></div>
                          </div>
                        ))}
                      </div>
                      <span className="text-white text-sm font-medium bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        +{event.attendees} participants
                      </span>
                    </div>

                    {/* Tech/Category Badge */}
                    <div className="absolute top-16 left-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                      {event.category || 'Technologie & IA'}
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6 backdrop-blur-sm bg-base-100/70">
                    <h3 className="text-xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-base-content/70">
                        <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">{event.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-base-content/70">
                        <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">{event.date}</span>
                      </div>

                      <div className="flex items-center gap-2 text-base-content/70">
                        <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                        <span className="text-lg font-bold text-primary">{event.price}</span>
                      </div>
                    </div>

                    {/* Organizer */}
                    <div className="flex items-center gap-2 mb-4 text-sm text-base-content/60">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>Par Club ARTWARE</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 btn btn-primary border-none text-white font-semibold hover:scale-105 transition-transform duration-200">
                        {activeTab === 'upcoming' ? 'S\'inscrire' : 'Voir détails'}
                      </button>
                      <button className="btn btn-outline btn-primary hover:bg-primary/10">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}