"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const cells = [
  {
    id: 1,
    category: "Development",
    title: "Web & Mobile Development",
    subtitle: "30 Projects",
    description: "We create innovative web and mobile applications with the latest technologies to optimize your digital presence.",
    responsable: "Oucharrou Mohamed",
    activities: ["HTML/CSS","JavaScript","Java","Flutter", ],
    gradient: "bg-gradient-to-br from-green-400 to-blue-500",
    buttonText: "Learn more →",
    image: "/cells/dev.png"
  },
  {
    id: 2,
    category: "Artificial Intelligence",
    title: "AI & Machine Learning",
    subtitle: "1 Models",
    description: "We develop AI solutions to automate your processes and improve your business performance.",
    responsable: "Laghrib salim",
    activities: ["Machine Learning", "Computer Vision", "NLP", "TensorFlow"],
    gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
    buttonText: "Learn more →",
    image: "/cells/ia.png"
  },
  {
    id: 3,
    category: "Competitive Programming",
    title: "Coding & CP",
    subtitle: "3 Contests",
    description: "We excel in solving complex problems and participate in international competitions.",
    responsable: "Ayoub bouaik",
    activities: ["Algorithms", "Data Structures", "Codeforces", "ACM ICPC"],
    gradient: "bg-gradient-to-br from-blue-400 to-purple-600",
    buttonText: "Learn more →",
    image: "/cells/cp.png"
  },
  {
    id: 4,
    category: "Events",
    title: "Social",
    subtitle: "1 Events",
    description: "We organize tech events and create dynamic communities to foster learning.",
    responsable: "Mona Filali",
    activities: ["Tech Talks", "Games", "Travel", "Solidarity"],
    gradient: "bg-gradient-to-br from-pink-400 to-purple-600",
    buttonText: "Learn more →",
    image: "/cells/soc.png"
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
            Our Cells, <span className="text-primary">Your Key to Tech Success</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover our opportunities, develop your skills, and secure your technological future with us
          </p>
        </div>

        {/* Desktop Tabs Navigation */}
        <div className={`hidden lg:flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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

        {/* Mobile Card Carousel */}
        <div className={`lg:hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            {/* Navigation Arrows */}
            <button 
              onClick={() => setActiveTab(activeTab > 0 ? activeTab - 1 : cells.length - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-base-100 hover:bg-base-200 border border-base-300 p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <svg className="w-5 h-5 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => setActiveTab(activeTab < cells.length - 1 ? activeTab + 1 : 0)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-base-100 hover:bg-base-200 border border-base-300 p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <svg className="w-5 h-5 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Mobile Card */}
            <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden mx-4">
              <div className="relative">
                <Image
                  src={cells[activeTab].image}
                  alt={cells[activeTab].title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Card indicator */}
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-white">{activeTab + 1}/{cells.length}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-base-content">
                  {cells[activeTab].title}
                </h3>
                
                <p className="text-base-content/70 text-sm leading-relaxed mb-4">
                  {cells[activeTab].description}
                </p>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 text-base-content">Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    {cells[activeTab].activities.slice(0, 3).map((activity, actIndex) => (
                      <span
                        key={actIndex}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                      >
                        {activity}
                      </span>
                    ))}
                    {cells[activeTab].activities.length > 3 && (
                      <span className="px-2 py-1 bg-base-200 text-base-content/60 rounded-full text-xs">
                        +{cells[activeTab].activities.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center pt-4 border-t border-base-content/10">
                  <div>
                    <span className="text-xs text-base-content/60">Responsable</span>
                    <p className="font-semibold text-base-content text-sm">{cells[activeTab].responsable}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-base-content/60">Réalisations</span>
                    <p className="font-bold text-primary text-lg">{cells[activeTab].subtitle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {cells.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeTab === index ? 'bg-primary w-6' : 'bg-base-content/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Tab Content */}
        <div className={`hidden lg:block transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
                        height={460}
                        className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-110"
                      />
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
