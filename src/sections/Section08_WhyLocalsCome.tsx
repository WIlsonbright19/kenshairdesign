import React, { useRef } from 'react';
import { SALON_DATA } from '../content';
import { useReveal } from '../hooks/useReveal';
import { Reveal } from '../components/Reveal';

export function Section08_WhyLocalsCome() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isRevealed = useReveal(containerRef, { threshold: 0.2 });

  return (
    <section
      id="standards"
      aria-label="Studio standards and service guarantees"
      className="relative bg-[#f8f8f8] py-20 md:py-28 border-b border-[#e5e7eb]"
    >
      <div ref={containerRef} className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2 block">
            Studio Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.04em] text-[#131313]">
            What to Expect Every Visit
          </h2>
        </div>

        {/* DESKTOP 4-ITEM HORIZONTAL BAND WITH VERTICAL 1PX LINES */}
        <div className="hidden lg:grid grid-cols-4 divide-x divide-[#e5e7eb] border-y border-[#e5e7eb] py-10 bg-white">
          {SALON_DATA.coreStandards.map((std, idx) => (
            <div key={std.id} className="px-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#666666] block mb-2">
                  0{idx + 1}
                </span>
                <span className="text-2xl font-normal tracking-[-0.04em] text-[#131313] leading-snug mb-3 block">
                  {std.title}
                </span>
              </div>
              <p className="text-sm text-[#555555] leading-relaxed">
                {std.detail}
              </p>
            </div>
          ))}
        </div>

        {/* TABLET 2x2 GRID (Visible md:grid lg:hidden) */}
        <div className="hidden md:grid lg:hidden grid-cols-2 divide-x divide-y divide-[#e5e7eb] border border-[#e5e7eb] bg-white">
          {SALON_DATA.coreStandards.map((std, idx) => (
            <div key={std.id} className="p-8">
              <span className="text-xs font-mono text-[#666666] block mb-2">0{idx + 1}</span>
              <span className="text-xl font-normal tracking-[-0.03em] text-[#131313] block mb-2">
                {std.title}
              </span>
              <p className="text-sm text-[#555555]">{std.detail}</p>
            </div>
          ))}
        </div>

        {/* MOBILE STACKED LIST (Visible sm/mobile <md) */}
        <div className="block md:hidden divide-y divide-[#e5e7eb] border-y border-[#e5e7eb] bg-white">
          {SALON_DATA.coreStandards.map((std, idx) => (
            <div key={std.id} className="py-6 px-4">
              <span className="text-xs font-mono text-[#666666] block mb-1">0{idx + 1}</span>
              <span className="text-xl font-normal tracking-[-0.03em] text-[#131313] block mb-1.5">
                {std.title}
              </span>
              <p className="text-sm text-[#555555]">{std.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
