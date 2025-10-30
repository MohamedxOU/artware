"use client";
import Image from 'next/image';

export default function DashboardAppBar({ 
  user,
  activeSection = "dashboard",
  mobileMenuOpen = false,
  setMobileMenuOpen,
  className = ""
}) {
  // Function to get the display title for the active section
  const getSectionTitle = (section) => {
    const titles = {
      dashboard: 'Dashboard',
      events: 'Événements',
      cells: 'Cellules',
      documents: 'Documents',
      settings: 'Paramètres',
      profile: 'Profile'
    };
    return titles[section] || 'Dashboard';
  };

  return (
    <header className={`bg-base-100 shadow-sm border-b border-base-300 ${className}`}>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Left - Mobile Menu Button and Section Title */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen && setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-base-content  hover:text-base-content hover:bg-base-200 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Section Title */}
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-content truncate">
            {getSectionTitle(activeSection)}
          </h1>
        </div>

        {/* Right - User Info */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {user?.profile_image_url ? (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-primary ">
              <Image 
                src={user.profile_image_url} 
                alt={`${user.first_name} ${user.last_name}`}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                unoptimized={user.profile_image_url.includes('imagekit.io')}
              />
            </div>
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center ring-2 ring-primary ">
              <span className="text-primary-content text-xs sm:text-sm font-medium">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </span>
            </div>
          )}
          
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium text-base-content truncate max-w-32 lg:max-w-none">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="text-xs text-base-content  truncate max-w-32 lg:max-w-none">
              {user?.email}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}