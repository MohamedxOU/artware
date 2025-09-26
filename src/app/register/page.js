"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AuthNavbar from "@/components/auth/auth-navbar";
import TermsModal from "@/components/modals/termsModal";

export default function RegisterPage() {
  const [showCard, setShowCard] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    cne: '',
    parcours: '',
    filiere: '',
    sex: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setTimeout(() => setShowCard(true), 300);
  }, []);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      const currentTheme = htmlElement.getAttribute('data-theme');
      setIsDarkTheme(currentTheme !== 'acid');
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration data:', formData);
  };

  return (
    <div className={`relative min-h-screen bg-base-300 overflow-hidden ${isDarkTheme ? 'opacity-80' : 'opacity-100'}`}>
      {/* Background Textures - covering entire page */}
      <div className="absolute inset-0">
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

      <AuthNavbar />

      {/* Centered Register Card */}
      <div className="relative z-10 flex items-center justify-center p-6 min-h-screen pt-24">
        <div className={`w-full max-w-2xl bg-base-100/95 backdrop-blur-md rounded-3xl shadow-2xl border border-base-300/20 p-8 my-8 transition-all duration-1000 ${
          showCard ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}>
          
          {/* Register Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-base-content mb-2">Create Account</h1>
            <p className="text-base-content/70">
              Join ARTWARE community<br />
              Fill in your details to create your account
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  placeholder="Votre prénom"
                  className="w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
                  required
                />
              </div>
            </div>

            {/* CNE */}
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                CNE
              </label>
              <input
                type="text"
                name="cne"
                value={formData.cne}
                onChange={handleInputChange}
                placeholder="Code National Étudiant"
                className="w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
                required
              />
            </div>

            {/* Parcours and Filiere Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Parcours
                </label>
                <select
                  name="parcours"
                  value={formData.parcours}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-base-content"
                  required
                >
                  <option value="" disabled>Sélectionner parcours</option>
                  <option value="licence">Licence</option>
                  <option value="master">Master</option>
                  <option value="ingenieur">Ingénieur</option>
                  <option value="doctorat">Doctorat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Filière
                </label>
                <input
                  type="text"
                  name="filiere"
                  value={formData.filiere}
                  onChange={handleInputChange}
                  placeholder="Votre filière"
                  className="w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
                  required
                />
              </div>
            </div>

            {/* Sex and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Sexe
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-base-content"
                  required
                >
                  <option value="" disabled>Sélectionner sexe</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre.email@example.com"
                  className="w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
                  required
                />
              </div>
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Mot de passe"
                  className="w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Confirmer mot de passe
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmer mot de passe"
                  className="w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 text-primary bg-base-200 border-base-300 rounded focus:ring-primary/50"
                required
              />
              <label htmlFor="terms" className="text-sm text-base-content/70">
                J&apos;accepte les{" "}
                <button
                  type="button"
                  onClick={() => setIsTermsModalOpen(true)}
                  className="text-primary hover:text-primary/80 underline font-medium"
                >
                  conditions d&apos;utilisation
                </button>{" "}
                et la{" "}
                <Link href="/privacy" className="text-primary hover:text-primary/80">
                  politique de confidentialité
                </Link>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Créer mon compte
            </button>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <span className="text-base-content/60 text-sm">
                Vous avez déjà un compte?{" "}
                <Link href="/login" className="text-primary hover:text-primary/80 font-semibold">
                  Se connecter
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20 text-center py-6">
        <p className="text-base-content/50 text-sm">
          Copyright @artware 2025 | Privacy Policy
        </p>
      </div>

      {/* Terms Modal */}
      <TermsModal 
        isOpen={isTermsModalOpen} 
        onClose={() => setIsTermsModalOpen(false)} 
      />
    </div>
  );
}
