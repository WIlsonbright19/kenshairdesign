import React from 'react';
import { SALON_DATA } from '../content';
import { getSalonLiveStatus } from '../utils/hours';
import { Frame } from '../components/Frame';
import { Button } from '../components/Button';
import { SplitText } from '../components/SplitText';
import { Reveal } from '../components/Reveal';

export function Section10_Visit() {
  const { currentDayIndex } = getSalonLiveStatus();

  return (
    <section
      id="visit"
      aria-labelledby="visit-headline"
      className="relative bg-white py-20 md:py-32 border-b border-[#e5e7eb] overflow-hidden"
    >
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* LEFT: Large framed storefront placeholder with BIG-CORNER, CORNER MARKS, and OFFSET OUTLINE */}
          <div className="lg:col-span-6">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              <Frame
                image={SALON_DATA.visitImage}
                borderDesign="offset-outline"
                offsetAmount={20}
                aspectRatioClass="aspect-[16/10]"
                className="w-full"
              />
            </div>
          </div>

          {/* RIGHT: Address, Hours Table, and Directions/Call Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2 block">
              Location & Hours
            </span>
            <SplitText
              text="Visit the Salon"
              tag="h2"
              className="text-section-headline text-[#131313] mb-4"
            />

            {/* Address in large clear type */}
            <div className="mb-8">
              <p className="text-xl sm:text-2xl font-normal text-[#131313] tracking-[-0.03em]">
                {SALON_DATA.address.street}
              </p>
              <p className="text-base text-[#666666] mt-0.5">
                {SALON_DATA.address.neighborhood} · {SALON_DATA.address.city},{' '}
                {SALON_DATA.address.state} {SALON_DATA.address.zip}
              </p>
            </div>

            {/* Hours Table: Rows 48px tall, today's row highlighted */}
            <div className="w-full border-t border-[#e5e7eb] mb-8">
              <table className="w-full text-sm text-left">
                <caption className="sr-only">Weekly Salon Hours</caption>
                <tbody>
                  {SALON_DATA.schedule.map((day) => {
                    const isToday = day.dayIndex === currentDayIndex;
                    return (
                      <tr
                        key={day.dayName}
                        className={`h-12 border-b border-[#e5e7eb] transition-colors ${
                          isToday ? 'bg-[#fcfdf0]' : 'hover:bg-[#f8f8f8]'
                        }`}
                      >
                        <td className="py-2.5 pr-4">
                          <div className="flex items-center gap-2">
                            {isToday ? (
                              <span
                                className="w-2 h-2 rounded-full bg-[#ebf213] border border-[#131313]"
                                aria-label="Today"
                              />
                            ) : (
                              <span className="w-2 h-2" aria-hidden="true" />
                            )}
                            <span
                              className={`${
                                isToday ? 'font-semibold text-[#131313]' : 'font-normal text-[#666666]'
                              }`}
                            >
                              {day.dayName}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 text-right">
                          <span
                            className={`font-mono tabular-nums ${
                              isToday ? 'font-semibold text-[#131313]' : 'text-[#666666]'
                            }`}
                          >
                            {day.displayHours}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Directions (Primary) and Call (Secondary) Buttons */}
            <Reveal delayMs={200} durationMs={600}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  href="#book"
                  variant="primary"
                  showArrow
                  className="sm:min-w-[190px]"
                >
                  Book a session
                </Button>

                <Button
                  href={SALON_DATA.phone.telLink}
                  variant="secondary"
                  className="sm:min-w-[140px]"
                >
                  Call Now
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
