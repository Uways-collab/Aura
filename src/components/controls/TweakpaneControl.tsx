import React, { useEffect, useRef, useState } from 'react';
import { Pane } from 'tweakpane';
import { Sliders, Eye, RefreshCw, X } from 'lucide-react';
import { TweakpaneSettings } from '../../types';

interface TweakpaneControlProps {
  settings: TweakpaneSettings;
  onSettingsChange: (newSettings: TweakpaneSettings) => void;
  onReset: () => void;
}

export const TweakpaneControl: React.FC<TweakpaneControlProps> = ({
  settings,
  onSettingsChange,
  onReset,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<Pane | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !isOpen) return;

    // Initialize Tweakpane
    const pane = new Pane({
      container: containerRef.current,
      title: 'ALCHE 3D PHYSICAL ENGINE',
      expanded: true,
    });
    paneRef.current = pane;

    // Create proxy mutable object for Tweakpane binding
    const params = { ...settings };

    // Geometry Folder
    const geoFolder = pane.addFolder({ title: 'GEOMETRY & MESH' });
    geoFolder.addBinding(params, 'meshType', {
      options: {
        'Torus Knot': 'torusKnot',
        'Icosahedron': 'sphere',
        'Cyber Rings': 'rings',
      },
      label: 'Core Mesh',
    }).on('change', (ev) => {
      onSettingsChange({ ...params, meshType: ev.value as TweakpaneSettings['meshType'] });
    });

    geoFolder.addBinding(params, 'wireframe', {
      label: 'Wireframe',
    }).on('change', (ev) => {
      onSettingsChange({ ...params, wireframe: ev.value });
    });

    // Physics & Wobble Folder
    const physicsFolder = pane.addFolder({ title: 'WOBBLE & DISTORTION' });
    physicsFolder.addBinding(params, 'wobbleFactor', {
      min: 0,
      max: 2,
      step: 0.05,
      label: 'Wobble Factor',
    }).on('change', (ev) => {
      onSettingsChange({ ...params, wobbleFactor: ev.value });
    });

    physicsFolder.addBinding(params, 'wobbleSpeed', {
      min: 0.2,
      max: 6,
      step: 0.1,
      label: 'Wobble Speed',
    }).on('change', (ev) => {
      onSettingsChange({ ...params, wobbleSpeed: ev.value });
    });

    physicsFolder.addBinding(params, 'rotationSpeed', {
      min: 0.1,
      max: 3.0,
      step: 0.1,
      label: 'Spin Inertia',
    }).on('change', (ev) => {
      onSettingsChange({ ...params, rotationSpeed: ev.value });
    });

    // Lighting & Atmosphere Folder
    const lightFolder = pane.addFolder({ title: 'LIGHTING & PARTICLES' });
    lightFolder.addBinding(params, 'lightColor', {
      view: 'color',
      label: 'Fill Light',
    }).on('change', (ev) => {
      onSettingsChange({ ...params, lightColor: ev.value });
    });

    lightFolder.addBinding(params, 'secondaryLightColor', {
      view: 'color',
      label: 'Rim Light',
    }).on('change', (ev) => {
      onSettingsChange({ ...params, secondaryLightColor: ev.value });
    });

    lightFolder.addBinding(params, 'particleCount', {
      min: 30,
      max: 260,
      step: 10,
      label: 'Particle Field',
    }).on('change', (ev) => {
      onSettingsChange({ ...params, particleCount: ev.value });
    });

    // Camera & Sensitivity
    const camFolder = pane.addFolder({ title: 'CAMERA & PARALLAX' });
    camFolder.addBinding(params, 'cameraSpeed', {
      min: 0.2,
      max: 2.5,
      step: 0.1,
      label: 'Mouse Sensitivity',
    }).on('change', (ev) => {
      onSettingsChange({ ...params, cameraSpeed: ev.value });
    });

    // Reset button
    pane.addButton({
      title: 'Reset Defaults',
    }).on('click', () => {
      onReset();
    });

    return () => {
      pane.dispose();
      paneRef.current = null;
    };
  }, [isOpen]);

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col items-end">
      {/* Floating Toggle Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] group"
        aria-label="Toggle 3D Physics Tweakpane"
      >
        <Sliders className="w-3.5 h-3.5 transition-transform group-hover:rotate-45 text-cyan-400" />
        <span className="text-[11px] uppercase tracking-widest">
          {isOpen ? 'Close Engine Tweaks' : '3D Engine Tweaks'}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
      </button>

      {/* Tweakpane Container Box */}
      {isOpen && (
        <div className="mt-3 relative w-72 sm:w-80 p-2 rounded-xl bg-[#0d0d14]/90 backdrop-blur-2xl border border-cyan-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 px-1">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
              <span className="text-cyan-400">●</span> REALTIME WEBGL PARAMETERS
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div ref={containerRef} className="tweakpane-custom-mount w-full" />
        </div>
      )}
    </div>
  );
};
