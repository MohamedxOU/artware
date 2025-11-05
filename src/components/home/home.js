"use client";
import AboutUs from './about-us';
import Activities from './activities';
import Bureau from './bureau';
import Cells from './cells';
import Contact from './contact';
import Footer from './footer';
import Gallery from './gallery';
import Hero from './hero';
import Navbar from './navbar';
import AppDownload from './app-download';
import TargetCursor from '@/components/TargetCursor.jsx';

export default function Home() {

	return (
		<div className="w-full min-w-0 overflow-x-hidden">
			<TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
			<Navbar />
			<Hero />
			<AboutUs />
			<Activities />
			<Cells />
			<Gallery />
			<Bureau />
			<AppDownload />
			<Contact />
			<Footer />
			{/* Add your home page content here */}
		</div>
	);
}
