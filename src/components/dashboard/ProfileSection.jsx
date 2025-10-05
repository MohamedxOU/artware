"use client";

export default function ProfileSection({ user }) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-base-content mb-2">Mon Profil</h1>
        <p className="text-base-content/60">Gérez vos informations personnelles</p>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-base-100 rounded-3xl p-6 shadow-lg border border-base-300/20 text-center">
            {/* Coming soon placeholder */}
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-base-content mb-2">Profile Settings</h3>
              <p className="text-base-content/60 mb-4">Manage your personal information and preferences</p>
              <div className="text-sm text-base-content/50">Coming soon...</div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-base-100 rounded-3xl p-6 shadow-lg border border-base-300/20">
            <h3 className="text-lg font-semibold text-base-content mb-4">Informations personnelles</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">Prénom</label>
                  <input 
                    type="text" 
                    value={user?.first_name || ''} 
                    className="w-full p-3 bg-base-200 border border-base-300 rounded-lg"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">Nom</label>
                  <input 
                    type="text" 
                    value={user?.last_name || ''} 
                    className="w-full p-3 bg-base-200 border border-base-300 rounded-lg"
                    disabled
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-base-content mb-1">Email</label>
                <input 
                  type="email" 
                  value={user?.email || ''} 
                  className="w-full p-3 bg-base-200 border border-base-300 rounded-lg"
                  disabled
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">Spécialité</label>
                  <input 
                    type="text" 
                    value={user?.specialty?.replace('-', ' ') || ''} 
                    className="w-full p-3 bg-base-200 border border-base-300 rounded-lg"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">Niveau</label>
                  <input 
                    type="text" 
                    value={user?.level || ''} 
                    className="w-full p-3 bg-base-200 border border-base-300 rounded-lg"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}