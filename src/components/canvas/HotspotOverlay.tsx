import React from 'react';
import { Sparkles, Zap, Shield, Gauge } from 'lucide-react';
import { HOTSPOTS } from '../../data/vehicleData';

interface HotspotOverlayProps {
  scrollProgress: number;
}

export const HotspotOverlay: React.FC<HotspotOverlayProps> = ({ scrollProgress }) => {
  // Find current active hotspot based on scroll bracket
  const activeHotspot = HOTSPOTS.find(
    (h) => scrollProgress >= h.scrollRange[0] && scrollProgress <= h.scrollRange[1]
  );

  if (!activeHotspot) return null;

  // Desktop positioning logic
  const getDesktopPositionClasses = (pos: string) => {
    switch (pos) {
      case 'bottom-left':
        return 'md:bottom-24 md:left-12';
      case 'top-left':
        return 'md:top-36 md:left-12';
      case 'top-right':
        return 'md:top-36 md:right-12';
      case 'bottom-right':
        return 'md:bottom-24 md:right-12';
      default:
        return 'md:bottom-20 md:left-12';
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'hero':
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'battery':
        return <Zap className="w-4 h-4 text-cyan-400" />;
      case 'aero':
        return <Shield className="w-4 h-4 text-violet-400" />;
      case 'performance':
        return <Gauge className="w-4 h-4 text-rose-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div
      key={activeHotspot.id}
      className={`fixed z-30 pointer-events-auto transition-all duration-300
        /* Mobile: Responsive bottom-sheet drawer anchored above viewport edge so it never blocks the 3D car */
        bottom-6 left-4 right-4 max-w-none text-left
        /* Desktop: Floating anchored card */
        md:bottom-auto md:left-auto md:right-auto md:max-w-md ${getDesktopPositionClasses(
          activeHotspot.position
        )}
      `}
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
      }}
    >
      <div className="bg-black/80 md:bg-black/60 backdrop-blur-2xl border border-cyan-500/35 rounded-2xl p-4 sm:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(6,182,212,0.15)] relative overflow-hidden">
        {/* Subtle top indicator bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-transparent" />

        {/* Hotspot Header */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-cyan-400 font-semibold truncate">
            {getIcon(activeHotspot.id)}
            <span className="truncate">{activeHotspot.title}</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
        </div>

        {/* Headline */}
        <h3 className="text-base sm:text-xl md:text-2xl font-black text-white font-display tracking-tight mb-2.5 sm:mb-4">
          {activeHotspot.headline}
        </h3>

        {/* Specs Bullets */}
        <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          {activeHotspot.specs.map((spec, idx) => (
            <li
              key={idx}
              className="text-[11px] sm:text-xs md:text-sm text-slate-300 font-light flex items-start gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shrink-0 mt-1" />
              <span className="leading-snug">{spec}</span>
            </li>
          ))}
        </ul>

        {/* Interactive Milestone Indicator */}
        <div className="pt-2 sm:pt-3 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
          <span>TOUR {HOTSPOTS.indexOf(activeHotspot) + 1}/{HOTSPOTS.length}</span>
          <span className="text-cyan-400 font-medium">SWIPE / SCROLL TO ORBIT</span>
        </div>
      </div>
    </div>
  );
};
