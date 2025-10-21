"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AboutUs() {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	useEffect(() => {
		// Check initial theme
		const checkTheme = () => {
			const htmlElement = document.documentElement;
			const currentTheme = htmlElement.getAttribute('data-theme');
			setIsDarkTheme(currentTheme === 'synthwave');
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
		<section id="about-us" className="w-full bg-base-100 py-16 flex justify-center">
			<div className="max-w-7xl w-full px-4 md:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						À Propos de Nous, <span className="text-primary">Notre Histoire & Vision</span>
					</h2>
					<p className="text-lg text-base-content/70 max-w-2xl mx-auto">
						Découvrez ARTWARE, une communauté passionnée dédiée à l&apos;innovation technologique et à l&apos;excellence académique
					</p>
				</div>
				
				<div className="grid md:grid-cols-2 gap-8 items-center">
					{/* Left: Text Card */}
					<div className="bg-base-100 rounded-2xl shadow p-8 flex flex-col gap-6">
					
						
						<h3 className="text-4xl md:text-5xl font-bold leading-tight text-base-content">
							Artware — là où la créativité rencontre l&apos;intelligence.
						</h3>
			<p className="text-base-content/80 text-lg">
Artware est un club fondé par les étudiants du cycle d’ingénieur en Ingénierie Logicielle et Intelligence Artificielle (ILIA). Il est ouvert à l’ensemble des étudiants de la Faculté des Sciences et Techniques ainsi que de la Faculté Polydisciplinaire d’Errachidia.<br/><br/>

L’objectif du club Artware est de développer et renforcer les compétences de ses membres dans les domaines de l’informatique tels que le développement, le coding et la créativité. Pour atteindre cet objectif, le club propose une expérience enrichissante à travers des événements, formations, compétitions et hackathons, favorisant ainsi l’apprentissage collaboratif et l’innovation. <br/><br/>En parallèle, Artware s’engage également dans des activités solidaires et des événements ludiques et conviviaux visant à améliorer la vie et l’expérience académique des étudiants, tout en renforçant l’esprit de communauté et de partage.</p>
					</div>
					{/* Right: Image */}
					<div className="flex flex-col gap-6">
						<div className="rounded-2xl overflow-hidden shadow aspect-[4/3] bg-base-200 flex items-center justify-center">
							<Image
								src="/covers/cover-1.jpg"
								alt="About Us"
								width={480}
								height={360}
								className="object-cover w-full h-full"
								priority
							/>
						</div>
						{/* Stats Cards */}
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
							
							<div className=" rounded-xl shadow p-4 flex flex-col items-center">
								<span className="text-2xl font-bold text-base-content">4</span>
								<span className="text-base text-base-content/70">Cells</span>
							</div>
							<div className=" rounded-xl shadow p-4 flex flex-col items-center">
								<span className="text-2xl font-bold text-base-content">45+</span>
								<span className="text-base text-base-content/70">Members</span>
							</div>
							<div className=" rounded-xl shadow p-4 flex flex-col items-center">
								<span className="text-2xl font-bold text-base-content">∞</span>
								<span className="text-base text-base-content/70">Memories</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
