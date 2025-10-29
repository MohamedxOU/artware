"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AuthNavbar from "@/components/auth/auth-navbar";
import TermsModal from "@/components/modals/termsModal";
import { useAuthStore, useUIStore } from "@/stores";
import { useTheme } from "next-themes";
import { useGuestRoute } from "@/hooks/useAuth";
import TargetCursor from "@/components/TargetCursor"; 

function RegisterContent() {
  const router = useRouter();
  // Route protection - redirect authenticated users
  const { isLoading: authCheckLoading } = useGuestRoute();
  
  // Zustand stores
  const { register, isLoading, error, clearError } = useAuthStore();
  const { theme } = useTheme();
  const { 
    modals, 
    forms, 
    openModal, 
    closeModal, 
    setShowCard,
    showSuccessDialog,
    hideSuccessDialog 
  } = useUIStore();
  
  // Theme detection
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  useEffect(() => {
    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setIsDarkTheme(currentTheme === 'synthwave');
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Theme colors
  const bgPrimary = isDarkTheme ? 'oklch(98% 0.003 247.858)' : 'oklch(98% 0 0)';
  const bgSecondary = isDarkTheme ? 'oklch(20% 0.09 281.288)' : 'oklch(95% 0 0)';
  const bgTertiary = isDarkTheme ? 'oklch(25% 0.09 281.288)' : 'oklch(91% 0 0)';
  const textColor = isDarkTheme ? 'oklch(78% 0.115 274.713)' : 'oklch(0% 0 0)';
  const primaryColor = 'oklch(65% 0.241 354.308)';
  const secondaryColor = isDarkTheme ? 'oklch(82% 0.111 230.318)' : 'oklch(73.37% 0.224 48.25)';
  const accentColor = isDarkTheme ? 'oklch(75% 0.183 55.934)' : 'oklch(92.78% 0.264 122.962)';
  const errorColor = isDarkTheme ? 'oklch(73.7% 0.121 32.639)' : 'oklch(64.84% 0.293 29.349)';
  const textMuted = isDarkTheme ? 'rgba(200, 190, 220, 0.7)' : 'rgba(0, 0, 0, 0.7)';
  const textLight = isDarkTheme ? 'rgba(200, 190, 220, 0.5)' : 'rgba(0, 0, 0, 0.5)';
  const borderColor = isDarkTheme ? 'rgba(200, 190, 220, 0.2)' : 'rgba(0, 0, 0, 0.2)';
  const borderLight = isDarkTheme ? 'rgba(200, 190, 220, 0.3)' : 'rgba(0, 0, 0, 0.3)';
  
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: bgTertiary }}>
        <div className="text-center">
          <div className="loading loading-spinner loading-lg" style={{ color: primaryColor }}></div>
          <p className="mt-4" style={{ color: textMuted }}>Vérification...</p>
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

  const isDarkMode = theme === 'synthwave';

  return (
    <div 
      className="relative min-h-screen overflow-hidden"
      style={{ 
        backgroundColor: bgTertiary,
        opacity: isDarkMode ? '0.8' : '1'
      }}
    >
      <TargetCursor 
              spinDuration={2}
              hideDefaultCursor={true}
            />
      {/* Background Textures - covering entire page */}
      <div className="absolute inset-0">
        {/* Large primary circles */}
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full blur-2xl" style={{ backgroundColor: `${primaryColor}26` }}></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full blur-3xl" style={{ backgroundColor: `${primaryColor}1f` }}></div>
        <div className="absolute top-1/3 right-10 w-36 h-36 rounded-full blur-2xl" style={{ backgroundColor: `${primaryColor}1a` }}></div>
        
        {/* Secondary color patterns */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full blur-xl" style={{ backgroundColor: `${secondaryColor}2e` }}></div>
        <div className="absolute bottom-1/4 left-20 w-44 h-44 rounded-full blur-3xl" style={{ backgroundColor: `${secondaryColor}1f` }}></div>
        <div className="absolute top-20 right-1/3 w-28 h-28 rounded-full blur-xl" style={{ backgroundColor: `${secondaryColor}26` }}></div>
        
        {/* Accent patterns */}
        <div className="absolute top-3/4 left-1/3 w-24 h-24 rounded-full blur-lg" style={{ backgroundColor: `${accentColor}33` }}></div>
        <div className="absolute bottom-10 right-1/4 w-38 h-38 rounded-full blur-2xl" style={{ backgroundColor: `${accentColor}24` }}></div>
        <div className="absolute top-1/4 left-1/2 w-30 h-30 rounded-full blur-xl" style={{ backgroundColor: `${accentColor}1f` }}></div>
        
        {/* Additional geometric patterns */}
        <div className="absolute top-40 left-1/3 w-20 h-60 rounded-full blur-2xl rotate-45" style={{ backgroundColor: `${primaryColor}14` }}></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-50 rounded-full blur-xl -rotate-45" style={{ backgroundColor: `${secondaryColor}1a` }}></div>
        <div className="absolute top-1/2 right-20 w-18 h-45 rounded-full blur-lg rotate-12" style={{ backgroundColor: `${accentColor}1f` }}></div>
        
        {/* Small scattered dots */}
        <div className="absolute top-16 left-1/2 w-12 h-12 rounded-full blur-sm" style={{ backgroundColor: `${primaryColor}40` }}></div>
        <div className="absolute top-1/3 left-20 w-8 h-8 rounded-full blur-sm" style={{ backgroundColor: `${secondaryColor}4d` }}></div>
        <div className="absolute bottom-1/3 right-16 w-10 h-10 rounded-full blur-sm" style={{ backgroundColor: `${accentColor}40` }}></div>
        <div className="absolute top-2/3 left-16 w-14 h-14 rounded-full blur-md" style={{ backgroundColor: `${primaryColor}33` }}></div>
        <div className="absolute bottom-16 left-1/2 w-16 h-16 rounded-full blur-md" style={{ backgroundColor: `${secondaryColor}2e` }}></div>
        
        {/* Overlapping larger shapes */}
        <div className="absolute top-0 left-1/4 w-56 h-56 rounded-full blur-3xl" style={{ backgroundColor: `${primaryColor}0f` }}></div>
        <div className="absolute bottom-0 right-1/4 w-52 h-52 rounded-full blur-3xl" style={{ backgroundColor: `${secondaryColor}14` }}></div>
        <div className="absolute top-1/2 left-0 w-48 h-48 rounded-full blur-3xl" style={{ backgroundColor: `${accentColor}12` }}></div>
        <div className="absolute top-1/2 right-0 w-50 h-50 rounded-full blur-3xl" style={{ backgroundColor: `${primaryColor}0d` }}></div>
      </div>

      <AuthNavbar />

      {/* Centered Register Card */}
      <div className="relative z-10 flex items-center justify-center p-6 min-h-screen pt-24">
        <div 
          className="w-full max-w-2xl rounded-3xl shadow-2xl p-8 my-8 transition-all duration-1000"
          style={{
            backgroundColor: `${bgPrimary}f2`,
            backdropFilter: 'blur(12px)',
            border: `1px solid ${borderColor}`,
            opacity: forms.showCard ? '1' : '0',
            transform: forms.showCard ? 'translateY(0) scale(1)' : 'translateY(2rem) scale(0.95)'
          }}
        >
          
          {/* Register Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: textColor }}>Create Account</h1>
            <p style={{ color: textMuted }}>
              Join ARTWARE community<br />
              Fill in your details to create your account
            </p>
          </div>

          {/* Profile Image Upload */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div 
                className="w-24 h-24 rounded-full overflow-hidden shadow-lg transition-all duration-300"
                style={{
                  backgroundColor: bgSecondary,
                  border: `4px solid ${borderLight}`
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
              >
                {profilePreview ? (
                  <Image 
                    src={profilePreview} 
                    alt="Profile preview" 
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ color: textLight }}>
                    <svg className=" w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Upload Button */}
              <label 
                className="cursor-target absolute -bottom-2 -right-2 text-white rounded-full p-2 cursor-pointer shadow-lg transition-all duration-300"
                style={{ backgroundColor: primaryColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${primaryColor}e6`;
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = primaryColor;
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
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
            <p className="text-xs" style={{ color: textLight }}>
              Cliquez sur le + pour ajouter votre photo de profil
              <br />
              <span style={{ color: textLight, opacity: 0.6 }}>JPG, PNG ou WEBP • Max 5MB</span>
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div 
                className="px-4 py-3 rounded-xl text-sm"
                style={{
                  backgroundColor: `${errorColor}1a`,
                  border: `1px solid ${errorColor}33`,
                  color: errorColor
                }}
              >
                {error}
              </div>
            )}
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                  Nom
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Votre nom"
                  className="cursor-target w-full px-4 py-3 rounded-xl transition-all"
                  style={{
                    backgroundColor: `${bgSecondary}80`,
                    border: `1px solid ${borderLight}`,
                    color: textColor,
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = `0 0 0 2px ${primaryColor}80`;
                    e.target.style.borderColor = `${primaryColor}80`;
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = borderLight;
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                  Prénom
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="Votre prénom"
                  className="cursor-target w-full px-4 py-3 rounded-xl transition-all"
                  style={{
                    backgroundColor: `${bgSecondary}80`,
                    border: `1px solid ${borderLight}`,
                    color: textColor,
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = `0 0 0 2px ${primaryColor}80`;
                    e.target.style.borderColor = `${primaryColor}80`;
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = borderLight;
                  }}
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                Numéro de téléphone
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Votre numéro de téléphone"
                className="cursor-target w-full px-4 py-3 rounded-xl transition-all"
                style={{
                  backgroundColor: `${bgSecondary}80`,
                  border: `1px solid ${borderLight}`,
                  color: textColor,
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = `0 0 0 2px ${primaryColor}80`;
                  e.target.style.borderColor = `${primaryColor}80`;
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.borderColor = borderLight;
                }}
                required
              />
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                Date de naissance
              </label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleInputChange}
                className="cursor-target w-full px-4 py-3 rounded-xl transition-all"
                style={{
                  backgroundColor: `${bgSecondary}80`,
                  border: `1px solid ${borderLight}`,
                  color: textColor,
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = `0 0 0 2px ${primaryColor}80`;
                  e.target.style.borderColor = `${primaryColor}80`;
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.borderColor = borderLight;
                }}
                required
              />
            </div>

            {/* Level and Specialty Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                  Niveau
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="cursor-target w-full px-4 py-3 rounded-xl transition-all"
                  style={{
                    backgroundColor: `${bgSecondary}80`,
                    border: `1px solid ${borderLight}`,
                    color: textColor,
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = `0 0 0 2px ${primaryColor}80`;
                    e.target.style.borderColor = `${primaryColor}80`;
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = borderLight;
                  }}
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
                <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                  Spécialité
                </label>
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  placeholder="Votre spécialité"
                  className="cursor-target w-full px-4 py-3 rounded-xl transition-all"
                  style={{
                    backgroundColor: `${bgSecondary}80`,
                    border: `1px solid ${borderLight}`,
                    color: textColor,
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = `0 0 0 2px ${primaryColor}80`;
                    e.target.style.borderColor = `${primaryColor}80`;
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = borderLight;
                  }}
                  required
                />
              </div>
            </div>

            {/* Gender and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                  Genre
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="cursor-target w-full px-4 py-3 rounded-xl transition-all"
                  style={{
                    backgroundColor: `${bgSecondary}80`,
                    border: `1px solid ${borderLight}`,
                    color: textColor,
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = `0 0 0 2px ${primaryColor}80`;
                    e.target.style.borderColor = `${primaryColor}80`;
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = borderLight;
                  }}
                  required
                >
                  <option value="" disabled>Sélectionner genre</option>
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre.email@example.com"
                  className="cursor-target w-full px-4 py-3 rounded-xl transition-all"
                  style={{
                    backgroundColor: `${bgSecondary}80`,
                    border: `1px solid ${borderLight}`,
                    color: textColor,
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = `0 0 0 2px ${primaryColor}80`;
                    e.target.style.borderColor = `${primaryColor}80`;
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = borderLight;
                  }}
                  required
                />
              </div>
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Mot de passe"
                  className="cursor-target w-full px-4 py-3 rounded-xl transition-all"
                  style={{
                    backgroundColor: `${bgSecondary}80`,
                    border: `1px solid ${borderLight}`,
                    color: textColor,
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = `0 0 0 2px ${primaryColor}80`;
                    e.target.style.borderColor = `${primaryColor}80`;
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = borderLight;
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                  Confirmer mot de passe
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmer mot de passe"
                  className="cursor-target w-full px-4 py-3 rounded-xl transition-all"
                  style={{
                    backgroundColor: `${bgSecondary}80`,
                    border: `1px solid ${borderLight}`,
                    color: textColor,
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = `0 0 0 2px ${primaryColor}80`;
                    e.target.style.borderColor = `${primaryColor}80`;
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = borderLight;
                  }}
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 rounded focus:ring-2"
                style={{
                  color: primaryColor,
                  backgroundColor: bgSecondary,
                  borderColor: borderLight,
                  outline: 'none'
                }}
                required
              />
              <label htmlFor="terms" className="text-sm" style={{ color: textMuted }}>
                J&apos;accepte les{" "}
                <button
                  type="button"
                  onClick={() => openModal('termsModal')}
                  className="cursor-target underline font-medium"
                  style={{ color: primaryColor }}
                  onMouseEnter={(e) => e.currentTarget.style.color = `${primaryColor}cc`}
                  onMouseLeave={(e) => e.currentTarget.style.color = primaryColor}
                >
                  conditions d&apos;utilisation
                </button>{" "}
                
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-target w-full font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              style={{
                backgroundColor: isLoading ? `${primaryColor}80` : primaryColor,
                color: 'white',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = `${primaryColor}e6`;
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = primaryColor;
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }}></div>
                  Création...
                </>
              ) : (
                "Créer mon compte"
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <span className="text-sm" style={{ color: textLight }}>
                Vous avez déjà un compte?{" "}
                <Link 
                  href="/login" 
                  className="cursor-target font-semibold"
                  style={{ color: primaryColor }}
                  onMouseEnter={(e) => e.currentTarget.style.color = `${primaryColor}cc`}
                  onMouseLeave={(e) => e.currentTarget.style.color = primaryColor}
                >
                  Se connecter
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20 text-center py-6">
        <p className="text-sm" style={{ color: textLight }}>
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
