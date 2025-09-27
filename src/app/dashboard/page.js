"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore, useUIStore } from '@/stores';
import { useProtectedRoute } from '@/hooks/useAuth';

function DashboardContent() {
  const router = useRouter();
  const { user, logout, isLoading: authLoading } = useAuthStore();
  const { addNotification } = useUIStore();
  
  // Route protection - redirect unauthenticated users
  const { isAuthenticated, isLoading } = useProtectedRoute();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">Chargement...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will be redirected)
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (!confirmed) return;

    try {
      const result = await logout();
      
      if (result.success) {
        if (result.warning) {
          addNotification({
            type: 'warning',
            message: result.warning,
            duration: 5000
          });
        } else {
          addNotification({
            type: 'success',
            message: 'Déconnexion réussie. À bientôt !',
            duration: 3000
          });
        }
      } else if (result.error) {
        addNotification({
          type: 'error',
          message: result.error,
          duration: 5000
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      addNotification({
        type: 'error',
        message: 'Erreur lors de la déconnexion',
        duration: 5000
      });
    } finally {
      // Always redirect to home page after logout attempt
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <nav className="bg-base-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-base-content">Dashboard ARTWARE</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {user?.profile_image_url && (
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image 
                        src={user.profile_image_url} 
                        alt={`${user.first_name} ${user.last_name}`}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                        unoptimized={user.profile_image_url.includes('imagekit.io')}
                      />
                    </div>
                  </div>
                )}
                <span className="text-base-content">
                  Bonjour, {user?.first_name} {user?.last_name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                disabled={authLoading}
                className="btn btn-outline btn-sm"
              >
                {authLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Déconnexion...
                  </>
                ) : (
                  'Déconnexion'
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-base-200 rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-4">
              {user?.profile_image_url && (
                <div className="avatar">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image 
                      src={user.profile_image_url} 
                      alt={`${user.first_name} ${user.last_name}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized={user.profile_image_url.includes('imagekit.io')}
                    />
                  </div>
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-base-content">
                  Bienvenue, {user?.first_name} {user?.last_name} !
                </h2>
                <p className="text-base-content/70">
                  {user?.email} • {user?.specialty?.replace('-', ' ').toUpperCase()} • Niveau {user?.level?.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* User Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-primary/10 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary font-semibold">Statut du compte</p>
                  <p className="text-2xl font-bold text-base-content capitalize">
                    {user?.status}
                  </p>
                </div>
                <div className="text-primary">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-secondary/10 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary font-semibold">Genre</p>
                  <p className="text-2xl font-bold text-base-content capitalize">
                    {user?.gender}
                  </p>
                </div>
                <div className="text-secondary">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent font-semibold">Téléphone</p>
                  <p className="text-lg font-bold text-base-content">
                    {user?.phone_number || 'Non renseigné'}
                  </p>
                </div>
                <div className="text-accent">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="border-4 border-dashed border-base-300 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-bold text-base-content mb-2">
                Contenu du dashboard à venir...
              </h3>
              <p className="text-base-content/70">
                Espace réservé aux fonctionnalités principales
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}