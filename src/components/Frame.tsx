import React, { useState, useRef } from 'react';
import { SalonImage } from '../content';
import { useReveal } from '../hooks/useReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';

export type BorderDesign =
  | 'none'
  | 'offset-outline'
  | 'double-border'
  | 'corner-marks'
  | 'arch-outline'
  | 'curved-long-outline';

interface FrameProps {
  image: SalonImage;
  borderDesign?: BorderDesign;
  className?: string;
  priority?: boolean;
  offsetAmount?: number; // 16 or 24px
  aspectRatioClass?: string; // e.g. "aspect-[3/4]"
  onClick?: () => void;
  innerScaleOnHover?: boolean;
}

export function Frame({
  image,
  borderDesign = 'none',
  className = '',
  priority = false,
  offsetAmount = 20,
  aspectRatioClass,
  onClick,
  innerScaleOnHover = false,
}: FrameProps) {
  const [imageError, setImageError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isRevealed = useReveal(containerRef, { threshold: 0.15 });
  const prefersReduced = useReducedMotion();

  const { frame, src, alt, label, aspectRatio } = image;

  // Frame shape classes
  const getFrameClass = () => {
    switch (frame) {
      case 'curved-long':
        return 'frame-curved-long';
      case 'arch':
        return 'frame-arch';
      case 'big-corner':
        return 'frame-big-corner';
      case 'pill':
        return 'frame-pill';
      case 'leaf':
        return 'frame-leaf';
      case 'circle-crop':
        return 'frame-circle-crop';
      case 'rect':
      default:
        return 'frame-rect';
    }
  };

  const getAspectClass = () => {
    if (aspectRatioClass) return aspectRatioClass;
    if (aspectRatio === '3:4') return 'aspect-[3/4]';
    if (aspectRatio === '4:5') return 'aspect-[4/5]';
    if (aspectRatio === '1:1') return 'aspect-[1/1]';
    if (aspectRatio === '16:10') return 'aspect-[16/10]';
    if (aspectRatio === '21:9') return 'aspect-[21/9]';
    if (aspectRatio === '4:3') return 'aspect-[4/3]';
    return 'aspect-[3/4]';
  };

  const frameClass = getFrameClass();
  const aspectClass = getAspectClass();
  const showPlaceholder = !src || imageError;

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {/* 1. OFFSET OUTLINE (1px #131313 copy, offset 16-24px down-right) */}
      {borderDesign === 'offset-outline' && (
        <div
          className={`absolute pointer-events-none border border-[#131313] ${frameClass} ${aspectClass} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isRevealed || prefersReduced
              ? 'opacity-100'
              : 'opacity-0 scale-95'
          }`}
          style={{
            top: `${offsetAmount}px`,
            left: `${offsetAmount}px`,
            right: `-${offsetAmount}px`,
            bottom: `-${offsetAmount}px`,
            zIndex: 0,
          }}
          aria-hidden="true"
        />
      )}

      {/* 2. ARCH OUTLINE (thin concentric arch outline 12px outside) */}
      {borderDesign === 'arch-outline' && (
        <div
          className={`absolute pointer-events-none border border-[#131313] frame-arch transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isRevealed || prefersReduced ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            top: '-12px',
            left: '-12px',
            right: '-12px',
            bottom: '-12px',
            zIndex: 0,
          }}
          aria-hidden="true"
        />
      )}

      {/* 2b. CURVED LONG OUTLINE (continuous curved outline offset behind image) */}
      {borderDesign === 'curved-long-outline' && (
        <div
          className={`absolute pointer-events-none border border-[#131313] frame-curved-long ${aspectClass} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isRevealed || prefersReduced ? 'opacity-100' : 'opacity-0 scale-95'
          }`}
          style={{
            top: `${offsetAmount}px`,
            left: `${offsetAmount}px`,
            right: `-${offsetAmount}px`,
            bottom: `-${offsetAmount}px`,
            zIndex: 0,
          }}
          aria-hidden="true"
        />
      )}

      {/* 3. CORNER MARKS (small L-shaped 1px corner brackets at image corners) */}
      {borderDesign === 'corner-marks' && (
        <div className="absolute -inset-3 pointer-events-none z-20" aria-hidden="true">
          {/* Top-left */}
          <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-[#131313]" />
          {/* Top-right */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-[#131313]" />
          {/* Bottom-left */}
          <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-[#131313]" />
          {/* Bottom-right */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-[#131313]" />
        </div>
      )}

      {/* 4. DOUBLE BORDER CONTAINER (outer border, 8px white gap) */}
      <div
        className={`relative z-10 w-full ${
          borderDesign === 'double-border'
            ? `p-2 bg-white border border-[#131313] ${frameClass}`
            : ''
        }`}
      >
        {/* Main image container */}
        <div
          className={`relative w-full overflow-hidden bg-[#f4f4f4] border border-[#e5e7eb] ${frameClass} ${aspectClass} transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
        >
          {showPlaceholder ? (
            /* Tonal placeholder with editorial aesthetics */
            <div
              className={`w-full h-full flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${
                isRevealed || prefersReduced ? 'opacity-100' : 'opacity-80'
              }`}
              style={{
                background:
                  'linear-gradient(145deg, #f8f8f8 0%, #ebebeb 100%)',
              }}
            >
              {/* Minimal camera aperture icon in hairline border */}
              <div
                className="w-10 h-10 rounded-full border border-[#131313]/20 flex items-center justify-center mb-3 bg-white/70"
                aria-hidden="true"
              >
                <svg
                  className="w-4 h-4 text-[#131313]/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#131313]/70 mb-1 max-w-[200px]">
                {label}
              </span>
              <span className="text-[11px] text-[#666666] font-normal">
                Marina Hair Salon · Scott St
              </span>
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                innerScaleOnHover ? 'group-hover:scale-105' : ''
              }`}
            />
          )}

          {/* Wipe reveal overlay */}
          {!prefersReduced && (
            <div
              className={`absolute inset-0 bg-white pointer-events-none transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isRevealed ? '-translate-y-full' : 'translate-y-0'
              }`}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </div>
  );
}
