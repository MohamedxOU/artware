"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
/* import LiquidEther from "@/components/LiquidEther.jsx"; */
import Iridescence from "@/components/Iridescence.jsx";
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
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  const t = useTranslations('HomePage');

  // Generate random gallery images on mount
  useEffect(() => {
    const getRandomImages = () => {
      const totalImages = 40;
      const numberOfImages = 8;
      const usedNumbers = new Set();
      const images = [];

      while (images.length < numberOfImages) {
        const randomNum = Math.floor(Math.random() * totalImages) + 1;
        if (!usedNumbers.has(randomNum)) {
          usedNumbers.add(randomNum);
          images.push(`/gallery/${randomNum}.jpg`);
        }
      }
      return images;
    };

    setGalleryImages(getRandomImages());
  }, []);

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
      className={`bg-base-100 relative overflow-hidden`}
      style={{ height: "100vh" }}
    >
      <Iridescence
        color={[0.4, 0, 0.5]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
      />

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between pt-20 pb-0 sm:pt-24 lg:pt-32">
        {/* Circular Gallery Images */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="max-w-7xl mx-auto h-full relative">
            {galleryImages.length > 0 && (
              <>
                {/* Top Left Images */}
                <div className="absolute top-20 left-10 w-32 h-40 sm:w-40 sm:h-48 rounded-3xl overflow-hidden shadow-2xl transform -rotate-12 opacity-90">
                  <Image src={galleryImages[0]} alt="Gallery Image 1" fill className="object-cover" />
                </div>
                <div className="absolute top-40 left-32 w-28 h-36 sm:w-36 sm:h-44 rounded-3xl overflow-hidden shadow-2xl transform rotate-6 opacity-90">
                  <Image src={galleryImages[1]} alt="Gallery Image 2" fill className="object-cover" />
                </div>
                
                {/* Top Right Images */}
                <div className="absolute top-20 right-10 w-32 h-40 sm:w-40 sm:h-48 rounded-3xl overflow-hidden shadow-2xl transform rotate-12 opacity-90">
                  <Image src={galleryImages[2]} alt="Gallery Image 3" fill className="object-cover" />
                </div>
                <div className="absolute top-40 right-32 w-28 h-36 sm:w-36 sm:h-44 rounded-3xl overflow-hidden shadow-2xl transform -rotate-6 opacity-90">
                  <Image src={galleryImages[3]} alt="Gallery Image 4" fill className="object-cover" />
                </div>
                
                {/* Bottom Left Images */}
                <div className="absolute bottom-40 left-20 w-30 h-38 sm:w-38 sm:h-46 rounded-3xl overflow-hidden shadow-2xl transform rotate-15 opacity-90">
                  <Image src={galleryImages[4]} alt="Gallery Image 5" fill className="object-cover" />
                </div>
                
                {/* Bottom Right Images */}
                <div className="absolute bottom-40 right-20 w-30 h-38 sm:w-38 sm:h-46 rounded-3xl overflow-hidden shadow-2xl transform -rotate-15 opacity-90">
                  <Image src={galleryImages[5]} alt="Gallery Image 6" fill className="object-cover" />
                </div>
                
                {/* Additional scattered images for effect */}
                <div className="absolute top-60 left-5 w-24 h-32 sm:w-32 sm:h-40 rounded-3xl overflow-hidden shadow-2xl transform -rotate-20 opacity-80 hidden lg:block">
                  <Image src={galleryImages[6]} alt="Gallery Image 7" fill className="object-cover" />
                </div>
                <div className="absolute top-60 right-5 w-24 h-32 sm:w-32 sm:h-40 rounded-3xl overflow-hidden shadow-2xl transform rotate-20 opacity-80 hidden lg:block">
                  <Image src={galleryImages[7]} alt="Gallery Image 8" fill className="object-cover" />
                </div>
              </>
            )}
          </div>
        </div>

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
                  src="/logos/ArtwareLogo-darkMode.png" 
                  alt="Artware Logo" 
                  width={300} 
                  height={300}
                  className=""
                />
              </div>

              {/* Title */}
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 lg:mb-12 transition-all duration-1000 delay-200 ${
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
                  className=" cursor-target btn btn-lg sm:btn-xl btn-outline border-white text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-xl w-44 sm:w-48 hover:bg-white hover:text-black/80 hover:scale-105 transition-all duration-300"
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
