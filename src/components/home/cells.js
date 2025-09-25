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
  const [activeTab, setActiveTab] = useState(0);

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

        {/* Tabs Navigation */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {cells.map((cell, index) => (
            <button
              key={cell.id}
              onClick={() => setActiveTab(index)}
              className={`cursor-target px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2 ${
                activeTab === index
                  ? 'bg-primary text-white border-primary shadow-lg scale-105'
                  : 'bg-transparent text-base-content border-base-content/20 hover:border-primary/50 hover:text-primary hover:scale-102'
              }`}
            >
              {cell.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {cells.map((cell, index) => (
            <div
              key={cell.id}
              className={`transition-all duration-500 ${
                activeTab === index 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 absolute translate-x-full pointer-events-none'
              }`}
            >
              {activeTab === index && (
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Image Section */}
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                      <Image
                        src={cell.image}
                        alt={cell.title}
                        width={600}
                        height={400}
                        className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-primary/30"></div>
                      
                      {/* Floating category badge */}
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-sm font-semibold text-gray-800">{cell.category}</span>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute bottom-6 right-6 w-16 h-16 border-2 border-white/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="w-6 h-6 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 text-base-content">
                        {cell.title}
                      </h3>
                      <p className="text-lg text-base-content/70 leading-relaxed">
                        {cell.description}
                      </p>
                    </div>

                    {/* Activities */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-base-content">Technologies & Compétences</h4>
                      <div className="flex flex-wrap gap-2">
                        {cell.activities.map((activity, actIndex) => (
                          <span
                            key={actIndex}
                            className="px-3 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats & Responsable */}
                    <div className="grid grid-cols-2 gap-6 pt-6 border-t border-base-content/10">
                      <div>
                        <span className="text-sm text-base-content/60 block">Responsable</span>
                        <p className="font-semibold text-base-content text-lg">{cell.responsable}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-base-content/60 block">Réalisations</span>
                        <p className="font-bold text-primary text-2xl">{cell.subtitle}</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg">
                        {cell.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
