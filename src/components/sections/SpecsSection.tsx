import React, { useState } from 'react';
import { VEHICLE_SPECS } from '../../data/vehicleData';
import { soundEngine } from '../../utils/audio';
import { KineticTextReveal } from '../common/KineticTextReveal';
import { Gauge, Zap, Wind, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface SpecsSectionProps {
  scrollVelocity?: number;
}

export const SpecsSection: React.FC<SpecsSectionProps> = ({ scrollVelocity = 0 }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'powertrain' | 'battery' | 'aero' | 'chassis'>('all');

  const filteredSpecs = activeCategory === 'all'
    ? VEHICLE_SPECS
    : VEHICLE_SPECS.filter((s) => s.category === activeCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'powertrain':
        return <Gauge className="w-4 h-4 text-rose-400" />;
      case 'battery':
        return <Zap className="w-4 h-4 text-cyan-400" />;
      case 'aero':
        return <Wind className="w-4 h-4 text-violet-400" />;
      case 'chassis':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      default:
        return <Gauge className="w-4 h-4 text-cyan-400" />;
    }
  };

  const headerSkew = Math.max(Math.min(scrollVelocity * 0.08, 8), -8);

  return (
    <section id="specs" className="relative z-10 py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-12 touch-action-pan-y">
      {/* Header */}
      <div
        style={{
          transform: `skewY(${headerSkew}deg) translateZ(0)`,
          transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-white/10"
      >
        <div>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            <span>01. Technical Specifications</span>
          </div>
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black text-white font-display tracking-tight leading-none">
            <KineticTextReveal as="span" stagger={0.03}>
              PERFORMANCE
            </KineticTextReveal>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 font-light max-w-md">
            Uncompromising track benchmarks engineered through computational fluid dynamics and quad-motor torque vectoring.
          </p>
        </div>

        {/* Category Tabs with horizontal scroll on small mobile screens */}
        <div className="flex items-center gap-1.5 p-1 sm:p-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono overflow-x-auto max-w-full pb-1 sm:pb-1.5 no-scrollbar">
          {(['all', 'powertrain', 'battery', 'aero', 'chassis'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playHoverTone();
                setActiveCategory(cat);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 8-Card Benchmark Grid */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredSpecs.map((spec) => (
          <div
            key={spec.id}
            onMouseEnter={() => soundEngine.playHoverTone()}
            style={{ transform: 'translateZ(0)' }}
            className="group relative p-5 sm:p-7 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/80 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(6,182,212,0.2)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                  {getCategoryIcon(spec.category)}
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  {spec.category}
                </span>
              </div>

              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight group-hover:text-cyan-300 transition-colors tabular-nums">
                  {spec.value}
                </span>
                {spec.unit && (
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                    {spec.unit}
                  </span>
                )}
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider font-display mb-1.5 sm:mb-2">
                {spec.label}
              </h3>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed pt-3 sm:pt-4 border-t border-white/5">
              {spec.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Engineering Rigor Comparison Strip */}
      <div className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-[10px] sm:text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
            Dynamic Active Aero Modes
          </div>
          <h4 className="text-lg sm:text-2xl font-bold text-white font-display">
            DRS Low-Drag &bull; Downforce Cornering &bull; Air-Brake Flare
          </h4>
          <p className="text-xs text-slate-400 mt-1 max-w-xl font-light leading-relaxed">
            Sensors evaluate steering yaw rate 1,000 times per second to articulate the carbon rear wing from 0° to 38° in under 120 milliseconds.
          </p>
        </div>

        <button
          onClick={() => {
            soundEngine.playChime(640, 0.2);
            const el = document.getElementById('reserve');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer border border-white/15 text-center"
        >
          <span>Track Configurator</span>
          <ArrowUpRight className="w-4 h-4 text-cyan-400" />
        </button>
      </div>
    </section>
  );
};
