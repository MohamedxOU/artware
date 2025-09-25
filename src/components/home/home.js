import AboutUs from './about-us';
import Activities from './activities';
import Bureau from './bureau';
import Cells from './cells';
import Contact from './contact';
import Footer from './footer';
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
			<Bureau />
			<Contact />
			<Footer />
			{/* Add your home page content here */}
		</>
	);
}
