import React from 'react';
import { SALON_DATA } from '../content';
import studioImage from '../assets/images/kens_studio_interior_1791964990906.jpg';
import { Frame } from '../components/Frame';
import { SplitText } from '../components/SplitText';
import { Reveal } from '../components/Reveal';

export function Section04_Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-headline"
      className="relative bg-white py-20 md:py-32 border-b border-[#e5e7eb] overflow-hidden"
    >
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left Column: Architectural Photo with Big-Corner Frame */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <Frame
                image={{
                  src: studioImage,
                  alt: 'Clean salon stations at Ken’s Hair Design',
                  frame: 'big-corner',
                  label: 'Photo: 758 Stockton St Studio',
                  aspectRatio: '4:5',
                }}
                borderDesign="double-border"
                aspectRatioClass="aspect-[4/5]"
                className="w-full"
              />
            </div>
          </div>

          {/* Right Column: High-Contrast Minimalist Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-3 block">
              Our Promise
            </span>

            <SplitText
              text="Honest haircuts.&#10;Real attention."
              tag="h2"
              className="text-section-headline text-[#131313] mb-6"
              staggerMs={80}
            />

            <div className="space-y-4 text-base sm:text-lg text-[#555555] leading-relaxed max-w-3xl xl:max-w-4xl font-normal">
              <p>
                At Ken’s Hair Design on Stockton Street, we take our time and never rush your haircut. We believe a great haircut starts by listening to what you want.
              </p>
              <p>
                Whether you want a classic trim, clean fade, or layered style, Ken cuts your hair with care so it looks great today and stays easy to style at home.
              </p>
            </div>

            {/* 3 Core Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-8 mt-6 border-t border-[#e5e7eb]">
              <div>
                <span className="block text-2xl font-light font-mono text-[#131313]">01</span>
                <span className="text-xs uppercase tracking-wider text-[#666666] font-semibold mt-1 block">
                  Careful Cuts
                </span>
                <p className="text-xs text-[#777777] mt-1">Shaped to fit your hair</p>
              </div>

              <div>
                <span className="block text-2xl font-light font-mono text-[#131313]">02</span>
                <span className="text-xs uppercase tracking-wider text-[#666666] font-semibold mt-1 block">
                  Wash Included
                </span>
                <p className="text-xs text-[#777777] mt-1">Free shampoo & condition</p>
              </div>

              <div>
                <span className="block text-2xl font-light font-mono text-[#131313]">03</span>
                <span className="text-xs uppercase tracking-wider text-[#666666] font-semibold mt-1 block">
                  Fair Prices
                </span>
                <p className="text-xs text-[#777777] mt-1">Simple neighborhood rates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
