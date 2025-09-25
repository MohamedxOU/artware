"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#about-us", label: "Présentation" },
  { href: "#activities", label: "Activités" },
  { href: "#cells", label: "Cellules" },
  { href: "#bureau", label: "Bureau" },
  { href: "#contact", label: "Contact" }
];

export default function Navbar() {
  const [theme, setTheme] = useState("acid"); // Default theme for SSR
  const [lang, setLang] = useState("fr"); // Default lang for SSR
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track when component is mounted

  // Set mounted state and initialize theme/lang from localStorage
  useEffect(() => {
    setIsMounted(true);
    
    // Initialize theme
    const savedTheme = localStorage.getItem("theme") || "acid";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    // Initialize lang
    const savedLang = localStorage.getItem("locale") || "fr";
    setLang(savedLang);
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
    localStorage.setItem("theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };

  // Language picker handler
  const handleLang = (l) => {
    setLang(l);
    localStorage.setItem("locale", l);
    window.location.reload();
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
    
    if (theme === "synthwave") {
      return "/logos/ArtwareLogo-darkMode.png";
    }
    
    return isScrolled ? "/logos/ArtwareLogo.png" : "/logos/ArtwareLogo-darkMode.png";
  };

  return (
    <>
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-base-100 border-b border-base-300 shadow-sm" 
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
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
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-12 flex-1 justify-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-base font-medium transition-all duration-300 cursor-pointer ${
                    isScrolled 
                      ? "text-base-content hover:text-primary" 
                      : "text-white hover:text-primary"
                  }`}
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
              <label tabIndex={0} className={`btn btn-circle transition-all duration-300 ${
                isScrolled ? "btn-ghost" : "btn-ghost text-white hover:bg-white/20"
              }`}>
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
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 mt-2"
              >
                <li>
                  <button
                    className={
                      theme === "acid" ? "active text-primary flex items-center gap-2" : "flex items-center gap-2"
                    }
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
                    className={
                      theme === "synthwave" ? "active text-primary flex items-center gap-2" : "flex items-center gap-2"
                    }
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

            {/* Language Picker */}
            <select
              className={`select select-sm mx-2 transition-all duration-300 ${
                isScrolled ? "select-bordered" : "border-white/30 text-white bg-transparent"
              }`}
              value={lang}
              onChange={(e) => handleLang(e.target.value)}
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
            </select>

            {/* Login Button */}
            <Link 
              href="/login" 
              className={`btn btn-sm ml-2 transition-all duration-300 ${
                isScrolled ? "btn-primary" : "btn-outline text-white border-white hover:bg-white hover:text-primary"
              }`}
            >
              Login
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Theme Switcher */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className={`btn btn-circle btn-sm transition-all duration-300 ${
                isScrolled ? "btn-ghost" : "btn-ghost text-white hover:bg-white/20"
              }`}>
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
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 mt-2"
              >
                <li>
                  <button
                    className={
                      theme === "acid" ? "active text-primary flex items-center gap-2" : "flex items-center gap-2"
                    }
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
                    className={
                      theme === "synthwave" ? "active text-primary flex items-center gap-2" : "flex items-center gap-2"
                    }
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
              className={`btn btn-circle btn-sm transition-all duration-300 ${
                isScrolled ? "btn-ghost" : "btn-ghost text-white hover:bg-white/20"
              }`}
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
        <div className={`absolute right-0 top-0 h-full w-80 bg-base-100 shadow-xl transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6">
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-base-content">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-circle btn-sm btn-ghost"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
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
                    className="block p-3 rounded-lg text-base-content hover:bg-base-200 transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Controls */}
            <div className="space-y-4 border-t border-base-300 pt-6">
              {/* Language Picker */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-base-content/70">Langue:</span>
                <select
                  className="select select-sm select-bordered"
                  value={lang}
                  onChange={(e) => handleLang(e.target.value)}
                >
                  <option value="en">EN</option>
                  <option value="fr">FR</option>
                </select>
              </div>

              {/* Login Button */}
              <Link 
                href="/login" 
                className="btn btn-primary w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}