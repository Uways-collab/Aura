import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [tokyoTime, setTokyoTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTokyoTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#08080c]/80 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            soundEngine.playChime(780, 0.2);
          }}
          className="text-2xl font-black tracking-tight text-white hover:text-cyan-400 transition-colors uppercase font-display select-none"
        >
          ALCHE
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollTo('works')}
            onMouseEnter={() => soundEngine.playHoverTone()}
            className="hover:text-white transition-colors cursor-pointer relative py-1 group"
          >
            Works
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
          </button>
          
          <button
            onClick={() => scrollTo('about')}
            onMouseEnter={() => soundEngine.playHoverTone()}
            className="hover:text-white transition-colors cursor-pointer relative py-1 group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
          </button>

          <button
            onClick={() => scrollTo('stellla')}
            onMouseEnter={() => soundEngine.playHoverTone()}
            className="hover:text-white transition-colors cursor-pointer relative py-1 group flex items-center gap-1.5"
          >
            stellla
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-violet-400 group-hover:w-full transition-all duration-300" />
          </button>

          <button
            onClick={() => scrollTo('contact')}
            onMouseEnter={() => soundEngine.playHoverTone()}
            className="hover:text-white transition-colors cursor-pointer relative py-1 group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-4">
          {/* Studio Tokyo Time display */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400 pr-3 border-r border-white/10 tabular-nums">
            <span className="text-emerald-400 text-sm leading-none">●</span>
            <span>TYO {tokyoTime || '03:30:00'}</span>
          </div>

          {/* Procedural Ambient Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-lg border transition-all ${
              !isMuted
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title={isMuted ? 'Turn on ambient sound' : 'Mute sound'}
            aria-label="Sound synthesizer toggle"
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => {
              soundEngine.playChime(660, 0.2);
              onOpenContact();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-slate-950 bg-white hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shadow-sm whitespace-nowrap"
          >
            <span>Commission</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-6 bg-[#0c0c14]/95 backdrop-blur-2xl border-b border-white/10 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3 font-display text-lg">
            <button
              onClick={() => scrollTo('works')}
              className="text-left py-2 text-slate-200 hover:text-cyan-400 border-b border-white/5"
            >
              Works
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left py-2 text-slate-200 hover:text-cyan-400 border-b border-white/5"
            >
              About Studio
            </button>
            <button
              onClick={() => scrollTo('stellla')}
              className="text-left py-2 text-slate-200 hover:text-violet-400 border-b border-white/5"
            >
              stellla Spatial Platform
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-left py-2 text-slate-200 hover:text-cyan-400 border-b border-white/5"
            >
              Contact & Commission
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>TOKYO STUDIO: {tokyoTime}</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="px-4 py-2 bg-cyan-400 text-slate-950 font-bold rounded-lg"
            >
              Start Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
