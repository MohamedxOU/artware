"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
	{ href: "/about-us", label: "About Us" },
	{ href: "/cells", label: "Cells" },
	{ href: "/team", label: "Team" },
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
		<nav className="sticky top-0 z-50 w-full bg-base-100 border-b border-base-300 shadow-sm">
			<div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2">
					<Image src="/logo.svg" alt="Logo" width={36} height={36} className="rounded-full" />
					<span className="font-bold text-lg text-primary">Artware</span>
				</Link>

				{/* Nav Links */}
				<ul className="hidden md:flex gap-6 flex-1 justify-center">
					{navLinks.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className="text-base font-medium text-base-content hover:text-primary transition-colors"
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
						<label tabIndex={0} className="btn btn-ghost btn-circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71"
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 mt-2"
						>
							<li>
								<button
									className={
										theme === "acid" ? "active text-primary" : ""
									}
									onClick={() => handleTheme("acid")}
								>
									Acid
								</button>
							</li>
							<li>
								<button
									className={
										theme === "synthwave" ? "active text-primary" : ""
									}
									onClick={() => handleTheme("synthwave")}
								>
									Synthwave
								</button>
							</li>
						</ul>
					</div>

					{/* Language Picker */}
					<select
						className="select select-bordered select-sm mx-2"
						value={lang}
						onChange={(e) => handleLang(e.target.value)}
					>
						<option value="en">EN</option>
						<option value="fr">FR</option>
					</select>

					{/* Login Button */}
					<Link href="/login" className="btn btn-primary btn-sm ml-2">
						Login
					</Link>
				</div>
			</div>
		</nav>
	);
}
