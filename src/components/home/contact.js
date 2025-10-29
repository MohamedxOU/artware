"use client";
import { useState, useEffect } from "react";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Theme detection
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(false);
  
  useEffect(() => {
    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
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
  
  // Theme colors
  const bgPrimary = isDarkTheme ? 'oklch(98% 0.003 247.858)' : 'oklch(98% 0 0)';
  const bgSecondary = isDarkTheme ? 'oklch(20% 0.09 281.288)' : 'oklch(95% 0 0)';
  const bgTertiary = isDarkTheme ? 'oklch(25% 0.09 281.288)' : 'oklch(91% 0 0)';
  const textColor = isDarkTheme ? 'oklch(78% 0.115 274.713)' : 'oklch(0% 0 0)';
  const primaryColor = 'oklch(65% 0.241 354.308)';
  const textMuted = isDarkTheme ? 'rgba(200, 190, 220, 0.7)' : 'rgba(0, 0, 0, 0.7)';
  const borderColor = isDarkTheme ? 'rgba(200, 190, 220, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const placeholderColor = isDarkTheme ? 'rgba(200, 190, 220, 0.4)' : 'rgba(0, 0, 0, 0.4)';

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
    <section id="contact" className="w-full py-20" style={{ backgroundColor: bgTertiary }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Title and Description */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="space-y-6">
              <div className="inline-block">
                <span 
                  className="font-semibold text-sm uppercase tracking-wider px-4 py-2 rounded-full"
                  style={{ 
                    color: primaryColor, 
                    backgroundColor: `${primaryColor}1a` 
                  }}
                >
                  Contact Us
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight" style={{ color: textColor }}>
                Let&apos;s Start a{' '}
                <span style={{ color: primaryColor }}>
                  Conversation
                </span>
              </h2>
              <p className="text-lg md:text-xl leading-relaxed max-w-lg" style={{ color: textMuted }}>
                Have a question or want to join our club? Fill out the form and we&apos;ll get back to you as soon as possible.
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div 
              className="p-8 md:p-10 rounded-3xl shadow-2xl"
              style={{ 
                backgroundColor: bgPrimary,
                border: `1px solid ${borderColor}`
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedInput('name')}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full px-5 py-4 border-2 rounded-xl transition-all duration-300"
                      style={{
                        backgroundColor: focusedInput === 'name' ? bgPrimary : bgSecondary,
                        borderColor: focusedInput === 'name' ? primaryColor : 'transparent',
                        color: textColor,
                        outline: 'none'
                      }}
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedInput('email')}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full px-5 py-4 border-2 rounded-xl transition-all duration-300"
                      style={{
                        backgroundColor: focusedInput === 'email' ? bgPrimary : bgSecondary,
                        borderColor: focusedInput === 'email' ? primaryColor : 'transparent',
                        color: textColor,
                        outline: 'none'
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium mb-2" style={{ color: textMuted }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project or questions..."
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedInput('message')}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full px-5 py-4 border-2 rounded-xl transition-all duration-300 resize-none"
                    style={{
                      backgroundColor: focusedInput === 'message' ? bgPrimary : bgSecondary,
                      borderColor: focusedInput === 'message' ? primaryColor : 'transparent',
                      color: textColor,
                      outline: 'none'
                    }}
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="cursor-target group px-8 py-4 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center space-x-2"
                    style={{
                      backgroundColor: hoveredButton ? `${primaryColor}dd` : primaryColor,
                      boxShadow: hoveredButton ? `0 20px 25px -5px ${primaryColor}30` : 'none'
                    }}
                    onMouseEnter={() => setHoveredButton(true)}
                    onMouseLeave={() => setHoveredButton(false)}
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
