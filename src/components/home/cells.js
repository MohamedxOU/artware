"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const cells = [
  {
    id: 1,
    category: "Development",
    title: "Développement Web & Mobile",
    subtitle: "30 Projets",
    description: "Nous créons des applications web et mobiles innovantes avec les dernières technologies pour optimiser votre présence digitale.",
    responsable: "Amine Bensalah",
    activities: ["React/Next.js", "Flutter", "Node.js", "MongoDB"],
    gradient: "bg-gradient-to-br from-green-400 to-blue-500",
    buttonText: "En savoir plus →",
    image: "/cells/cell-1.jpg"
  },
  {
    id: 2,
    category: "Intelligence Artificielle",
    title: "IA & Machine Learning",
    subtitle: "15 Modèles",
    description: "Nous développons des solutions d'IA pour automatiser vos processus et améliorer vos performances business.",
    responsable: "Sarah El Amrani",
    activities: ["Machine Learning", "Computer Vision", "NLP", "TensorFlow"],
    gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
    buttonText: "En savoir plus →",
    image: "/cells/cell-1.jpg"
  },
  {
    id: 3,
    category: "Programmation Compétitive",
    title: "Algorithmes & Compétitions",
    subtitle: "50 Concours",
    description: "Nous excellons dans la résolution de problèmes complexes et participons aux compétitions internationales.",
    responsable: "Yassine Ouchani",
    activities: ["Algorithmes", "Structures de données", "Codeforces", "ACM ICPC"],
    gradient: "bg-gradient-to-br from-blue-400 to-purple-600",
    buttonText: "En savoir plus →",
    image: "/cells/cell-1.jpg"
  },
  {
    id: 4,
    category: "Événements",
    title: "Community & Events",
    subtitle: "25 Événements",
    description: "Nous organisons des événements tech et créons des communautés dynamiques pour favoriser l'apprentissage.",
    responsable: "Fatima Zahra Idrissi",
    activities: ["Tech Talks", "Workshops", "Hackathons", "Networking"],
    gradient: "bg-gradient-to-br from-pink-400 to-purple-600",
    buttonText: "En savoir plus →",
    image: "/cells/cell-1.jpg"
  }
];

export default function Cells() {
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

    const section = document.getElementById("cells");
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
    <section id="cells" className="w-full py-16 bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nos Cellules, <span className="text-primary">Votre Clé du Succès Tech</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Découvrez nos opportunités, développez vos compétences, et sécurisez votre avenir technologique avec nous
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {cells.map((cell, index) => (
            <div 
              key={cell.id} 
              className={`border border-base-300/30 rounded-3xl p-8 text-base-content relative overflow-hidden min-h-[400px] flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-base-200/60 hover:scale-105 hover:-translate-y-2 group ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : `opacity-0 ${index % 2 === 0 ? '-translate-x-20' : 'translate-x-20'}`
              }`}
              style={{ 
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${cell.image})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                transitionDelay: `${index * 300}ms`,

              }}>
              
             

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight text-white group-hover:text-primary transition-colors duration-300">
                  {cell.title}
                </h3>
                
                <p className="text-white/80 text-base mb-6 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {cell.description}
                </p>

                
              </div>

              

              {/* Stats */}
              <div className=" flex items-center justify-between">
                <div>
                  <span className="text-sm text-white/70">Responsable</span>
                  <p className="font-medium text-white/90">{cell.responsable}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary">{cell.subtitle}</span>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-base-content/10 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full border-2 border-base-content/10 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500 group-hover:rotate-45"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
