import React, { useState } from 'react';
import { SALON_DATA } from '../content';
import { Frame } from '../components/Frame';
import { Lightbox } from '../components/Lightbox';
import { SplitText } from '../components/SplitText';
import { Reveal } from '../components/Reveal';

export function Section06_Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileActiveDot, setMobileActiveDot] = useState<number>(0);

  const items = SALON_DATA.galleryItems;

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const scrollLeft = el.scrollLeft;
    const itemWidth = el.offsetWidth * 0.78;
    const index = Math.round(scrollLeft / itemWidth);
    setMobileActiveDot(Math.min(items.length - 1, Math.max(0, index)));
  };

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-headline"
      className="relative bg-[#f8f8f8] py-20 md:py-32 border-b border-[#e5e7eb] overflow-hidden"
    >
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2 block">
            Selected Work
          </span>
          <SplitText
            text="In the Chair"
            tag="h2"
            className="text-section-headline text-[#131313]"
          />
        </div>
        <p className="text-sm text-[#666666] max-w-md font-normal">
          Everyday styling, sharp scissor cuts, and dimensional color crafted right at 758 Stockton Street.
        </p>
      </div>

      {/* DESKTOP 12-COLUMN ASYMMETRIC COLLAGE (Hidden on mobile/tablet) */}
      <div className="hidden lg:block w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Item 1: Bordered Curved Long frame, 5 cols, curved-long-outline */}
          <div className="col-span-5 pt-8">
            <div
              className="group cursor-pointer relative"
              onClick={() => setLightboxIndex(0)}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(0)}
              tabIndex={0}
              role="button"
              aria-label={`View ${items[0].caption}`}
            >
              <Frame
                image={items[0].image}
                borderDesign="curved-long-outline"
                offsetAmount={18}
                aspectRatioClass="aspect-[3/4]"
                innerScaleOnHover
              />
              <div className="mt-6 flex items-center justify-between text-[13px] text-[#666666]">
                <span>{items[0].caption}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-[#131313]">
                  View ↗
                </span>
              </div>
            </div>
          </div>

          {/* Item 2 & 3 Column: 4 cols */}
          <div className="col-span-4 flex flex-col gap-12">
            {/* Item 2: Big-corner */}
            <div
              className="group cursor-pointer relative"
              onClick={() => setLightboxIndex(1)}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(1)}
              tabIndex={0}
              role="button"
              aria-label={`View ${items[1].caption}`}
            >
              <Frame
                image={items[1].image}
                aspectRatioClass="aspect-[1/1]"
                innerScaleOnHover
              />
              <div className="mt-3 flex items-center justify-between text-[13px] text-[#666666]">
                <span>{items[1].caption}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-[#131313]">
                  View ↗
                </span>
              </div>
            </div>

            {/* Item 4: Rect frame */}
            <div
              className="group cursor-pointer relative pt-4"
              onClick={() => setLightboxIndex(3)}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(3)}
              tabIndex={0}
              role="button"
              aria-label={`View ${items[3].caption}`}
            >
              <Frame
                image={items[3].image}
                aspectRatioClass="aspect-[4/5]"
                innerScaleOnHover
              />
              <div className="mt-3 flex items-center justify-between text-[13px] text-[#666666]">
                <span>{items[3].caption}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-[#131313]">
                  View ↗
                </span>
              </div>
            </div>
          </div>

          {/* Item 3, 5, 6 Column: 3 cols (deliberate offset and bleed) */}
          <div className="col-span-3 flex flex-col gap-10 -mt-6">
            {/* Item 3: Pill frame */}
            <div
              className="group cursor-pointer relative"
              onClick={() => setLightboxIndex(2)}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(2)}
              tabIndex={0}
              role="button"
              aria-label={`View ${items[2].caption}`}
            >
              <Frame
                image={items[2].image}
                aspectRatioClass="aspect-[3/4]"
                innerScaleOnHover
              />
              <div className="mt-3 flex items-center justify-between text-[13px] text-[#666666]">
                <span>{items[2].caption}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-[#131313]">
                  View ↗
                </span>
              </div>
            </div>

            {/* Item 5: Leaf frame with offset outline */}
            <div
              className="group cursor-pointer relative"
              onClick={() => setLightboxIndex(4)}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(4)}
              tabIndex={0}
              role="button"
              aria-label={`View ${items[4].caption}`}
            >
              <Frame
                image={items[4].image}
                borderDesign="offset-outline"
                offsetAmount={14}
                aspectRatioClass="aspect-[1/1]"
                innerScaleOnHover
              />
              <div className="mt-5 flex items-center justify-between text-[13px] text-[#666666]">
                <span>{items[4].caption}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-[#131313]">
                  View ↗
                </span>
              </div>
            </div>

            {/* Item 6: Circle-crop frame */}
            <div
              className="group cursor-pointer relative w-44 mx-auto"
              onClick={() => setLightboxIndex(5)}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(5)}
              tabIndex={0}
              role="button"
              aria-label={`View ${items[5].caption}`}
            >
              <Frame
                image={items[5].image}
                aspectRatioClass="aspect-square"
                innerScaleOnHover
              />
              <div className="mt-2 text-center text-[13px] text-[#666666]">
                <span>{items[5].caption}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLET 2-COLUMN STAGGERED MASONRY (Visible only md:block lg:hidden) */}
      <div className="hidden md:block lg:hidden w-full px-6 sm:px-10">
        <div className="grid grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`group cursor-pointer ${idx % 2 === 1 ? 'pt-10' : ''}`}
              onClick={() => setLightboxIndex(idx)}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(idx)}
              tabIndex={0}
              role="button"
              aria-label={`View ${item.caption}`}
            >
              <Frame
                image={item.image}
                borderDesign={item.offsetOutline ? 'offset-outline' : 'none'}
                aspectRatioClass="aspect-[4/5]"
                innerScaleOnHover
              />
              <div className="mt-3 flex items-center justify-between text-[13px] text-[#666666]">
                <span>{item.caption}</span>
                <span className="font-semibold text-[#131313]">View ↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE HORIZONTAL SCROLL-SNAP STRIP (Visible only sm/mobile <md) */}
      <div className="block md:hidden">
        <div
          onScroll={handleMobileScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-6 scrollbar-none"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="w-[78vw] shrink-0 snap-center"
              onClick={() => setLightboxIndex(idx)}
              tabIndex={0}
              role="button"
              aria-label={`View ${item.caption}`}
            >
              <Frame
                image={item.image}
                borderDesign={item.offsetOutline ? 'offset-outline' : 'none'}
                offsetAmount={12}
                aspectRatioClass="aspect-[4/5]"
              />
              <div className="mt-3 text-[13px] text-[#666666]">
                <p className="font-medium text-[#131313]">{item.caption}</p>
                <p className="text-[11px] text-[#666666]">{item.image.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Dot Progress Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-4" aria-hidden="true">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                mobileActiveDot === i ? 'w-6 bg-[#131313]' : 'w-1.5 bg-[#e5e7eb]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <Lightbox
        items={items}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </section>
  );
}
