"use client";
import AboutUs from './about-us';
import Activities from './activities';
import Bureau from './bureau';
import Cells from './cells';
import Contact from './contact';
import Footer from './footer';
import Hero from './hero';
import Navbar from './navbar';
import TargetCursor from '@/components/TargetCursor.jsx';

export default function Home() {
	return (
		<>
			<TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
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
