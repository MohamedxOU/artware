"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthNavbar from "@/components/auth/auth-navbar";
import ForgotPasswordModal from "@/components/modals/forgotPassword";
import { useAuthStore, useUIStore } from "@/stores";
import { useTheme } from "next-themes";
import { useGuestRoute } from "@/hooks/useAuth";
import TargetCursor from "@/components/TargetCursor";

function LoginContent() { 
  const router = useRouter(); 
  
  // Route protection - redirect authenticated users
  const { isLoading: authCheckLoading } = useGuestRoute();
  
  // Zustand stores
  const { login, isLoading, error, clearError } = useAuthStore();
  const { theme } = useTheme();
  const { modals, forms, openModal, closeModal, setShowCard } = useUIStore();
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  
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
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) clearError(); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
     
    const result = await login(formData.email, formData.password);
    if (result.success) {
      // Optional: Show success message with user's name
      if (result.user) {
        const userName = `${result.user.first_name} ${result.user.last_name}`;
        console.log(`Welcome back, ${userName}!`);
      }
      
      // Redirect to dashboard or intended page
      const intendedRoute = sessionStorage.getItem('intendedRoute') || '/dashboard';
      sessionStorage.removeItem('intendedRoute');
      router.push(intendedRoute);
    }
    // Error handling is already done in the authStore
  };

  const isDarkMode = theme === 'synthwave';

  return (
    <div className={`relative min-h-screen overflow-hidden ${isDarkMode ? 'opacity-80' : 'opacity-100'}`} style={{ backgroundColor: bgTertiary }}>
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

      {/* Centered Login Card */}
      <div className="relative z-10 flex items-center justify-center p-6 min-h-screen pt-24">
        <div className={`w-full max-w-md rounded-3xl shadow-2xl p-8 my-8 transition-all duration-1000 ${
          forms.showCard ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}
          style={{
            backgroundColor: `${bgPrimary}f2`,
            backdropFilter: 'blur(12px)',
            border: `1px solid ${borderColor}`
          }}
        >
          
          {/* Login Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: textColor }}>Member Login</h1>
            <p style={{ color: textMuted }}>
              Hey, Enter your details to get sign in<br />
              to your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="px-4 py-3 rounded-xl text-sm" style={{ 
                backgroundColor: `${errorColor}1a`, 
                border: `1px solid ${errorColor}33`,
                color: errorColor 
              }}>
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                className="cursor-target w-full px-4 py-4 rounded-xl transition-all"
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
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="cursor-target w-full px-4 py-4 pr-12 rounded-xl transition-all"
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
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-target absolute inset-y-0 right-0 flex items-center justify-center w-12 transition-colors"
                style={{ color: textLight }}
                onMouseEnter={(e) => e.currentTarget.style.color = textMuted}
                onMouseLeave={(e) => e.currentTarget.style.color = textLight}
                disabled={isLoading}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => openModal('forgotPasswordModal')}
                className="cursor-target text-sm underline transition-colors"
                style={{ color: textLight }}
                onMouseEnter={(e) => e.currentTarget.style.color = primaryColor}
                onMouseLeave={(e) => e.currentTarget.style.color = textLight}
              >
                Having trouble in sign in?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-target w-full font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              style={{
                backgroundColor: isLoading ? `${primaryColor}80` : primaryColor,
                color: 'white',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = `${primaryColor}e6`;
              }}
              onMouseLeave={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = primaryColor;
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Connexion...
                </>
              ) : (
                "Sign in"
              )}
            </button>

            {/* Divider */}
            {/* <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-base-100/95 text-base-content/60">Or Sign in with</span>
              </div>
            </div> */}

            {/* Social Login Buttons */}
            {/* <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                className="flex items-center justify-center py-3 px-4 border border-base-300/30 rounded-xl hover:bg-base-200/50 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              
              <button
                type="button"
                className="flex items-center justify-center py-3 px-4 border border-base-300/30 rounded-xl hover:bg-base-200/50 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </button>
              
              <button
                type="button"
                className="flex items-center justify-center py-3 px-4 border border-base-300/30 rounded-xl hover:bg-base-200/50 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div> */}

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <span className="text-sm" style={{ color: textLight }}>
                Don&apos;t have an account?{" "}
                <Link 
                  href="/register" 
                  className="cursor-target font-semibold transition-colors"
                  style={{ color: primaryColor }}
                  onMouseEnter={(e) => e.currentTarget.style.color = `${primaryColor}cc`}
                  onMouseLeave={(e) => e.currentTarget.style.color = primaryColor}
                >
                  Register now
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

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={modals.forgotPasswordModal} 
        onClose={() => closeModal('forgotPasswordModal')} 
      />
    </div>
  );
}

export default function LoginPage() {
  return <LoginContent />;
}
