import React, { useState } from 'react';
import { SALON_DATA } from '../content';
import { SplitText } from '../components/SplitText';

export function Section_FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = SALON_DATA.faqs;

  const toggleAccordion = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-headline"
      className="relative bg-[#f8f8f8] py-20 md:py-32 border-b border-[#e5e7eb]"
    >
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24">
          {/* Left Column: Sticky headline & quick call action */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2 block">
              Common Questions
            </span>
            <SplitText
              text="Good to Know"
              tag="h2"
              className="text-section-headline text-[#131313] mb-4"
            />
            <p className="text-base text-[#666666] leading-relaxed max-w-md mb-8 font-normal">
              Quick answers about walk-ins, payments, and haircuts at 758 Stockton Street.
            </p>

            <div className="p-6 bg-white border border-[#e5e7eb] rounded-[4px] max-w-md shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#131313] mb-1">
                Have another question?
              </p>
              <p className="text-xs text-[#666666] mb-4">
                Call Ken or Debra anytime to check if there is a wait or to book a visit.
              </p>
              <a
                href={SALON_DATA.phone.telLink}
                className="text-sm font-semibold text-[#131313] hover:text-black underline underline-offset-4 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#131313]"
              >
                <span>Call Now</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: 5 Accordion Questions */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-[#e5e7eb] border-y border-[#e5e7eb]">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const contentId = `faq-answer-${idx}`;
              const triggerId = `faq-trigger-${idx}`;

              return (
                <div key={idx} className="py-6 transition-colors">
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between text-left focus-visible:outline-2 focus-visible:outline-[#131313] py-1 select-none"
                  >
                    <span className="text-lg sm:text-xl font-normal tracking-[-0.03em] text-[#131313] pr-6">
                      {faq.question}
                    </span>
                    <span
                      className={`p-1 text-[#131313] transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                      aria-hidden="true"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={contentId}
                      role="region"
                      aria-labelledby={triggerId}
                      className="pt-4 pr-6 animate-in fade-in duration-200"
                    >
                      <p className="text-sm sm:text-base text-[#666666] leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
