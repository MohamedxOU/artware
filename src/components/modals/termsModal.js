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
      title: "General Terms",
      subtitle: "Acceptance • Use • Responsibilities",
      bgColor: "bg-base-100",
      description: "By registering on our platform, you agree to respect our terms of use and actively participate in our technology community."
    },
    {
      id: "02", 
      title: "Personal Data",
      subtitle: "Collection • Protection • Processing",
      bgColor: "bg-base-100",
      description: "We respect your privacy and process your personal data in accordance with GDPR and Moroccan data protection laws."
    },
    {
      id: "03",
      title: "Intellectual Property",
      subtitle: "Content • Projects • Innovations • Collaboration",
      bgColor: "bg-base-100",
      description: "Our development team brings your digital projects to life with robust, scalable and high-performance solutions. Using the latest technologies, we ensure that your applications are designed to meet your business objectives and deliver a seamless user experience.",
      
    },
    {
      id: "04",
      title: "Responsibilities",
      subtitle: "Security • Compliance • Documentation",
      bgColor: "bg-base-100",
      description: "We guarantee the quality of our services and compliance with security standards to protect your experience on our platform."
    }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20  backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className={`relative w-full max-w-4xl h-[80vh] bg-base-100 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${
        showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-base-100/95 backdrop-blur-md border-b border-base-300  px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-base-content">Terms of Use</h2>
            <p className="text-base-content  text-sm">ARTWARE Community Platform</p>
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
                className={`${section.bgColor} rounded-2xl p-6 border border-base-300  transition-all duration-300 hover:shadow-lg`}
              >
                <div className="flex items-start gap-4">
                  {/* Section Number */}
                  <div className="flex-shrink-0 w-12 h-12 bg-primary  rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{section.id}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-base-content mb-2">
                      {section.title}
                    </h3>
                    
                    
                    
                    <p className="text-base-content  leading-relaxed mb-4">
                      {section.description}
                    </p>
                    
                    {section.hasButton && (
                      <button className="px-6 py-2 border border-base-content  rounded-full text-sm font-medium text-base-content hover:bg-base-200 transition-colors">
                        DISCUTER PROJET
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Additional Terms */}
            <div className="bg-base-200  rounded-2xl p-6 border border-base-300 ">
              <h4 className="text-lg font-semibold text-base-content mb-4">Additional Terms</h4>
              
              <div className="space-y-4 text-sm text-base-content ">
                <div>
                  <h5 className="font-medium text-base-content mb-2">Event Participation</h5>
                  <p>By participating in our events, workshops and hackathons, you agree to respect our code of conduct and contribute positively to the collective experience.</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-base-content mb-2">Collaborative Projects</h5>
                  <p>Projects developed within ARTWARE remain the property of their creators, but may be shared for educational purposes with the participants&apos; agreement.</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-base-content mb-2">Terms Modifications</h5>
                  <p>We reserve the right to modify these terms at any time. Members will be notified of important changes by email.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-base-100/95 backdrop-blur-md border-t border-base-300  p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-base-content ">
              Last updated: January 2025
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="btn btn-outline btn-sm"
              >
                Close
              </button>
              <button
                onClick={onClose}
                className="btn btn-primary btn-sm"
              >
                I Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
