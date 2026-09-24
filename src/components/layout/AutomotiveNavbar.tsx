import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Zap, Palette } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface AutomotiveNavbarProps {
  onReserveClick: () => void;
  onOpenPaintStudio: () => void;
}

export const AutomotiveNavbar: React.FC<AutomotiveNavbarProps> = ({
  onReserveClick,
  onOpenPaintStudio,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const scrollTo = (id: string) => {
    soundEngine.playHoverTone();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#06060a]/85 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Brand Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            soundEngine.playChime(780, 0.2);
          }}
          className="flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight text-white hover:text-cyan-400 transition-colors uppercase font-display select-none"
        >
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
          <span>AURA</span>
          <span className="text-cyan-400 hidden xs:inline font-mono text-sm tracking-widest pl-1">EV</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-slate-300">
          <button
            onClick={() => scrollTo('specs')}
            onMouseEnter={() => soundEngine.playHoverTone()}
            className="hover:text-cyan-400 transition-colors cursor-pointer py-1 relative group"
          >
            Performance
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
          </button>
          
          <button
            onClick={() => scrollTo('engineering')}
            onMouseEnter={() => soundEngine.playHoverTone()}
            className="hover:text-cyan-400 transition-colors cursor-pointer py-1 relative group"
          >
            Engineering
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
          </button>

          <button
            onClick={() => scrollTo('specs')}
            onMouseEnter={() => soundEngine.playHoverTone()}
            className="hover:text-cyan-400 transition-colors cursor-pointer py-1 relative group"
          >
            Specs
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
          </button>

          <button
            onClick={() => scrollTo('reserve')}
            onMouseEnter={() => soundEngine.playHoverTone()}
            className="hover:text-cyan-400 transition-colors cursor-pointer py-1 relative group flex items-center gap-1.5"
          >
            Reserve
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-xl border transition-all ${
              !isMuted
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title={isMuted ? 'Turn on ambient sound' : 'Mute sound'}
            aria-label="Sound synthesizer toggle"
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reserve CTA Button (Desktop) */}
          <button
            onClick={() => {
              soundEngine.playChime(660, 0.2);
              onReserveClick();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-bold tracking-wider uppercase text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.35)]"
          >
            <span>Reserve Slot</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Full-screen Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Full-Screen Ultra-Clean Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-18 bottom-0 bg-[#06060a]/98 backdrop-blur-3xl z-50 flex flex-col justify-between p-6 animate-in slide-in-from-top-4 duration-300 border-b border-white/10">
          <div className="space-y-6 pt-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-2">
              AURA CONCEPT NAVIGATION
            </div>

            <div className="flex flex-col gap-4 font-display text-2xl font-black">
              <button
                onClick={() => scrollTo('specs')}
                className="text-left py-2 text-white hover:text-cyan-400 border-b border-white/10 flex items-center justify-between"
              >
                <span>01. PERFORMANCE SPECS</span>
                <ArrowUpRight className="w-5 h-5 text-cyan-400" />
              </button>
              <button
                onClick={() => scrollTo('engineering')}
                className="text-left py-2 text-white hover:text-cyan-400 border-b border-white/10 flex items-center justify-between"
              >
                <span>02. POWERTRAIN & CHASSIS</span>
                <ArrowUpRight className="w-5 h-5 text-cyan-400" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPaintStudio();
                }}
                className="text-left py-2 text-cyan-300 hover:text-cyan-400 border-b border-white/10 flex items-center justify-between"
              >
                <span>03. PAINT STUDIO GRADIENTS</span>
                <Palette className="w-5 h-5 text-cyan-400" />
              </button>
              <button
                onClick={() => scrollTo('reserve')}
                className="text-left py-2 text-white hover:text-cyan-400 border-b border-white/10 flex items-center justify-between"
              >
                <span>04. RESERVE TRACK ALLOCATION</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-6 pb-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center justify-between">
              <span>GLOBAL ALLOCATION:</span>
              <span className="text-cyan-400 font-bold">50 UNITS WORLDWIDE</span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReserveClick();
              }}
              className="w-full py-4 bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 font-bold rounded-2xl text-xs font-mono uppercase tracking-widest shadow-[0_0_25px_rgba(6,182,212,0.4)]"
            >
              Reserve Track Allocation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
