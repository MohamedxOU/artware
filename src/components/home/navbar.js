"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuthStore, useUIStore } from "@/stores";

const navLinks = [
  { href: "#about-us", label: "About" },
  { href: "#activities", label: "Activities" },
  { href: "#cells", label: "Cells" },
  { href: "#gallery", label: "Gallery" },
  { href: "#bureau", label: "Team" },
  { href: "#contact", label: "Contact" }
];

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading: authLoading } = useAuthStore();
  const { addNotification } = useUIStore();
  const { theme, setTheme } = useTheme();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track when component is mounted
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  
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
  const errorColor = isDarkTheme ? 'oklch(73.7% 0.121 32.639)' : 'oklch(64.84% 0.293 29.349)';
  const borderColor = isDarkTheme ? 'rgba(200, 190, 220, 0.2)' : 'rgba(0, 0, 0, 0.2)';

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll effect handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollThreshold = 50;
      setIsScrolled(scrollTop > scrollThreshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme switcher handler
  const handleTheme = (t) => {
    setTheme(t);
  };

  // Logout handler
  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (!confirmed) return;

    try {
      const result = await logout();
      
      if (result.success) {
        if (result.warning) {
          addNotification({
            type: 'warning',
            message: result.warning,
            duration: 5000
          });
        } else {
          addNotification({
            type: 'success',
            message: 'Logout successful. See you soon!',
            duration: 3000
          });
        }
      } else if (result.error) {
        addNotification({
          type: 'error',
          message: result.error,
          duration: 5000
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      addNotification({
        type: 'error',
        message: 'Logout error',
        duration: 5000
      });
    }
  };

  // Smooth scroll handler for navigation links
  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const navbarHeight = 80; // Approximate navbar height
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // For non-anchor links, navigate normally
      window.location.href = href;
    }
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  // Determine logo source based on theme and scroll state
  const getLogoSource = () => {
    if (!isMounted) {
      // Return a default logo during SSR to avoid hydration mismatch
      return "/logos/ArtwareLogo.png";
    }
    
    // Use dark logo for dark themes
    const isDarkMode = theme === 'synthwave';
    if (isDarkMode) {
      return "/logos/ArtwareLogo-darkMode.png";
    }
    
    // For light themes, use different logic based on scroll state
    return isScrolled ? "/logos/ArtwareLogo.png" : "/logos/ArtwareLogo-darkMode.png";
  };

  return (
    <>
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300`}
        style={{
          backgroundColor: isScrolled ? bgPrimary : 'transparent',
          borderBottom: isScrolled ? `1px solid ${borderColor}` : 'none',
          boxShadow: isScrolled ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
        }}
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between px-4 py-4 transition-all duration-300 ${
          !isScrolled && !isMobileMenuOpen ? "mx-8 mt-4 rounded-full shadow-lg" : ""
        } ${isMobileMenuOpen ? "md:flex hidden" : ""}`}
          style={{
            backgroundColor: !isScrolled && !isMobileMenuOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            backdropFilter: !isScrolled && !isMobileMenuOpen ? 'blur(12px)' : 'none',
            border: !isScrolled && !isMobileMenuOpen ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'
          }}
        >
          {/* Logo */}
          <Link href="#hero" className="flex items-center gap-2">
            <div>
              <Image 
              src={getLogoSource()}
              alt="Logo" 
              width={160} 
              height={160}  
              className={`rounded-full transition-all duration-300 ${
                isScrolled ? "scale-90" : "scale-100"
              }`} 
              priority // Add priority for above-the-fold image
            />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-12 flex-1 justify-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="cursor-target text-base font-medium transition-all duration-300 cursor-pointer"
                  style={{ 
                    color: isScrolled 
                      ? (hoveredLink === link.href ? primaryColor : textColor)
                      : (hoveredLink === link.href ? primaryColor : 'white')
                  }}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label} 
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Right Controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Switcher */}
            <div className="dropdown dropdown-end">
              <label 
                tabIndex={0} 
                className="btn btn-circle transition-all duration-300"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  color: isScrolled ? textColor : 'white'
                }}
              >
                {theme === "acid" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                )}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow rounded-box w-32 mt-2"
                style={{ backgroundColor: bgPrimary }}
              >
                <li>
                  <button
                    className="cursor-target flex items-center gap-2"
                    style={{ 
                      color: theme === "acid" ? primaryColor : textColor 
                    }}
                    onClick={() => handleTheme("acid")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                    Light
                  </button>
                </li>
                <li>
                  <button
                    className="cursor-target flex items-center gap-2"
                    style={{ 
                      color: theme === "synthwave" ? primaryColor : textColor 
                    }}
                    onClick={() => handleTheme("synthwave")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                    Dark
                  </button>
                </li>
              </ul>
            </div>

            {/* Auth Buttons */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2 ml-2">
                <Link
                  href="/dashboard"
                  className="cursor-target btn btn-sm transition-all duration-300"
                  style={{
                    backgroundColor: isScrolled ? secondaryColor : 'transparent',
                    borderColor: isScrolled ? 'transparent' : 'white',
                    color: isScrolled ? 'white' : 'white',
                    borderWidth: isScrolled ? '0' : '1px',
                    borderStyle: 'solid'
                  }}
                  onMouseEnter={(e) => {
                    if (!isScrolled) {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = secondaryColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isScrolled) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={authLoading}
                  className="cursor-target btn btn-sm transition-all duration-300"
                  style={{
                    backgroundColor: isScrolled ? errorColor : 'transparent',
                    borderColor: isScrolled ? 'transparent' : 'white',
                    color: isScrolled ? 'white' : 'white',
                    borderWidth: isScrolled ? '0' : '1px',
                    borderStyle: 'solid'
                  }}
                  onMouseEnter={(e) => {
                    if (!isScrolled) {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = errorColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isScrolled) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                >
                  {authLoading ? '...' : 'Logout'}
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="cursor-target btn btn-sm ml-2 transition-all duration-300"
                style={{
                  backgroundColor: isScrolled ? primaryColor : 'transparent',
                  borderColor: isScrolled ? 'transparent' : 'white',
                  color: 'white',
                  borderWidth: isScrolled ? '0' : '1px',
                  borderStyle: 'solid'
                }}
                onMouseEnter={(e) => {
                  if (!isScrolled) {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = primaryColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isScrolled) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'white';
                  }
                }}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Theme Switcher */}
            <div className="dropdown dropdown-end">
              <label 
                tabIndex={0} 
                className="btn btn-circle btn-sm transition-all duration-300"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  color: isScrolled ? textColor : 'white'
                }}
              >
                {theme === "acid" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                )}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow rounded-box w-32 mt-2"
                style={{ backgroundColor: bgPrimary }}
              >
                <li>
                  <button
                    className="cursor-target flex items-center gap-2"
                    style={{ 
                      color: theme === "acid" ? primaryColor : textColor 
                    }}
                    onClick={() => handleTheme("acid")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                    Light
                  </button>
                </li>
                <li>
                  <button
                    className="cursor-target flex items-center gap-2"
                    style={{ 
                      color: theme === "synthwave" ? primaryColor : textColor 
                    }}
                    onClick={() => handleTheme("synthwave")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                    Dark
                  </button>
                </li>
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="cursor-target btn btn-circle btn-sm transition-all duration-300"
              style={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                color: isScrolled ? textColor : 'white'
              }}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Drawer */}
        <div className={`absolute right-0 top-0 h-full w-80 shadow-xl transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
          style={{ backgroundColor: bgPrimary }}
        >
          <div className="p-6">
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold" style={{ color: textColor }}>Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="cursor-target btn btn-circle btn-sm"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5" style={{ color: textColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <ul className="space-y-4 mb-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block p-3 rounded-lg transition-colors duration-200 cursor-pointer"
                    style={{ 
                      color: textColor,
                      backgroundColor: hoveredLink === link.href ? bgSecondary : 'transparent'
                    }}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Controls */}
            <div className="space-y-4 pt-6" style={{ borderTop: `1px solid ${borderColor}` }}>
              {/* Auth Buttons */}
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <Link 
                    href="/dashboard" 
                    className="cursor-target btn w-full"
                    style={{
                      backgroundColor: secondaryColor,
                      color: 'white',
                      borderColor: 'transparent'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    disabled={authLoading}
                    className="cursor-target btn w-full"
                    style={{
                      backgroundColor: errorColor,
                      color: 'white',
                      borderColor: 'transparent'
                    }}
                  >
                    {authLoading ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="cursor-target btn w-full"
                  style={{
                    backgroundColor: primaryColor,
                    color: 'white',
                    borderColor: 'transparent'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}