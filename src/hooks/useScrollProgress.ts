import { useState, useEffect, RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useScrollProgress(containerRef: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState<number>(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (document.hidden) return;
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const totalHeight = rect.height - window.innerHeight;
        if (totalHeight <= 0) return;

        // Current scroll past top of container
        const currentY = -rect.top;
        const rawProgress = currentY / totalHeight;
        const clamped = Math.max(0, Math.min(1, rawProgress));
        setProgress(clamped);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [containerRef, prefersReduced]);

  return progress;
}
