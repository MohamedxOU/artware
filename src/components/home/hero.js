"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
/* import LiquidEther from "@/components/LiquidEther.jsx"; */
import Iridescence from "@/components/Iridescence.jsx";
import TextType from "@/components/TextType.jsx";
import Shuffle from "@/components/Shuffle.jsx";
import { useTranslations } from 'next-intl';



const hero = {
  title: "ARTWARE CLUB",
  description:
    "Join Artware Club — the IT club that sparks creativity, builds technical skills, and connects makers across disciplines. Meet mentors, build projects, and launch your ideas.",
  cta1: "Join us",
  cta2: "Learn More",
};

export default function Hero() {
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const t = useTranslations('HomePage');


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
      className={`bg-base-100 relative `}
      style={{ height: "100vh" }}
    >
      <Iridescence
        color={[0.4, 0, 0.5]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
      />

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center pt-20 pb-8 sm:pt-24 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-1 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)] lg:min-h-0">
            {/* Left Column - Content (centered) */}
            <div className="text-center mx-auto order-2 lg:order-1 max-w-3xl">
              {/* Title */}
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 lg:mb-6 transition-all duration-1000 ${
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

              {/* Description */}
              <div
                className={`text-lg sm:text-xl lg:text-2xl text-base-content/90 mb-6 lg:mb-10 leading-relaxed transition-all duration-1000 delay-300 ${
                  showText
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <TextType
                  text={hero.description}
                  typingSpeed={45}
                  pauseDuration={1200}
                  showCursor={true}
                  cursorCharacter="_"
                />

                
              </div>

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
                  className=" cursor-target btn btn-lg sm:btn-xl btn-outline border-base-content text-base-content font-semibold px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-xl w-44 sm:w-48 hover:bg-base-content hover:text-base-100 hover:scale-105 transition-all duration-300"
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
