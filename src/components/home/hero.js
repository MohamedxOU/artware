"use client";
import { useState, useEffect } from "react";
/* import LiquidEther from "@/components/LiquidEther.jsx"; */
import Iridescence from "@/components/Iridescence.jsx";


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

  useEffect(() => {
	setTimeout(() => setShowImage(true), 100);
	setTimeout(() => setShowText(true), 700);
  }, []);

		return (
			<section id="hero" className="bg-base-100 relative"
			style={{height : '100vh'}}
			>
				

				  
<Iridescence
  color={[0.8, 0, 0.8]}
  mouseReact={false}
  amplitude={0.1}
  speed={1.0}
/>

				{/* Hero Content Overlay */}
				<div className="absolute inset-0 z-10 flex items-center justify-center">
				
					<div className="text-center max-w-4xl mx-auto px-6">
						{/* Title */}
						<h1 className={`text-5xl md:text-7xl font-bold text-base-content mb-6 transition-all duration-1000 ${
							showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
						}`}>
							
							{hero.title}
						</h1>

						{/* Description */}
						<p className={`text-xl md:text-2xl text-base-content/90 mb-10 leading-relaxed transition-all duration-1000 delay-300 ${
							showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
						}`}>
							{hero.description}
						</p>

						{/* CTA Buttons */}
						<div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-600 ${
							showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
						}`}>
							<button className="cursor-target btn btn-xl btn-primary font-semibold px-10 py-4 text-lg shadow-xl hover:scale-105 transition-transform duration-300 w-48">
								{hero.cta1}
							</button>
							<button className="cursor-target btn btn-xl btn-outline border-white text-white font-semibold px-10 py-4 text-lg shadow-xl w-48 hover:bg-white hover:text-primary hover:scale-105 transition-all duration-300">
								{hero.cta2}
							</button>
						</div>
					</div>
				</div>
			</section>
		);
}
