import React from 'react';
import { SALON_DATA } from '../content';

export function Section03_Marquee() {
  const items = SALON_DATA.marqueeItems;
  // Repeat items so the horizontal marquee loops smoothly
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <section
      aria-label="Core services marquee"
      className="relative w-full bg-[#131313] text-white py-6 md:py-8 border-t border-b border-[#131313] overflow-hidden select-none"
    >
      <div className="flex animate-marquee items-center focus-visible:outline-none">
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center shrink-0">
            <span className="text-[clamp(1.75rem,1.2rem+2.8vw,3.5rem)] font-normal tracking-[-0.05em] text-white whitespace-nowrap px-6 md:px-8">
              {item}
            </span>
            <span
              className="text-[#ebf213] text-xl md:text-2xl font-bold select-none"
              aria-hidden="true"
            >
              *
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
