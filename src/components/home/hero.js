"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
/* import LiquidEther from "@/components/LiquidEther.jsx"; */
import Iridescence from "@/components/Iridescence.jsx";
import Aurora from "@/components/Aurora.jsx";
import Shuffle from "@/components/Shuffle.jsx";
import { useTranslations } from 'next-intl';



const hero = {
  title: "Learn • Grow • Enjoy",
  cta1: "Join",
  cta2: "Show more",
};

export default function Hero() {
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const t = useTranslations('HomePage');

  // Aurora colors - same for both themes
  const auroraColors = ["#9333ea", "#a855f7", "#f43098" ]; // Purples and pink

  // Theme-aware text color
  const textColor = isDarkTheme ? "text-white" : "text-base-content";

  // Theme-aware logo
  const logoSrc = isDarkTheme ? "/logos/ArtwareLogo-darkMode.png" : "/logos/ArtwareLogo.png";

  useEffect(() => {
    setTimeout(() => setShowImage(true), 100);
    setTimeout(() => setShowText(true), 700);
  }, []);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      const currentTheme = htmlElement.getAttribute("data-theme");
      setIsDarkTheme(currentTheme !== "acid");
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className={`bg-base-300 relative overflow-hidden`}
      style={{ height: "100vh" }}
    >
     
<Aurora
  colorStops={auroraColors}
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/>
      
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0  z-5"></div>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between pt-20 pb-0 sm:pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex items-center justify-center relative z-20">
          <div className="w-full">
            {/* Left Column - Content (centered) */}
            <div className="text-center mx-auto max-w-3xl">
              {/* Logo */}
              <div
                className={`flex justify-center mb-6 transition-all duration-1000 ${
                  showText
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Image 
                  src={logoSrc} 
                  alt="Artware Logo" 
                  width={300} 
                  height={300}
                  className=""
                />
              </div>

              {/* Title */}
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ${textColor} mb-8 lg:mb-12 transition-all duration-1000 delay-200 ${
                  showText
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Shuffle
                  text={hero.title}
                  shuffleDirection="right"
                  duration={0.35}
                  animationMode="evenodd"
                  shuffleTimes={2}
                  ease="power3.out"
                  stagger={0.03}
                  threshold={0.1}
                  triggerOnce={false}
                  triggerOnHover={true}
                  respectReducedMotion={true}
                />
              </h1>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 transition-all duration-1000 delay-600 ${
                  showText
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Link href="/register">
                  <button className="cursor-target btn btn-lg sm:btn-xl btn-primary font-semibold px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:scale-105 transition-transform duration-300 w-44 sm:w-48">
                    {hero.cta1}
                  </button>
                </Link>
                <button 
                  onClick={() => {
                    document.getElementById('about-us')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                  className={`cursor-target btn btn-lg sm:btn-xl btn-outline font-semibold px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-xl w-44 sm:w-48 hover:scale-105 transition-all duration-300 ${
                    isDarkTheme 
                      ? "border-white text-white hover:bg-white hover:text-black/80" 
                      : "border-base-content text-base-content hover:bg-base-content hover:text-base-100"
                  }`}
                >
                  {hero.cta2}
                </button>
              </div>
            </div>

            {/* Right Column removed to center hero content */}
          </div>
        </div>
      </div>
    </section>
  );
}
