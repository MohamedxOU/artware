"use client";
import { useState } from 'react';

export default function ReclamationSection({ user }) {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    description: '',
    priority: 'medium'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Reclamation submitted:', formData);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-base-content mb-2">Faire une Réclamation</h1>
        <p className="text-base-content ">Signalez un problème ou faites une suggestion</p>
      </div>

      {/* Reclamation Form */}
      <div className="bg-base-100 rounded-3xl p-8 shadow-lg border border-base-300 ">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Sujet <span className="text-error">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Résumé de votre réclamation"
              className="w-full p-3 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary  focus:border-primary "
              required
            />
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">
                Catégorie <span className="text-error">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary  focus:border-primary "
                required
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="technical">Problème technique</option>
                <option value="account">Problème de compte</option>
                <option value="content">Problème de contenu</option>
                <option value="event">Problème d'événement</option>
                <option value="suggestion">Suggestion d'amélioration</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content mb-2">
                Priorité
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full p-3 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary  focus:border-primary "
              >
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Élevée</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Description détaillée <span className="text-error">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Décrivez votre problème ou suggestion en détail..."
              rows={6}
              className="w-full p-3 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary  focus:border-primary  resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 text-base-content  hover:text-base-content hover:bg-base-200 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-content rounded-lg hover:bg-primary  transition-colors font-medium"
            >
              Envoyer la réclamation
            </button>
          </div>
        </form>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900  border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
              À savoir
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Votre réclamation sera traitée dans les plus brefs délais. Vous recevrez une réponse par email 
              sous 48h ouvrables. Pour les urgences, contactez directement l&apos;administration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}