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
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = bureauMembers.length;

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

    const section = document.getElementById("bureau");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);



  const slideLeft = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const slideRight = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const getCardPosition = (index) => {
    const diff = index - currentSlide;
    const distance = Math.abs(diff);
    
    if (distance === 0) {
      // Center card
      return {
        transform: 'translateX(0) scale(1)',
        zIndex: 10,
        opacity: 1,
        filter: 'blur(0px)'
      };
    } else if (distance === 1) {
      // Adjacent cards
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${direction * 280}px) scale(0.85)`,
        zIndex: 5,
        opacity: 0.8,
        filter: 'blur(1px)'
      };
    } else if (distance === 2) {
      // Second-level cards
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${direction * 480}px) scale(0.7)`,
        zIndex: 2,
        opacity: 0.5,
        filter: 'blur(2px)'
      };
    } else {
      // Hidden cards
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${direction * 600}px) scale(0.6)`,
        zIndex: 1,
        opacity: 0.2,
        filter: 'blur(3px)'
      };
    }
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
        <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
          {/* Navigation Arrows */}
          <button
            onClick={slideLeft}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button
            onClick={slideRight}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {bureauMembers.map((member, index) => {
              const position = getCardPosition(index);
              const isCenter = index === currentSlide;
              
              return (
                <div
                  key={member.id}
                  className={`absolute group rounded-3xl overflow-hidden transition-all duration-700 ease-out cursor-pointer ${
                    isCenter ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'
                  }`}
                  style={{
                    width: '320px',
                    height: '420px',
                    transform: position.transform,
                    zIndex: position.zIndex,
                    opacity: position.opacity,
                    filter: position.filter,
                    left: '50%',
                    top: '50%',
                    marginLeft: '-160px',
                    marginTop: '-210px'
                  }}
                  onClick={() => setCurrentSlide(index)}
                >
                  {/* Background with gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/40"></div>
                  
                  {/* Image Container */}
                  <div className="relative h-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className={`object-cover transition-all duration-700 ${
                        isCenter ? 'group-hover:scale-105' : 'group-hover:scale-110'
                      }`}
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    
                    {/* Content overlay - show details only on hover */}
                    <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 ${
                      isCenter 
                        ? 'transform translate-y-full group-hover:translate-y-0' 
                        : 'transform translate-y-full group-hover:translate-y-0'
                    }`}>
                      <div className="space-y-3">
                        <h3 className="text-white font-bold text-xl transition-all duration-500 opacity-0 group-hover:opacity-100">
                          {member.name}
                        </h3>
                        <p className="text-primary font-semibold text-sm transition-all duration-500 delay-100 opacity-0 group-hover:opacity-100">
                          {member.position}
                        </p>
                        <p className="text-white/90 text-sm leading-relaxed transition-opacity duration-500 delay-200 opacity-0 group-hover:opacity-100">
                          {member.description}
                        </p>
                      </div>
                    </div>

                    {/* Floating name for non-center cards */}
                    {!isCenter && (
                      <div className="absolute bottom-4 left-4 right-4 text-center">
                        <h3 className="text-white font-semibold text-sm mb-1 drop-shadow-lg">
                          {member.name}
                        </h3>
                        <p className="text-white/80 text-xs font-medium drop-shadow-lg">
                          {member.position}
                        </p>
                      </div>
                    )}

                    {/* Modern decorative elements */}
                    <div className={`absolute top-6 right-6 w-3 h-3 rounded-full bg-primary transition-all duration-500 ${
                      isCenter ? 'opacity-100 scale-100' : 'opacity-60 scale-75'
                    }`}></div>
                    <div className={`absolute top-6 left-6 w-1 h-8 bg-white/60 rounded-full transition-all duration-500 ${
                      isCenter ? 'opacity-100' : 'opacity-40'
                    }`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modern Slide Indicators */}
        <div className="flex justify-center mt-12 gap-3">
          {bureauMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index 
                  ? 'w-8 h-3 bg-primary' 
                  : 'w-3 h-3 bg-base-content/20 hover:bg-base-content/40'
              }`}
              aria-label={`View ${bureauMembers[index].name}`}
            />
          ))}
        </div>

        {/* Card Counter */}
        <div className="text-center mt-6">
          <p className="text-base-content/50 text-sm font-medium">
            {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </p>
        </div>

        {/* Additional Info */}
        <div className={`text-center mt-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-base-content/60 text-sm">
            Une équipe unie par la passion de la technologie et l&apos;ambition de créer l&apos;avenir
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
