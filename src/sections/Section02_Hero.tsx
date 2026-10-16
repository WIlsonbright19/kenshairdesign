import React, { useRef } from 'react';
import { SALON_DATA } from '../content';
import studioImage from '../assets/images/kens_studio_interior_1791964990906.jpg';
import { getSalonLiveStatus } from '../utils/hours';
import { Frame } from '../components/Frame';
import { Button } from '../components/Button';
import { SplitText } from '../components/SplitText';
import { Reveal } from '../components/Reveal';
import { useParallax } from '../hooks/useParallax';

export function Section02_Hero() {
  const status = getSalonLiveStatus();
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const parallaxOffset = useParallax(heroImageRef, 0.08, 30);

  return (
    <section
      id="hero"
      aria-label="Welcome to Ken's Hair Design"
      className="relative pt-24 md:pt-32 pb-16 md:pb-28 overflow-hidden border-b border-[#e5e7eb] min-h-[calc(100dvh-5rem)] flex items-center"
    >
      {/* Background Architectural Subtle Image Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045] bg-cover bg-center mix-blend-multiply"
        style={{
          backgroundImage: `url('${studioImage}')`,
        }}
        aria-hidden="true"
      />

      {/* Subtle Hairline Grid Pattern Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#131313_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-24 items-center">
          {/* MOBILE/TABLET CURVED LONG IMAGE FIRST (< lg) */}
          <div className="block lg:hidden w-full max-w-sm sm:max-w-md mx-auto">
            <div className="relative">
              {/* Bordered Curved Long Image Holder */}
              <Frame
                image={SALON_DATA.heroImage}
                borderDesign="curved-long-outline"
                offsetAmount={14}
                priority={true}
                aspectRatioClass="aspect-[3/4] max-h-[50dvh]"
              />

              {/* Rotating Studio Stamp Badge */}
              <div
                className="absolute -bottom-4 -left-3 z-20 w-24 h-24 rounded-full bg-[#131313] text-white flex items-center justify-center p-1 border border-white/20 select-none animate-slow-spin shadow-sm"
                aria-hidden="true"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="mobileCirclePathKen"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[10px] uppercase font-semibold tracking-[0.22em] fill-white">
                    <textPath href="#mobileCirclePathKen">
                      · KEN'S HAIR DESIGN · STOCKTON ST
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* LEFT COLUMN: High-contrast typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center">
            {/* Live Status Chip */}
            {status.statusText && (
              <Reveal delayMs={100} durationMs={600}>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#e5e7eb] text-xs font-medium text-[#131313] mb-6 select-none shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      status.isOpen
                        ? 'bg-[#ebf213] ring-2 ring-[#ebf213]/40 animate-pulse'
                        : 'bg-[#666666]'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="font-medium">{status.statusText}</span>
                  <span className="text-[#666666] font-mono text-[11px]">· SF Chinatown</span>
                </div>
              </Reveal>
            )}

            {/* Display Headline */}
            <SplitText
              text="Precision cuts,&#10;right on Stockton Street."
              tag="h1"
              className="text-display text-[#131313] mb-6 max-w-3xl xl:max-w-4xl"
              staggerMs={90}
            />

            {/* Supporting Copy */}
            <Reveal delayMs={240} durationMs={700}>
              <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl xl:max-w-3xl mb-8 font-normal">
                {SALON_DATA.heroDescription}
              </p>
            </Reveal>

            {/* Exactly two primary actions */}
            <Reveal delayMs={340} durationMs={700}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Button
                  href={SALON_DATA.phone.telLink}
                  variant="primary"
                  showArrow
                  className="sm:min-w-[210px]"
                >
                  Call to book
                </Button>

                <Button
                  href="#book"
                  variant="secondary"
                  className="sm:min-w-[170px]"
                >
                  Book a session
                </Button>
              </div>
            </Reveal>

            {/* Quick trust metrics */}
            <Reveal delayMs={440} durationMs={700}>
              <div className="mt-10 pt-6 border-t border-[#e5e7eb] flex items-center gap-6 text-xs text-[#666666]">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[#131313]">758 Stockton St</span>
                  <span>(at Sacramento)</span>
                </div>
                <span>·</span>
                <div>
                  <span className="font-semibold text-[#131313]">Shampoo Always Included</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* DESKTOP BORDERED CURVED LONG IMAGE HOLDER (5 cols) */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div
              ref={heroImageRef}
              className="relative transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(0, ${parallaxOffset}px, 0)`,
              }}
            >
              {/* Bordered Curved Long Image Holder */}
              <Frame
                image={SALON_DATA.heroImage}
                borderDesign="curved-long-outline"
                offsetAmount={22}
                priority={true}
                aspectRatioClass="aspect-[3/4] min-h-[66dvh]"
              />

              {/* Rotating Chinatown Studio circular badge */}
              <div
                className="absolute -bottom-6 -left-8 z-20 w-32 h-32 rounded-full bg-[#131313] text-white flex items-center justify-center p-2 border border-white/20 select-none animate-slow-spin shadow-lg"
                aria-hidden="true"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="desktopCirclePathKen"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[9.5px] uppercase font-semibold tracking-[0.23em] fill-white">
                    <textPath href="#desktopCirclePathKen">
                      · KEN'S HAIR DESIGN · 758 STOCKTON ST
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
