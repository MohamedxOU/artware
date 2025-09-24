"use client";
import { useState, useEffect } from "react";


const hero = {
  image: "/covers/cover-2.png",
  title: "Experience Global Connections and Unity",
  description:
	"Join the ISS Club and celebrate diversity, culture, and meaningful connections. Be a part of a vibrant international community.",
  cta: "RSVP",
};


export default function Hero() {
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
	setTimeout(() => setShowImage(true), 100);
	setTimeout(() => setShowText(true), 700);
  }, []);

		return (
			<section
				   className={
					   `relative w-full bg-fixed bg-cover bg-center before:absolute before:inset-0 before:bg-black/10  before:z-0`
				   }
				style={{
					minHeight: '100vh',
					backgroundImage: `url(${hero.image})`,
				}}
			>
				{/* Centered Animated Text and Button */}
				   <div
					   className="relative z-10 w-full h-full flex items-end justify-between pb-12 px-8"
					   style={{ minHeight: 'inherit', height: 'inherit' }}
				   >
					   {/* Left: Text */}
					   <div className="max-w-2xl flex flex-col items-start justify-end">
						   <div className={`transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
							   <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-left"
								   style={{ color: '#f1baff' }}>
								   {hero.title}
							   </h1>
							   <p className="text-lg md:text-xl mb-8 text-left" style={{ color: '#ffeea3' }}>
								   {hero.description}
							   </p>
						   </div>
					   </div>
					   {/* Right: CTA Buttons */}
					   <div className={`flex flex-col items-end gap-4 transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
						   <button className="btn btn-primary font-semibold px-8 py-3 text-lg shadow-lg w-40">Join us</button>
						   <button className="btn btn-outline border-white text-white font-semibold px-8 py-3 text-lg shadow-lg w-40">Learn more</button>
					   </div>
				   </div>
			</section>
		);
}
