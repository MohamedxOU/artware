"use client";
import { useState } from "react";

const activities = [
	{
		title: "Custom fence design",
		image: "/activities/activity.jpg",
		description: "We create unique fence designs tailored to your property and style preferences. Our experts ensure every detail is considered for both aesthetics and functionality.",
	},
	{
		title: "Fence repair",
		image: "/activities/activity.jpg",
		description: "Restore your fence to its original condition with our professional repair services. We handle all types of damage, from minor fixes to major restorations.",
	},
	{
		title: "Fence installation",
		image: "/activities/activity.jpg",
		description: "Our team provides fast and reliable fence installation, using quality materials and precise workmanship for lasting results.",
	},
	{
		title: "Staining & sealing",
		image: "/activities/activity.jpg",
		description: "Protect and enhance your fence with our staining and sealing services. We use premium products to ensure durability and a beautiful finish.",
	},
	{
		title: "Maintenance services",
		image: "/activities/activity.jpg",
		description: "Keep your fence in top shape year-round. Our maintenance plans include inspections, cleaning, and preventative care.",
	},
];

export default function Activities() {
	const [selected, setSelected] = useState(null);

	return (
		<section className="w-full flex justify-center py-16 bg-base-200">
			<div className="max-w-7xl w-full rounded-3xl bg-base-100/90 shadow-xl p-8 md:p-14 flex flex-col gap-8">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
					<div>
						<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-base-300 text-base-content/70 text-sm mb-4">
							<svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l-1.414-1.414M6.05 6.05 4.636 7.464"/></svg>
							Our Activities
						</span>
						<h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'serif' }}>
							What we do, what we offer
						</h2>
					</div>
					
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
					{activities.map((activity, idx) => (
						<button
							key={activity.title}
							className="group relative rounded-2xl overflow-hidden shadow-lg h-64 flex items-end bg-base-300 focus:outline-none"
							onClick={() => setSelected(idx)}
							style={{ backgroundImage: `url(${activity.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
						>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity group-hover:opacity-80" />
							<span className="absolute top-3 right-3 bg-white/60 rounded-full p-1.5">
								<svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" d="M9 5l7 7-7 7"/></svg>
							</span>
							<span className="relative z-10 text-lg font-medium text-white text-left p-4">
								{activity.title}
							</span>
						</button>
					))}
				</div>

				{/* Modal */}
				{selected !== null && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
						<div className="bg-base-100 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
							<button
								className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost"
								onClick={() => setSelected(null)}
								aria-label="Close"
							>
								<svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" d="M6 6l12 12M6 18L18 6"/></svg>
							</button>
							<div className="w-full h-48 rounded-xl overflow-hidden mb-6 bg-base-200" style={{ backgroundImage: `url(${activities[selected].image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
							<h3 className="text-2xl font-bold mb-2">{activities[selected].title}</h3>
							<p className="text-base-content/80 mb-2">{activities[selected].description}</p>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
