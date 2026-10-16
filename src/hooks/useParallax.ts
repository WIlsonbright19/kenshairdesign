import { useState, useEffect, RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed: number = 0.15,
  maxOffset: number = 40
): number {
  const [offsetY, setOffsetY] = useState<number>(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    if (typeof window === 'undefined') return;

    // Check pointer fine & desktop
    const isFine = window.matchMedia('(pointer: fine)').matches;
    if (!isFine) return;

    let rafId: number | null = null;

    const onScroll = () => {
      if (document.hidden) return;
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elemCenter = rect.top + rect.height / 2;
        const distanceFromCenter = elemCenter - viewportCenter;
        const drift = -distanceFromCenter * speed;
        const clamped = Math.max(-maxOffset, Math.min(maxOffset, drift));
        setOffsetY(clamped);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [ref, speed, maxOffset, prefersReduced]);

  return prefersReduced ? 0 : offsetY;
}
