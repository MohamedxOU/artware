"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AuthNavbar from "@/components/auth/auth-navbar";
import TermsModal from "@/components/modals/termsModal";
import { useAuthStore, useThemeStore, useUIStore } from "@/stores";
import { useGuestRoute } from "@/hooks/useAuth";
import TargetCursor from "@/components/TargetCursor";

function RegisterContent() {
  const router = useRouter();
  // Route protection - redirect authenticated users
  const { isLoading: authCheckLoading } = useGuestRoute();
  
  // Zustand stores
  const { register, isLoading, error, clearError } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const { 
    modals, 
    forms, 
    openModal, 
    closeModal, 
    setShowCard,
    showSuccessDialog,
    hideSuccessDialog 
  } = useUIStore();
  // Local form state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    birth_date: '',
    level: '',
    specialty: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    profile: null
  });
  
  const [profilePreview, setProfilePreview] = useState(null);

  useEffect(() => {
    setTimeout(() => setShowCard(true), 300);
  }, [setShowCard]);

  // Show loading while checking authentication
  if (authCheckLoading) {
    return (
      <div className="min-h-screen bg-base-300 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">Vérification...</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) clearError(); // Clear error when user starts typing
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Veuillez sélectionner une image valide (JPG, PNG, WEBP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La taille de l\'image ne doit pas dépasser 5MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        profile: file
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      return; // Error will be shown by the auth store
    }
    
    // Prepare data for API (exclude confirmPassword)
    const { confirmPassword, ...apiData } = formData;
    
    const result = await register(apiData);
    if (result.success) {
      // Show success dialog (English)
      showSuccessDialog(
        "Your account has been created successfully. Please wait for the administrator to approve your account before you can sign in. 📧 Check your email for more information.",
        "Registration Successful!"
      );
      
      // Reset form
      setFormData({
        first_name: '',
        last_name: '',
        phone_number: '',
        birth_date: '',
        level: '',
        specialty: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: '',
        profile: null
      });
      setProfilePreview(null);
    }
  };

  return (
    <div className={`relative min-h-screen bg-base-300 overflow-hidden ${isDarkMode ? 'opacity-80' : 'opacity-100'}`}>
      <TargetCursor 
              spinDuration={2}
              hideDefaultCursor={true}
            />
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
          forms.showCard ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}>
          
          {/* Register Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-base-content mb-2">Create Account</h1>
            <p className="text-base-content/70">
              Join ARTWARE community<br />
              Fill in your details to create your account
            </p>
          </div>

          {/* Profile Image Upload */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-base-200 border-4 border-base-300 shadow-lg hover:shadow-xl transition-all duration-300">
                {profilePreview ? (
                  <Image 
                    src={profilePreview} 
                    alt="Profile preview" 
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-base-content/50">
                    <svg className=" w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Upload Button */}
              <label className="cursor-target  absolute -bottom-2 -right-2 bg-primary hover:bg-primary/90 text-white rounded-full p-2 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="hidden"
                  id="profile-upload"
                />
              </label>
            </div>
          </div>
          
          {/* Profile Upload Instructions */}
          <div className="text-center mb-6">
            <p className="text-xs text-base-content/60">
              Cliquez sur le + pour ajouter votre photo de profil
              <br />
              <span className="text-base-content/40">JPG, PNG ou WEBP • Max 5MB</span>
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Votre nom"
                  className="cursor-target w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="Votre prénom"
                  className="cursor-target w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Votre numéro de téléphone"
                className="cursor-target w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
                required
              />
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-base-content/70 mb-2">
                Date de naissance
              </label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleInputChange}
                className="cursor-target w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-base-content"
                required
              />
            </div>

            {/* Level and Specialty Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Niveau
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="cursor-target w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-base-content"
                  required
                >
                  <option value="" disabled>Sélectionner niveau</option>
                  <option value="LST">Licence (LST)</option>
                  <option value="MST">Master (MST)</option>
                  <option value="CI">Cycle Ingénieur (CI)</option>
                  <option value="DEUST">DEUST</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Spécialité
                </label>
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  placeholder="Votre spécialité"
                  className="cursor-target w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
                  required
                />
              </div>
            </div>

            {/* Gender and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Genre
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="cursor-target w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-base-content"
                  required
                >
                  <option value="" disabled>Sélectionner genre</option>
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
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
                  className="cursor-target w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
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
                  className="cursor-target w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
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
                  className="cursor-target w-full px-4 py-3 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
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
                  onClick={() => openModal('termsModal')}
                  className="cursor-target text-primary hover:text-primary/80 underline font-medium"
                >
                  conditions d&apos;utilisation
                </button>{" "}
                
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-target w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Création...
                </>
              ) : (
                "Créer mon compte"
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <span className="text-base-content/60 text-sm">
                Vous avez déjà un compte?{" "}
                <Link href="/login" className="cursor-target text-primary hover:text-primary/80 font-semibold">
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
        isOpen={modals.termsModal} 
        onClose={() => closeModal('termsModal')} 
      />

      {/* Success Dialog */}
      {modals.successDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-300">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Success Message */}
            <h3 className="text-2xl font-bold text-base-content mb-3">Registration Successful!</h3>
            <div className="text-base-content/70 mb-6 space-y-2">
              <p className="font-medium">Your account has been created successfully.</p>
              <p className="text-sm">
                Please wait for the administrator to approve your account before you can sign in.
              </p>
              <p className="text-sm font-medium text-primary">
                📧 Check your email for more information.
              </p>
            </div>
            
            {/* OK Button */}
            <button
              onClick={() => { hideSuccessDialog(); router.push('/'); }}
              className="cursor-target w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              I understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RegisterPage() {
  return <RegisterContent />;
}
