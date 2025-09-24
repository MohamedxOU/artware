import Image from "next/image";

export default function AboutUs() {
	return (
		<section id="about-us" className="w-full bg-base-100 py-16 flex justify-center">
			<div className="max-w-7xl w-full px-4 md:px-8">
				{/* Section Title */}
				<h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-primary text-center tracking-tight">
					CLUB ARTWARE
				</h2>
				<div className="grid md:grid-cols-2 gap-8 items-center">
					{/* Left: Text Card */}
					<div className="bg-base-100 rounded-2xl shadow p-8 flex flex-col gap-6">
						<span className="text-warning font-semibold text-lg">How It Started</span>
						<h3 className="text-4xl md:text-5xl font-bold leading-tight text-base-content">
							Our Dream is<br />Global Learning Transformation
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
								<span className="text-base text-base-content/70">Years Experience</span>
							</div>
							<div className=" rounded-xl shadow p-4 flex flex-col items-center">
								<span className="text-2xl font-bold text-base-content">23</span>
								<span className="text-base text-base-content/70">Project Challenge</span>
							</div>
							<div className=" rounded-xl shadow p-4 flex flex-col items-center">
								<span className="text-2xl font-bold text-base-content">830+</span>
								<span className="text-base text-base-content/70">Positive Reviews</span>
							</div>
							<div className=" rounded-xl shadow p-4 flex flex-col items-center">
								<span className="text-2xl font-bold text-base-content">100K</span>
								<span className="text-base text-base-content/70">Trusted Students</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
