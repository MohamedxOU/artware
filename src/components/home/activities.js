"use client";
import { useState } from "react";
import Image from "next/image";

const activities = [
	{
		title: "Training & Workshops",
		image: "/activities/form.jpg",
		description: "We create innovative web and mobile applications using the latest technologies. Our experts develop customized solutions to enhance your digital presence and improve user experience.",
	},
	{
		title: "Events & Conferences",
		image: "/activities/conf.jpg",
		description: "Explore the potential of AI with our tailored solutions. We build machine learning models and intelligent systems to automate your business processes.",
	},
	{
		title: "Competitions & Hackathons",
		image: "/activities/hack.jpg",
		description: "Improve your algorithmic skills and take part in international competitions. We organize training sessions and workshops for all skill levels.",
	},
	{
		title: "Community & Networking",
		image: "/activities/netw.png",
		description: "Join our vibrant community through tech events, hackathons, and workshops. Learn, share, and connect with other technology enthusiasts.",
	},
	{
		title: "Solidarity & Social Engagement",
		image: "/activities/soli.jpg",
		description: "Take advantage of our mentoring program and technical training sessions. Our experts guide you throughout your learning journey and professional development.",
	},
];


export default function Activities() {
	const [selected, setSelected] = useState(0);

	return (
		<section id="activities" className="w-full py-16 bg-base-200 allow-horizontal-scroll">
			<div className="max-w-7xl mx-auto px-6">
				{/* Header */}
				<div className="text-center mb-12">
					
					<h2 className="text-4xl md:text-5xl font-bold text-base-content">
						Multiple activities to enrich your <br />
						<span className="text-primary">Academic Life</span>
					</h2>
				</div>

				{/* Main Content Layout */}
				<div className="bg-base-100 border border-base-300 rounded-3xl shadow-2xl overflow-hidden">
					{/* Mobile Layout */}
					<div className="block lg:hidden">
						{/* Mobile Content Area */}
						<div className="p-6">
							<div className="mb-6">
								<div className="w-full h-48 rounded-2xl overflow-hidden mb-6 bg-base-300/20 shadow-lg border border-base-300/10">
									<Image
										src={activities[selected].image}
										alt={activities[selected].title}
										width={600}
										height={600}
										className="w-full h-full object-cover"
									/>
								</div>
								
								<h3 className="text-2xl font-bold text-base-content mb-4">
									{activities[selected].title}
								</h3>
								
								<p className="text-base-content/80 text-base leading-relaxed mb-6">
									{activities[selected].description}
								</p>
							</div>
						</div>

						{/* Mobile Navigation Tabs */}
						<div className="bg-base-200 p-4">
							<div className="flex overflow-x-auto gap-2 pb-2 horizontal-scroll-container">
								{activities.map((activity, idx) => (
									<button
										key={activity.title}
										className={`cursor-target flex-shrink-0 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold whitespace-nowrap ${
											selected === idx
												? 'bg-primary text-white shadow-lg'
												: 'text-base-content hover:bg-base-300 hover:text-base-content bg-base-100'
										}`}
										onClick={() => setSelected(idx)}
									>
										{activity.title}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Desktop Layout */}
					<div className="hidden lg:grid lg:grid-cols-5 min-h-[600px]">
						{/* Sidebar Navigation */}
						<div className="lg:col-span-2 bg-base-200 p-8">
							<div className="space-y-1">
								{activities.map((activity, idx) => (
									<button
										key={activity.title}
										className={`cursor-target w-full text-left px-6 py-4 rounded-xl transition-all duration-300 ${
											selected === idx
												? 'bg-primary text-white shadow-lg'
												: 'text-base-content hover:bg-base-300 hover:text-base-content'
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
								
								<p className="text-base-content text-lg leading-relaxed mb-8">
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
