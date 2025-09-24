import AboutUs from './about-us';
import Activities from './activities';
import Cells from './cells';
import Hero from './hero';
import Navbar from './navbar';

export default function Home() {
	return (
		<>
			<Navbar />
			<Hero />
			<AboutUs />
			<Activities />
			<Cells />
			{/* Add your home page content here */}
		</>
	);
}
