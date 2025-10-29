"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import AuthNavbar from "@/components/auth/auth-navbar";
import { confirmResetPassword } from "@/api/auth";
import { useTheme } from "next-themes";
import TargetCursor from "@/components/TargetCursor";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token;
  
  const { theme } = useTheme();
  const isDarkMode = theme === 'synthwave';
  
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
  const successColor = isDarkTheme ? 'oklch(77% 0.152 181.912)' : 'oklch(85.72% 0.266 158.53)';
  const textMuted = isDarkTheme ? 'rgba(200, 190, 220, 0.7)' : 'rgba(0, 0, 0, 0.7)';
  const textLight = isDarkTheme ? 'rgba(200, 190, 220, 0.5)' : 'rgba(0, 0, 0, 0.5)';
  const borderColor = isDarkTheme ? 'rgba(200, 190, 220, 0.2)' : 'rgba(0, 0, 0, 0.2)';
  const borderLight = isDarkTheme ? 'rgba(200, 190, 220, 0.3)' : 'rgba(0, 0, 0, 0.3)';
  
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCard(true), 300);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setIsLoading(true);

    try {
      await confirmResetPassword(token, formData.newPassword);
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err) {
      console.error('Password reset confirmation error:', err);
      setError(err.message || 'Failed to reset password. The link may be expired or invalid.');
    } finally {
      setIsLoading(false);
    }
  }; 

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
      
      {/* Background Textures */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full blur-2xl" style={{ backgroundColor: `${primaryColor}26` }}></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full blur-3xl" style={{ backgroundColor: `${primaryColor}1f` }}></div>
        <div className="absolute top-1/3 right-10 w-36 h-36 rounded-full blur-2xl" style={{ backgroundColor: `${primaryColor}1a` }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full blur-xl" style={{ backgroundColor: `${secondaryColor}2e` }}></div>
        <div className="absolute bottom-1/4 left-20 w-44 h-44 rounded-full blur-3xl" style={{ backgroundColor: `${secondaryColor}1f` }}></div>
        <div className="absolute top-20 right-1/3 w-28 h-28 rounded-full blur-xl" style={{ backgroundColor: `${secondaryColor}26` }}></div>
        <div className="absolute top-3/4 left-1/3 w-24 h-24 rounded-full blur-lg" style={{ backgroundColor: `${accentColor}33` }}></div>
        <div className="absolute bottom-10 right-1/4 w-38 h-38 rounded-full blur-2xl" style={{ backgroundColor: `${accentColor}24` }}></div>
        <div className="absolute top-1/4 left-1/2 w-30 h-30 rounded-full blur-xl" style={{ backgroundColor: `${accentColor}1f` }}></div>
      </div>

      <AuthNavbar />

      {/* Centered Reset Password Card */}
      <div className="relative z-10 flex items-center justify-center p-6 min-h-screen pt-24">
        <div 
          className="w-full max-w-md rounded-3xl shadow-2xl p-8 my-8 transition-all duration-1000"
          style={{
            backgroundColor: `${bgPrimary}f2`,
            backdropFilter: 'blur(12px)',
            border: `1px solid ${borderColor}`,
            opacity: showCard ? '1' : '0',
            transform: showCard ? 'translateY(0) scale(1)' : 'translateY(2rem) scale(0.95)'
          }}
        >
          
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${primaryColor}1a` }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: primaryColor }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold mb-2" style={{ color: textColor }}>Reset Password</h1>
                <p style={{ color: textMuted }}>
                  Enter your new password below
                </p>
              </div>

              {/* Reset Password Form */}
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

                {/* New Password Input */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
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
                      minLength={8}
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
                  <p className="text-xs mt-1" style={{ color: textLight }}>
                    Must be at least 8 characters long
                  </p>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
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
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="cursor-target absolute inset-y-0 right-0 flex items-center justify-center w-12 transition-colors"
                      style={{ color: textLight }}
                      onMouseEnter={(e) => e.currentTarget.style.color = textMuted}
                      onMouseLeave={(e) => e.currentTarget.style.color = textLight}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
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
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !formData.newPassword || !formData.confirmPassword}
                  className="cursor-target w-full font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: (isLoading || !formData.newPassword || !formData.confirmPassword) ? `${primaryColor}80` : primaryColor,
                    color: 'white',
                    cursor: (isLoading || !formData.newPassword || !formData.confirmPassword) ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading && formData.newPassword && formData.confirmPassword) {
                      e.currentTarget.style.backgroundColor = `${primaryColor}e6`;
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading && formData.newPassword && formData.confirmPassword) {
                      e.currentTarget.style.backgroundColor = primaryColor;
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }}></div>
                      Resetting Password...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Reset Password
                    </>
                  )}
                </button>

                {/* Back to Login Link */}
                <div className="text-center mt-6">
                  <Link 
                    href="/login" 
                    className="cursor-target text-sm font-medium"
                    style={{ color: textLight }}
                    onMouseEnter={(e) => e.currentTarget.style.color = primaryColor}
                    onMouseLeave={(e) => e.currentTarget.style.color = textLight}
                  >
                    ← Back to Login
                  </Link>
                </div>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${successColor}1a` }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: successColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-2" style={{ color: textColor }}>
                Password Reset Successful!
              </h3>
              
              <p className="text-sm mb-6 leading-relaxed" style={{ color: textMuted }}>
                Your password has been successfully reset.
                <br />
                Redirecting to login page...
              </p>

              <div className="flex items-center justify-center gap-2" style={{ color: primaryColor }}>
                <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: `${primaryColor}4d`, borderTopColor: primaryColor }}></div>
                <span className="text-sm">Redirecting...</span>
              </div>

              <div className="mt-6">
                <Link 
                  href="/login"
                  className="cursor-target text-sm font-medium underline"
                  style={{ color: textLight }}
                  onMouseEnter={(e) => e.currentTarget.style.color = primaryColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = textLight}
                >
                  Click here if not redirected
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20 text-center py-6">
        <p className="text-sm" style={{ color: textLight }}>
          Copyright @artware 2025 | Privacy Policy
        </p>
      </div>
    </div>
  );
}
