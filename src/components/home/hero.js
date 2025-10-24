"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LiquidEther from "@/components/LiquidEther.jsx";
import Iridescence from "@/components/Iridescence.jsx";
import Aurora from "@/components/Aurora.jsx";
import Shuffle from "@/components/Shuffle.jsx";
import RotatingText from "@/components/RotatingText.jsx";
import { useTranslations } from 'next-intl';



const hero = {
  title: "Join ARTWARE - Where Art Meets Algorithm",
  cta1: "Join",
  cta2: "Show more",
};

export default function Hero() {
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const t = useTranslations('HomePage');

  // Curated LiquidEther colors (always dark hero): violet + fuchsia + electric blue
  const liquidEtherColors = ['#7C3AED', '#467cefff', '#971ccfff'];

  // Theme-aware text color
  const textColor = isDarkTheme ? "text-white" : "text-base-content";

  // Theme-aware logo
  const logoSrc = isDarkTheme ? "/logos/ArtwareLogo-darkMode.png" : "/logos/ArtwareLogo.png";

  useEffect(() => {
    setTimeout(() => setShowImage(true), 100);
    setTimeout(() => setShowText(true), 700);
  }, []);

  // Force hero to stay in dark styling regardless of global theme
  useEffect(() => {
    setIsDarkTheme(true);
  }, []);

  return (
    <section
      id="hero"
      className={`relative overflow-hidden ${isDarkTheme ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50'}`}
      style={{ height: "100vh" }}
    >
     
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <LiquidEther
          colors={liquidEtherColors}
          mouseForce={20}
          cursorSize={110}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.45}
          autoIntensity={2.0}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${isDarkTheme ? 'bg-purple-600' : 'bg-purple-400'}`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse delay-1000 ${isDarkTheme ? 'bg-pink-600' : 'bg-pink-400'}`}></div>
      </div>
      
      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center space-y-8 lg:space-y-12">
            
            {/* Logo Section */}
            <div
              className={`transition-all duration-1000 delay-100 ${
                showImage ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
             
            </div>

            {/* Main Title */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold ${textColor} mb-4 leading-tight`}>
                Welcome to{" "}
                <span className={`inline-block px-4 py-2 rounded-2xl ${isDarkTheme ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-purple-500 to-pink-500'} text-white shadow-lg`}>
                  ARTWARE
                </span>
              </h1>
            </div>

            {/* Subtitle with Rotating Text */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold ${textColor} flex flex-wrap items-center justify-center gap-3`}>
                <span>Where We</span>
                <RotatingText
                  texts={['Learn', 'Practice', 'Innovate', 'Socialize', 'Create', 'Connect']}
                  mainClassName={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl ${isDarkTheme ? 'bg-purple-500/20 border-2 border-purple-500 text-purple-300' : 'bg-purple-200 border-2 border-purple-400 text-purple-800'} font-bold shadow-lg`}
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
              </p>
            </div>

            {/* Description */}
            <div
              className={`transition-all duration-1000 delay-500 ${
                showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                Join our vibrant tech community dedicated to innovation, creativity, and collaborative learning. 
                Build your skills, create amazing projects, and connect with passionate developers.
              </p>
            </div>
             
            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 transition-all duration-1000 delay-700 ${
                showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Link href="/register">
                <button className={`cursor-target group relative overflow-hidden font-bold px-10 sm:px-14 py-5 sm:py-6 text-base sm:text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl ${
                  isDarkTheme
                    ? "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white hover:shadow-purple-500/50"
                    : "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white hover:shadow-purple-400/50"
                }`}>
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </Link>
              <button 
                onClick={() => {
                  document.getElementById('about-us')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
                className={`cursor-target group font-bold px-10 sm:px-14 py-5 sm:py-6 text-base sm:text-lg rounded-2xl transition-all duration-300 hover:scale-105 border-2 backdrop-blur-sm ${
                  isDarkTheme 
                    ? "border-purple-500 text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30" 
                    : "border-purple-500 text-purple-700 bg-purple-100 hover:bg-purple-200 hover:border-purple-600 hover:shadow-lg hover:shadow-purple-400/30"
                }`}
              >
                <span className="flex items-center gap-2">
                  Discover More
                  <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
