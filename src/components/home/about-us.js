"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AboutUs() {
	const [theme, setTheme] = useState(
		typeof window !== "undefined"
			? localStorage.getItem("theme") || "acid"
			: "acid"
	);

	// Theme listener
	useEffect(() => {
		const handleStorageChange = () => {
			setTheme(localStorage.getItem("theme") || "acid");
		};
		
		// Listen for storage changes from other tabs
		window.addEventListener("storage", handleStorageChange);
		
		// Also check for theme changes periodically (for same-tab changes)
		const interval = setInterval(() => {
			const currentTheme = localStorage.getItem("theme") || "acid";
			if (currentTheme !== theme) {
				setTheme(currentTheme);
			}
		}, 100);
		
		return () => {
			window.removeEventListener("storage", handleStorageChange);
			clearInterval(interval);
		};
	}, [theme]);
	return (
		<section id="about-us" className="w-full bg-base-100 py-16 flex justify-center">
			<div className="max-w-7xl w-full px-4 md:px-8">
				{/* Section Logo */}
				<div className="flex justify-center mb-10">
					
				</div>
				<div className="grid md:grid-cols-2 gap-8 items-center">
					{/* Left: Text Card */}
					<div className="bg-base-100 rounded-2xl shadow p-8 flex flex-col gap-6">
						<Image
						src={theme === "synthwave" ? "/logos/ArtwareLogo-darkMode.png" : "/logos/ArtwareLogo.png"}
						alt="Club Artware Logo"
						width={300}
						height={300}
						className="rounded-full cursor-target"
					/>
						
						<h3 className="text-4xl md:text-5xl font-bold leading-tight text-base-content">
							More than a club, a family.
						</h3>
			<p className="text-base-content/80 text-lg">
							  Kawruh was founded by Robert Anderson, a passionate lifelong learner, and Maria Sanchez, a visionary educator. Their shared dream was to create a digital haven of knowledge accessible to all. United by their belief in the transformational power of education, they embarked on a journey to build &#39;Kawruh.&#39; With relentless dedication, they gathered a team of experts and launched this innovative platform, creating a global community of eager learners, all connected by the desire to explore, learn, and grow.
			</p>
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
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
							<div className=" rounded-xl shadow p-4 flex flex-col items-center">
								<span className="text-2xl font-bold text-base-content">3.5</span>
								<span className="text-base text-base-content/70">Years</span>
							</div>
							<div className=" rounded-xl shadow p-4 flex flex-col items-center">
								<span className="text-2xl font-bold text-base-content">23</span>
								<span className="text-base text-base-content/70">Cells</span>
							</div>
							<div className=" rounded-xl shadow p-4 flex flex-col items-center">
								<span className="text-2xl font-bold text-base-content">830+</span>
								<span className="text-base text-base-content/70">Members</span>
							</div>
							<div className=" rounded-xl shadow p-4 flex flex-col items-center">
								<span className="text-2xl font-bold text-base-content">100K</span>
								<span className="text-base text-base-content/70">Memories</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
