import { useState, useEffect, RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface MagneticOffset {
  x: number;
  y: number;
}

export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  strength: number = 8
): {
  offset: MagneticOffset;
  handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave: () => void;
} {
  const [offset, setOffset] = useState<MagneticOffset>({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState<boolean>(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isFinePointer || prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    const pullX = Math.max(-strength, Math.min(strength, deltaX * strength));
    const pullY = Math.max(-strength, Math.min(strength, deltaY * strength));

    setOffset({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return { offset, handleMouseMove, handleMouseLeave };
}
