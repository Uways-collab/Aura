import React from 'react';
import { Compass } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { KineticTextReveal } from '../common/KineticTextReveal';

interface AboutSectionProps {
  scrollVelocity?: number;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ scrollVelocity = 0 }) => {
  const capabilities = [
    {
      number: '01',
      title: 'WebGL & WebGPU Architecture',
      description: 'Hand-crafted GLSL fragment shaders, procedural particle vortexes, and physics-driven 3D interfaces optimized for effortless 60 FPS in standard browser tabs.',
    },
    {
      number: '02',
      title: 'Unreal Engine 5 & Virtual Production',
      description: 'Cinematic lighting, Nanite geometry streaming, and live mocap integration for Fortnite Creative and digital broadcast live concerts.',
    },
    {
      number: '03',
      title: 'Multi-User Spatial Computing',
      description: 'Distributed WebSocket micro-servers, 3D binaural acoustic simulations, and avatar synchronization capable of hosting thousands concurrently.',
    },
    {
      number: '04',
      title: 'Kinetic Typography & Creative Direction',
      description: 'Custom art direction pairing bold editorial typographic choreography with physics-based mouse and inertial scroll velocity kinetics.',
    },
  ];

  const clients = [
    'Epic Games',
    'Sony Music',
    'KizunaAI Inc.',
    'ZOZO / WEAR',
    'PAL CLOSET',
    'Shiseido Spatial',
    'Fortnite Creative',
    'Tokyo Digital Art Museum',
  ];

  const headerSkew = Math.max(Math.min(scrollVelocity * 0.08, 8), -8);

  return (
    <section id="about" className="relative z-10 py-28 max-w-7xl mx-auto px-6 sm:px-12">
      {/* Header & Philosophy with Kinetic Text Reveal & Dynamic Skew */}
      <div
        style={{
          transform: `skewY(${headerSkew}deg)`,
          transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-white/10 will-change-transform"
      >
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>03. Studio Philosophy</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-[1.02]">
            <KineticTextReveal as="span" stagger={0.025}>
              ETHOS
            </KineticTextReveal>
          </h2>
          <div className="mt-3 text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-display">
            Where Physics, Code & Aesthetics Converge.
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 text-slate-300 font-light leading-relaxed">
          <p className="text-lg text-slate-200">
            Founded in Tokyo, Alche is an interdisciplinary creative engineering studio exploring the frontiers of real-time computer graphics on the web.
          </p>
          <p className="text-sm">
            We reject the template-driven internet. By treating browser viewports as dynamic physical stages rather than static document pages, we build experiences that evoke tangible weight, kinetic momentum, and sensory wonder.
          </p>
          <p className="text-sm">
            From Fortnite virtual festivals with hundreds of thousands of concurrent players to tactile WebGL digital lookbooks, we engineer every vertex and interaction with uncompromising precision.
          </p>
        </div>
      </div>

      {/* Core Capabilities - Clean Editorial List */}
      <div className="pt-16">
        <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-8">
          Studio Capabilities
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.number}
              onMouseEnter={() => soundEngine.playHoverTone()}
              className="p-8 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between group transition-all"
            >
              <div>
                <span className="text-sm font-mono text-cyan-400 mb-4 block font-semibold">
                  {cap.number}.
                </span>
                <h3 className="text-2xl font-bold text-white font-display mb-3 group-hover:text-cyan-300 transition-colors">
                  {cap.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-light">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Brand Partners / Collaborators */}
      <div className="mt-20 pt-12 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Select Collaborators & Clients
          </span>
          <span className="text-xs font-mono text-cyan-400">
            TOKYO &bull; KYOTO &bull; GLOBAL
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {clients.map((client) => (
            <div
              key={client}
              className="py-4 px-6 rounded-xl bg-white/5 border border-white/5 text-center text-sm font-medium text-slate-300 hover:text-white hover:border-cyan-500/30 transition-all select-none"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
