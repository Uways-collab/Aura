import React from 'react';
import { Cpu, BatteryCharging, Wind, Layers } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { KineticTextReveal } from '../common/KineticTextReveal';

interface EngineeringSectionProps {
  scrollVelocity?: number;
}

export const EngineeringSection: React.FC<EngineeringSectionProps> = ({
  scrollVelocity = 0,
}) => {
  const pillars = [
    {
      number: '01',
      icon: <BatteryCharging className="w-5 h-5 text-cyan-400" />,
      title: 'Solid-State Electrolyte Core',
      tagline: '520 Wh/kg Gravimetric Density',
      description: 'By eliminating flammable liquid solvents, our solid ceramic electrolyte enables ultra-dense packaging that resists thermal degradation across repeated maximum-output hot laps.',
    },
    {
      number: '02',
      icon: <Cpu className="w-5 h-5 text-violet-400" />,
      title: 'Silicon-Carbide Quad Inverters',
      tagline: '99.4% Energy Conversion Efficiency',
      description: 'Dedicated 800V SiC inverters communicate via fiber-optic data channels to adjust torque at each tire within 0.8 milliseconds, preventing slip before it physically registers to human senses.',
    },
    {
      number: '03',
      icon: <Wind className="w-5 h-5 text-emerald-400" />,
      title: 'Ground-Effect Venturi Aerodynamics',
      tagline: '1,850 Lbs of Downforce at 160 MPH',
      description: 'Twin underfloor aerodynamic tunnels accelerate airflow beneath the chassis, pulling the vehicle flush to the asphalt without inducing heavy parasitic drag on high-speed straights.',
    },
    {
      number: '04',
      icon: <Layers className="w-5 h-5 text-amber-400" />,
      title: 'Toray T1100 Carbon Monocoque',
      tagline: '62,000 Nm/deg Torsional Rigidity',
      description: 'High-modulus pre-preg carbon fiber cured in precision autoclave ovens produces a featherweight survival cell that exceeds all FIA GT1 safety criteria.',
    },
  ];

  const headerSkew = Math.max(Math.min(scrollVelocity * 0.08, 8), -8);

  return (
    <section id="engineering" className="relative z-10 py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-12 touch-action-pan-y">
      {/* Header with Kinetic Reveal and Fluid Clamp Typography */}
      <div
        style={{
          transform: `skewY(${headerSkew}deg) translateZ(0)`,
          transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start pb-10 sm:pb-16 border-b border-white/10"
      >
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            <span>02. Architecture & Powertrain</span>
          </div>
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black text-white font-display tracking-tight leading-[1.02]">
            <KineticTextReveal as="span" stagger={0.03}>
              ENGINEERING
            </KineticTextReveal>
          </h2>
          <div className="mt-2 sm:mt-3 text-base sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-display">
            The Physics of Relentless Acceleration.
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-slate-300 font-light leading-relaxed">
          <p className="text-base sm:text-lg text-slate-200">
            AURA EV was conceived with a singular objective: to dethrone internal combustion hypercars around the Nürburgring Nordschleife without sacrificing grand touring refinement.
          </p>
          <p className="text-xs sm:text-sm">
            Every cubic centimeter of the carbon chassis houses bespoke engineering solutions—from 3D-printed titanium suspension uprights to an active aero rear diffuser that breathes in tandem with driver steering telemetry.
          </p>
          <p className="text-xs sm:text-sm">
            Powered by a 120 kWh solid-state structural pack, the vehicle sustains 1,500 horsepower without the thermal de-rating that plagues ordinary lithium-ion performance EVs.
          </p>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        {pillars.map((pillar) => (
          <div
            key={pillar.number}
            onMouseEnter={() => soundEngine.playHoverTone()}
            style={{ transform: 'translateZ(0)' }}
            className="p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                  PILLAR {pillar.number}.
                </span>
                <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                  {pillar.icon}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-1.5 sm:mb-2 group-hover:text-cyan-300 transition-colors">
                {pillar.title}
              </h3>
              <div className="text-[11px] sm:text-xs font-mono text-cyan-300 mb-3 sm:mb-4 uppercase tracking-wider">
                {pillar.tagline}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
