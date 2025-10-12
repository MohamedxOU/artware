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
  title: "ARTWARE",
  description:
    "Join the ISS Club and celebrate diversity, culture, and meaningful connections. Be a part of a vibrant international community.",
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
      className={`bg-base-100 relative ${
        isDarkTheme ? "opacity-80" : "opacity-100"
      }`}
      style={{ height: "100vh" }}
    >
      <Iridescence
        color={[0.8, 0, 0.8]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
      />

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center pt-20 pb-8 sm:pt-24 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)] lg:min-h-0">
            {/* Left Column - Content */}
            <div className="text-left order-2 lg:order-1">
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
                  shuffleTimes={1}
                  ease="power3.out"
                  stagger={0.03}
                  threshold={0.1}
                  triggerOnce={true}
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
                  text={[t("hero_sub")]}
                  typingSpeed={50}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="_"
                />
              </div>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 transition-all duration-1000 delay-600 ${
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
                  className="cursor-target btn btn-lg sm:btn-xl btn-outline border-base-content text-base-content font-semibold px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-xl w-44 sm:w-48 hover:bg-base-content hover:text-base-100 hover:scale-105 transition-all duration-300"
                >
                  {hero.cta2}
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div
              className={`relative transition-all duration-1000 delay-900 order-1 lg:order-2 ${
                showText
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:max-w-none">
                <Image
                  src="/activities/activity.jpg"
                  alt="Artware Hero"
                  width={600}
                  height={400}
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-auto rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl object-cover"
                  priority
                />
                {/* Decorative elements - hidden on mobile for cleaner look */}
                <div className="hidden lg:block absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
                <div className="hidden lg:block absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
