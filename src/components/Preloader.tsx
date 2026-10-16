import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const prefersReduced = useReducedMotion();
  const [percent, setPercent] = useState<number>(0);
  const [isLifting, setIsLifting] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        if (sessionStorage.getItem('khd_preloader_seen') === 'true') {
          return true;
        }
      } catch {
        // ignore
      }
    }
    return false;
  });

  useEffect(() => {
    if (isDone || prefersReduced) {
      onComplete();
      return;
    }

    // Smooth counting interval from 0 to 100 in ~1100ms
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 14) + 6;
        return Math.min(100, prev + step);
      });
    }, 90);

    // After reaching 100%, trigger lift and exit
    const liftTimer = setTimeout(() => {
      setIsLifting(true);
    }, 1150);

    const doneTimer = setTimeout(() => {
      setIsDone(true);
      try {
        sessionStorage.setItem('khd_preloader_seen', 'true');
      } catch {
        // ignore
      }
      onComplete();
    }, 1600);

    return () => {
      clearInterval(interval);
      clearTimeout(liftTimer);
      clearTimeout(doneTimer);
    };
  }, [isDone, prefersReduced, onComplete]);

  if (isDone) return null;

  return (
    <div
      role="status"
      aria-label="Loading Ken's Hair Design"
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#111111] text-white p-6 md:p-12 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isLifting ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
    >
      {/* Top Bar Details */}
      <div className="flex items-center justify-between text-xs font-mono tracking-widest text-white/50 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ebf213] animate-pulse" />
          <span>758 Stockton St · San Francisco</span>
        </div>
        <div>
          <span>{String(percent).padStart(2, '0')}%</span>
        </div>
      </div>

      {/* Center Display Wordmark & Mask Reveal */}
      <div className="max-w-2xl mx-auto w-full text-center">
        <div className="overflow-hidden mb-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[-0.04em] text-white uppercase transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
            Ken's Hair Design
          </h1>
        </div>

        <p className="text-xs sm:text-sm font-medium tracking-widest uppercase text-white/60 mb-6">
          Precision Cuts & Chinatown Craft
        </p>

        {/* Minimal High-Contrast Expanding Progress Bar */}
        <div className="w-full max-w-xs mx-auto h-[1px] bg-white/20 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-[#ebf213] transition-all duration-150 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Bottom Coordinates & Note */}
      <div className="flex items-end justify-between text-[11px] font-mono text-white/40">
        <div>37.7925° N, 122.4080° W</div>
        <div>Chinatown / Nob Hill</div>
      </div>
    </div>
  );
}
