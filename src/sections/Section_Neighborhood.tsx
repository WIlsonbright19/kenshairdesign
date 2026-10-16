import React from 'react';
import { SALON_DATA } from '../content';
import chinatownImage from '../assets/images/kens_chinatown_stockton_1791964991298.jpg';
import { Frame } from '../components/Frame';
import { SplitText } from '../components/SplitText';
import { Reveal } from '../components/Reveal';

export function Section_Neighborhood() {
  return (
    <section
      id="chinatown"
      aria-labelledby="chinatown-headline"
      className="relative py-20 md:py-32 border-b border-[#e5e7eb] overflow-hidden"
    >
      {/* Background Architectural Image with No Color Overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-cover bg-center"
        style={{
          backgroundImage: `url('${chinatownImage}')`,
        }}
        aria-hidden="true"
      />

      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Context & 3 Anchors in frosted card for readability */}
          <div className="lg:col-span-6 flex flex-col justify-center bg-white/95 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-[4px] border border-[#131313] shadow-lg">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2 block">
              Neighborhood & Location
            </span>
            <SplitText
              text="Stockton Street & Chinatown"
              tag="h2"
              className="text-section-headline text-[#131313] mb-3"
            />
            <p className="text-lg font-normal text-[#131313] mb-4">
              At home at 758 Stockton Street, between Sacramento and Clay.
            </p>
            <p className="text-base text-[#555555] leading-relaxed mb-8 font-normal max-w-2xl">
              Ken’s Hair Design is right in Chinatown on Stockton Street, easy to reach from Nob Hill, Union Square, and the Financial District.
            </p>

            {/* 3 Neighborhood Anchors */}
            <div className="space-y-6 border-t border-[#e5e7eb] pt-6 mb-8">
              <Reveal delayMs={100} durationMs={600}>
                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-[#666666] pt-1 shrink-0">
                    01
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-[#131313]">
                      Easy to Get To
                    </h4>
                    <p className="text-sm text-[#666666] mt-0.5">
                      Right on Stockton Street, steps from the Chinatown Central Subway station and the 1-California bus stop.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={200} durationMs={600}>
                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-[#666666] pt-1 shrink-0">
                    02
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-[#131313]">
                      Quiet & Friendly Shop
                    </h4>
                    <p className="text-sm text-[#666666] mt-0.5">
                      A calm, relaxing place to get your hair cut, right near local neighborhood bakeries and markets.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={300} durationMs={600}>
                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-[#666666] pt-1 shrink-0">
                    03
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-[#131313]">
                      Parking Nearby
                    </h4>
                    <p className="text-sm text-[#666666] mt-0.5">
                      Public parking is just a 4-minute walk away at the St. Mary’s Square and Portsmouth Square garages.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div>
              <a
                href={SALON_DATA.links.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#131313] underline underline-offset-4 hover:text-black inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#131313]"
              >
                <span>Open 758 Stockton St on Google Maps</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Stylized Desaturated Google Maps Snippet & Studio Photo */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Stylized, Desaturated Map Frame */}
            <div className="relative w-full rounded-[4px] overflow-hidden border border-[#131313] bg-[#f0f0f0] shadow-sm">
              {/* Map Header Bar */}
              <div className="bg-[#131313] text-white px-4 py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ebf213] animate-pulse" aria-hidden="true" />
                  <span className="font-semibold tracking-wide uppercase text-[11px]">Pinpoint: 758 Stockton St</span>
                </div>
                <span className="text-white/70 font-mono text-[10px]">SF Chinatown · 94108</span>
              </div>

              {/* Map Iframe in Full Color */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#e5e5e5]">
                <iframe
                  title="Google Maps Location of Ken's Hair Design at 758 Stockton St, San Francisco"
                  src="https://maps.google.com/maps?q=758+Stockton+St,+San+Francisco,+CA+94108&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 transition-all duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Map showing 758 Stockton St"
                />

                {/* Stylized Pinpoint Badge Overlay */}
                <div className="absolute top-4 left-4 pointer-events-none bg-white/95 backdrop-blur-sm border border-[#131313] px-3 py-1.5 rounded-[2px] shadow-sm">
                  <p className="text-xs font-bold text-[#131313]">Ken's Hair Design</p>
                  <p className="text-[11px] text-[#666666]">758 Stockton St (at Sacramento)</p>
                </div>
              </div>

              {/* Map Footer Bar with Direct Action */}
              <div className="bg-[#fafafa] border-t border-[#e5e7eb] px-4 py-2.5 flex items-center justify-between text-xs text-[#555555]">
                <span>Near St. Mary's Square & Chinatown Gateway</span>
                <a
                  href="#book"
                  className="font-semibold text-[#131313] hover:underline"
                >
                  Book a session ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
