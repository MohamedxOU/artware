"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Iridescence from "@/components/Iridescence.jsx";

export default function LoginPage() {
  const [showCard, setShowCard] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

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

  return (
    <div className={`relative ${isDarkTheme ? 'opacity-80' : 'opacity-100'}`}
    style={{height : '100vh'}}>
      {/* Animated Background */}
      <Iridescence
        color={[0.8, 0, 0.8]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-base-content">ARTWARE</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button className="text-base-content/70 hover:text-base-content text-sm">
              🌐 EN
            </button>
            <Link href="/signup" className="text-base-content/70 hover:text-base-content text-sm">
              Sign up
            </Link>
            <button className="bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/30 transition-all">
              Request Demo
            </button>
          </div>
        </div>
      </div>

      {/* Centered Login Card */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
        <div className={`w-full max-w-md bg-base-100/95 backdrop-blur-md rounded-3xl shadow-2xl border border-base-300/20 p-8 transition-all duration-1000 ${
          showCard ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}>
          
          {/* Login Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-base-content mb-2">Member Login</h1>
            <p className="text-base-content/70">
              Hey, Enter your details to get sign in<br />
              to your account
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-6">
            {/* Email/Phone Input */}
            <div>
              <input
                type="text"
                placeholder="Enter Email / Phone No"
                className="w-full px-4 py-4 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                placeholder="Passcode"
                className="w-full px-4 py-4 bg-base-200/50 border border-base-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder-base-content/50"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content text-sm"
              >
                Hide
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-center">
              <Link href="/forgot-password" className="text-base-content/60 hover:text-primary text-sm">
                Having trouble in sign in?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Sign in
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
              <span className="text-base-content/60 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary hover:text-primary/80 font-semibold">
                  Request Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 z-20 text-center">
        <p className="text-base-content/50 text-sm">
          Copyright @artware 2025 | Privacy Policy
        </p>
      </div>
    </div>
  );
}
