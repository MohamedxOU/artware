"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
/* import LiquidEther from "@/components/LiquidEther.jsx"; */
import Iridescence from "@/components/Iridescence.jsx";
import TextType from "@/components/TextType.jsx";
import Shuffle from "@/components/Shuffle.jsx";



const hero = {
  
  title: "ARTWARE",
  description:
	"Join the ISS Club and celebrate diversity, culture, and meaningful connections. Be a part of a vibrant international community.",
  cta1: "Join us",
  cta2: "Learn More",
};


export default function Hero() {
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
	setTimeout(() => setShowImage(true), 100);
	setTimeout(() => setShowText(true), 700);
  }, []);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      const currentTheme = htmlElement.getAttribute('data-theme');
      setIsDarkTheme(currentTheme !== 'acid');
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

		return (
			<section id="hero" className={`bg-base-100 relative ${isDarkTheme ? 'opacity-80' : 'opacity-100'}`}
			style={{height : '100vh'}}
			>
				

				  
<Iridescence
  color={[0.8, 0, 0.8]}
  mouseReact={false}
  amplitude={0.1}
  speed={1.0}
/>

				{/* Hero Content Overlay */}
				<div className="absolute inset-0 z-10 flex items-center">
					<div className="max-w-7xl mx-auto px-6 w-full">
						<div className="grid lg:grid-cols-2 gap-12 items-center">
							{/* Left Column - Content */}
							<div className="text-left">
								{/* Title */}
								<h1 className={`text-5xl md:text-7xl font-bold text-white mb-6 transition-all duration-1000 ${
									showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
								}`}>
									<Shuffle
										text={hero.title}
										shuffleDirection="right"
										duration={0.35}
										animationMode="evenodd"
										shuffleTimes={1}
										ease="power3.out"
										stagger={0.03}
										threshold={0.1}
										triggerOnce={true}
										triggerOnHover={true}
										respectReducedMotion={true}
									/>
								</h1>

								{/* Description */}
								<p className={`text-xl md:text-2xl text-base-content/90 mb-10 leading-relaxed transition-all duration-1000 delay-300 ${
									showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
								}`}>
									<TextType 
										text={[hero.description]}
										typingSpeed={50}
										pauseDuration={1500}
										showCursor={true}
										cursorCharacter="_"
									/>
								</p>

								{/* CTA Buttons */}
								<div className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-1000 delay-600 ${
									showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
								}`}>
									<button className="cursor-target btn btn-xl btn-primary font-semibold px-10 py-4 text-lg shadow-xl hover:scale-105 transition-transform duration-300 w-48">
										{hero.cta1}
									</button>
									<button className="cursor-target btn btn-xl btn-outline border-base-content text-base-content font-semibold px-10 py-4 text-lg shadow-xl w-48 hover:bg-base-content hover:text-base-100 hover:scale-105 transition-all duration-300">
										{hero.cta2}
									</button>
								</div>
							</div>

							{/* Right Column - Image */}
							<div className={`relative transition-all duration-1000 delay-900 ${
								showText ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
							}`}>
								<div className="relative">
									<Image
										src="/activities/activity.jpg"
										alt="Artware Hero"
										width={600}
										height={600}
										className="w-full h-auto rounded-3xl shadow-2xl object-cover"
										priority
									/>
									{/* Decorative elements */}
									<div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
									<div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
}
