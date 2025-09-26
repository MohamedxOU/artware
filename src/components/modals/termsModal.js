"use client";
import { useState, useEffect } from "react";

export default function TermsModal({ isOpen, onClose }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 50);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const termsData = [
    {
      id: "01",
      title: "Conditions Générales",
      subtitle: "Acceptation • Utilisation • Responsabilités",
      bgColor: "bg-base-100",
      description: "En vous inscrivant sur notre plateforme, vous acceptez de respecter nos conditions d'utilisation et de participer activement à notre communauté technologique."
    },
    {
      id: "02", 
      title: "Données Personnelles",
      subtitle: "Collecte • Protection • Traitement",
      bgColor: "bg-base-100",
      description: "Nous respectons votre vie privée et traitons vos données personnelles conformément au RGPD et aux lois marocaines sur la protection des données."
    },
    {
      id: "03",
      title: "Propriété Intellectuelle",
      subtitle: "Contenu • Projets • Innovations • Collaboration",
      bgColor: "bg-base-100",
      description: "Notre équipe de développement donne vie à vos projets numériques avec des solutions robustes, évolutives et performantes. En utilisant les technologies les plus récentes, nous nous assurons que vos applications sont conçues pour répondre aux objectifs de votre entreprise et offrir une expérience transparente aux utilisateurs.",
      
    },
    {
      id: "04",
      title: "Responsabilités",
      subtitle: "Sécurité • Conformité • Documentation",
      bgColor: "bg-base-100",
      description: "Nous garantissons la qualité de nos services et le respect des normes de sécurité pour protéger votre expérience sur notre plateforme."
    }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className={`relative w-full max-w-4xl h-[80vh] bg-base-100 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${
        showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-base-100/95 backdrop-blur-md border-b border-base-300/20 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-base-content">Conditions d&apos;Utilisation</h2>
            <p className="text-base-content/60 text-sm">ARTWARE Community Platform</p>
          </div>
          
          <button
            onClick={onClose}
            className="btn btn-circle btn-ghost hover:bg-base-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-full pb-20">
          <div className="p-6 space-y-6">
            {termsData.map((section, index) => (
              <div
                key={section.id}
                className={`${section.bgColor} rounded-2xl p-6 border border-base-300/20 transition-all duration-300 hover:shadow-lg`}
              >
                <div className="flex items-start gap-4">
                  {/* Section Number */}
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{section.id}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-base-content mb-2">
                      {section.title}
                    </h3>
                    
                    
                    
                    <p className="text-base-content/80 leading-relaxed mb-4">
                      {section.description}
                    </p>
                    
                    {section.hasButton && (
                      <button className="px-6 py-2 border border-base-content/20 rounded-full text-sm font-medium text-base-content hover:bg-base-200 transition-colors">
                        DISCUTER PROJET
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Additional Terms */}
            <div className="bg-base-200/50 rounded-2xl p-6 border border-base-300/20">
              <h4 className="text-lg font-semibold text-base-content mb-4">Termes Supplémentaires</h4>
              
              <div className="space-y-4 text-sm text-base-content/70">
                <div>
                  <h5 className="font-medium text-base-content mb-2">Participation aux Événements</h5>
                  <p>En participant à nos événements, workshops et hackathons, vous acceptez de respecter notre code de conduite et de contribuer positivement à l&apos;expérience collective.</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-base-content mb-2">Projets Collaboratifs</h5>
                  <p>Les projets développés dans le cadre d&apos;ARTWARE restent la propriété de leurs créateurs, mais peuvent être partagés à des fins éducatives avec l&apos;accord des participants.</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-base-content mb-2">Modifications des Conditions</h5>
                  <p>Nous nous réservons le droit de modifier ces conditions à tout moment. Les membres seront informés des changements importants par email.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-base-100/95 backdrop-blur-md border-t border-base-300/20 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-base-content/60">
              Dernière mise à jour: Janvier 2025
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="btn btn-outline btn-sm"
              >
                Fermer
              </button>
              <button
                onClick={onClose}
                className="btn btn-primary btn-sm"
              >
                J&apos;accepte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
