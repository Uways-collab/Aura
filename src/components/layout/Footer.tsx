import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    soundEngine.playChime(900, 0.2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#08080c]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/5">
          <div>
            <div className="text-2xl font-black text-white font-display uppercase tracking-tight mb-2">
              ALCHE, INC.
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Creative Engineering & 3D Spatial Computing &bull; Tokyo, Japan
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-200">Available for New Projects</span>
            </div>
            <span aria-hidden="true">&middot;</span>
            <span>35.6586° N, 139.7454° E</span>
          </div>

          {/* Smooth Back to Top */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundEngine.playHoverTone()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer group"
            aria-label="Back to top"
          >
            <span>TOP OF STAGE</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {currentYear} ALCHE, Inc. All rights reserved. Identical spatial engine architecture.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">Works</span>
            <span aria-hidden="true">&middot;</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">Philosophy</span>
            <span aria-hidden="true">&middot;</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">stellla</span>
            <span aria-hidden="true">&middot;</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">Privacy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
