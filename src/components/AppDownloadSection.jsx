"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AppDownloadSection() {
  // Animation variants pour Framer Motion
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const slideRightVariant = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-base-100 to-base-200 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Phone Image */}
          <motion.div
            variants={slideRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm lg:max-w-md">
              {/* Glowing effect behind phone */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-[3rem] blur-2xl scale-95"></div>
              
              {/* Phone image container */}
              <div className="relative bg-base-100 rounded-[3rem] p-4 shadow-2xl">
                <Image
                  src="/images/phone-app.png"
                  alt="Application mobile Artware"
                  width={400}
                  height={800}
                  className="w-full h-auto rounded-[2.5rem]"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            {/* Title Section */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-base-content">
                Découvrez notre
                <span className="block text-primary mt-2">application mobile</span>
              </h2>
              <p className="text-lg md:text-xl text-base-content/70 leading-relaxed">
                Accédez à tous vos événements, cellules et documents directement depuis votre smartphone. 
                Une expérience fluide et optimisée pour vous accompagner partout.
              </p>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Google Play Button */}
              <a
                href="#"
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {/* Google Play Icon */}
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs font-normal opacity-90">Télécharger sur</div>
                  <div className="text-base font-semibold">Google Play</div>
                </div>
              </a>

              {/* App Store Button */}
              <a
                href="#"
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {/* Apple Icon */}
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs font-normal opacity-90">Télécharger sur</div>
                  <div className="text-base font-semibold">App Store</div>
                </div>
              </a>
            </div>

            {/* QR Code Section */}
            <div className="flex items-center gap-6 pt-6 border-t border-base-content/10">
              <div className="flex-shrink-0">
                <div className="bg-white p-3 rounded-2xl shadow-lg">
                  <Image
                    src="/images/qr-code.png"
                    alt="QR Code pour télécharger l'application"
                    width={120}
                    height={120}
                    className="w-24 h-24 md:w-28 md:h-28"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-base-content">
                  Scannez pour télécharger
                </p>
                <p className="text-xs text-base-content/60">
                  Accès rapide depuis votre mobile
                </p>
              </div>
            </div>

            {/* Features Pills */}
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                ✨ Interface intuitive
              </span>
              <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                🚀 Performance optimale
              </span>
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                🔔 Notifications en temps réel
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
