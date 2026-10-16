import { useState, useEffect, RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useReveal(
  elementRef: RefObject<HTMLElement | null>,
  options: RevealOptions = {}
): boolean {
  const { threshold = 0.2, rootMargin = '0px 0px -50px 0px' } = options;
  const prefersReduced = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  useEffect(() => {
    if (prefersReduced) {
      setIsRevealed(true);
      return;
    }

    const node = elementRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, rootMargin, prefersReduced]);

  return isRevealed;
}
