"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AuthNavbar from "@/components/auth/auth-navbar";
import { useTheme } from "next-themes";
import TargetCursor from "@/components/TargetCursor";

export default function ResetPasswordPreviewPage() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'synthwave';
  
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

    // Simulate API call for preview
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Note: No actual redirect in preview mode
    }, 2000);
  };

  return (
    <div className={`relative min-h-screen bg-base-300 overflow-hidden ${isDarkMode ? 'opacity-80' : 'opacity-100'}`}>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
      {/* Preview Banner */}
      <div className="fixed top-0 left-0 right-0 bg-warning  text-warning-content px-4 py-2 text-center text-sm font-medium z-50">
        ⚠️ PREVIEW MODE - This is a visual preview. Use a real reset link to test functionality.
      </div>
      
      {/* Background Textures */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary/12 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-36 h-36 bg-primary  rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-secondary/18 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-20 w-44 h-44 bg-secondary/12 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/3 w-28 h-28 bg-secondary/15 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 left-1/3 w-24 h-24 bg-accent  rounded-full blur-lg"></div>
        <div className="absolute bottom-10 right-1/4 w-38 h-38 bg-accent/14 rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 left-1/2 w-30 h-30 bg-accent/12 rounded-full blur-xl"></div>
      </div>

      <div className="mt-10">
        <AuthNavbar />
      </div>

      {/* Centered Reset Password Card */}
      <div className="relative z-10 flex items-center justify-center p-6 min-h-screen pt-24">
        <div className={`w-full max-w-md bg-base-100/95 backdrop-blur-md rounded-3xl shadow-2xl border border-base-300  p-8 my-8 transition-all duration-1000 ${
          showCard ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}>
          
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary  rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-base-content mb-2">Reset Password</h1>
                <p className="text-base-content ">
                  Enter your new password below
                </p>
              </div>

              {/* Reset Password Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-error  border border-error  text-error px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                {/* New Password Input */}
                <div>
                  <label className="block text-sm font-medium text-base-content  mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                      className="cursor-target w-full px-4 py-4 pr-12 bg-base-200  border border-base-300   rounded-xl focus:outline-none focus:ring-2 focus:ring-primary  focus:border-primary  transition-all placeholder-base-content "
                      required
                      disabled={isLoading}
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-target absolute inset-y-0 right-0 flex items-center justify-center w-12 text-base-content  hover:text-base-content  transition-colors"
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
                  <p className="text-xs text-base-content  mt-1">
                    Must be at least 8 characters long
                  </p>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-sm font-medium text-base-content  mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
                      className="cursor-target w-full px-4 py-4 pr-12 bg-base-200  border border-base-300   rounded-xl focus:outline-none focus:ring-2 focus:ring-primary  focus:border-primary  transition-all placeholder-base-content "
                      required
                      disabled={isLoading}
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="cursor-target absolute inset-y-0 right-0 flex items-center justify-center w-12 text-base-content  hover:text-base-content  transition-colors"
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
                  className="cursor-target w-full bg-primary hover:bg-primary  disabled:bg-primary  disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white   border-t-white rounded-full animate-spin"></div>
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
                  <Link href="/login" className="cursor-target text-base-content  hover:text-primary text-sm font-medium">
                    ← Back to Login
                  </Link>
                </div>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="w-16 h-16 bg-success  rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-base-content mb-2">
                Password Reset Successful!
              </h3>
              
              <p className="text-base-content  text-sm mb-6 leading-relaxed">
                Your password has been successfully reset.
                <br />
                <span className="text-base-content ">(Preview mode - no redirect)</span>
              </p>

              <div className="mt-6">
                <Link 
                  href="/login"
                  className="cursor-target btn btn-primary"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20 text-center py-6">
        <p className="text-base-content  text-sm">
          Copyright @artware 2025 | Privacy Policy
        </p>
      </div>
    </div>
  );
}
