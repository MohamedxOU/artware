"use client";
import { ProtectedRoute } from '@/components/auth/RouteGuards';
import { useAuth } from '@/contexts/AuthContext';

function DashboardContent() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-base-100">
      <nav className="bg-base-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-base-content">Dashboard ARTWARE</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-base-content">Bonjour, {user?.prenom}</span>
              <button
                onClick={logout}
                className="btn btn-outline btn-sm"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-base-300 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-base-content mb-4">
                Bienvenue dans votre espace membre !
              </h2>
              <p className="text-base-content/70">
                Contenu du dashboard à venir...
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}