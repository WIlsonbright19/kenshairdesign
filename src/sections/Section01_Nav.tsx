import React, { useState, useEffect, useRef } from 'react';
import { SALON_DATA } from '../content';
import { Button } from '../components/Button';

interface NavProps {
  activeSection: string;
}

export function Section01_Nav({ activeSection }: NavProps) {
  const [isScrolledPast80, setIsScrolledPast80] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // The 4 Most Important Salon Sections
  const navSections = [
    {
      id: 'studio',
      label: 'About Us',
      desktopLabel: 'About Us',
      href: '#studio',
      hint: 'Meet Ken & Debra and our story',
    },
    {
      id: 'services',
      label: 'Services & Prices',
      desktopLabel: 'Services & Prices',
      href: '#services',
      hint: 'Haircuts, wash, blowouts & color',
    },
    {
      id: 'gallery',
      label: 'Photo Gallery',
      desktopLabel: 'Photo Gallery',
      href: '#gallery',
      hint: 'Real haircuts from our shop chairs',
    },
    {
      id: 'chinatown',
      label: 'Location & Hours',
      desktopLabel: 'Location & Hours',
      href: '#chinatown',
      hint: '758 Stockton St map & schedule',
    },
  ];

  // Scroll detection: compact past 80px, hide on down, show on up
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setIsScrolledPast80(currentY > 80);

          if (currentY > 120 && currentY > lastScrollY.current + 6) {
            setIsHidden(true);
          } else if (currentY < lastScrollY.current - 6 || currentY <= 80) {
            setIsHidden(false);
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keep the drawer modal while open and constrain keyboard focus to its controls.
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('mobile-menu-toggle', { detail: { isOpen: isMobileMenuOpen } })
    );

    if (isMobileMenuOpen) {
      const previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
          requestAnimationFrame(() => menuButtonRef.current?.focus());
          return;
        }

        if (e.key === 'Tab' && mobileNavRef.current) {
          const focusableElements = mobileNavRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          const visibleElements = Array.from(focusableElements).filter(
            (element) => element.getClientRects().length > 0
          );
          const firstElement = visibleElements[0];
          const lastElement = visibleElements[visibleElements.length - 1];

          if (!firstElement || !lastElement) return;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      const handleResize = () => {
        if (window.matchMedia('(min-width: 1024px)').matches) {
          setIsMobileMenuOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('resize', handleResize);
        document.body.style.overflow = previousBodyOverflow;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const closeMenu = (restoreFocus = false) => {
    setIsMobileMenuOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isHidden && !isMobileMenuOpen ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolledPast80
            ? 'h-16 border-b border-[#e5e7eb] shadow-[0_1px_0_0_rgba(0,0,0,0.05)]'
            : 'h-20 border-b border-transparent'
        }`}
      >
        <div className="w-full h-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="text-lg md:text-xl font-semibold tracking-[-0.04em] text-[#131313] select-none focus-visible:outline-2 focus-visible:outline-[#131313] transition-transform hover:scale-[1.02]"
          >
            {SALON_DATA.name}
          </a>

          {/* Desktop Center Links: 4 Important Sections with Expand Hover Effect & Color */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-2 text-sm font-medium bg-[#f5f5f5] p-1.5 rounded-full border border-[#e5e7eb]"
          >
            {navSections.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#131313] select-none ${
                    isActive
                      ? 'bg-[#131313] text-white shadow-sm border border-[#131313]'
                      : 'text-[#4b5563] hover:text-[#131313] hover:bg-[#ebf213] hover:shadow-[0_4px_14px_rgba(235,242,19,0.5)] border border-transparent hover:border-[#131313]/25'
                  }`}
                >
                  {/* Expanding Accent Dot */}
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ease-out ${
                      isActive
                        ? 'bg-[#ebf213] scale-100'
                        : 'bg-[#131313] scale-0 group-hover:scale-100'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Expanding Text with subtle letter-spacing animation */}
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                    {link.desktopLabel}
                  </span>

                  {/* Expanding Bottom Accent Line */}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-[2px] rounded-full transition-all duration-300 ease-out origin-center ${
                      isActive
                        ? 'bg-[#ebf213] scale-x-100 opacity-100'
                        : 'bg-[#131313] scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop Call Action Right */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              href={SALON_DATA.phone.telLink}
              variant="primary"
              className="!min-w-[130px] !min-h-[44px] !px-4 text-sm transition-transform hover:scale-105"
              showArrow
            >
              Call Now
            </Button>
          </div>

          {/* Mobile AND Tablet Hamburger Toggle Button (lg:hidden) */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden p-2 text-[#131313] focus-visible:outline-2 focus-visible:outline-[#131313] rounded-[4px] hover:bg-[#f3f4f6]"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-[2px] bg-[#131313] origin-center transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
                }`}
              />
              <span
                className={`w-full h-[2px] bg-[#131313] transition-opacity duration-200 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-full h-[2px] bg-[#131313] origin-center transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile & Tablet Slide-in Drawer with Backdrop */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => closeMenu(true)}
        aria-hidden="true"
      />

      {/* Slide-In Drawer Panel */}
      <div
        id="mobile-navigation-drawer"
        ref={mobileNavRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-navigation-title"
        aria-hidden={!isMobileMenuOpen}
        inert={!isMobileMenuOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(88vw,22rem)] flex-col border-l border-[#e5e7eb] bg-white shadow-xl lg:hidden transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#e5e7eb] px-5">
          <h2 id="mobile-navigation-title" className="text-base font-semibold tracking-tight text-[#131313]">
            {SALON_DATA.name}
          </h2>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => closeMenu(true)}
            aria-label="Close navigation drawer"
            className="flex h-11 w-11 items-center justify-center rounded-[4px] text-[#131313] transition-colors hover:bg-[#f3f4f6] focus-visible:outline-2 focus-visible:outline-[#131313]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <nav aria-label="Mobile navigation" className="divide-y divide-[#e5e7eb]">
            {navSections.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => closeMenu()}
                  aria-current={isActive ? 'location' : undefined}
                  className="group -mx-2 flex min-h-[4.5rem] items-center justify-between gap-4 rounded-[4px] px-2 py-3 text-[#131313] transition-colors duration-200 hover:bg-[#ebf213] focus-visible:bg-[#ebf213] active:bg-[#ebf213] focus-visible:outline-2 focus-visible:outline-[#131313]"
                >
                  <span className="min-w-0">
                    <span className="block text-base font-medium transition-[transform,text-decoration-color] duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 group-hover:underline group-focus-visible:underline">
                      {link.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-[#666666] transition-colors duration-200 group-hover:text-[#131313] group-focus-visible:text-[#131313]">
                      {link.hint}
                    </span>
                  </span>
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      isActive ? 'bg-[#ebf213]' : 'bg-transparent'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4 border-t border-[#e5e7eb] pt-5">
            <p className="text-sm leading-relaxed text-[#555555]">
              {SALON_DATA.address.street}<br />
              San Francisco, CA {SALON_DATA.address.zip}
            </p>
            <a
              href={SALON_DATA.phone.telLink}
              onClick={() => closeMenu()}
              className="flex min-h-12 items-center justify-center rounded-[4px] border border-[#131313] bg-[#ebf213] px-4 text-sm font-semibold text-[#131313] transition-colors hover:bg-[#dfe700] focus-visible:outline-2 focus-visible:outline-[#131313]"
            >
              Call {SALON_DATA.phone.display}
            </a>
            <a
              href="#book"
              onClick={() => closeMenu()}
              className="flex min-h-11 items-center justify-center text-sm font-medium text-[#131313] underline decoration-[#b8bd00] underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#131313]"
            >
              Book a session
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
