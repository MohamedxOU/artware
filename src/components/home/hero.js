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

  // Curated LiquidEther colors to match the dark navy→purple background
  // Close-to-blue with a subtle violet accent for harmony
  // Use 6-digit HEX (THREE.Color doesn't parse 8-digit #RRGGBBAA)
  const liquidEtherColors = ['#0B3B9C', '#3B82F6', '#8B5CF6'];

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
      className="relative overflow-hidden bg-gradient-to-b from-[#0a0a1f] via-[#2d1555] to-[#0a0a1f]"
      style={{ height: "100vh" }}
    >
     
      {/* LiquidEther Background */}
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
      
      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center space-y-6 lg:space-y-8">
            
            {/* Main Title */}
            <div
              className={`transition-all duration-1000 delay-100 ${
                showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
                Welcome to{" "}
                <span className="inline-block bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                  ARTWARE
                </span>
              </h1>
            </div>

            {/* Subtitle with Rotating Text */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-300 flex flex-wrap items-center justify-center gap-3">
                <span>Where We</span>
                <RotatingText
                  texts={['Learn', 'Practice', 'Innovate', 'Socialize', 'Create', 'Connect']}
                  mainClassName="px-6 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold"
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
              className={`transition-all duration-1000 delay-300 ${
                showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-gray-400 leading-relaxed">
                Join our vibrant tech community dedicated to innovation, creativity, and collaborative learning.
              </p>
            </div>
            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-400 ${
                showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Link href="/register">
                <button className="group relative px-8 py-4 text-base font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
                  <span className="flex items-center gap-2">
                    Get Started
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </Link>
              <button 
                onClick={() => {
                  document.getElementById('about-us')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
                className="group px-8 py-4 text-base font-semibold rounded-xl border border-white/20 text-white bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30"
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
