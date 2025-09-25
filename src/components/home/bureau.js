"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const bureauMembers = [
  {
    id: 1,
    name: "Salim Laghrib",
    position: "Président",
    image: "/bureau/Salim.png",
    description: "Leader passionné avec une vision claire pour l'avenir du club. Il guide l'équipe vers l'excellence et l'innovation dans tous nos projets technologiques."
  },
  {
    id: 2,
    name: "Mona Filali",
    position: "Vice-Président",
    image: "/bureau/Mona.png",
    description: "Expert en développement web et mobile, il supervise les projets techniques et assure la qualité de nos solutions innovantes."
  },
  {
    id: 3,
    name: "Hamza Baadi",
    position: "RH",
    image: "/bureau/Hamza.png",
    description: "Spécialiste en intelligence artificielle, elle coordonne les activités du club et gère les relations avec nos partenaires académiques."
  },
  {
    id: 4,
    name: "Houda Jabal",
    position: "Event Manager",
    image: "/bureau/Houda.png",
    description: "Organisatrice talentueuse qui crée des événements mémorables et développe notre communauté tech dynamique et inclusive."
  },
  {
    id: 5,
    name: "Assia Labane",
    position: "Secrétaire Générale",
    image: "/bureau/Assia.png",
    description: "Gestionnaire financier rigoureux qui assure la pérennité économique du club et optimise nos ressources pour maximiser notre impact."
  },

  {
    id: 6,
    name: "Badreddyn Ballouk",
    position: "Trésorier",
    image: "/bureau/Badr.png",
    description: "Gestionnaire financier rigoureux qui assure la pérennité économique du club et optimise nos ressources pour maximiser notre impact."
  },

  {
    id: 7,
    name: "Omaima Larhzal",
    position: "Media Manager",
    image: "/bureau/Oumaima.png",
    description: "Gestionnaire financier rigoureux qui assure la pérennité économique du club et optimise nos ressources pour maximiser notre impact."
  },

  {
    id: 8,
    name: "Yassine El Aouni",
    position: "Design Manager",
    image: "/bureau/Yassine.png",
    description: "Gestionnaire financier rigoureux qui assure la pérennité économique du club et optimise nos ressources pour maximiser notre impact."
  }
];

export default function Bureau() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTransform, setCurrentTransform] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

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

    const section = document.getElementById("bureau-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    let animationFrame;
    const cardWidth = 320; // 300px width + 20px gap
    const totalWidth = bureauMembers.length * cardWidth;
    
    const animate = () => {
      if (!isPaused && !isDragging) {
        setCurrentTransform(prev => {
          const newTransform = prev - 0.5; // Scroll speed
          // Reset to 0 when we've scrolled through all original items
          return newTransform <= -totalWidth ? 0 : newTransform;
        });
      }
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(currentTransform);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart;
    setCurrentTransform(dragOffset + deltaX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  // Add global mouse event listeners for better drag support
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStart;
      setCurrentTransform(dragOffset + deltaX);
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart, dragOffset]);

  const slideLeft = () => {
    setCurrentTransform(prev => Math.min(prev + 320, 0));
  };

  const slideRight = () => {
    const cardWidth = 320;
    const totalWidth = bureauMembers.length * cardWidth;
    setCurrentTransform(prev => Math.max(prev - 320, -totalWidth));
  };

  return (
    <>
      
      <section id="bureau" className="w-full py-16 bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Notre Bureau, <span className="text-primary">Les Piliers du Succès</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto italic">
            Rencontrez l&apos;équipe dirigeante passionnée qui transforme notre vision en réalité
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Navigation Arrows */}
          <button
            onClick={slideLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button
            onClick={slideRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div 
            className="flex gap-6 transition-transform duration-300 cursor-grab select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              width: `${bureauMembers.length * 2 * 320}px`, // Double width for seamless loop
              transform: `translateX(${currentTransform}px)`
            }}
          >
            {/* First set of cards */}
            {bureauMembers.map((member, index) => (
              <div
                key={`first-${member.id}`}
                className={`group relative rounded-2xl overflow-hidden bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex-shrink-0 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  width: '300px',
                  height: '400px',
                  transitionDelay: `${index * 150}ms`
                }}
              >
              {/* Image Container */}
              <div className="relative h-100 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                    {member.name}
                  </h3>
                  <p className="text-primary-content/90 text-sm font-medium mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                    {member.position}
                  </p>
                  <p className="text-primary-content/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-400">
                    {member.description}
                  </p>
                </div>
              </div>

              {/* Default state - Name and Position */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                {/* <h3 className="text-white font-bold text-lg mb-1">
                  {member.name}
                </h3> */}
                {/* <p className="text-white/80 text-sm font-medium">
                  {member.position}
                </p> */}
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-500"></div>
              <div className="absolute top-4 left-4 w-2 h-12 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-600"></div>
            </div>
          ))}
          
          {/* Second set of cards for seamless loop */}
          {bureauMembers.map((member, index) => (
            <div
              key={`second-${member.id}`}
              className={`group relative rounded-2xl overflow-hidden bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex-shrink-0 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                width: '300px',
                height: '400px',
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Image Container */}
              <div className="relative h-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                    {member.name}
                  </h3>
                  <p className="text-primary-content/90 text-sm font-medium mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                    {member.position}
                  </p>
                  <p className="text-primary-content/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-400">
                    {member.description}
                  </p>
                </div>
              </div>

              {/* Default state - Name and Position */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-500"></div>
              <div className="absolute top-4 left-4 w-2 h-12 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-600"></div>
            </div>
          ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-base-content/60 text-sm">
            Une équipe unie par la passion de la technologie et l&apos;ambition de créer l&apos;avenir
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
