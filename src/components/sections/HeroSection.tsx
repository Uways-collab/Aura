import React, { useRef } from 'react';
import { ArrowDown, Compass } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { KineticTextReveal } from '../common/KineticTextReveal';

interface HeroSectionProps {
  scrollVelocity: number;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollVelocity,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic skew based on Lenis scroll velocity: transform: skewY(calc(velocity * 0.1deg)) clamped
  const skewDegree = Math.max(Math.min(scrollVelocity * 0.1, 14), -14);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 sm:px-12 max-w-7xl mx-auto z-10 pointer-events-none"
    >
      {/* Top Hero Sub-Header & Kicker */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-slate-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Alche Inc. Creative Engineering</span>
          <span aria-hidden="true">·</span>
          <span>Tokyo, Japan</span>
        </div>

        <div className="text-xs font-mono text-cyan-300/90 bg-cyan-950/40 px-3.5 py-1.5 rounded-lg border border-cyan-800/40 backdrop-blur-md">
          POV: A 50k website, built to be experienced
        </div>
      </div>

      {/* Main Kinetic Typography Display with Dynamic Velocity Skew */}
      <div className="my-auto py-12 pointer-events-auto select-none">
        <div
          style={{
            transform: `skewY(${skewDegree}deg)`,
            transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="will-change-transform space-y-2 sm:space-y-4"
        >
          {/* First line: ALCHE / SPATIAL */}
          <div className="overflow-hidden">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-white font-display leading-[0.9]">
              <KineticTextReveal as="span" delay={0.1} stagger={0.025}>
                ALCHE
              </KineticTextReveal>
            </h1>
          </div>

          {/* Second line: REALMS with gradient */}
          <div className="overflow-hidden flex flex-wrap items-baseline gap-4 sm:gap-8">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-white font-display leading-[0.9]">
              <KineticTextReveal as="span" delay={0.25} stagger={0.025}>
                REALMS
              </KineticTextReveal>
            </h1>
            <span className="hidden md:inline-block text-xs font-mono tracking-widest text-slate-400 uppercase max-w-xs leading-relaxed">
              Merging WebGL graphics, physical simulation and kinetic typography into living interactive architecture.
            </span>
          </div>

          {/* Third line: IN REALTIME */}
          <div className="overflow-hidden">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-slate-200/90 font-display leading-[0.9]">
              <KineticTextReveal as="span" delay={0.4} stagger={0.02}>
                IN REALTIME
              </KineticTextReveal>
            </h1>
          </div>
        </div>

        {/* Studio Tagline & Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
          <p className="text-sm sm:text-base text-slate-300 max-w-xl font-light leading-relaxed">
            We are a creative technology studio in Tokyo specializing in real-time 3D spatial computing, Unreal Engine virtual production, and next-generation interactive web experiences.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                soundEngine.playChime(520, 0.2);
                onExploreClick();
              }}
              onMouseEnter={() => soundEngine.playHoverTone()}
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-slate-950 font-bold text-xs tracking-wider uppercase rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Explore Selected Works</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar Interactive Hints */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs font-mono text-slate-400 pointer-events-auto">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>INTERACTION: RAPID POINTER OR SCROLL WARPS 3D MESH &middot; KINETIC INERTIA ACTIVE</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-cyan-400">ENGINE: THREE.JS R3F</span>
          <span aria-hidden="true">&middot;</span>
          <span>LENIS INERTIA ACTIVE</span>
        </div>
      </div>
    </section>
  );
};
