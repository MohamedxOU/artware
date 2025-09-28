"use client";
import Image from 'next/image';

export default function DashboardHome({ user, stats = {}, recentActivities = [] }) {
  return (
    <div className="w-full relative">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(59,130,246,0.4)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(168,85,247,0.4)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_49%,rgba(255,255,255,0.02)_50%,transparent_51%)] bg-[length:30px_30px]"></div>
      </div>

      {/* Welcome Header */}
      <div className="mb-8 relative z-10">
        <div className="backdrop-blur-sm bg-base-100/80 rounded-2xl p-6 border border-base-300/20 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="text-2xl">👋</div>
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                Bienvenue, {user?.first_name} !
              </h1>
              <p className="text-base-content/60 text-lg">
                Ravi de vous revoir aujourd&apos;hui
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
        <div className="backdrop-blur-sm bg-blue-500/5 rounded-2xl p-6 border border-blue-500/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.activeProjects || 0}</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Projets actifs</p>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-green-500/5 rounded-2xl p-6 border border-green-500/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.activeMembers || 0}</h3>
            <p className="text-green-600 dark:text-green-400 text-sm font-medium">Membres actifs</p>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-purple-500/5 rounded-2xl p-6 border border-purple-500/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.upcomingEvents || 0}</h3>
            <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Événements à venir</p>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-orange-500/5 rounded-2xl p-6 border border-orange-500/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-300">{stats.totalDocuments || 0}</h3>
            <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">Documents</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        <div className="backdrop-blur-sm bg-base-100/80 rounded-2xl p-6 border border-base-300/20 shadow-sm">
          <h2 className="text-xl font-semibold text-base-content mb-6">Activité récente</h2>
          <div className="space-y-4">
            {recentActivities.length === 0 ? (
              <div className="text-center text-base-content/60 py-8">
                <p>Aucune activité récente</p>
              </div>
            ) : (
              recentActivities.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-base-100 rounded-xl">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.type === 'user' ? 'bg-green-100 text-green-600' :
                  item.type === 'event' ? 'bg-purple-100 text-purple-600' :
                  item.type === 'document' ? 'bg-orange-100 text-orange-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {item.type === 'user' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>}
                  {item.type === 'event' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>}
                  {item.type === 'document' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" /></svg>}
                  {item.type === 'meeting' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-base-content">{item.action}</p>
                  <p className="text-xs text-base-content/60">{item.time}</p>
                </div>
              </div>
            )))}
          </div>
        </div>

        <div className="backdrop-blur-sm bg-base-100/80 rounded-2xl p-6 border border-base-300/20 shadow-sm">
          <h2 className="text-xl font-semibold text-base-content mb-6">Votre profil</h2>
          <div className="text-center mb-6">
            {user?.profile_image_url ? (
              <Image 
                src={user.profile_image_url} 
                alt={`${user.first_name} ${user.last_name}`}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full mx-auto object-cover"
                unoptimized={user.profile_image_url.includes('imagekit.io')}
              />
            ) : (
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary-content text-2xl font-bold">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </span>
              </div>
            )}
            <h3 className="text-lg font-semibold text-base-content mt-4">
              {user?.first_name} {user?.last_name}
            </h3>
            <p className="text-base-content/60 text-sm">{user?.email}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 backdrop-blur-sm bg-base-100/70 rounded-xl border border-base-300/10">
              <span className="text-sm font-medium text-base-content">Spécialité</span>
              <span className="text-sm text-base-content/70 capitalize">
                {user?.specialty?.replace('-', ' ')}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 backdrop-blur-sm bg-base-100/70 rounded-xl border border-base-300/10">
              <span className="text-sm font-medium text-base-content">Niveau</span>
              <span className="text-sm text-base-content/70 uppercase">
                {user?.level}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 backdrop-blur-sm bg-base-100/70 rounded-xl border border-base-300/10">
              <span className="text-sm font-medium text-base-content">Statut</span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                user?.status === 'allowed' ? 'bg-green-100 text-green-700' : 
                user?.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {user?.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}