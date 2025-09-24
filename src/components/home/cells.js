"use client";
import { useState } from "react";

const cells = [
  {
    id: 1,
    title: "Développement Web & Mobile",
    subtitle: "30 Projets",
    description: "Création d'applications web et mobiles innovantes avec les dernières technologies.",
    responsable: "Amine Bensalah",
    activities: ["React/Next.js", "Flutter", "Node.js", "MongoDB"],
    color: "bg-primary",
    textColor: "text-primary-content",
    image: "/cells/dev-icon.svg"
  },
  {
    id: 2,
    title: "Intelligence Artificielle",
    subtitle: "15 Modèles",
    description: "Recherche et développement en IA, machine learning et deep learning.",
    responsable: "Sarah El Amrani",
    activities: ["Machine Learning", "Computer Vision", "NLP", "TensorFlow"],
    color: "bg-secondary",
    textColor: "text-secondary-content",
    image: "/cells/ai-icon.svg"
  },
  {
    id: 3,
    title: "Programmation Compétitive",
    subtitle: "50 Concours",
    description: "Entraînement et participation aux compétitions de programmation internationales.",
    responsable: "Yassine Ouchani",
    activities: ["Algorithmes", "Structures de données", "Codeforces", "ACM ICPC"],
    color: "bg-accent",
    textColor: "text-accent-content",
    image: "/cells/competitive-icon.svg"
  },
  {
    id: 4,
    title: "Événements & Social",
    subtitle: "25 Événements",
    description: "Organisation d'événements tech et création de communautés dynamiques.",
    responsable: "Fatima Zahra Idrissi",
    activities: ["Tech Talks", "Workshops", "Hackathons", "Networking"],
    color: "bg-neutral",
    textColor: "text-neutral-content",
    image: "/cells/social-icon.svg"
  }
];

export default function Cells() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cells.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cells.length) % cells.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentCell = cells[currentSlide];

  return (
    <section className="w-full min-h-screen flex items-center justify-center py-16 bg-gradient-to-br bg-base-100">
      <div className="max-w-6xl w-full mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-3xl font-bold text-primary mb-4">Nos Cellules</h2>
          
        </div>

        {/* Main Slider Card */}
        <div className={`relative rounded-3xl p-8 md:p-12 shadow-2xl ${currentCell.color} ${currentCell.textColor} overflow-hidden min-h-[500px] flex flex-col md:flex-row items-center justify-between transition-all duration-500`}>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className={`absolute top-10 right-10 w-32 h-32 rounded-full border-2 border-current`}></div>
            <div className={`absolute bottom-10 left-10 w-20 h-20 rounded-full border-2 border-current`}></div>
          </div>

          {/* Left Content */}
          <div className="relative z-10 flex-1 max-w-lg">
            

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
              {currentCell.title}
            </h3>

            {/* Subtitle */}
            <p className="text-lg opacity-90 mb-6">{currentCell.subtitle}</p>

            {/* Description */}
            <p className="opacity-80 text-sm mb-8 leading-relaxed max-w-md">
              {currentCell.description}
            </p>

            {/* Responsable */}
            <div className="mb-8">
              <p className="opacity-70 text-xs mb-1">Responsable</p>
              <p className="font-medium">{currentCell.responsable}</p>
            </div>

            {/* Activities Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {currentCell.activities.map((activity, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-base-100/20 rounded-full text-xs font-medium backdrop-blur-sm border border-current/20"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Image/Icon */}
          <div className="relative z-10 flex-shrink-0">
            <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* Placeholder for cell icon/image */}
              <div className="w-full h-full bg-base-100/10 rounded-2xl backdrop-blur-sm flex items-center justify-center border border-current/20">
                <div className="w-32 h-32 bg-base-100/20 rounded-xl flex items-center justify-center border border-current/10">
                  <span className="text-4xl">📱</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
            {/* Price/Stats */}
            <div className="flex items-center gap-4">
              <span className="text-2xl md:text-3xl font-bold">Cell {currentCell.id.toString().padStart(2, '0')}</span>
            </div>

            {/* Navigation & Action */}
            <div className="flex items-center gap-4">
              {/* Slide Indicators */}
              <div className="flex gap-2">
                {cells.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentSlide ? 'bg-current w-6' : 'bg-current/40'
                    }`}
                  />
                ))}
              </div>

              {/* Action Button */}
              <button className="bg-base-100 text-base-content px-6 py-2 rounded-full font-semibold hover:bg-base-200 transition-colors shadow-lg">
                Voir plus
              </button>
            </div>
          </div>

          {/* Top Right Navigation */}
          <div className="absolute top-8 right-8 flex gap-2">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 bg-base-100/20 rounded-full flex items-center justify-center hover:bg-base-100/30 transition-colors backdrop-blur-sm border border-current/20"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 bg-base-100/20 rounded-full flex items-center justify-center hover:bg-base-100/30 transition-colors backdrop-blur-sm border border-current/20"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

      
      </div>
    </section>
  );
}
