import React, { useState, useEffect } from 'react';
import { SALON_DATA } from '../content';

export function MobileBottomBar() {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        setIsInputFocused(true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        setIsInputFocused(false);
      }
    };

    const handleMenuToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsMenuOpen(customEvent.detail?.isOpen ?? false);
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);
    window.addEventListener('mobile-menu-toggle', handleMenuToggle);

    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
      window.removeEventListener('mobile-menu-toggle', handleMenuToggle);
    };
  }, []);

  if (isInputFocused || isMenuOpen) return null;

  return (
    <div
      role="region"
      aria-label="Quick contact actions"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-none border-t border-[#e5e7eb] px-4 py-3 md:hidden flex items-center gap-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
    >
      {/* Primary: Call now */}
      <a
        href={SALON_DATA.phone.telLink}
        className="flex-1 min-h-[48px] bg-[#ebf213] text-[#131313] font-semibold text-sm rounded-[4px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform select-none"
      >
        <svg
          className="w-4 h-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span>Call now</span>
      </a>

      {/* Secondary: Book a session */}
      <a
        href="#book"
        className="flex-1 min-h-[48px] bg-transparent text-[#131313] border border-[#666666] font-semibold text-sm rounded-[4px] flex items-center justify-center gap-2 active:scale-[0.98] transition-colors hover:border-[#131313] select-none"
      >
        <svg
          className="w-4 h-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>Book a session</span>
      </a>
    </div>
  );
}
