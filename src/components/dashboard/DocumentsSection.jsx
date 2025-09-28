"use client";

export default function DocumentsSection() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content mb-2">Documents</h1>
        <p className="text-base-content/60">Partagez et organisez les ressources du club</p>
      </div>

      <div className="bg-base-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-base-content mb-2">Section Documents</h3>
        <p className="text-base-content/60">
          Cette section permettra de partager, organiser et gérer tous les documents - guides, ressources, présentations, etc.
        </p>
      </div>
    </div>
  );
}