"use client";
import { useState } from "react";
import Image from "next/image";

const activities = [
	{
		title: "Développement Web & Mobile",
		image: "/activities/activity.jpg",
		description: "Nous créons des applications web et mobiles innovantes avec les dernières technologies. Nos experts développent des solutions sur mesure pour optimiser votre présence digitale et améliorer l'expérience utilisateur.",
	},
	{
		title: "Intelligence Artificielle",
		image: "/activities/activity.jpg",
		description: "Explorez le potentiel de l'IA avec nos solutions personnalisées. Nous développons des modèles de machine learning et des systèmes intelligents pour automatiser vos processus métier.",
	},
	{
		title: "Programmation Compétitive",
		image: "/activities/activity.jpg",
		description: "Perfectionnez vos compétences algorithmiques et participez aux compétitions internationales. Nous organisons des séances d'entraînement et des workshops pour tous les niveaux.",
	},
	{
		title: "Événements & Workshops",
		image: "/activities/activity.jpg",
		description: "Rejoignez notre communauté dynamique à travers nos événements tech, hackathons et workshops. Apprenez, partagez et créez des liens avec d'autres passionnés de technologie.",
	},
	{
		title: "Formation & Mentorat",
		image: "/activities/activity.jpg",
		description: "Bénéficiez de notre programme de mentorat et de formations techniques. Nos experts vous accompagnent dans votre parcours d'apprentissage et votre développement professionnel.",
	},
];

export default function Activities() {
	const [selected, setSelected] = useState(0);

	return (
		<section id="activities" className="w-full py-16 bg-base-200">
			<div className="max-w-7xl mx-auto px-6">
				{/* Header */}
				<div className="text-left mb-12">
					<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 text-base-content/70 text-sm font-medium mb-6">
						Nos Activities
					</span>
					<h2 className="text-4xl md:text-5xl font-bold text-base-content">
						Plusieurs activities pour enrechir votre <br />
						<span className="text-primary">Vie académique</span>
					</h2>
					{/* <p className="text-lg text-base-content/70 mt-4 max-w-2xl">
						Nous vous donnons les outils pour prendre le contrôle de votre bien-être technologique. 
						Nous visons à briser les stigmates entourant l&apos;apprentissage tech, rendant la formation 
						accessible, soutenante et transformatrice pour tous ceux qui la recherchent.
					</p> */}
				</div>

				{/* Main Content Layout */}
				<div className="bg-base-100 border border-base-300/20 rounded-3xl shadow-2xl overflow-hidden">
					<div className="grid lg:grid-cols-5 min-h-[600px]">
						{/* Sidebar Navigation */}
						<div className="lg:col-span-2 bg-base-200/50 p-8">
							<div className="space-y-1">
								{activities.map((activity, idx) => (
									<button
										key={activity.title}
										className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 ${
											selected === idx
												? 'bg-primary text-primary-content shadow-lg'
												: 'text-base-content/70 hover:bg-base-300/50 hover:text-base-content'
										}`}
										onClick={() => setSelected(idx)}
									>
										<span className="font-semibold text-base">
											{activity.title}
										</span>
									</button>
								))}
								
								
							</div>
						</div>

						{/* Main Content Area */}
						<div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center bg-base-100">
							<div className="mb-8">
								<div className="w-full h-64 lg:h-80 rounded-2xl overflow-hidden mb-8 bg-base-300/20 shadow-lg border border-base-300/10">
									<Image
										src={activities[selected].image}
										alt={activities[selected].title}
										width={600}
										height={400}
										className="w-full h-full object-cover"
									/>
								</div>
								
								<h3 className="text-3xl lg:text-4xl font-bold text-base-content mb-6">
									{activities[selected].title}
								</h3>
								
								<p className="text-base-content/80 text-lg leading-relaxed mb-8">
									{activities[selected].description}
								</p>
								
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
