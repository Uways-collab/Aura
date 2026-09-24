import React, { useState } from 'react';
import { Radio, Users, Volume2, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

export const StelllaSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [simulatedAttendees, setSimulatedAttendees] = useState<number>(1250);
  const [audioOcclusion, setAudioOcclusion] = useState<boolean>(true);
  const [spatialMode, setSpatialMode] = useState<'concert' | 'gallery' | 'keynote'>('concert');

  const features = [
    {
      id: 'browser-native',
      title: 'Zero-Download WebGL Engine',
      icon: <Globe className="w-5 h-5 text-cyan-400" />,
      tagline: 'Runs instantaneously in any standard mobile or desktop web browser.',
      details: 'No 30GB client download. By utilizing optimized GLTF Draco compression and hybrid instancing shaders, users enter high-fidelity 3D spatial architecture in less than 2.8 seconds.',
    },
    {
      id: 'spatial-audio',
      title: '3D Positional Binaural Audio',
      icon: <Volume2 className="w-5 h-5 text-violet-400" />,
      tagline: 'Calculates real-time acoustic reverberation and distance falloff.',
      details: 'Our custom Web Audio API node tree simulates sound dampening through architectural walls, realistic HRTF head-shadowing, and dynamic directional stage speakers.',
    },
    {
      id: 'massive-scale',
      title: 'High-Capacity Multiplayer Sharding',
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      tagline: 'Thousands of synchronized users with peer-to-peer interest management.',
      details: 'Distributed WebSocket edge brokers group avatars into spatial proximity clusters, ensuring smooth 60 FPS motion even with 10,000+ simultaneous concert attendees.',
    },
  ];

  return (
    <section id="stellla" className="relative z-10 py-28 max-w-7xl mx-auto px-6 sm:px-12">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-violet-400 mb-2">
            <Radio className="w-3.5 h-3.5" />
            <span>02. Proprietary Spatial Platform</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight flex items-center gap-3">
            <span>stellla</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-violet-950/60 border border-violet-800 text-violet-300 font-normal">
              v3.4 SPATIAL OS
            </span>
          </h2>
        </div>
        <p className="text-sm text-slate-300 max-w-md font-light leading-relaxed">
          Alche's flagship browser-based metaverse platform engineered for luxury brand presentations, interactive virtual concerts, and architectural gatherings.
        </p>
      </div>

      {/* Content Layout */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Feature Accordion / Selector */}
        <div className="lg:col-span-5 space-y-4">
          {features.map((feat, idx) => (
            <div
              key={feat.id}
              onClick={() => {
                soundEngine.playHoverTone();
                setActiveFeature(idx);
              }}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                activeFeature === idx
                  ? 'bg-white/10 backdrop-blur-xl border-violet-500/60 shadow-[0_0_25px_rgba(139,92,246,0.2)]'
                  : 'bg-white/5 backdrop-blur-md border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  {feat.title}
                </h3>
              </div>
              <p className="text-xs font-mono text-cyan-300 mb-2">
                {feat.tagline}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {feat.details}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Live Interactive stellla Venue Simulator */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel border border-violet-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <div className="text-xs font-mono text-violet-400 uppercase tracking-wider mb-1">
                Real-Time Sandbox Simulator
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                stellla Venue Acoustics & Mesh Sharding
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-300">SERVER CLUSTER: TOKYO-EAST</span>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="pt-6 pb-4">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Venue Simulation Mode:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['concert', 'gallery', 'keynote'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    soundEngine.playChime(620, 0.15);
                    setSpatialMode(mode);
                  }}
                  className={`py-2 px-3 text-xs font-mono uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                    spatialMode === mode
                      ? 'bg-violet-600/30 text-white border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="space-y-6 pt-4">
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-2">
                <span>CONCURRENT AVATARS SHARDED:</span>
                <span className="text-cyan-400 font-bold tabular-nums">
                  {simulatedAttendees.toLocaleString()} Users
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="50"
                value={simulatedAttendees}
                onChange={(e) => setSimulatedAttendees(+e.target.value)}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>200 (Private Salon)</span>
                <span>5,000 (Stadium Festival)</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-violet-400" />
                <div>
                  <div className="text-xs font-bold text-white">HRTF 3D Spatial Wall Occlusion</div>
                  <div className="text-[11px] text-slate-400">Dampens sound when objects intersect line-of-sight</div>
                </div>
              </div>
              <button
                onClick={() => {
                  soundEngine.playHoverTone();
                  setAudioOcclusion(!audioOcclusion);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all border ${
                  audioOcclusion
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-white/5 text-slate-400 border-white/10'
                }`}
              >
                {audioOcclusion ? 'ENABLED' : 'BYPASS'}
              </button>
            </div>
          </div>

          {/* Visual Canvas Representation of Simulated Venue */}
          <div className="mt-6 p-4 rounded-xl bg-black/60 border border-white/10 relative overflow-hidden h-36 flex items-center justify-center">
            {/* Visualizer grid points */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 gap-2 p-3 opacity-30">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full bg-cyan-400/40 animate-pulse"
                  style={{
                    animationDelay: `${(i % 7) * 0.2}s`,
                    transform: `scale(${0.4 + (i % 5) * 0.15})`,
                  }}
                />
              ))}
            </div>

            {/* Central Stage Indicator */}
            <div className="relative z-10 flex flex-col items-center gap-1 text-center">
              <div className="px-4 py-1.5 rounded-full bg-violet-600/40 border border-violet-400 text-white font-mono text-xs shadow-[0_0_20px_rgba(139,92,246,0.6)]">
                VIRTUAL STAGE &bull; {spatialMode.toUpperCase()}
              </div>
              <span className="text-[11px] font-mono text-cyan-300">
                BANDWIDTH: {(simulatedAttendees * 0.012).toFixed(1)} MB/S &bull; LATENCY 14MS
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
