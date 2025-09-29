"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const router = useRouter();

  const galleryCategories = [
    {
      id: "formations",
      title: "Formations",
      subtitle: "Sessions de formation technique",
      images: [
        "https://picsum.photos/id/1015/800/600?grayscale",
        "https://picsum.photos/id/1011/800/600?grayscale",
        "https://picsum.photos/id/1020/800/600?grayscale",
        "https://picsum.photos/id/1021/800/600?grayscale"
      ]
    },
    {
      id: "evenements-academiques",
      title: "Événements académiques",
      subtitle: "Conférences et workshops",
      images: [
        "https://picsum.photos/id/1022/800/600?grayscale",
        "https://picsum.photos/id/1023/800/600?grayscale",
        "https://picsum.photos/id/1024/800/600?grayscale",
        "https://picsum.photos/id/1025/800/600?grayscale"
      ]
    },
    {
      id: "evenements-solidaires",
      title: "Événements solidaires",
      subtitle: "Actions communautaires",
      images: [
        "https://picsum.photos/id/1026/800/600?grayscale",
        "https://picsum.photos/id/1027/800/600?grayscale",
        "https://picsum.photos/id/1028/800/600?grayscale",
        "https://picsum.photos/id/1029/800/600?grayscale"
      ]
    },
    {
      id: "activities",
      title: "Activités fun",
      subtitle: "Moments de détente et team building",
      images: [
        "https://picsum.photos/id/1030/800/600?grayscale",
        "https://picsum.photos/id/1031/800/600?grayscale",
        "https://picsum.photos/id/1032/800/600?grayscale",
        "https://picsum.photos/id/1033/800/600?grayscale"
      ]
    },
    {
      id: "hackathons",
      title: "Hackathons",
      subtitle: "Compétitions de programmation",
      images: [
        "https://picsum.photos/id/1034/800/600?grayscale",
        "https://picsum.photos/id/1035/800/600?grayscale",
        "https://picsum.photos/id/1036/800/600?grayscale",
        "https://picsum.photos/id/1037/800/600?grayscale"
      ]
    },
   
  ];

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

    const section = document.getElementById("gallery");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Auto-rotate images for hovered category
  useEffect(() => {
    if (!hoveredCategory) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => ({
        ...prev,
        [hoveredCategory]: (prev[hoveredCategory] || 0) + 1
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, [hoveredCategory]);

  const handleCategoryHover = (categoryId) => {
    setHoveredCategory(categoryId);
    if (!currentImageIndex[categoryId]) {
      setCurrentImageIndex(prev => ({ ...prev, [categoryId]: 0 }));
    }
  };

  const getCurrentImage = (category) => {
    const index = currentImageIndex[category.id] || 0;
    return category.images[index % category.images.length];
  };

  return (
    <section id="gallery" className="relative bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      {/* Section Title */}
      <div className={`text-center pt-20 pb-12 px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Notre <span className="text-primary">Galerie</span>
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-6">
          Découvrez nos événements marquants et l&apos;esprit créatif qui anime notre communauté
        </p>
      </div>

      {/* Gallery Grid */}
      <div className={`max-w-7xl mx-auto px-4 pb-16 transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galleryCategories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              } ${index === 1 ? 'lg:col-span-2' : ''}`}
              style={{
                height: index === 0 ? '400px' : index === 1 ? '400px' : '350px'
              }}
              onMouseEnter={() => handleCategoryHover(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={getCurrentImage(category)}
                  alt={category.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                    {category.title}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {category.subtitle}
                  </p>
                  
                  {/* Image counter for hovered category */}
                  {hoveredCategory === category.id && (
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                      {category.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            idx === (currentImageIndex[category.id] || 0) % category.images.length
                              ? 'bg-white' 
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Effects */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visit Full Gallery Button */}
        <div className="text-center">
          <button
            onClick={() => router.push('/gallery')}
            className="cursor-target group inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-content font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="mr-3">Voir toute la galerie</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
