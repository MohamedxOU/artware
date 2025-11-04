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
                  src="/phone-app.jpeg"
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
              <h2 className="text-4xl md:text-5xl font-bold text-base-content">
                Discover our
                <span className="block text-primary mt-2">mobile application</span>
              </h2>
              <p className="text-lg md:text-xl text-base-content/70 leading-relaxed">
                Access all your events, cells and documents directly from your smartphone. 
                A smooth and optimized experience to accompany you everywhere.
              </p>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Android APK Download Button */}
              <a
                href="https://expo.dev/artifacts/eas/ppg3DGH8aTqoxZfPWGbspX.apk"
                download
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-focus hover:from-primary-focus hover:to-primary text-primary-content px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {/* Android Download Icon */}
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,8L16,12H13V16H11V12H8L12,8Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs font-normal opacity-90">Download</div>
                  <div className="text-lg font-bold">Mobile Application</div>
                </div>
              </a>
            </div>

            {/* QR Code Section */}
            <div className="flex items-center gap-6 pt-6 border-t border-base-content/10">
              <div className="flex-shrink-0">
                <div className="bg-white p-3 rounded-2xl shadow-lg">
                  <Image
                    src="/qr-code.png"
                    alt="QR Code pour télécharger l'application"
                    width={120}
                    height={120}
                    className="w-24 h-24 md:w-28 md:h-28"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-base-content">
                  Scan to download
                </p>
                <p className="text-xs text-base-content/60">
                  Quick access from your mobile
                </p>
              </div>
            </div>

            {/* Features Pills */}
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                ✨ Intuitive interface
              </span>
              <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                🚀 Optimal performance
              </span>
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                🔔 Real-time notifications
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
