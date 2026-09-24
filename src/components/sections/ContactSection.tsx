import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ArrowUpRight, MessageSquare } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

export const ContactSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState('3D WebGL Brand Experience');
  const [budgetTier, setBudgetTier] = useState('$50k - $100k');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const services = [
    '3D WebGL Brand Experience',
    'Unreal Engine 5 Production',
    'stellla Spatial Metaverse',
    'Custom Shader & Physics R&D',
  ];

  const budgets = ['$25k - $50k', '$50k - $100k', '$100k+'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playChime(880, 0.3);
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="relative z-10 py-28 max-w-7xl mx-auto px-6 sm:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Inquiries & Agency Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>04. Initiate Project</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight leading-[1.05]">
              Let's Build The Unseen.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Whether you are commissioning a global virtual stage in Unreal Engine, an interactive WebGL portfolio, or an architectural space in stellla, our Tokyo engineers and artists are ready.
          </p>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Direct Inquiries
              </div>
              <a
                href="mailto:contact@alche.jp"
                onClick={() => soundEngine.playHoverTone()}
                className="text-lg font-bold text-white hover:text-cyan-400 transition-colors flex items-center gap-2 font-display"
              >
                <span>contact@alche.jp</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </a>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Tokyo Headquarters
              </div>
              <p className="text-xs text-slate-300 font-mono">
                Minato-ku, Tokyo, Japan &bull; 35.6586° N, 139.7454° E
              </p>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Currently Accepting Q3 / Q4 2026 Commissions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Commission Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-2xl glass-panel border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.7)]">
          {formSubmitted ? (
            <div className="py-16 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                Transmission Received
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto font-light">
                Thank you, {formData.name || 'there'}. Your project brief regarding {selectedService} has been dispatched to our lead creative engineer in Tokyo. We typically reply within 24 hours.
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="mt-6 px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-slate-200 transition-colors cursor-pointer"
              >
                Send Another Brief
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  1. Select Project Domain
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {services.map((service) => (
                    <button
                      type="button"
                      key={service}
                      onClick={() => {
                        soundEngine.playHoverTone();
                        setSelectedService(service);
                      }}
                      className={`p-3 text-xs text-left rounded-xl border transition-all cursor-pointer font-medium ${
                        selectedService === service
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Tier */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  2. Anticipated Scope & Budget
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {budgets.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => {
                        soundEngine.playHoverTone();
                        setBudgetTier(b);
                      }}
                      className={`py-2 px-3 text-center text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                        budgetTier === b
                          ? 'bg-violet-600/30 border-violet-400 text-white'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Kenji Sato"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Company / Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Project Vision & Timeline
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the world, mechanics, or interactive story you wish to create..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => soundEngine.playHoverTone()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 hover:from-cyan-300 hover:to-violet-400 text-slate-950 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 group"
              >
                <span>Dispatch Commission Brief</span>
                <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
