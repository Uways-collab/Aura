import React, { useState } from 'react';
import { CheckCircle2, Send, Key } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

export const ReserveSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [trackLocation, setTrackLocation] = useState('Laguna Seca Raceway (California, USA)');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'Track Day Regular (FIA / SCCA License)',
    notes: '',
  });

  const tracks = [
    'Laguna Seca Raceway (California, USA)',
    'Circuit de Spa-Francorchamps (Belgium)',
    'Fuji Speedway (Shizuoka, Japan)',
    'Silverstone Circuit (Northamptonshire, UK)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playChime(880, 0.3);
    setSubmitted(true);
  };

  return (
    <section id="reserve" className="relative z-10 py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-12 touch-action-pan-y">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        
        {/* Left Column: Private Allocation Details */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
              <Key className="w-3.5 h-3.5" />
              <span>03. Private Track Commissioning</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-[1.05]">
              Claim Your Allocation.
            </h2>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed">
            Production of the AURA EV is strictly capped at fifty numbered units worldwide. Prospective commissioners receive an invitation to an exclusive closed-circuit private evaluation accompanied by an AURA factory test driver.
          </p>

          <div className="space-y-3 sm:space-y-4 pt-4 border-t border-white/10">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-200 text-xs font-mono flex items-center justify-between">
              <span>GLOBAL BUILD LIMIT:</span>
              <span className="font-bold text-white">50 UNITS WORLDWIDE</span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 text-xs font-mono flex items-center justify-between">
              <span>ESTIMATED MSRP:</span>
              <span className="font-bold text-cyan-400">$2,450,000 USD</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Allocation Slots Open for Q1 2027 Handover</span>
            </div>
          </div>
        </div>

        {/* Right Column: Reservation & Track Drive Form */}
        <div className="lg:col-span-7 p-5 sm:p-10 rounded-3xl bg-black/70 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          {submitted ? (
            <div className="py-12 sm:py-16 text-center space-y-4 sm:space-y-5 animate-in fade-in duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Allocation Inquiry Logged
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-light leading-relaxed">
                Thank you, {formData.name || 'valued collector'}. Your dossier for {trackLocation} testing has been transferred to our factory concierge. We will contact you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', experience: 'Track Day Regular (FIA / SCCA License)', notes: '' });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-slate-200 transition-colors cursor-pointer"
              >
                Submit Additional Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Preferred Testing Circuit */}
              <div>
                <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 sm:mb-3">
                  1. Select Track Testing Circuit
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tracks.map((track) => (
                    <button
                      type="button"
                      key={track}
                      onClick={() => {
                        soundEngine.playHoverTone();
                        setTrackLocation(track);
                      }}
                      className={`p-3 text-xs text-left rounded-xl border transition-all cursor-pointer font-medium ${
                        trackLocation === track
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {track}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Marcus Sterling"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Direct Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="marcus@privateoffice.com"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Contact Phone (Signal / WhatsApp)
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2831"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Performance Driving Experience
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-[#14141c] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="Track Day Regular (FIA / SCCA License)">Track Day Regular (FIA / SCCA License)</option>
                    <option value="Supercar Collector / Enthusiast">Supercar Collector / Enthusiast</option>
                    <option value="Professional Racing Driver">Professional Racing Driver</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Bespoke Requests & Coachwork Preferences
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Specify exposed carbon weave tint, interior Alcantara stitching..."
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => soundEngine.playHoverTone()}
                className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-300 hover:opacity-95 text-slate-950 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_30px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2 group"
              >
                <span>Request Private Track Allocation</span>
                <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
