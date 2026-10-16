import React from 'react';
import { ArrowUp, Phone, MapPin, Clock, Calendar } from 'lucide-react';
import { SALON_DATA } from '../content';

export function Section11_Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About Us', href: '#studio' },
    { label: 'Services & Prices', href: '#services' },
    { label: 'Photo Gallery', href: '#gallery' },
    { label: 'Location & Hours', href: '#chinatown' },
  ];

  return (
    <footer
      aria-label="Site footer"
      className="relative bg-[#111111] text-white pt-12 pb-8 border-t border-white/10"
    >
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Main Minimalist Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          {/* Brand & Address */}
          <div>
            <h2 className="text-xl sm:text-2xl font-light tracking-[-0.03em] text-white">
              Ken's Hair Design
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              758 Stockton St, San Francisco, CA 94108 · Chinatown
            </p>
          </div>

          {/* 4 Core Nav Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-white/70">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#ebf213] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="self-start md:self-auto inline-flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors">
              <ArrowUp className="w-3.5 h-3.5 text-white" />
            </div>
          </button>
        </div>

        {/* Quick Info Strip */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60 border-b border-white/5">
          <div className="flex flex-wrap items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#ebf213]" />
              <span>Wed–Mon: 10:30 AM – 7:00 PM (Tue Closed)</span>
            </span>

            <a
              href={SALON_DATA.phone.telLink}
              className="inline-flex items-center gap-1.5 hover:text-[#ebf213] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#ebf213]" />
              <span>Call Us</span>
            </a>

            <a
              href="#book"
              className="inline-flex items-center gap-1.5 hover:text-[#ebf213] transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-[#ebf213]" />
              <span>Book a session</span>
            </a>
          </div>

          <span className="text-[11px] text-white/40">
            Cash & Venmo Accepted · Walk-ins Welcome
          </span>
        </div>

        {/* Minimal Copyright Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} Ken’s Hair Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
