import React, { useRef } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

export type ButtonVariant = 'primary' | 'secondary' | 'link' | 'dark-secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  target?: string;
  rel?: string;
  showArrow?: boolean;
  isMagnetic?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      variant = 'primary',
      href,
      target,
      rel,
      showArrow = false,
      isMagnetic = true,
      fullWidth = false,
      className = '',
      children,
      disabled,
      onClick,
      ...rest
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLElement | null>(null);
    const targetRef = (forwardedRef || internalRef) as React.RefObject<HTMLElement | null>;

    const { offset, handleMouseMove, handleMouseLeave } = useMagnetic(
      targetRef,
      variant === 'primary' && isMagnetic ? 8 : 0
    );

    const magneticStyle: React.CSSProperties =
      isMagnetic && variant === 'primary' && (offset.x !== 0 || offset.y !== 0)
        ? {
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            transition: 'transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)',
          }
        : {};

    // Common arrow SVG icon
    const ArrowIcon = (
      <svg
        className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    );

    if (variant === 'link') {
      const linkClasses = `group inline-flex items-center gap-1.5 text-base font-semibold text-[#131313] hover:text-[#000000] transition-colors relative py-1 focus-visible:outline-2 focus-visible:outline-[#131313] focus-visible:outline-offset-4 ${className}`;

      if (href) {
        return (
          <a
            ref={targetRef as React.RefObject<HTMLAnchorElement>}
            href={href}
            target={target}
            rel={rel}
            className={linkClasses}
            onClick={onClick as any}
          >
            <span className="relative">
              {children}
              <span
                className="absolute bottom-0 left-0 w-full h-[1px] bg-[#131313] origin-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 scale-x-0"
                aria-hidden="true"
              />
            </span>
            {showArrow && ArrowIcon}
          </a>
        );
      }

      return (
        <button
          ref={targetRef as React.RefObject<HTMLButtonElement>}
          type="button"
          disabled={disabled}
          className={linkClasses}
          onClick={onClick}
          {...rest}
        >
          <span className="relative">
            {children}
            <span
              className="absolute bottom-0 left-0 w-full h-[1px] bg-[#131313] origin-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 scale-x-0"
              aria-hidden="true"
            />
          </span>
          {showArrow && ArrowIcon}
        </button>
      );
    }

    if (variant === 'primary') {
      const primaryBase = `group relative inline-flex items-center justify-center gap-2.5 px-6 min-h-[48px] rounded-[4px] font-semibold text-base text-[#131313] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] bg-[#ebf213] cursor-pointer border-0 select-none ${
        fullWidth ? 'w-full' : 'min-w-[210px]'
      } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

      const innerContent = (
        <>
          {/* Sweep layer from left */}
          <span
            className="absolute inset-0 bg-[#131313] transform -translate-x-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 pointer-events-none"
            aria-hidden="true"
          />
          {/* Text & Icon flipping color */}
          <span className="relative z-10 flex items-center justify-center gap-2.5 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white">
            <span>{children}</span>
            {showArrow && ArrowIcon}
          </span>
        </>
      );

      if (href) {
        return (
          <a
            ref={targetRef as React.RefObject<HTMLAnchorElement>}
            href={href}
            target={target}
            rel={rel}
            style={magneticStyle}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={primaryBase}
            onClick={onClick as any}
          >
            {innerContent}
          </a>
        );
      }

      return (
        <button
          ref={targetRef as React.RefObject<HTMLButtonElement>}
          type={rest.type || 'button'}
          disabled={disabled}
          style={magneticStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={primaryBase}
          onClick={onClick}
          {...rest}
        >
          {innerContent}
        </button>
      );
    }

    // Secondary variant
    const isDarkSurface = variant === 'dark-secondary';
    const secondaryBase = `group relative inline-flex items-center justify-center gap-2.5 px-6 min-h-[48px] rounded-[4px] font-semibold text-base transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] cursor-pointer select-none border ${
      isDarkSurface
        ? 'border-white/30 text-white hover:border-white hover:bg-white/10'
        : 'border-[#666666] text-[#131313] hover:border-[#131313] hover:text-[#000000]'
    } ${fullWidth ? 'w-full' : ''} ${
      disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
    } ${className}`;

    const secondaryContent = (
      <>
        <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
          {children}
        </span>
        {showArrow && ArrowIcon}
      </>
    );

    if (href) {
      return (
        <a
          ref={targetRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={secondaryBase}
          onClick={onClick as any}
        >
          {secondaryContent}
        </a>
      );
    }

    return (
      <button
        ref={targetRef as React.RefObject<HTMLButtonElement>}
        type={rest.type || 'button'}
        disabled={disabled}
        className={secondaryBase}
        onClick={onClick}
        {...rest}
      >
        {secondaryContent}
      </button>
    );
  }
);

Button.displayName = 'Button';
