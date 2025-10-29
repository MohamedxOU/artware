"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredScrollButton, setHoveredScrollButton] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && theme === 'synthwave';
  
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
  const textMuted = isDarkTheme ? 'rgba(200, 190, 220, 0.8)' : 'rgba(0, 0, 0, 0.8)';
  const textLight = isDarkTheme ? 'rgba(200, 190, 220, 0.6)' : 'rgba(0, 0, 0, 0.6)';
  const borderColor = isDarkTheme ? 'rgba(200, 190, 220, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const socialBg = isDarkTheme ? 'rgba(200, 190, 220, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  // Scroll detection for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollThreshold = 300; // Show button after scrolling 300px
      setShowScrollButton(scrollTop > scrollThreshold);
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    );

    const section = document.getElementById("footer-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <footer 
      id="footer-section" 
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: bgTertiary, color: textColor }}
    >
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl" style={{ backgroundColor: `${primaryColor}1a` }}></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full blur-3xl" style={{ backgroundColor: `${primaryColor}1a` }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full blur-2xl" style={{ backgroundColor: `${primaryColor}1a` }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image 
                src={
                  isDarkMode
                    ? "/logos/ArtwareLogo-darkMode.png" 
                    : "/logos/ArtwareLogo.png"
                }
                alt="ArtWare Logo" 
                width={120} 
                height={120}  
                className="rounded-full transition-all duration-300" 
              />
              
            </div>
            <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
              We create the technological future through innovation, collaboration, and academic excellence.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{ backgroundColor: hoveredSocial === 'facebook' ? primaryColor : socialBg }}
                onMouseEnter={() => setHoveredSocial('facebook')}
                onMouseLeave={() => setHoveredSocial(null)}
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" style={{ color: hoveredSocial === 'facebook' ? 'white' : textColor }}>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{ backgroundColor: hoveredSocial === 'linkedin' ? primaryColor : socialBg }}
                onMouseEnter={() => setHoveredSocial('linkedin')}
                onMouseLeave={() => setHoveredSocial(null)}
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" style={{ color: hoveredSocial === 'linkedin' ? 'white' : textColor }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{ backgroundColor: hoveredSocial === 'instagram' ? primaryColor : socialBg }}
                onMouseEnter={() => setHoveredSocial('instagram')}
                onMouseLeave={() => setHoveredSocial(null)}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" style={{ color: hoveredSocial === 'instagram' ? 'white' : textColor }}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{ backgroundColor: hoveredSocial === 'github' ? primaryColor : socialBg }}
                onMouseEnter={() => setHoveredSocial('github')}
                onMouseLeave={() => setHoveredSocial(null)}
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" style={{ color: hoveredSocial === 'github' ? 'white' : textColor }}>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h4 className="text-xl font-semibold mb-4" style={{ color: textColor }}>Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="#hero" 
                  className="text-sm transition-colors duration-300"
                  style={{ color: hoveredLink === 'home' ? primaryColor : textMuted }}
                  onMouseEnter={() => setHoveredLink('home')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="#about" 
                  className="text-sm transition-colors duration-300"
                  style={{ color: hoveredLink === 'about' ? primaryColor : textMuted }}
                  onMouseEnter={() => setHoveredLink('about')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="#activities" 
                  className="text-sm transition-colors duration-300"
                  style={{ color: hoveredLink === 'activities' ? primaryColor : textMuted }}
                  onMouseEnter={() => setHoveredLink('activities')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Activities
                </Link>
              </li>
              <li>
                <Link 
                  href="#bureau" 
                  className="text-sm transition-colors duration-300"
                  style={{ color: hoveredLink === 'bureau' ? primaryColor : textMuted }}
                  onMouseEnter={() => setHoveredLink('bureau')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Our Board
                </Link>
              </li>
              <li>
                <Link 
                  href="#contact" 
                  className="text-sm transition-colors duration-300"
                  style={{ color: hoveredLink === 'contact' ? primaryColor : textMuted }}
                  onMouseEnter={() => setHoveredLink('contact')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h4 className="text-xl font-semibold mb-4" style={{ color: textColor }}>Our Services</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-sm" style={{ color: textMuted }}>Technical Training</span>
              </li>
              <li>
                <span className="text-sm" style={{ color: textMuted }}>Workshops & Hackathons</span>
              </li>
              <li>
                <span className="text-sm" style={{ color: textMuted }}>Collaborative Projects</span>
              </li>
              <li>
                <span className="text-sm" style={{ color: textMuted }}>Professional Mentoring</span>
              </li>
              <li>
                <span className="text-sm" style={{ color: textMuted }}>Tech Events</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h4 className="text-xl font-semibold mb-4" style={{ color: textColor }}>Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: primaryColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm" style={{ color: textMuted }}>FSTE </p>
                  <p className="text-xs" style={{ color: textLight }}>Errachidia, Maroc</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: primaryColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-sm" style={{ color: textMuted }}>artware.club@gmail.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: primaryColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-sm" style={{ color: textMuted }}>+212 688 784 609</p>
              </div>
            </div>
          </div>
        </div>

       
        {/* Bottom Section */}
        <div className={`pt-8 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ borderTop: `1px solid ${borderColor}` }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm" style={{ color: textLight }}>
                © 2025 ArtWare Club. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link 
                href="#" 
                className="text-sm transition-colors duration-300"
                style={{ color: hoveredLink === 'privacy' ? primaryColor : textLight }}
                onMouseEnter={() => setHoveredLink('privacy')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Privacy Policy
              </Link>
              <Link 
                href="#" 
                className="text-sm transition-colors duration-300"
                style={{ color: hoveredLink === 'terms' ? primaryColor : textLight }}
                onMouseEnter={() => setHoveredLink('terms')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Terms of Use
              </Link>
              <Link 
                href="#" 
                className="text-sm transition-colors duration-300"
                style={{ color: hoveredLink === 'legal' ? primaryColor : textLight }}
                onMouseEnter={() => setHoveredLink('legal')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Legal Notice
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`cursor-target fixed bottom-8 right-8 w-12 h-12 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-20 flex items-center justify-center ${
          showScrollButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ backgroundColor: hoveredScrollButton ? `${primaryColor}dd` : primaryColor }}
        onMouseEnter={() => setHoveredScrollButton(true)}
        onMouseLeave={() => setHoveredScrollButton(false)}
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}
