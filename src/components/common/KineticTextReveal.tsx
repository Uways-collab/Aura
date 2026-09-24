import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KineticTextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  delay?: number;
  stagger?: number;
  triggerHook?: string;
  wordSpacing?: string;
}

export const KineticTextReveal: React.FC<KineticTextRevealProps> = ({
  children,
  className = '',
  as: Component = 'div',
  delay = 0,
  stagger = 0.02,
  triggerHook = 'top 88%',
  wordSpacing = 'mr-2 sm:mr-3',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.kinetic-char');
    if (!chars.length) return;

    // Reset initial character state
    gsap.set(chars, {
      yPercent: 120,
      opacity: 0,
      rotateX: -45,
    });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: triggerHook,
      once: true,
      onEnter: () => {
        gsap.to(chars, {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: stagger,
          ease: 'power4.out',
          delay: delay,
          force3D: true,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [children, delay, stagger, triggerHook]);

  // Split words and characters preserving accessibility and word wrapping
  const words = children.split(' ');

  return (
    <Component
      ref={containerRef as any}
      className={`inline-block overflow-hidden ${className}`}
      aria-label={children}
    >
      {words.map((word, wordIdx) => (
        <span
          key={`${word}-${wordIdx}`}
          className={`inline-block whitespace-nowrap overflow-hidden py-1 ${
            wordIdx < words.length - 1 ? wordSpacing : ''
          }`}
          style={{ perspective: '600px' }}
        >
          {word.split('').map((char, charIdx) => (
            <span
              key={`${char}-${charIdx}`}
              className="kinetic-char inline-block will-change-transform"
              style={{ display: 'inline-block' }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Component>
  );
};
