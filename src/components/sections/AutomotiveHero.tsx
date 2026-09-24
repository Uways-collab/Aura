import React, { useRef } from 'react';
import { ArrowDown, Zap } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { KineticTextReveal } from '../common/KineticTextReveal';

interface AutomotiveHeroProps {
  scrollVelocity: number;
  onExploreClick: () => void;
  onReserveClick: () => void;
}

export const AutomotiveHero: React.FC<AutomotiveHeroProps> = ({
  scrollVelocity,
  onExploreClick,
  onReserveClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const skewDegree = Math.max(Math.min(scrollVelocity * 0.08, 10), -10);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-12 max-w-7xl mx-auto z-10 pointer-events-none touch-action-pan-y"
    >
      {/* Top Tagline Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pointer-events-auto">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-slate-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
          <span className="truncate">AURA AUTOMOTIVE &bull; CONCEPT DIVISION</span>
          <span aria-hidden="true">&middot;</span>
          <span className="text-cyan-400 hidden xs:inline">GEN-4 HYPERCAR</span>
        </div>

        <div className="text-[10px] sm:text-xs font-mono text-cyan-300/90 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-800/40 backdrop-blur-md flex items-center gap-2 shrink-0">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>1,500 HP &bull; 0–60 IN 1.74s</span>
        </div>
      </div>

      {/* Main Kinetic Typography with Fluid Responsive Sizing text-[clamp(...)] */}
      <div className="my-auto py-8 sm:py-10 pointer-events-auto select-none">
        <div
          style={{
            transform: `skewY(${skewDegree}deg) translateZ(0)`,
            transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
          className="space-y-1 sm:space-y-3"
        >
          {/* Top Line: AURA */}
          <div className="overflow-hidden">
            <h1 className="text-[clamp(3rem,11vw,10.5rem)] font-black tracking-tighter uppercase text-white font-display leading-[0.88] whitespace-nowrap">
              <KineticTextReveal as="span" delay={0.1} stagger={0.03}>
                AURA
              </KineticTextReveal>
            </h1>
          </div>

          {/* Sub Line: EV / HYPER-PERFORMANCE */}
          <div className="overflow-hidden flex flex-wrap items-baseline gap-3 sm:gap-8">
            <h1 className="text-[clamp(3rem,11vw,10.5rem)] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-white font-display leading-[0.88] whitespace-nowrap">
              <KineticTextReveal as="span" delay={0.25} stagger={0.03}>
                EV
              </KineticTextReveal>
            </h1>
            <span className="hidden lg:inline-block text-xs font-mono tracking-widest text-slate-300 uppercase max-w-sm leading-relaxed pb-3">
              Pure electric powertrain physics. Solid-state energy density. Designed to redefine aerodynamics and acceleration.
            </span>
          </div>

          {/* Third Line: BEYOND SPEED */}
          <div className="overflow-hidden">
            <div className="text-[clamp(1.2rem,4vw,3.5rem)] font-black tracking-tight uppercase text-slate-300 font-display">
              <KineticTextReveal as="span" delay={0.4} stagger={0.02}>
                BEYOND SPEED
              </KineticTextReveal>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-5 sm:pt-6 border-t border-white/10">
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg font-light leading-relaxed">
            Scroll or swipe vertically to begin an interactive 360-degree technical inspection of the aerodynamic chassis, active carbon rear wing, and solid-state sub-floor battery.
          </p>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                soundEngine.playChime(580, 0.2);
                onExploreClick();
              }}
              onMouseEnter={() => soundEngine.playHoverTone()}
              className="flex-1 sm:flex-none px-5 sm:px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-slate-950 font-bold text-xs tracking-wider uppercase rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Inspect Engineering</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </button>

            <button
              onClick={() => {
                soundEngine.playChime(760, 0.2);
                onReserveClick();
              }}
              onMouseEnter={() => soundEngine.playHoverTone()}
              className="flex-1 sm:flex-none px-5 sm:px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer backdrop-blur-md text-center"
            >
              Reserve Allocation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-white/5 text-[10px] sm:text-xs font-mono text-slate-400 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="truncate">INSPECTION MODE: SCROLL DOWN TO ORBIT &middot; TAP PAINT STUDIO TO CUSTOMIZE</span>
        </div>

        <div className="hidden xs:flex items-center gap-3 text-cyan-300">
          <span>0.19 Cd</span>
          <span aria-hidden="true">&middot;</span>
          <span>120 kWh SOLID-STATE</span>
        </div>
      </div>
    </section>
  );
};
