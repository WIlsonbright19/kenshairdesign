import React, { useState } from 'react';
import { SALON_DATA, PriceCategory, PriceItem } from '../content';
import { Sparkles, Phone, Scissors, Check } from 'lucide-react';

export type PricingGenderView = 'mens' | 'womens' | 'all';

interface PriceListProps {
  pricingView?: PricingGenderView;
  onViewChange?: (view: PricingGenderView) => void;
}

export function PriceList({ pricingView: externalView, onViewChange }: PriceListProps) {
  const [internalView, setInternalView] = useState<PricingGenderView>('mens');

  const currentView = externalView !== undefined ? externalView : internalView;

  const handleViewChange = (view: PricingGenderView) => {
    if (onViewChange) {
      onViewChange(view);
    }
    setInternalView(view);
  };

  const { categories, note, mensNote, womensNote } = SALON_DATA.priceList;

  // Filter categories and items based on active toggle
  const visibleCategories = categories
    .map((category) => {
      if (currentView === 'all') return category;
      if (category.audience === currentView) return category;

      // Filter individual items matching audience or for both
      const matchedItems = category.items.filter(
        (item) => item.audience === currentView || item.audience === 'both'
      );
      if (matchedItems.length === 0) return null;
      return {
        ...category,
        items: matchedItems,
      };
    })
    .filter(Boolean) as PriceCategory[];

  const currentNote =
    currentView === 'mens'
      ? mensNote
      : currentView === 'womens'
      ? womensNote
      : note;

  return (
    <div className="w-full mt-16 pt-12 border-t border-[#e5e7eb]">
      {/* Header with Title and Modern Men's / Women's Toggle Switch */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#666666]">
              Clear & Simple Pricing
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#fae042] text-[#131313]">
              758 Stockton St
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-normal tracking-[-0.04em] text-[#131313]">
            {currentView === 'mens'
              ? "Men's Price List"
              : currentView === 'womens'
              ? "Women's Price List"
              : 'Complete Price List'}
          </h3>
          <p className="text-sm text-[#666666] mt-1 max-w-xl">
            {currentView === 'mens'
              ? 'Clean scissor cuts, fades, warm washes, and natural gray hair color for men.'
              : currentView === 'womens'
              ? 'Layered cuts, blowouts, root touch-ups, and curling styles for women.'
              : 'All haircuts, styling, color, and wash prices for everyone.'}
          </p>
        </div>

        {/* TOGGLE SWITCH: Men's vs Women's */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#666666]">Choose View:</span>
            
            {/* Tactile Pill Toggle Switch Container */}
            <div
              role="radiogroup"
              aria-label="Pricing gender toggle"
              className="relative inline-flex items-center p-1 bg-[#f3f4f6] rounded-full border border-[#e5e7eb] shadow-sm select-none"
            >
              {/* Men's Button */}
              <button
                type="button"
                role="radio"
                aria-checked={currentView === 'mens'}
                onClick={() => handleViewChange('mens')}
                className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#131313] ${
                  currentView === 'mens'
                    ? 'bg-[#131313] text-white shadow-sm'
                    : 'text-[#666666] hover:text-[#131313]'
                }`}
              >
                <span>Men's</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    currentView === 'mens'
                      ? 'bg-[#fae042] text-[#131313] font-bold'
                      : 'bg-[#e5e7eb] text-[#666666]'
                  }`}
                >
                  From $35
                </span>
              </button>

              {/* Women's Button */}
              <button
                type="button"
                role="radio"
                aria-checked={currentView === 'womens'}
                onClick={() => handleViewChange('womens')}
                className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#131313] ${
                  currentView === 'womens'
                    ? 'bg-[#131313] text-white shadow-sm'
                    : 'text-[#666666] hover:text-[#131313]'
                }`}
              >
                <span>Women's</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    currentView === 'womens'
                      ? 'bg-[#fae042] text-[#131313] font-bold'
                      : 'bg-[#e5e7eb] text-[#666666]'
                  }`}
                >
                  From $45
                </span>
              </button>

              {/* View All Option */}
              <button
                type="button"
                role="radio"
                aria-checked={currentView === 'all'}
                onClick={() => handleViewChange('all')}
                className={`relative z-10 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#131313] ${
                  currentView === 'all'
                    ? 'bg-[#131313] text-white shadow-sm'
                    : 'text-[#888888] hover:text-[#131313]'
                }`}
              >
                All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active View Quick Status Bar */}
      <div className="mb-6 px-4 py-2.5 bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#131313]">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Currently viewing{' '}
            <strong className="font-semibold text-black">
              {currentView === 'mens'
                ? "Men's Pricing"
                : currentView === 'womens'
                ? "Women's Pricing"
                : 'All Services'}
            </strong>{' '}
            · Free warm wash and blow-dry included with every cut
          </span>
        </div>
        <div className="text-[#666666] font-mono">
          Cash & Venmo Accepted
        </div>
      </div>

      {/* Structured Category Columns / Ledger Cards */}
      <div className="space-y-8">
        {visibleCategories.map((category) => (
          <div
            key={category.id}
            className="border border-[#e5e7eb] rounded-[6px] p-5 sm:p-7 md:p-8 bg-white shadow-xs transition-all hover:border-[#d1d5db]"
          >
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-4 mb-4 border-b border-[#e5e7eb]">
              <div className="flex items-center gap-2.5">
                <h4 className="text-xl font-normal tracking-[-0.03em] text-[#131313]">
                  {category.title}
                </h4>
                {category.audience && category.audience !== 'both' && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[3px] bg-[#f3f4f6] text-[#666666]">
                    {category.audience === 'mens' ? "Men's" : "Women's"}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#666666] font-normal">
                {category.description}
              </p>
            </div>

            {/* Individual Item Rows */}
            <div className="divide-y divide-[#f3f4f6]">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="py-4 first:pt-2 last:pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#fafafa] -mx-3 px-3 rounded-[4px] transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex flex-wrap items-baseline gap-2.5">
                      <span className="text-base font-medium text-[#131313] group-hover:text-black">
                        {item.name}
                      </span>

                      {item.popular && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#fae042] text-[#131313]">
                          <Sparkles className="w-2.5 h-2.5 fill-current" />
                          Popular
                        </span>
                      )}

                      <span className="text-xs font-mono text-[#666666]">
                        · {item.duration}
                      </span>
                    </div>

                    <p className="text-xs text-[#666666] mt-1 max-w-2xl leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price with tabular numerals and quick book link */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-1 sm:pt-0">
                    <span className="text-lg sm:text-xl font-semibold text-[#131313] font-mono tabular-nums">
                      {item.price}
                    </span>
                    <a
                      href={SALON_DATA.phone.telLink}
                      aria-label={`Call to book ${item.name}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#131313] hover:text-black bg-[#f3f4f6] hover:bg-[#fae042] px-3 py-1.5 rounded-full transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Book</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Helpful Pricing Note */}
      <div className="mt-8 p-4 bg-[#fbfbfb] rounded-[6px] border border-[#e5e7eb] flex items-start gap-3 text-xs text-[#666666]">
        <div className="w-5 h-5 rounded-full bg-[#fae042] text-[#131313] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
          *
        </div>
        <div className="space-y-1">
          <p className="leading-relaxed font-medium text-[#131313]">
            {currentNote}
          </p>
          <p className="text-[#666666]">
            Feel free to walk in at 758 Stockton Street or call Ken at{' '}
            <a
              href={SALON_DATA.phone.telLink}
              className="text-[#131313] font-semibold underline underline-offset-2"
            >
              {SALON_DATA.phone.display}
            </a>{' '}
            with any questions about haircut styling or hair color.
          </p>
        </div>
      </div>
    </div>
  );
}
