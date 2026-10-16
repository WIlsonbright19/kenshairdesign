import React, { useState } from 'react';
import { SALON_DATA, ServiceItem } from '../content';
import { Frame } from '../components/Frame';
import { SplitText } from '../components/SplitText';
import { Reveal } from '../components/Reveal';
import { PriceList, PricingGenderView } from '../components/PriceList';
import { Button } from '../components/Button';

export function Section04_Services() {
  const [activeServiceId, setActiveServiceId] = useState<string>(SALON_DATA.services[0].id);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);
  const [pricingView, setPricingView] = useState<PricingGenderView>('mens');

  const activeService =
    SALON_DATA.services.find((s) => s.id === activeServiceId) ||
    SALON_DATA.services[0];

  const toggleMobileAccordion = (id: string) => {
    setExpandedMobileId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="services"
      aria-labelledby="services-headline"
      className="relative bg-white py-20 md:py-32 border-b border-[#e5e7eb]"
    >
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24">
          {/* LEFT STICKY COLUMN (4 cols desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2 block">
              What We Do
            </span>
            <SplitText
              text="Services & Pricing"
              tag="h2"
              className="text-section-headline text-[#131313] mb-4"
            />
            <p className="text-base text-[#666666] leading-relaxed max-w-md mb-6">
              Haircuts, shampoo washes, blowouts, and color right at 758 Stockton Street in Chinatown.
            </p>


            {/* Desktop Docked Image Preview with Clip-path Wipe */}
            <div className="hidden lg:block relative w-full aspect-[4/3] rounded-[4px] overflow-hidden border border-[#e5e7eb] bg-[#f8f8f8]">
              <div
                key={activeService.id}
                className="w-full h-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                <Frame
                  image={activeService.image}
                  className="w-full h-full"
                  aspectRatioClass="aspect-[4/3] h-full"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Numbered list (8 cols desktop) */}
          <div className="lg:col-span-8 flex flex-col">
            {SALON_DATA.services.map((service, index) => {
              const isHovered = activeServiceId === service.id;
              const isMobileExpanded = expandedMobileId === service.id;

              return (
                <div key={service.id} className="relative">
                  {/* Top hairline divider drawing across */}
                  <div
                    className="w-full h-[1px] bg-[#e5e7eb] origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    aria-hidden="true"
                  />

                  {/* DESKTOP ROW (Hidden on Mobile) */}
                  <div
                    tabIndex={0}
                    role="button"
                    aria-label={`${service.name}: ${service.description}`}
                    onMouseEnter={() => setActiveServiceId(service.id)}
                    onFocus={() => setActiveServiceId(service.id)}
                    className="hidden md:flex items-center justify-between py-8 cursor-pointer group transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-[#131313] focus-visible:outline-offset-2"
                  >
                    <div className="flex items-start gap-6 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4">
                      <span className="text-sm font-mono text-[#666666] pt-2">
                        {service.number}
                      </span>
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-normal tracking-[-0.05em] text-[#131313] group-hover:text-[#000000]">
                          {service.name}
                        </h3>
                        <p className="text-sm text-[#666666] mt-1 font-normal">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Arrow rotating on hover/focus */}
                    <div className="p-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-hover:-rotate-45">
                      <svg
                        className="w-6 h-6 text-[#131313]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* MOBILE ACCORDION (Visible on Mobile) */}
                  <div className="md:hidden py-5">
                    <button
                      type="button"
                      onClick={() => toggleMobileAccordion(service.id)}
                      aria-expanded={isMobileExpanded}
                      aria-controls={`service-desc-${service.id}`}
                      className="w-full flex items-center justify-between text-left py-2 focus-visible:outline-2 focus-visible:outline-[#131313]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[#666666]">
                          {service.number}
                        </span>
                        <span className="text-xl font-normal tracking-[-0.04em] text-[#131313]">
                          {service.name}
                        </span>
                      </div>
                      <div
                        className={`transition-transform duration-300 ${
                          isMobileExpanded ? 'rotate-90' : ''
                        }`}
                      >
                        <svg
                          className="w-5 h-5 text-[#131313]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>

                    {/* Mobile Expanded Content */}
                    {isMobileExpanded && (
                      <div
                        id={`service-desc-${service.id}`}
                        className="pt-4 pb-2 animate-in fade-in duration-200"
                      >
                        <p className="text-sm text-[#666666] mb-4">
                          {service.description}
                        </p>
                        <div className="w-full aspect-[4/3] rounded-[4px] overflow-hidden border border-[#e5e7eb]">
                          <Frame
                            image={service.image}
                            aspectRatioClass="aspect-[4/3] h-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Bottom terminating hairline divider */}
            <div className="w-full h-[1px] bg-[#e5e7eb]" aria-hidden="true" />
          </div>
        </div>

        {/* Clear, Structured Price List for Cuts, Blowouts, and Color with Men's/Women's Toggle */}
        <PriceList pricingView={pricingView} onViewChange={setPricingView} />

        {/* 'Book Now' anchor button directly below the price list linking to Section 9 */}
        <div className="mt-10 pt-8 border-t border-[#e5e7eb] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#666666] text-center sm:text-left">
            Ready to schedule with Ken or Debra? Walk-ins welcome, or request an appointment below.
          </p>
          <Button
            href="#book"
            variant="primary"
            showArrow
            className="w-full sm:w-auto sm:min-w-[200px]"
          >
            Book Now
          </Button>
        </div>
      </div>
    </section>
  );
}
