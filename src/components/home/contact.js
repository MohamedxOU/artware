"use client";
import { useState, useEffect } from "react";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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

    const section = document.getElementById("contact");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="w-full py-16 bg-base-200 text-neutral-content">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Title and Social Links */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-base-content">
              Get In Touch
            </h2>
            <p className="text-lg text-base-content/80 mb-8 leading-relaxed">
              Veuillez remplir le formulaire et nous serons heureux de vous aider.
            </p>

            {/* Social Media Links */}
            <div className="mb-12">
              <p className="text-base-content/60 mb-4 text-sm uppercase tracking-wider">Social:</p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61574231404463"
                  target="_blank"
                  className="cursor-target text-base-content/60 w-10 h-10 bg-neutral-focus hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.311h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.406 24 22.676V1.325C24 .593 23.407 0 22.675 0z"/>
                </svg>

                </a>
                <a 
                  href="https://www.linkedin.com/company/artware-engineering-club/" target="_blank"
                  className="cursor-target text-base-content/60 w-10 h-10 bg-neutral-focus hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/artware.club?igsh=MXgyOTZ5cjdtenllbw=="
                  target="_blank" 
                  className="cursor-target text-base-content/60 w-10 h-10 bg-neutral-focus hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nom"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-base-300 border border-base-content/20 rounded-lg text-base-content placeholder-base-content/60 focus:outline-none focus:border-primary transition-colors duration-300"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-base-300 border border-base-content/20 rounded-lg text-base-content placeholder-base-content/60 focus:outline-none focus:border-primary transition-colors duration-300"
                    required
                  />
                </div>
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-base-300 border border-base-content/20 rounded-lg text-base-content placeholder-base-content/60 focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="cursor-target px-8 py-3 bg-primary hover:bg-primary-focus text-primary-content font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                >
                  <span>Submit</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Information Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Email Card */}
          <div className="bg-base-300/50 backdrop-blur-sm border border-base-content/10 rounded-xl p-6 hover:bg-base-300/70 transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-base-content font-semibold mb-2">Email us</h3>
            <p className="text-base-content/60 text-sm">artware.club@gmail.com</p>
          </div>

          {/* Phone Card */}
          <div className="bg-base-300/50 backdrop-blur-sm border border-base-content/10 rounded-xl p-6 hover:bg-base-300/70 transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-base-content font-semibold mb-2">Call us</h3>
            <p className="text-base-content/60 text-sm">0688784609</p>
          </div>

          {/* Location Card */}
          <div className="bg-base-300/50 backdrop-blur-sm border border-base-content/10 rounded-xl p-6 hover:bg-base-300/70 transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-base-content font-semibold mb-2">Our location</h3>
            <p className="text-base-content/60 text-sm">FST Errachidia, Maroc</p>
          </div>
        </div>
      </div>
    </section>
  );
}
