"use client";
import { useState, useEffect } from "react";
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
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	useEffect(() => {
		const checkTheme = () => {
			const htmlElement = document.documentElement;
			const currentTheme = htmlElement.getAttribute('data-theme');
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
	const bgPrimary = isDarkTheme ? 'oklch(20% 0.09 281.288)' : 'oklch(95% 0 0)';
	const bgSecondary = isDarkTheme ? 'oklch(98% 0.003 247.858)' : 'oklch(98% 0 0)';
	const textColor = isDarkTheme ? 'oklch(78% 0.115 274.713)' : 'oklch(0% 0 0)';
	const primaryColor = isDarkTheme ? 'oklch(65% 0.241 354.308)' : 'oklch(65% 0.241 354.308)';
	const bgHover = isDarkTheme ? 'oklch(25% 0.09 281.288)' : 'oklch(91% 0 0)';
	const borderColor = isDarkTheme ? 'rgba(120, 100, 150, 0.2)' : 'rgba(0, 0, 0, 0.2)';
	const textMuted = isDarkTheme ? 'rgba(200, 190, 220, 0.7)' : 'rgba(0, 0, 0, 0.7)';
	const textMutedLight = isDarkTheme ? 'rgba(200, 190, 220, 0.8)' : 'rgba(0, 0, 0, 0.8)';

	return (
		<section id="activities" className="w-full py-16 allow-horizontal-scroll" style={{ backgroundColor: bgPrimary }}>
			<div className="max-w-7xl mx-auto px-6">
				{/* Header */}
				<div className="text-center mb-12">
					
					<h2 className="text-4xl md:text-5xl font-bold" style={{ color: textColor }}>
						Multiple activities to enrich your <br />
						<span style={{ color: primaryColor }}>Academic Life</span>
					</h2>
				</div>

				{/* Main Content Layout */}
				<div className="rounded-3xl shadow-2xl overflow-hidden" style={{ backgroundColor: bgSecondary, border: `1px solid ${borderColor}` }}>
					{/* Mobile Layout */}
					<div className="block lg:hidden">
						{/* Mobile Content Area */}
						<div className="p-6">
							<div className="mb-6">
								<div className="w-full h-48 rounded-2xl overflow-hidden mb-6 shadow-lg" style={{ backgroundColor: `${isDarkTheme ? 'rgba(120, 100, 150, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`, border: `1px solid ${isDarkTheme ? 'rgba(120, 100, 150, 0.1)' : 'rgba(0, 0, 0, 0.1)'}` }}>
									<Image
										src={activities[selected].image}
										alt={activities[selected].title}
										width={600}
										height={600}
										className="w-full h-full object-cover"
									/>
								</div>
								
								<h3 className="text-2xl font-bold mb-4" style={{ color: textColor }}>
									{activities[selected].title}
								</h3>
								
								<p className="text-base leading-relaxed mb-6" style={{ color: textMutedLight }}>
									{activities[selected].description}
								</p>
							</div>
						</div>

						{/* Mobile Navigation Tabs */}
						<div className="p-4" style={{ backgroundColor: `${isDarkTheme ? 'rgba(32, 18, 50, 0.5)' : 'rgba(0, 0, 0, 0.02)'}` }}>
							<div className="flex overflow-x-auto gap-2 pb-2 horizontal-scroll-container">
								{activities.map((activity, idx) => (
									<button
										key={activity.title}
										className="cursor-target shrink-0 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold whitespace-nowrap"
										style={{
											backgroundColor: selected === idx ? primaryColor : bgSecondary,
											color: selected === idx ? 'white' : textMuted,
											boxShadow: selected === idx ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
										}}
										onMouseEnter={(e) => {
											if (selected !== idx) {
												e.currentTarget.style.backgroundColor = bgHover;
												e.currentTarget.style.color = textColor;
											}
										}}
										onMouseLeave={(e) => {
											if (selected !== idx) {
												e.currentTarget.style.backgroundColor = bgSecondary;
												e.currentTarget.style.color = textMuted;
											}
										}}
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
						<div className="lg:col-span-2 p-8" style={{ backgroundColor: `${isDarkTheme ? 'rgba(32, 18, 50, 0.5)' : 'rgba(0, 0, 0, 0.02)'}` }}>
							<div className="space-y-1">
								{activities.map((activity, idx) => (
									<button
										key={activity.title}
										className="cursor-target w-full text-left px-6 py-4 rounded-xl transition-all duration-300"
										style={{
											backgroundColor: selected === idx ? primaryColor : 'transparent',
											color: selected === idx ? 'white' : textMuted,
											boxShadow: selected === idx ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
										}}
										onMouseEnter={(e) => {
											if (selected !== idx) {
												e.currentTarget.style.backgroundColor = bgHover;
												e.currentTarget.style.color = textColor;
											}
										}}
										onMouseLeave={(e) => {
											if (selected !== idx) {
												e.currentTarget.style.backgroundColor = 'transparent';
												e.currentTarget.style.color = textMuted;
											}
										}}
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
						<div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center" style={{ backgroundColor: bgSecondary }}>
							<div className="mb-8">
								<div className="w-full h-64 lg:h-80 rounded-2xl overflow-hidden mb-8 shadow-lg" style={{ backgroundColor: `${isDarkTheme ? 'rgba(120, 100, 150, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`, border: `1px solid ${isDarkTheme ? 'rgba(120, 100, 150, 0.1)' : 'rgba(0, 0, 0, 0.1)'}` }}>
									<Image
										src={activities[selected].image}
										alt={activities[selected].title}
										width={600}
										height={400}
										className="w-full h-full object-cover"
									/>
								</div>
								
								<h3 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: textColor }}>
									{activities[selected].title}
								</h3>
								
								<p className="text-lg leading-relaxed mb-8" style={{ color: textMutedLight }}>
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
