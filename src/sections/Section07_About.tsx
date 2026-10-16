import React, { useState } from 'react';
import { SALON_DATA } from '../content';
import { Frame } from '../components/Frame';
import { Button } from '../components/Button';
import { SplitText } from '../components/SplitText';
import { Reveal } from '../components/Reveal';
import { copyToClipboard } from '../utils/clipboard';
import { useToast } from '../components/Toast';

export function Section07_About() {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = () => {
    copyToClipboard(
      SALON_DATA.phone.display,
      () => {
        setCopied(true);
        showToast('Phone number copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        showToast('Could not copy number');
      }
    );
  };

  return (
    <section
      id="studio"
      aria-labelledby="studio-headline"
      className="relative bg-white py-20 md:py-32 border-b border-[#e5e7eb] overflow-hidden"
    >
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* MOBILE HEADLINE FIRST (Hidden on lg:block) */}
          <div className="block lg:hidden">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2 block">
              Meet The Stylists
            </span>
            <h2 className="text-section-headline text-[#131313] mb-4">
              Ken & Debra at the Chair
            </h2>
          </div>

          {/* LEFT: Large tall pill-frame + overlapping leaf-frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Primary tall pill-frame portrait */}
              <div className="w-4/5">
                <Frame
                  image={SALON_DATA.studioTeamImages.ken}
                  borderDesign="double-border"
                  aspectRatioClass="aspect-[3/4]"
                  className="w-full"
                />
              </div>

              {/* Secondary smaller leaf-frame overlapping lower-right corner */}
              <div
                className="absolute -bottom-6 right-2 sm:right-6 w-1/2 max-w-[220px] z-20"
                aria-hidden="true"
              >
                <Frame
                  image={SALON_DATA.studioTeamImages.interior}
                  borderDesign="none"
                  aspectRatioClass="aspect-square"
                  className="w-full shadow-none"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start pt-6 lg:pt-0">
            {/* Desktop Headline */}
            <div className="hidden lg:block">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2 block">
                Meet The Stylists
              </span>
              <SplitText
                text="Ken & Debra at the Chair."
                tag="h2"
                className="text-section-headline text-[#131313] mb-6"
              />
            </div>

            <Reveal delayMs={150} durationMs={700}>
              <div className="space-y-4 text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl xl:max-w-3xl mb-8 font-normal">
                <p>
                  Ken has decades of haircutting experience. He takes his time, listens to what you want, and gives you a clean cut that fits your hair.
                </p>
                <p>
                  Debra takes care of hair color, root touch-ups, and fresh blowouts so you leave looking and feeling your best.
                </p>
                <p>
                  Together, we run a welcoming neighborhood salon right on Stockton Street where everyone gets personal, friendly care.
                </p>
              </div>
            </Reveal>

            {/* Actions: Link "Call us" and Copy number button */}
            <Reveal delayMs={280} durationMs={700}>
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <Button
                  href={SALON_DATA.phone.telLink}
                  variant="link"
                  showArrow
                >
                  Call us directly
                </Button>

                <button
                  type="button"
                  onClick={handleCopyNumber}
                  aria-label="Copy salon phone number to clipboard"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#131313] border border-[#666666] px-4 py-2.5 rounded-[4px] hover:border-[#131313] transition-colors focus-visible:outline-2 focus-visible:outline-[#131313]"
                >
                  <svg
                    className="w-4 h-4 text-[#131313]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                    />
                  </svg>
                  <span>{copied ? 'Copied' : 'Copy phone number'}</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
