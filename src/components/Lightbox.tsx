import React, { useEffect, useRef } from 'react';
import { GalleryItemData } from '../content';
import { Frame } from './Frame';

interface LightboxProps {
  items: GalleryItemData[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Focus close button or container
      setTimeout(() => {
        const closeBtn = dialogRef.current?.querySelector<HTMLButtonElement>('[data-close-btn]');
        closeBtn?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (currentIndex !== null && currentIndex > 0) {
            onNavigate(currentIndex - 1);
          } else if (currentIndex === 0) {
            onNavigate(items.length - 1);
          }
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          if (currentIndex !== null && currentIndex < items.length - 1) {
            onNavigate(currentIndex + 1);
          } else if (currentIndex === items.length - 1) {
            onNavigate(0);
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        previouslyFocusedElementRef.current?.focus();
      };
    }
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !currentItem) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (diff > 50) {
      // swipe right -> previous
      if (currentIndex > 0) onNavigate(currentIndex - 1);
      else onNavigate(items.length - 1);
    } else if (diff < -50) {
      // swipe left -> next
      if (currentIndex < items.length - 1) onNavigate(currentIndex + 1);
      else onNavigate(0);
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#131313]/90 backdrop-blur-none p-4 md:p-8 animate-in fade-in duration-200"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top action bar: counter + close */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-30">
        <span className="text-sm font-semibold tracking-wider font-mono">
          {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button
          data-close-btn
          type="button"
          onClick={onClose}
          aria-label="Close preview (Esc)"
          className="p-2 border border-white/30 text-white hover:bg-white hover:text-[#131313] transition-colors rounded-[4px] focus-visible:outline-2 focus-visible:outline-white"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Prev button */}
      <button
        type="button"
        aria-label="Previous image"
        onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 text-white border border-white/20 hover:border-white hover:bg-white hover:text-[#131313] rounded-[4px] transition-all hidden sm:flex items-center justify-center"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Main image presentation */}
      <div className="relative max-w-3xl w-full max-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-full max-w-lg aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4]">
          <Frame
            image={currentItem.image}
            borderDesign="double-border"
            className="w-full h-full"
            aspectRatioClass="aspect-auto h-full"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center text-white/90">
          <p className="text-base font-medium">{currentItem.caption}</p>
          <p className="text-xs text-white/60 mt-1">{currentItem.image.label}</p>
        </div>
      </div>

      {/* Next button */}
      <button
        type="button"
        aria-label="Next image"
        onClick={() => onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 text-white border border-white/20 hover:border-white hover:bg-white hover:text-[#131313] rounded-[4px] transition-all hidden sm:flex items-center justify-center"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
