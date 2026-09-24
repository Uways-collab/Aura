import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Layers, Award } from 'lucide-react';
import { STUDIO_METRICS } from '../../data/projects';
import { soundEngine } from '../../utils/audio';

export const MetricsSection: React.FC = () => {
  const [liveFps, setLiveFps] = useState(60);
  const [frameHistory, setFrameHistory] = useState<number[]>([16.4, 16.2, 16.6, 16.3, 16.5, 16.1, 16.4, 16.3, 16.5, 16.2, 16.4, 16.3]);
  const [activeTab, setActiveTab] = useState<'latency' | 'throughput' | 'memory'>('latency');

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate real-time frame time measurement around 16.6ms (60fps)
      const jitter = (Math.random() - 0.5) * 0.8;
      const currentMs = +(16.3 + jitter).toFixed(2);
      setLiveFps(Math.round(1000 / currentMs));
      setFrameHistory((prev) => [...prev.slice(1), currentMs]);
    }, 800);

    return () => clearInterval(timer);
  }, []);

  const icons = [
    <Cpu className="w-5 h-5 text-cyan-400" key="cpu" />,
    <Award className="w-5 h-5 text-violet-400" key="award" />,
    <Activity className="w-5 h-5 text-cyan-400" key="activity" />,
    <Layers className="w-5 h-5 text-slate-300" key="layers" />,
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-20">
      {/* Studio Quantitative Rigor Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            Creative Technology Benchmarks
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Engineered For Zero Friction
          </h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md font-light leading-relaxed">
          Every spatial world, shader, and kinetic typography element is tuned to maintain buttery 60 FPS across both modern desktop GPUs and mobile devices.
        </p>
      </div>

      {/* Grid of Key Quantitative Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
        {STUDIO_METRICS.map((metric, idx) => (
          <div
            key={metric.label}
            onMouseEnter={() => soundEngine.playHoverTone()}
            className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between transition-all group"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                {icons[idx]}
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                {metric.change}
              </span>
            </div>

            <div>
              <div className="text-4xl font-black text-white tracking-tight font-display mb-1 group-hover:text-cyan-300 transition-colors tabular-nums">
                {metric.label === 'WebGL Engine Speed' ? `${liveFps} FPS` : metric.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mb-1">
                {metric.label}
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {metric.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Hardware Telemetry & SVG Chart */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="font-mono text-xs uppercase tracking-wider text-slate-200">
              Real-time WebGL Pipeline Telemetry (Frame Delta Monitor)
            </div>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg border border-white/10 text-xs font-mono">
            <button
              onClick={() => {
                soundEngine.playHoverTone();
                setActiveTab('latency');
              }}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === 'latency'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Frame Timing
            </button>
            <button
              onClick={() => {
                soundEngine.playHoverTone();
                setActiveTab('throughput');
              }}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === 'throughput'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Vertex Load
            </button>
            <button
              onClick={() => {
                soundEngine.playHoverTone();
                setActiveTab('memory');
              }}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === 'memory'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              VRAM Cache
            </button>
          </div>
        </div>

        {/* Real-time SVG Sparkline Graph */}
        <div className="pt-6">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-3xl font-black font-display text-white tabular-nums">
                {frameHistory[frameHistory.length - 1]}
              </span>
              <span className="ml-2 text-xs font-mono text-slate-400">ms / frame (16.6ms target for 60Hz)</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span>Jitter 0.04%</span>
              <span aria-hidden="true">&middot;</span>
              <span>Smooth Buffer</span>
            </div>
          </div>

          {/* SVG Visualizer */}
          <div className="h-28 w-full relative">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 100">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Target 16.6ms line */}
              <line
                x1="0"
                y1="50"
                x2="400"
                y2="50"
                stroke="rgba(255,255,255,0.15)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />

              {/* Dynamic waveform area and stroke */}
              {(() => {
                const points = frameHistory.map((val, i) => {
                  const x = (i / (frameHistory.length - 1)) * 400;
                  // Map 15.5ms - 17.5ms to y range 10 - 90
                  const y = 50 + (val - 16.3) * 60;
                  return `${x},${y}`;
                });
                const dArea = `M 0,100 L ${points.join(' L ')} L 400,100 Z`;
                const dLine = `M ${points.join(' L ')}`;

                return (
                  <>
                    <path d={dArea} fill="url(#chartGradient)" />
                    <path
                      d={dLine}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {points.map((pt, index) => {
                      const [cx, cy] = pt.split(',');
                      return (
                        <circle
                          key={index}
                          cx={cx}
                          cy={cy}
                          r={index === points.length - 1 ? 4 : 2}
                          fill={index === points.length - 1 ? '#ffffff' : '#06b6d4'}
                          stroke={index === points.length - 1 ? '#06b6d4' : 'none'}
                          strokeWidth={2}
                        />
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-slate-500 pt-3 border-t border-white/5">
            <span>-10 SECONDS</span>
            <span>GPU PIPELINE: DEDICATED COMPUTE THREAD</span>
            <span>NOW</span>
          </div>
        </div>
      </div>
    </section>
  );
};
