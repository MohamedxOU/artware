"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const cells = [
  {
    id: 1,
    category: "Development",
    title: "Web & Mobile Development",
    subtitle: "2 Projects",
    description: "We create innovative web and mobile applications with the latest technologies to optimize your digital presence.",
    responsable: "Oucharrou Mohamed",
    activities: ["HTML/CSS","JavaScript","Java","Flutter", ],
    buttonText: "Learn more →",
    image: "/cells/dev.png"
  },
  {
    id: 2,
    category: "Artificial Intelligence",
    title: "AI & Data Science",
    subtitle: "1 Models",
    description: "We develop AI solutions to automate your processes and improve your business performance.",
    responsable: "Laghrib salim",
    activities: ["Machine Learning", "Computer Vision", "NLP", "data science"],
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
    buttonText: "Learn more →",
    image: "/cells/soc.png"
  }
];

export default function Cells() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      const currentTheme = htmlElement.getAttribute('data-theme');
      setIsDarkTheme(currentTheme === 'synthwave');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => observer.disconnect();
  }, []);

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

  // Theme colors
  const bgPrimary = isDarkTheme ? 'oklch(98% 0.003 247.858)' : 'oklch(98% 0 0)';
  const bgSecondary = isDarkTheme ? 'oklch(20% 0.09 281.288)' : 'oklch(95% 0 0)';
  const bgTertiary = isDarkTheme ? 'oklch(25% 0.09 281.288)' : 'oklch(91% 0 0)';
  const textColor = isDarkTheme ? 'oklch(78% 0.115 274.713)' : 'oklch(0% 0 0)';
  const primaryColor = isDarkTheme ? 'oklch(65% 0.241 354.308)' : 'oklch(65% 0.241 354.308)';
  const textMuted = isDarkTheme ? 'rgba(200, 190, 220, 0.7)' : 'rgba(0, 0, 0, 0.7)';
  const borderColor = isDarkTheme ? 'rgba(120, 100, 150, 0.2)' : 'rgba(0, 0, 0, 0.2)';

  return (
    <section id="cells" className="w-full py-16" 
      style={{ 
        background: isDarkTheme 
          ? 'linear-gradient(to bottom right, oklch(98% 0.003 247.858), oklch(20% 0.09 281.288), oklch(25% 0.09 281.288))'
          : 'linear-gradient(to bottom right, oklch(98% 0 0), oklch(95% 0 0), oklch(91% 0 0))'
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: textColor }}>
            Our Cells, <span style={{ color: primaryColor }}>Your Key to Tech Success</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: textMuted }}>
            Discover our opportunities, develop your skills, and secure your technological future with us
          </p>
        </div>

        {/* Desktop Tabs Navigation */}
        <div className={`hidden lg:flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {cells.map((cell, index) => (
            <button
              key={cell.id}
              onClick={() => setActiveTab(index)}
              className="cursor-target px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2"
              style={{
                backgroundColor: activeTab === index ? primaryColor : 'transparent',
                color: activeTab === index ? 'white' : textColor,
                borderColor: activeTab === index ? primaryColor : borderColor,
                boxShadow: activeTab === index ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
                transform: activeTab === index ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== index) {
                  e.currentTarget.style.borderColor = `${primaryColor}80`;
                  e.currentTarget.style.color = primaryColor;
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== index) {
                  e.currentTarget.style.borderColor = borderColor;
                  e.currentTarget.style.color = textColor;
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
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
              className="cursor-target absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-300"
              style={{ 
                backgroundColor: bgPrimary, 
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: borderColor 
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = bgSecondary}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = bgPrimary}
            >
              <svg className="w-5 h-5" style={{ color: textColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => setActiveTab(activeTab < cells.length - 1 ? activeTab + 1 : 0)}
              className="cursor-target absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-300"
              style={{ 
                backgroundColor: bgPrimary, 
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: borderColor 
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = bgSecondary}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = bgPrimary}
            >
              <svg className="w-5 h-5" style={{ color: textColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Mobile Card */}
            <div className="rounded-3xl shadow-xl overflow-hidden mx-4" style={{ backgroundColor: bgPrimary }}>
              <div className="relative">
                <Image
                  src={cells[activeTab].image}
                  alt={cells[activeTab].title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent, transparent)' }}></div>
                
                {/* Card indicator */}
                <div className="absolute top-4 right-4 backdrop-blur-sm px-3 py-1 rounded-full" style={{ backgroundColor: `${primaryColor}e6` }}>
                  <span className="text-xs font-semibold text-white">{activeTab + 1}/{cells.length}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3" style={{ color: textColor }}>
                  {cells[activeTab].title}
                </h3>
                
                <p className="text-sm leading-relaxed mb-4" style={{ color: textMuted }}>
                  {cells[activeTab].description}
                </p>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2" style={{ color: textColor }}>Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    {cells[activeTab].activities.slice(0, 3).map((activity, actIndex) => (
                      <span
                        key={actIndex}
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${primaryColor}1a`, color: primaryColor }}
                      >
                        {activity}
                      </span>
                    ))}
                    {cells[activeTab].activities.length > 3 && (
                      <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: bgSecondary, color: textMuted }}>
                        +{cells[activeTab].activities.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center pt-4" style={{ borderTop: `1px solid ${borderColor}` }}>
                  <div>
                    <span className="text-xs" style={{ color: textMuted }}>Responsable</span>
                    <p className="font-semibold text-sm" style={{ color: textColor }}>{cells[activeTab].responsable}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs" style={{ color: textMuted }}>Réalisations</span>
                    <p className="font-bold text-lg" style={{ color: primaryColor }}>{cells[activeTab].subtitle}</p>
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
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: activeTab === index ? primaryColor : `${textColor}4d`,
                    width: activeTab === index ? '1.5rem' : '0.5rem'
                  }}
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
                        height={430}
                        className="w-full h-[430px] object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: textColor }}>
                        {cell.title}
                      </h3>
                      <p className="text-lg leading-relaxed" style={{ color: textMuted }}>
                        {cell.description}
                      </p>
                    </div>

                    {/* Activities */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3" style={{ color: textColor }}>Technologies & Compétences</h4>
                      <div className="flex flex-wrap gap-2">
                        {cell.activities.map((activity, actIndex) => (
                          <span
                            key={actIndex}
                            className="px-3 py-2 rounded-full text-sm font-medium"
                            style={{ 
                              backgroundColor: `${primaryColor}1a`, 
                              color: primaryColor,
                              border: `1px solid ${primaryColor}33`
                            }}
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats & Responsable */}
                    <div className="grid grid-cols-2 gap-6 pt-6" style={{ borderTop: `1px solid ${borderColor}` }}>
                      <div>
                        <span className="text-sm block" style={{ color: textMuted }}>Responsable</span>
                        <p className="font-semibold text-lg" style={{ color: textColor }}>{cell.responsable}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm block" style={{ color: textMuted }}>Réalisations</span>
                        <p className="font-bold text-2xl" style={{ color: primaryColor }}>{cell.subtitle}</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    {/* <div className="pt-4">
                      <button className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg">
                        {cell.buttonText}
                      </button>
                    </div> */}
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
