import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote, Phone, MapPin } from 'lucide-react';
import { SALON_DATA, TestimonialItem } from '../content';

export function Section_Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollStartLeft, setScrollStartLeft] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);

  const testimonials = SALON_DATA.testimonials || [];

  // Track if testimonials section is in viewport so auto-advance only runs when visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Update scroll navigation buttons state & active slide
  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 15);

    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 24 : 360;
    const currentSlide = Math.round(el.scrollLeft / cardWidth);
    const clampedSlide = Math.min(Math.max(currentSlide, 0), testimonials.length - 1);
    setActiveIndex(clampedSlide);
  }, [testimonials.length]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Scroll horizontal container ONLY — NEVER call window/document scrollIntoView
  const scrollToIndex = useCallback((index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.testimonial-card');
    const targetCard = cards[index] as HTMLElement | undefined;
    if (targetCard) {
      const containerRect = el.getBoundingClientRect();
      const cardRect = targetCard.getBoundingClientRect();
      const targetScrollLeft = el.scrollLeft + (cardRect.left - containerRect.left);

      el.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  }, []);

  // AUTO-PLAY: Carousel moves on its own only when user is viewing this section
  useEffect(() => {
    if (!isAutoPlaying || isHovered || isDragging || !isInView) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex >= testimonials.length - 1 ? 0 : prevIndex + 1;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 3800);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, isDragging, isInView, testimonials.length, scrollToIndex]);

  const scrollTo = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;

    if (direction === 'right') {
      const nextIndex = activeIndex >= testimonials.length - 1 ? 0 : activeIndex + 1;
      scrollToIndex(nextIndex);
    } else {
      const prevIndex = activeIndex <= 0 ? testimonials.length - 1 : activeIndex - 1;
      scrollToIndex(prevIndex);
    }
  };

  // Mouse drag handlers for desktop smooth swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollStartLeft(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollStartLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-label="What Our Clients Say"
      className="relative bg-[#fafafa] py-20 md:py-28 border-b border-[#e5e7eb] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#131313] text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ebf213] animate-pulse" />
              Real Reviews & Social Proof
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.04em] text-[#131313] leading-tight">
              What Our Clients Say
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#555555] leading-relaxed">
              Read real words from locals, neighbors, and walk-in visitors who trust Ken and Debra with their hair.
            </p>
          </div>

          {/* Social Proof Score & Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            {/* Quick Rating Badge */}
            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-[4px] border border-[#e5e7eb] shadow-sm">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
              <div className="border-l border-[#e5e7eb] pl-3 text-left">
                <div className="text-xs font-bold text-[#131313]">4.9 out of 5</div>
                <div className="text-[11px] text-[#666666]">120+ SF Client Reviews</div>
              </div>
            </div>

            {/* Carousel Navigation Controls */}
            <div className="flex items-center gap-2">
              {/* Prev Slide */}
              <button
                type="button"
                onClick={() => scrollTo('left')}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-[4px] border border-[#131313] bg-white text-[#131313] hover:bg-[#ebf213] transition-all flex items-center justify-center shadow-sm cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Slide */}
              <button
                type="button"
                onClick={() => scrollTo('right')}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-[4px] border border-[#131313] bg-white text-[#131313] hover:bg-[#ebf213] transition-all flex items-center justify-center shadow-sm cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Drag / Scroll Track (moves on its own) */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          className={`flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {testimonials.map((t: TestimonialItem, idx: number) => (
            <article
              key={t.id}
              className={`testimonial-card shrink-0 w-[85vw] sm:w-[380px] md:w-[420px] snap-start flex flex-col justify-between bg-white rounded-[4px] border p-6 sm:p-7 transition-all duration-300 hover:shadow-lg ${
                idx === activeIndex
                  ? 'border-[#131313] shadow-md ring-1 ring-[#131313]/10'
                  : 'border-[#e5e7eb] hover:border-[#131313]'
              }`}
            >
              <div>
                {/* Card Top: Stars & Service Pill */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1" aria-label={`Rating: ${t.rating} out of 5 stars`}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>

                  {/* Service Tag */}
                  <span className="text-[11px] font-medium bg-[#f3f4f6] text-[#4b5563] px-2.5 py-1 rounded-[3px] border border-[#e5e7eb]">
                    {t.service}
                  </span>
                </div>

                {/* Quote Text */}
                <div className="relative mb-6">
                  <Quote className="w-6 h-6 text-[#ebf213] fill-[#ebf213] opacity-80 mb-2 rotate-180" />
                  <p className="text-base sm:text-[17px] text-[#131313] leading-relaxed font-normal">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Card Bottom: Client Info */}
              <div className="pt-4 border-t border-[#f0f0f0] flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#131313] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#ebf213]">
                    {t.avatarInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-[#131313]">{t.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-label="Verified Customer" />
                    </div>
                    <span className="text-xs text-[#666666] block">{t.locationOrTag}</span>
                  </div>
                </div>

                <span className="text-[11px] text-[#888888] font-mono">{t.date}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel Bottom Controls: Auto-scrolling Progress & Indicators */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#e5e7eb]">
          {/* Indicator Dots & Auto status */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => scrollToIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`transition-all rounded-full ${
                  dotIdx === activeIndex
                    ? 'w-7 h-2 bg-[#131313]'
                    : 'w-2 h-2 bg-[#d1d5db] hover:bg-[#9ca3af]'
                }`}
              />
            ))}
            <span className="text-xs text-[#666666] font-mono ml-2">
              0{activeIndex + 1} / 0{testimonials.length}
            </span>
          </div>

          {/* Social Proof Quick Direct Action */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-xs text-[#555555] font-medium hidden md:inline-block">
              Want Ken or Debra to cut your hair?
            </span>
            <a
              href={SALON_DATA.phone.telLink}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#131313] text-white hover:bg-[#ebf213] hover:text-[#131313] text-xs font-semibold rounded-[4px] transition-colors border border-[#131313]"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Now
            </a>
            <a
              href={SALON_DATA.links.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#131313] hover:bg-[#f3f4f6] text-xs font-semibold rounded-[4px] transition-colors border border-[#d1d5db]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#131313]" />
              Find Us on Stockton St
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
