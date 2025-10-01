"use client";
import Image from 'next/image';

export default function DashboardHome({ user, stats = {}, recentActivities = [] }) {
  // Mock data for alerts - in real app these would come from props or API
  const upcomingEvents = [
    { id: 1, title: "Workshop AI & Machine Learning", date: "2024-11-15", time: "14:00" },
    { id: 2, title: "Hackathon Spring 2024", date: "2024-11-20", time: "09:00" },
  ];

  const attendedEvents = [
    { id: 1, title: "Conférence Cybersécurité", date: "2024-10-28", attended: true },
    { id: 2, title: "Formation React Advanced", date: "2024-10-25", attended: true },
  ];

  const newDocuments = [
    { id: 1, title: "Guide des bonnes pratiques 2024", type: "Document", date: "2024-11-01" },
    { id: 2, title: "Nouvelle politique de sécurité", type: "Annonce", date: "2024-10-30" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 relative">
      {/* Background Patterns - Similar to Login Screen */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large primary circles */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary/12 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-36 h-36 bg-primary/10 rounded-full blur-2xl"></div>
        
        {/* Secondary color patterns */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-secondary/18 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-20 w-44 h-44 bg-secondary/12 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/3 w-28 h-28 bg-secondary/15 rounded-full blur-xl"></div>
        
        {/* Accent patterns */}
        <div className="absolute top-3/4 left-1/3 w-24 h-24 bg-accent/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-10 right-1/4 w-38 h-38 bg-accent/14 rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 left-1/2 w-30 h-30 bg-accent/12 rounded-full blur-xl"></div>
        
        {/* Additional geometric patterns */}
        <div className="absolute top-40 left-1/3 w-20 h-60 bg-primary/8 rounded-full blur-2xl rotate-45"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-50 bg-secondary/10 rounded-full blur-xl -rotate-45"></div>
        <div className="absolute top-1/2 right-20 w-18 h-45 bg-accent/12 rounded-full blur-lg rotate-12"></div>
        
        {/* Small scattered dots */}
        <div className="absolute top-16 left-1/2 w-12 h-12 bg-primary/25 rounded-full blur-sm"></div>
        <div className="absolute top-1/3 left-20 w-8 h-8 bg-secondary/30 rounded-full blur-sm"></div>
        <div className="absolute bottom-1/3 right-16 w-10 h-10 bg-accent/25 rounded-full blur-sm"></div>
        <div className="absolute top-2/3 left-16 w-14 h-14 bg-primary/20 rounded-full blur-md"></div>
        <div className="absolute bottom-16 left-1/2 w-16 h-16 bg-secondary/18 rounded-full blur-md"></div>
        
        {/* Overlapping larger shapes */}
        <div className="absolute top-0 left-1/4 w-56 h-56 bg-primary/6 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-52 h-52 bg-secondary/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-48 h-48 bg-accent/7 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-50 h-50 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 border border-base-300/20 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">👋</div>
          <div>
            <h1 className="text-3xl font-bold text-base-content">
              Bienvenue, {user?.first_name} !
            </h1>
            <p className="text-base-content/70 text-lg mt-1">
              Ravi de vous revoir aujourd&apos;hui
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Profile Card - Similar to the image */}
        <div className="lg:col-span-1">
          <div className="bg-base-100/90 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-base-300/20 text-center">
            {/* Profile Picture */}
            <div className="mb-6 relative">
              {user?.profile_image_url ? (
                <Image 
                  src={user.profile_image_url} 
                  alt={`${user.first_name} ${user.last_name}`}
                  width={120}
                  height={120}
                  className="w-30 h-30 rounded-full mx-auto object-cover shadow-lg"
                  unoptimized={user.profile_image_url.includes('imagekit.io')}
                />
              ) : (
                <div className="w-30 h-30 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-white text-3xl font-bold">
                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                  </span>
                </div>
              )}
              
              {/* Image Upload Button */}
              <button 
                className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-8 h-8 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center shadow-lg transition-colors"
                onClick={() => document.getElementById('profile-image-input').click()}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              
              {/* Hidden file input */}
              <input 
                id="profile-image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // Here you would handle the image upload
                    console.log('Image selected:', file);
                    // You can add your image upload logic here
                  }
                }}
              />
            </div>

            {/* Name and Title */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-base-content">
                  {user?.first_name} {user?.last_name}
                </h2>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-base-content/60 text-lg mb-2">
                {user?.specialty?.replace('-', ' ') || 'Membre Artware'}
              </p>
              <p className="text-base-content/50 text-sm uppercase tracking-wide">
                Niveau {user?.level || 'N/A'}
              </p>
            </div>

            {/* View Profile Button */}
            <button className="w-full bg-base-content text-base-100 py-3 px-6 rounded-full font-semibold hover:bg-base-content/90 transition-colors">
              View Profile
            </button>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="lg:col-span-2 space-y-6 relative z-10">
          {/* Upcoming Events Alert */}
          <div className="bg-blue-50/80 backdrop-blur-md dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                Événements à venir
              </h3>
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

          {/* Attended Events Alert */}
          <div className="bg-green-50/80 backdrop-blur-md dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                Événements récents
              </h3>
            </div>
            <div className="space-y-3">
              {attendedEvents.map((event) => (
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
    </div>
  );
}