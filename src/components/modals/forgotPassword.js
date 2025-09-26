"use client";
import { useState, useEffect } from "react";

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 50);
      // Reset states when modal opens
      setEmail("");
      setIsSuccess(false);
      setIsLoading(false);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleClose = () => {
    setEmail("");
    setIsSuccess(false);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className={`relative w-full max-w-md bg-base-100/95 backdrop-blur-md rounded-3xl shadow-2xl border border-base-300/20 overflow-hidden transition-all duration-500 ${
        showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        
        {/* Header */}
        <div className="bg-base-100/95 backdrop-blur-md border-b border-base-300/20 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-base-content">Mot de passe oublié</h2>
            <p className="text-base-content/60 text-sm">Récupérez l&apos;ccès à votre compte</p>
          </div>
          
          <button
            onClick={handleClose}
            className="btn btn-circle btn-ghost btn-sm hover:bg-base-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSuccess ? (
            <>
              {/* Instructions */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-center text-base-content/70 text-sm leading-relaxed">
                  Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-base-content/70 mb-2">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@example.com"
                    className="w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
                    required
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!email || isLoading}
                  className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Envoyer le lien
                    </>
                  )}
                </button>
              </form>

              {/* Back to login */}
              <div className="mt-6 text-center">
                <button
                  onClick={handleClose}
                  className="text-base-content/60 hover:text-primary text-sm font-medium"
                >
                  ← Retour à la connexion
                </button>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-lg font-semibold text-base-content mb-2">
                Email envoyé !
              </h3>
              
              <p className="text-base-content/70 text-sm mb-6 leading-relaxed">
                Nous avons envoyé un lien de réinitialisation à <br />
                <span className="font-medium text-base-content">{email}</span>
              </p>

              <div className="bg-base-200/50 rounded-lg p-4 mb-6">
                <p className="text-xs text-base-content/60">
                  <strong>Note:</strong> Le lien expirera dans 15 minutes. 
                  Vérifiez également votre dossier spam si vous ne voyez pas l&apos;email.
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-full btn btn-outline btn-sm"
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
