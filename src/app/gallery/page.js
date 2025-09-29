"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TargetCursor from '@/components/TargetCursor';
import { useThemeStore } from '@/stores';

// Mock gallery data
const galleryItems = [
  {
    id: 1,
    title: "Workshop Intelligence Artificielle",
    date: "4/20/2024",
    category: "Formations",
    type: "formation",
    imageUrl: "https://picsum.photos/id/1015/800/600",
    description: "Session intensive sur les fondamentaux de l'IA et machine learning"
  },
  {
    id: 2,
    title: "Hackathon Spring 2024",
    date: "3/15/2024", 
    category: "Competitions",
    type: "competition",
    imageUrl: "https://picsum.photos/id/1011/900/700",
    description: "Compétition de programmation de 48h avec des défis innovants"
  },
  {
    id: 3,
    title: "Conférence Cybersécurité",
    date: "2/28/2024",
    category: "Articles",
    type: "conference",
    imageUrl: "https://picsum.photos/id/1020/800/500",
    description: "Présentation des dernières tendances en sécurité informatique"
  },
  {
    id: 4,
    title: "Projet Fin d'Études - App Mobile",
    date: "4/10/2024",
    category: "Member Work",
    type: "project",
    imageUrl: "https://picsum.photos/id/1022/700/800",
    description: "Application mobile innovante développée par nos étudiants"
  },
  {
    id: 5,
    title: "Tech Talk - Cloud Computing",
    date: "3/25/2024",
    category: "Articles",
    type: "tech-talk",
    imageUrl: "https://picsum.photos/id/1023/800/600",
    description: "Exploration des technologies cloud et leur impact"
  },
  {
    id: 6,
    title: "Collaboration Entreprise",
    date: "4/05/2024",
    category: "Member Work",
    type: "collaboration",
    imageUrl: "https://picsum.photos/id/1024/900/600",
    description: "Partenariat avec des entreprises technologiques locales"
  },
  {
    id: 7,
    title: "Formation React Advanced",
    date: "3/20/2024",
    category: "Formations",
    type: "formation",
    imageUrl: "https://picsum.photos/id/1025/800/700",
    description: "Maîtrise avancée du framework React et ses écosystèmes"
  },
  {
    id: 8,
    title: "Innovation Lab Session",
    date: "4/15/2024",
    category: "Articles",
    type: "innovation",
    imageUrl: "https://picsum.photos/id/1026/700/600",
    description: "Laboratoire d'innovation pour développer des idées créatives"
  }
];

const categories = ["All", "Formations", "Competitions", "Articles", "Member Work"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  const { theme, isDarkMode, setTheme: setGlobalTheme, isInitialized } = useThemeStore();

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = galleryItems;
    
    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setFilteredItems(filtered);
  }, [selectedCategory]);

  // Theme switcher handler
  const handleTheme = (t) => {
    setGlobalTheme(t);
  };

  // Determine logo source based on theme
  const getLogoSource = () => {
    if (!isMounted || !isInitialized) {
      return "/logos/ArtwareLogo.png";
    }
    
    return isDarkMode ? "/logos/ArtwareLogo-darkMode.png" : "/logos/ArtwareLogo.png";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">Chargement de la galerie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
        <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      {/* Header */}
      <header className="bg-base-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and Go Back */}
            <div className="flex items-center space-x-4">
              {/* Go Back Button */}
              <Link
                href="/"
                className="flex items-center space-x-2 text-base-content/70 hover:text-base-content transition-colors group"
              >
                <svg 
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Retour</span>
              </Link>
              
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image 
                  src={getLogoSource()}
                  alt="Artware Logo" 
                  width={120} 
                  height={120}  
                  className="rounded-full transition-all duration-300 hover:scale-105" 
                  priority
                />
              </Link>
            </div>
            
            {/* Right side - Theme switcher and other controls */}
            <div className="flex items-center space-x-4">
              {/* Theme Switcher */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-circle btn-ghost">
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
              
             
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Gallery Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            GALLERY
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl">
            Découvrez nos moments marquants, projets innovants et événements qui définissent notre communauté technologique.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col gap-4 mb-8 pb-4 border-b border-base-300">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm text-base-content/60 flex-shrink-0">Show:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-base-content text-base-100'
                      : 'text-base-content/70 hover:text-base-content hover:bg-base-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="cursor-target group cursor-pointer bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-80"
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 bg-primary/90 text-primary-content text-xs font-medium rounded-full mb-3">
                      {item.category}
                    </span>
                    
                    {/* Title */}
                    <h3 className="text-white text-lg md:text-xl font-bold mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    {/* Date */}
                    <p className="text-white/80 text-sm mb-3">
                      {item.date}
                    </p>
                    
                    {/* Description */}
                    <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Hover Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-primary text-primary-content px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Charger plus d&apos;éléments
          </button>
        </div>
      </main>
    </div>
  );
}
