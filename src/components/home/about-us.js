"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      const currentTheme = htmlElement.getAttribute('data-theme');
      setIsDarkTheme(currentTheme === 'synthwave');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => observer.disconnect();
  }, []);

  // Theme colors
  const bgColor = isDarkTheme ? 'oklch(98% 0.003 247.858)' : 'oklch(98% 0 0)';
  const textColor = isDarkTheme ? 'oklch(78% 0.115 274.713)' : 'oklch(0% 0 0)';
  const primaryColor = isDarkTheme ? 'oklch(65% 0.241 354.308)' : 'oklch(65% 0.241 354.308)';
  const secondaryBg = isDarkTheme ? 'oklch(20% 0.09 281.288)' : 'oklch(95% 0 0)';
  const textMuted = isDarkTheme ? 'rgba(200, 190, 220, 0.7)' : 'rgba(0, 0, 0, 0.7)';

  return (
    <section id="about-us" className="w-full py-16 flex justify-center" style={{ backgroundColor: bgColor }}>
      <div className="max-w-7xl w-full px-4 md:px-8">
        {/* Header - Fade in from top */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: textColor }}>
            About Us, <span style={{ color: primaryColor }}>Our Story & Vision</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: textMuted }}>
            Discover the story of ARTWARE, a passionate community dedicated to technological innovation and academic excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Text Card - Slide in from left */}
          <motion.div 
            className="rounded-2xl shadow p-8 flex flex-col gap-6"
            style={{ backgroundColor: bgColor }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: textColor }}>
              More than a club, a family.
            </h3>
            <p className="text-lg" style={{ color: textColor, opacity: 0.9 }}>
              Artware is a club founded by engineering students specializing in Software Engineering and Artificial Intelligence (ILIA). It is open to all students from the Faculty of Science and Technology as well as the Multidisciplinary Faculty of Errachidia.<br/><br/>
              The goal of Artware is to develop and strengthen members&apos; skills in IT fields such as development, coding, and creativity. To achieve this, the club offers an enriching experience through events, training sessions, competitions, and hackathons, fostering collaborative learning and innovation. <br/><br/>Additionally, Artware is committed to solidarity activities and fun, friendly events aimed at improving students&apos; academic life and experience, while strengthening the spirit of community and sharing.
            </p>
          </motion.div>

          {/* Right: Image - Slide in from right */}
          <motion.div 
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden shadow aspect-[4/3] flex items-center justify-center"
              style={{ backgroundColor: secondaryBg }}
            >
              <Image
                src="/covers/cover-1.jpg"
                alt="About Us"
                width={480}
                height={360}
                className="object-cover w-full h-full"
                priority
              />
            </div>

            {/* Stats Cards - Stagger animation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              {[
                { value: "4", label: "Cells" },
                { value: "45+", label: "Members" },
                { value: "∞", label: "Memories" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl shadow p-4 flex flex-col items-center"
                  style={{ backgroundColor: bgColor }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-2xl font-bold" style={{ color: textColor }}>{stat.value}</span>
                  <span className="text-base" style={{ color: textMuted }}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}