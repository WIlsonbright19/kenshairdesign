import React, { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SplitTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  staggerMs?: number;
  byLine?: boolean;
}

export function SplitText({
  text,
  className = '',
  tag: Tag = 'h2',
  staggerMs = 80,
  byLine = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const isRevealed = useReveal(containerRef as React.RefObject<HTMLElement | null>, {
    threshold: 0.15,
  });
  const prefersReduced = useReducedMotion();

  // If byLine, split by \n or punctuation / phrasing
  const segments = byLine ? text.split('\n') : text.split(' ');

  if (prefersReduced) {
    return (
      <Tag ref={containerRef as any} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag ref={containerRef as any} className={className}>
      {segments.map((seg, idx) => (
        <span key={idx} className="block overflow-hidden">
          <span
            className="block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: isRevealed ? 'translate3d(0, 0, 0)' : 'translate3d(0, 115%, 0)',
              transitionDelay: `${idx * staggerMs}ms`,
            }}
          >
            {seg}
            {!byLine && ' '}
          </span>
        </span>
      ))}
    </Tag>
  );
}
