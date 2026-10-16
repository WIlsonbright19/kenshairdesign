import React, { useRef } from 'react';
import { SALON_DATA } from '../content';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Frame } from '../components/Frame';
import { Reveal } from '../components/Reveal';

export function Section05_WorkShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progress = useScrollProgress(containerRef);
  const prefersReduced = useReducedMotion();

  const stages = SALON_DATA.craftStages;

  // Determine active stage on desktop:
  // progress: 0 to 0.33 -> stage 0
  // 0.33 to 0.66 -> stage 1
  // 0.66 to 1.0 -> stage 2
  const activeIndex = Math.min(2, Math.floor(progress * 3));
  const currentStage = stages[activeIndex] || stages[0];

  return (
    <section
      id="craft"
      aria-labelledby="craft-headline"
      className="relative bg-white border-b border-[#e5e7eb] w-full"
    >
      {/* DESKTOP PINNED PRESENTATION (Hidden on mobile or if reduced motion is requested) */}
      {!prefersReduced ? (
        <div ref={containerRef} className="hidden md:block relative h-[300vh]">
          {/* Sticky Container with navbar offset so it never gets covered by top nav */}
          <div className="sticky top-20 h-[calc(100dvh-5rem)] w-full flex flex-col justify-center bg-white py-6">
            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
              {/* Section Header */}
              <div className="mb-6 lg:mb-8 border-b border-[#e5e7eb] pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1 block">
                  How We Work
                </span>
                <h2
                  id="craft-headline"
                  className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.04em] text-[#131313]"
                >
                  Process & Finish
                </h2>
              </div>

              {/* Main 2-Column Content */}
              <div className="grid grid-cols-12 gap-8 lg:gap-16 xl:gap-24 items-center">
                {/* Left Column: Stage title and details */}
                <div className="col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#666666] mb-3">
                    <span className="font-semibold text-[#131313] px-2 py-0.5 bg-[#f0f0f0] rounded">
                      Step {currentStage.step}
                    </span>
                    <span className="w-8 h-[1px] bg-[#e5e7eb]" aria-hidden="true" />
                    <span className="uppercase tracking-wider font-medium text-[#666666]">
                      Haircut Step
                    </span>
                  </div>

                  {/* Stage title - fully visible with responsive font and no overflow clipping */}
                  <div className="min-h-[90px] lg:min-h-[110px] flex flex-col justify-center mb-3">
                    <h3
                      key={currentStage.id}
                      className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-light text-[#131313] tracking-[-0.03em] leading-tight break-words animate-fade-in-up"
                    >
                      {currentStage.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#555555] font-normal leading-relaxed max-w-xl">
                    {currentStage.description}
                  </p>

                  {/* Segment indicator bar */}
                  <div className="flex items-center gap-2 mt-6">
                    {stages.map((stg, i) => (
                      <div
                        key={stg.id}
                        className={`h-[3px] rounded-full transition-all duration-300 ${
                          i === activeIndex
                            ? 'w-12 bg-[#131313]'
                            : 'w-4 bg-[#e5e7eb]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Column: Large image frame with DOUBLE BORDER */}
                <div className="col-span-7 relative">
                  <div className="relative w-full aspect-[4/3] lg:aspect-[4/5] max-h-[58vh] lg:max-h-[65vh] mx-auto">
                    {stages.map((stg, i) => {
                      const isVisible = i === activeIndex;
                      return (
                        <div
                          key={stg.id}
                          className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isVisible
                              ? 'opacity-100 z-10 pointer-events-auto'
                              : 'opacity-0 z-0 pointer-events-none'
                          }`}
                        >
                          <Frame
                            image={stg.image}
                            borderDesign="double-border"
                            aspectRatioClass="aspect-[4/3] lg:aspect-[4/5] h-full"
                            className="w-full h-full"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* MOBILE OR REDUCED-MOTION STATIC STACK */}
      <div className={`py-16 px-5 sm:px-8 md:px-12 ${!prefersReduced ? 'md:hidden' : 'block'} w-full`}>
        <div className="w-full">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2 block">
              How We Work
            </span>
            <h2 id="work-headline" className="text-3xl sm:text-4xl font-light tracking-[-0.04em] text-[#131313]">
              Process & Finish
            </h2>
            <p className="text-sm text-[#666666] mt-2">
              Three simple steps for every haircut
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {stages.map((stage) => (
              <Reveal key={stage.id} durationMs={700}>
                <div className="relative">
                  <Frame
                    image={stage.image}
                    borderDesign="corner-marks"
                    aspectRatioClass="aspect-[4/5] w-full"
                  />
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-b border-[#e5e7eb] pb-3 gap-2">
                    <div>
                      <span className="text-xs font-mono text-[#666666] block">
                        Step {stage.step}
                      </span>
                      <h3 className="text-2xl font-normal text-[#131313] tracking-[-0.04em]">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#555555] sm:max-w-[280px] sm:text-right">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
