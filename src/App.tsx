import React, { useState, useEffect } from 'react';
import { ToastProvider } from './components/Toast';
import { Preloader } from './components/Preloader';
import { MobileBottomBar } from './components/MobileBottomBar';

// The 13 Dedicated Sections for Ken's Hair Design
import { Section01_Nav } from './sections/Section01_Nav';
import { Section02_Hero } from './sections/Section02_Hero';
import { Section03_Marquee } from './sections/Section03_Marquee';
import { Section04_Philosophy } from './sections/Section04_Philosophy';
import { Section04_Services } from './sections/Section04_Services';
import { Section05_WorkShowcase } from './sections/Section05_WorkShowcase';
import { Section06_Gallery } from './sections/Section06_Gallery';
import { Section07_About } from './sections/Section07_About';
import { Section08_WhyLocalsCome } from './sections/Section08_WhyLocalsCome';
import { Section_Testimonials } from './sections/Section_Testimonials';
import { Section_Neighborhood } from './sections/Section_Neighborhood';
import { Section_FAQ } from './sections/Section_FAQ';
import { Section09_BookContact } from './sections/Section09_BookContact';
import { Section11_Footer } from './sections/Section11_Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);

  // Ensure fresh visits always open at the top (hero section)
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  // Track active section for top navbar
  useEffect(() => {
    const sectionIds = [
      'studio',
      'testimonials',
      'philosophy',
      'services',
      'craft',
      'gallery',
      'standards',
      'chinatown',
      'faq',
      'book',
    ];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isPreloaded]);

  return (
    <ToastProvider>
      {/* 1. Preloader sequence with live counter and mask reveal */}
      <Preloader onComplete={() => setIsPreloaded(true)} />

      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#131313] text-white px-4 py-2 rounded-[4px] border border-white font-semibold text-sm"
      >
        Skip to main content
      </a>

      {/* Persistent Page Container */}
      <div className="min-h-screen flex flex-col bg-white text-[#131313] selection:bg-[#ebf213] selection:text-[#131313] pb-16 md:pb-0">
        {/* SECTION 1 of 13: Navigation (with tablet & mobile hamburger overlay) */}
        <Section01_Nav activeSection={activeSection} />

        {/* Main Content Landmark */}
        <main id="main-content" className="flex-1">
          {/* SECTION 1: Hero (with background texture, bordered curved long holder) */}
          <Section02_Hero />

          {/* SECTION 2: Studio Stylists (Ken & Debra at the Chair) - ABOUT US SECTION */}
          <Section07_About />

          {/* SECTION 3: Client Testimonials / Reviews Carousel (What Our Clients Say) - Below About Us */}
          <Section_Testimonials />

          {/* SECTION 4: Craft Marquee Strip */}
          <Section03_Marquee />

          {/* SECTION 5: Studio Philosophy & Atmosphere */}
          <Section04_Philosophy />

          {/* SECTION 6: Services & Structured Price List with Book Now button */}
          <Section04_Services />

          {/* SECTION 7: Pinned Craft Sequence (The Scissor Sequence) */}
          <Section05_WorkShowcase />

          {/* SECTION 8: Visual Craft Gallery (Curved Long Frame & Lightbox) */}
          <Section06_Gallery />

          {/* SECTION 9: 4-Point Core Studio Standards */}
          <Section08_WhyLocalsCome />

          {/* SECTION 10: Stockton Street & Chinatown Heritage with Google Maps */}
          <Section_Neighborhood />

          {/* SECTION 11: Common Studio Questions (FAQ) */}
          <Section_FAQ />

          {/* SECTION 12: Appointment Request & Direct Contact */}
          <Section09_BookContact />
        </main>

        {/* SECTION 13 of 13: Designed Modern Footer */}
        <Section11_Footer />

        {/* Persistent Mobile Bottom Action Bar (<768px) */}
        <MobileBottomBar />
      </div>
    </ToastProvider>
  );
}
