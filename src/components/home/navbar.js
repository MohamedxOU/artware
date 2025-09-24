"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
	{ href: "#about-us", label: "Présentation" },
	{ href: "/activities", label: "Activités" },
	{ href: "/cells", label: "Cellules" },
	{ href: "/team", label: "Bureau" },
    { href : "/contact", label: "Contact" }
];

export default function Navbar() {
	const [theme, setTheme] = useState(
		typeof window !== "undefined"
			? localStorage.getItem("theme") || "acid"
			: "acid"
	);
	const [lang, setLang] = useState(
		typeof window !== "undefined"
			? localStorage.getItem("locale") || "fr"
			: "fr"
	);
	const [isScrolled, setIsScrolled] = useState(false);

	// Scroll effect handler
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			// Change this value to adjust when the background appears
			const scrollThreshold = 50;
			setIsScrolled(scrollTop > scrollThreshold);
		};

		// Set initial state
		handleScroll();

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Theme switcher handler
	const handleTheme = (t) => {
		setTheme(t);
		if (typeof window !== "undefined") {
			localStorage.setItem("theme", t);
			document.documentElement.setAttribute("data-theme", t);
		}
	};

	// Language picker handler
	const handleLang = (l) => {
		setLang(l);
		if (typeof window !== "undefined") {
			localStorage.setItem("locale", l);
			window.location.reload();
		}
	}; 

	return (
		<nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
			isScrolled 
				? "bg-base-100 border-b border-base-300 shadow-sm" 
				: "bg-transparent"
		}`}>
			<div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2">
					<Image 
						src={theme === "synthwave" ? "/logos/ArtwareLogo-darkMode.png" : "/logos/ArtwareLogo.png"}
						alt="Logo" 
						width={160} 
						height={160}  
						className={`rounded-full transition-all duration-300 ${
							isScrolled ? "scale-90" : "scale-100"
						}`} 
					/>
				</Link>

				{/* Nav Links */}
				<ul className="hidden md:flex gap-6 flex-1 justify-center">
					{navLinks.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className={`text-base font-medium transition-all duration-300 ${
									isScrolled 
										? "text-base-content hover:text-primary" 
										: "text-white hover:text-primary"
								}`}
							>
								{link.label} 
							</Link>
						</li>
					))}
				</ul>

				{/* Right Controls */}
				<div className="flex items-center gap-2">
					{/* Theme Switcher */}
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className={`btn btn-circle transition-all duration-300 ${
							isScrolled ? "btn-ghost" : "btn-ghost text-white hover:bg-white/20"
						}`}>
							{theme === "acid" ? (
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
								</svg>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
									<path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
								</svg>
							)}
						</label>
						<ul
							tabIndex={0}
							className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 mt-2"
						>
							<li>
								<button
									className={
										theme === "acid" ? "active text-primary flex items-center gap-2" : "flex items-center gap-2"
									}
									onClick={() => handleTheme("acid")}
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
										<path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
									</svg>
									Light
								</button>
							</li>
							<li>
								<button
									className={
										theme === "synthwave" ? "active text-primary flex items-center gap-2" : "flex items-center gap-2"
									}
									onClick={() => handleTheme("synthwave")}
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
										<path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
									</svg>
									Dark
								</button>
							</li>
						</ul>
					</div>

					{/* Language Picker */}
					<select
						className={`select select-sm mx-2 transition-all duration-300 ${
							isScrolled ? "select-bordered" : "border-white/30 text-white bg-transparent"
						}`}
						value={lang}
						onChange={(e) => handleLang(e.target.value)}
					>
						<option value="en">EN</option>
						<option value="fr">FR</option>
					</select>

					{/* Login Button */}
					<Link 
						href="/login" 
						className={`btn btn-sm ml-2 transition-all duration-300 ${
							isScrolled ? "btn-primary" : "btn-outline text-white border-white hover:bg-white hover:text-primary"
						}`}
					>
						Login
					</Link>
				</div>
			</div>
		</nav>
	);
}