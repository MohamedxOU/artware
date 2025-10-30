"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  // Initial number of images to show (responsive)
  const [initialCount, setInitialCount] = useState(12); // Default count
  const [mounted, setMounted] = useState(false);

  const getInitialImageCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 8; // Mobile: 8 images
      if (window.innerWidth < 1024) return 12; // Tablet: 12 images
      return 16; // Desktop: 16 images
    } 
    return 12; // Default for SSR
  };
 
  // Helper component: try .jpg first, then fallback to .jpeg on error
  const ImageWithFallback = ({ src, fallbackSrc, alt, ...props }) => {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [triedFallback, setTriedFallback] = useState(false);

    return (
      <Image
        {...props}
        src={currentSrc}
        alt={alt}
        onError={() => {
          if (!triedFallback && fallbackSrc && currentSrc !== fallbackSrc) {
            setTriedFallback(true);
            setCurrentSrc(fallbackSrc);
          }
        }}
      />
    );
  };

  // Generate items from gallery folder (images 1-40)
  const allItems = Array.from({ length: 40 }, (_, index) => {
    const imageNumber = index + 1;
    // Generate random heights between 300-600 for masonry layout
    const heights = [300, 350, 400, 450, 500, 550, 600];
    const randomHeight = heights[index % heights.length];
    
    return {
      id: imageNumber.toString(),
      img: `/gallery/${imageNumber}.jpg`, // default (kept for backward compatibility)
      imgJpg: `/gallery/${imageNumber}.jpg`,
      imgJpeg: `/gallery/${imageNumber}.jpeg`,
      url: `/gallery/${imageNumber}.jpg`, // legacy link
      height: randomHeight,
      title: `Gallery Image ${imageNumber}`,
      category: getImageCategory(imageNumber)
    };
  });

  // Items to display based on showMore state
  const items = showMore ? allItems : allItems.slice(0, initialCount);

  // Helper function to categorize images based on their number
  function getImageCategory(imageNumber) {
    if (imageNumber <= 8) return "Training";
    if (imageNumber <= 16) return "Academic Events";
    if (imageNumber <= 24) return "Solidarity Events";
    if (imageNumber <= 32) return "Fun Activities";
    return "Hackathons";
  }

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

  // Set mounted and initial count after component mounts
  useEffect(() => {
    setMounted(true);
    setInitialCount(getInitialImageCount());
  }, []);

  // Update initial count on window resize
  useEffect(() => {
    if (!mounted) return;
    
    const handleResize = () => {
      setInitialCount(getInitialImageCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted]);

  // Keyboard navigation for image modal
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = items.findIndex(item => item.id === selectedImage.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        setSelectedImage(items[prevIndex]);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = items.findIndex(item => item.id === selectedImage.id);
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        setSelectedImage(items[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, items]);

  return (
    <section id="gallery" className="relative bg-gradient-to-br from-base-100 via-base-200 to-base-100 h-full">
      {/* Section Title */}
      <div className={`text-center pt-20 pb-12 px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Our <span className="text-primary">Gallery</span>
        </h2>
        <p className="text-lg text-base-content opacity-70 max-w-2xl mx-auto mb-6">
          Discover our memorable events and the creative spirit that drives our community
        </p>
      </div>

      {/* Custom Gallery Grid Layout */}
      <div className={`max-w-7xl mx-auto px-4 pb-16 transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Custom Masonry Layout with Natural Aspect Ratios */}
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 mb-8" style={{contentVisibility: 'auto', containIntrinsicSize: '1000px'}}>
          {items.map((item, index) => {
            return (
              <div
                key={item.id}
                className="break-inside-avoid mb-4 group cursor-pointer relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:z-10"
                onClick={() => setSelectedImage(item)}
              >
                {/* Image with natural aspect ratio and extension fallback (.jpg -> .jpeg) */}
                <ImageWithFallback
                  src={item.imgJpg}
                  fallbackSrc={item.imgJpeg}
                  alt={item.title}
                  width={400}
                  height={item.height}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  quality={70}
                  priority={index < 6}
                  loading={index < 6 ? 'eager' : 'lazy'}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs opacity-80">{item.category}</p>
                </div>
                
                {/* View icon */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less Button - Only show if there are more items */}
        {mounted && allItems.length > initialCount && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowMore(!showMore)}
              className="cursor-target group inline-flex items-center px-6 py-3 bg-base-200 hover:bg-base-300 dark:bg-base-700 dark:hover:bg-base-600 text-base-content font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg border border-base-300 dark:border-base-600"
            >
              <span className="mr-2">
                {showMore ? 'Voir moins' : `Voir plus (${allItems.length - items.length} images)`}
              </span>
              <svg 
                className={`w-4 h-4 transform transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Image Modal/Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="cursor-target absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative">
              <ImageWithFallback
                src={selectedImage.imgJpg || selectedImage.img}
                fallbackSrc={selectedImage.imgJpeg}
                alt={selectedImage.title}
                width={800}
                height={600}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                sizes="90vw"
              />
              
              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-white/80 text-sm">{selectedImage.category}</p>
              </div>
            </div>

            {/* Navigation arrows (if needed later) */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = items.findIndex(item => item.id === selectedImage.id);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                  setSelectedImage(items[prevIndex]);
                }}
                className="cursor-target w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = items.findIndex(item => item.id === selectedImage.id);
                  const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                  setSelectedImage(items[nextIndex]);
                }}
                className="cursor-target w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
