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
    name: "Amine Bensalah",
    position: "Vice-Président",
    image: "/bureau/Mona.png",
    description: "Expert en développement web et mobile, il supervise les projets techniques et assure la qualité de nos solutions innovantes."
  },
  {
    id: 3,
    name: "Sarah El Amrani",
    position: "Secrétaire Générale",
    image: "/bureau/Hamza.png",
    description: "Spécialiste en intelligence artificielle, elle coordonne les activités du club et gère les relations avec nos partenaires académiques."
  },
  {
    id: 4,
    name: "Fatima Zahra Idrissi",
    position: "Responsable Événements",
    image: "/bureau/Houda.png",
    description: "Organisatrice talentueuse qui crée des événements mémorables et développe notre communauté tech dynamique et inclusive."
  },
  {
    id: 5,
    name: "Omar El Fassi",
    position: "Trésorier",
    image: "/bureau/Assia.png",
    description: "Gestionnaire financier rigoureux qui assure la pérennité économique du club et optimise nos ressources pour maximiser notre impact."
  },

  {
    id: 6,
    name: "Omar El Fassi",
    position: "Trésorier",
    image: "/bureau/Badr.png",
    description: "Gestionnaire financier rigoureux qui assure la pérennité économique du club et optimise nos ressources pour maximiser notre impact."
  },

  {
    id: 7,
    name: "Omar El Fassi",
    position: "Trésorier",
    image: "/bureau/Oumaima.png",
    description: "Gestionnaire financier rigoureux qui assure la pérennité économique du club et optimise nos ressources pour maximiser notre impact."
  },

  {
    id: 8,
    name: "Omar El Fassi",
    position: "Trésorier",
    image: "/bureau/Yassine.png",
    description: "Gestionnaire financier rigoureux qui assure la pérennité économique du club et optimise nos ressources pour maximiser notre impact."
  }
];

export default function Bureau() {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section id="bureau-section" className="w-full py-16 bg-gradient-to-br from-base-100 via-base-200 to-base-100">
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bureauMembers.map((member, index) => (
            <div
              key={member.id}
              className={`group relative rounded-2xl overflow-hidden bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
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
                <h3 className="text-white font-bold text-lg mb-1">
                  {member.name}
                </h3>
                <p className="text-white/80 text-sm font-medium">
                  {member.position}
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-500"></div>
              <div className="absolute top-4 left-4 w-2 h-12 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-600"></div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-base-content/60 text-sm">
            Une équipe unie par la passion de la technologie et l&apos;ambition de créer l&apos;avenir
          </p>
        </div>
      </div>
    </section>
  );
}
