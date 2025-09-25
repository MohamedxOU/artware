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
					   `relative w-full  bg-cover bg-center before:absolute before:inset-0 before:bg-black/10  before:z-0`
				   }
				style={{
					minHeight: '100vh',
					backgroundImage: `url(${hero.image})`,
				}}
			>
				{/* Centered CTA Button */}
				   <div
					   className="relative z-10 w-full h-full flex items-end justify-center pb-42 px-8"
					   style={{ minHeight: 'inherit', height: 'inherit' }}
				   >
					   {/* Centered CTA Buttons */}
					   <div className={`flex flex-row items-center gap-4 transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
						   <button className="btn btn-xl btn-primary font-semibold px-10 py-3 text-lg shadow-lg w-40">Join us</button>
						   <button className="btn btn-xl btn-outline border-white text-white font-semibold px-8 py-3 text-lg shadow-lg w-40 hover:bg-primary hover:border-primary">Learn more</button>
					   </div>
				   </div>
			</section>
		);
}
