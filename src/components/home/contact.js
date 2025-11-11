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
  
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="w-full py-20 bg-base-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Title and Description */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-base-content font-semibold text-sm uppercase tracking-wider bg-primary  px-4 py-2 rounded-full">
                  Contact Us
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-base-content leading-tight">
                Let&apos;s Start a{' '}
                <span className="text-primary">
                  Conversation
                </span>
              </h2>
              <p className="text-foreground text-lg md:text-xl text-base-content opacity-70 leading-relaxed max-w-lg">
                Have a question or want to join our club? Fill out the form and we&apos;ll get back to you as soon as possible.
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-base-100 p-8 md:p-10 rounded-3xl shadow-2xl ">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-base-content opacity-70 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-base-200 border-2 border-transparent rounded-xl text-base-content placeholder-base-content placeholder-opacity-40 focus:outline-none focus:border-primary focus:bg-base-100 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-base-content opacity-70 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-base-200 border-2 border-transparent rounded-xl text-base-content placeholder-base-content placeholder-opacity-40 focus:outline-none focus:border-primary focus:bg-base-100 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-base-content opacity-70 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project or questions..."
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-base-200 border-2 border-transparent rounded-xl text-base-content placeholder-base-content placeholder-opacity-40 focus:outline-none focus:border-primary focus:bg-base-100 transition-all duration-300 resize-none"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="cursor-target group px-8 py-4 bg-primary hover:bg-primary-focus text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary  flex items-center space-x-2"
                  >
                    <span>Send Message</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
