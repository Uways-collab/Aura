import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

export const AutomotiveFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    soundEngine.playChime(900, 0.2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#040408]/95 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        
        {/* Main Footer Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-2xl font-black text-white font-display uppercase tracking-tight mb-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400" />
              <span>AURA AUTOMOTIVE</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Hyper-Performance Electric Powertrain Engineering &bull; Monocoque Composites
            </p>
          </div>

          {/* Allocation & Worldwide Status Badge */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Production Allocation: 50 Units Worldwide</span>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              onMouseEnter={() => soundEngine.playHoverTone()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer group"
              aria-label="Back to top"
            >
              <span>TOP OF SHOWCASE</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Bottom Legal & Specs disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {currentYear} AURA Automotive Technologies, Inc. All specifications are simulated on FIA homologated telemetry.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">Homologation</span>
            <span aria-hidden="true">&middot;</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">Telemetry Portal</span>
            <span aria-hidden="true">&middot;</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">Bespoke Options</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
