import React from 'react';
import { SALON_DATA } from '../content';
import { SplitText } from '../components/SplitText';
import { Reveal } from '../components/Reveal';

export function Section_Experience() {
  const steps = SALON_DATA.experienceSteps;

  return (
    <section
      id="experience"
      aria-labelledby="experience-headline"
      className="relative bg-white py-20 md:py-32 border-b border-[#e5e7eb] overflow-hidden"
    >
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2 block">
            Our Approach
          </span>
          <SplitText
            text="The Chair Experience"
            tag="h2"
            className="text-section-headline text-[#131313] mb-4"
          />
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed font-normal">
            Every appointment is focused on wearable shapes that flatter your natural texture and fit into your daily life.
          </p>
        </div>

        {/* 3-Step Stepping Progression (No cards, hairline connected layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
          {steps.map((item, idx) => (
            <Reveal key={item.step} delayMs={idx * 120} durationMs={700}>
              <div className="flex flex-col relative pt-6 border-t border-[#131313]">
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-mono text-[#131313] font-light">
                    {item.step}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#666666] font-semibold">
                    {item.summary}
                  </span>
                </div>

                <h3 className="text-2xl font-normal tracking-[-0.04em] text-[#131313] mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-[#666666] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
