"use client";
import { useState, useEffect } from "react";
import Image from "next/image";


export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const items = [
    {
      id: "1",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 600,
    },

    {
        id: "4",
        img: "https://picsum.photos/id/1021/600/400?grayscale",
        url: "https://example.com/four",
        height: 400,
    },

    {
        id: "5",
        img: "https://picsum.photos/id/1022/600/900?grayscale",
        url: "https://example.com/five",
        height: 300,
    },

    {
        id: "6",
        img: "https://picsum.photos/id/1023/600/700?grayscale",
        url: "https://example.com/six",
        height: 500,
    },

    {
        id: "7",
        img: "https://picsum.photos/id/1024/600/800?grayscale",
        url: "https://example.com/seven",
        height: 350,
    },

    {
        id: "8",
        img: "https://picsum.photos/id/1025/600/600?grayscale",
        url: "https://example.com/eight",
        height: 450,
    },

    {
        id: "9",
        img: "https://picsum.photos/id/1026/600/750?grayscale",
        url: "https://example.com/nine",
        height: 400,
    },

    {
        id: "10",
        img: "https://picsum.photos/id/1027/600/850?grayscale",
        url: "https://example.com/ten",
        height: 550,
    },

    {
        id: "11",
        img: "https://picsum.photos/id/1028/600/650?grayscale",
        url: "https://example.com/eleven",
        height: 300,
    },

    {
        id: "12",
        img: "https://picsum.photos/id/1029/600/750?grayscale",
        url: "https://example.com/twelve",
        height: 400,
    },

    {
        id: "13",
        img: "https://picsum.photos/id/1030/600/900?grayscale",
        url: "https://example.com/thirteen",
        height: 600,
    },

    // ... more items
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

  return (
    <section id="gallery" className="relative bg-gradient-to-br from-base-100 via-base-200 to-base-100" >
      {/* Section Title */}
      <div className={`text-center pt-20 pb-8 px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Notre Galerie, <span className="text-primary">Nos Moments Inoubliables</span>
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto italic mb-4">
          Découvrez nos événements marquants et l&apos;esprit créatif qui anime notre communauté technologique
        </p>
        <p className="text-sm text-base-content/50 max-w-xl mx-auto">
          Cliquez sur les miniatures pour explorer nos moments marquants
        </p>
      </div>

      {/* Gallery Layout */}
      <div className={`max-w-7xl mx-auto px-4 pb-16 transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
          
          {/* Main Image Display */}
          <div className="flex-1 relative bg-base-300 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={items[selectedImageIndex].img}
              alt={`Gallery image ${items[selectedImageIndex].id}`}
              fill
              className="object-cover transition-all duration-500 hover:scale-105"
              priority
            />
            
            {/* Image Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <div className="text-white">
                <h3 className="text-xl font-semibold mb-2">
                  Image {items[selectedImageIndex].id}
                </h3>
                <p className="text-white/80 text-sm">
                  {selectedImageIndex + 1} de {items.length}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : items.length - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            <button
              onClick={() => setSelectedImageIndex(prev => prev < items.length - 1 ? prev + 1 : 0)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Thumbnail Sidebar */}
          <div className="w-full lg:w-48 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:overflow-x-visible pb-2 lg:pb-0">
            {items.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelectedImageIndex(index)}
                className={`cursor-target relative flex-shrink-0 w-20 h-20 lg:w-full lg:h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                  selectedImageIndex === index 
                    ? 'ring-4 ring-primary shadow-lg scale-105' 
                    : 'hover:ring-2 hover:ring-primary/50 hover:scale-102 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={item.img}
                  alt={`Thumbnail ${item.id}`}
                  fill
                  className="object-cover"
                />
                
                {/* Active indicator */}
                {selectedImageIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent">
                    <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Image Counter and Info */}
        <div className="flex justify-between items-center mt-6 text-sm text-base-content/60">
          <div>
            <span className="font-medium">
              {String(selectedImageIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
          </div>
          <div>
            <span>Utilisez les flèches ou cliquez sur les miniatures</span>
          </div>
        </div>
      </div>
     
    </section>
  );
}
