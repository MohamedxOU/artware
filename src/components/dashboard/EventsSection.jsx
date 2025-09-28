"use client";

export default function EventsSection() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content mb-2">Événements</h1>
        <p className="text-base-content/60">Organisez et gérez les événements du club</p>
      </div>

      <div className="bg-base-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-base-content mb-2">Section Événements</h3>
        <p className="text-base-content/60">
          Cette section permettra de créer, planifier et gérer tous les événements - hackathons, workshops, conférences, etc.
        </p>
      </div>
    </div>
  );
}