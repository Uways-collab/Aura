import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LenisScrollContextType {
  lenis: Lenis | null;
  scrollVelocity: number;
  scrollProgress: number;
  scrollY: number;
}

const LenisScrollContext = createContext<LenisScrollContextType>({
  lenis: null,
  scrollVelocity: 0,
  scrollProgress: 0,
  scrollY: 0,
});

export const useLenisScroll = () => useContext(LenisScrollContext);

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const lenisInstanceRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis Inertia Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    });

    lenisInstanceRef.current = lenis;

    // 2. Synchronize Lenis scroll events with React state & GSAP ScrollTrigger
    lenis.on('scroll', (e: { progress: number; velocity: number; scroll: number }) => {
      setScrollVelocity(e.velocity || 0);
      setScrollProgress(e.progress || 0);
      setScrollY(e.scroll || 0);
      ScrollTrigger.update();
    });

    // 3. Connect Lenis to GSAP Ticker for frame-perfect animation synchrony
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisInstanceRef.current = null;
    };
  }, []);

  return (
    <LenisScrollContext.Provider
      value={{
        lenis: lenisInstanceRef.current,
        scrollVelocity,
        scrollProgress,
        scrollY,
      }}
    >
      {children}
    </LenisScrollContext.Provider>
  );
};
