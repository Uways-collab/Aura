import React, { useEffect, useRef, useState } from 'react';
import { Pane } from 'tweakpane';
import { Sliders, X, Check, Palette, Eye, Car } from 'lucide-react';
import { CarSettings, PaintFinish } from '../../types';
import { PAINT_PRESETS } from '../../data/vehicleData';
import { soundEngine } from '../../utils/audio';

interface AutomotiveTweakpaneProps {
  settings: CarSettings;
  onSettingsChange: (settings: CarSettings) => void;
  onReset: () => void;
  onOpenPaintStudio: () => void;
}

export const AutomotiveTweakpane: React.FC<AutomotiveTweakpaneProps> = ({
  settings,
  onSettingsChange,
  onReset,
  onOpenPaintStudio,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<Pane | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !isOpen) return;

    const pane = new Pane({
      container: containerRef.current,
      title: 'AURA EV STUDIO CONTROLS',
      expanded: true,
    });
    paneRef.current = pane;

    const params = { ...settings };

    // 1. Diagnostics & X-Ray Mode Folder
    const diagFolder = pane.addFolder({ title: 'VEHICLE SELECTION & DIAGNOSTICS' });
    diagFolder.addBinding(params, 'vehicleModel', {
      label: 'Vehicle 3D Model',
      options: {
        'Porsche Taycan EV (Uploaded 3D)': 'taycan',
        'AURA Concept Hypercar': 'concept',
      },
    }).on('change', (ev) => {
      soundEngine.playChime(ev.value === 'taycan' ? 880 : 540, 0.18);
      onSettingsChange({ ...params, vehicleModel: ev.value });
    });

    diagFolder.addBinding(params, 'xrayMode', {
      label: 'X-Ray Drivetrain View',
    }).on('change', (ev) => {
      soundEngine.playChime(ev.value ? 840 : 440, 0.15);
      onSettingsChange({ ...params, xrayMode: ev.value });
    });

    // 2. Paint Finishes Folder
    const paintFolder = pane.addFolder({ title: 'COACHWORK & FINISH' });
    paintFolder.addBinding(params, 'paintFinish', {
      options: {
        'Matte Stealth Black': 'stealthBlack',
        'Liquid Titanium': 'liquidTitanium',
        'Electric Metallic Violet': 'metallicViolet',
        'Hyper Sonic Cyan': 'hyperCyan',
      },
      label: 'Paint Preset',
    }).on('change', (ev) => {
      const presetKey = ev.value as PaintFinish;
      const preset = PAINT_PRESETS[presetKey];
      onSettingsChange({
        ...params,
        paintFinish: presetKey,
        bodyColor: preset.color,
        roughness: preset.roughness,
        metalness: preset.metalness,
        clearcoat: preset.clearcoat,
      });
    });

    paintFolder.addBinding(params, 'roughness', {
      min: 0.05,
      max: 0.7,
      step: 0.02,
      label: 'Clearcoat Polish',
    }).on('change', (ev) => {
      onSettingsChange({ ...params, roughness: ev.value });
    });

    paintFolder.addBinding(params, 'metalness', {
      min: 0.2,
      max: 1.0,
      step: 0.02,
      label: 'Metallic Flake',
    }).on('change', (ev) => {
      onSettingsChange({ ...params, metalness: ev.value });
    });

    // 3. Headlight & Floor Lighting
    const lightFolder = pane.addFolder({ title: 'LIGHTING & FLOOR' });
    lightFolder.addBinding(params, 'headlightIntensity', {
      min: 0.5,
      max: 3.5,
      step: 0.1,
      label: 'LED Headlight Lux',
    }).on('change', (ev) => {
      onSettingsChange({ ...params, headlightIntensity: ev.value });
    });

    lightFolder.addBinding(params, 'floorReflectionOpacity', {
      min: 0.1,
      max: 1.0,
      step: 0.05,
      label: 'Floor Shadow Density',
    }).on('change', (ev) => {
      onSettingsChange({ ...params, floorReflectionOpacity: ev.value });
    });

    // 4. Camera Parallax
    const camFolder = pane.addFolder({ title: 'INTERACTION & SENSITIVITY' });
    camFolder.addBinding(params, 'cameraSensitivity', {
      min: 0.2,
      max: 2.0,
      step: 0.1,
      label: 'Parallax Pan',
    }).on('change', (ev) => {
      onSettingsChange({ ...params, cameraSensitivity: ev.value });
    });

    pane.addButton({
      title: 'Reset Factory Calibration',
    }).on('click', () => {
      onReset();
    });

    return () => {
      pane.dispose();
      paneRef.current = null;
    };
  }, [isOpen]);

  const selectPreset = (key: PaintFinish) => {
    soundEngine.playHoverTone();
    const preset = PAINT_PRESETS[key];
    onSettingsChange({
      ...settings,
      paintFinish: key,
      bodyColor: preset.color,
      roughness: preset.roughness,
      metalness: preset.metalness,
      clearcoat: preset.clearcoat,
    });
  };

  const toggleVehicleModel = () => {
    const nextModel = settings.vehicleModel === 'taycan' ? 'concept' : 'taycan';
    soundEngine.playChime(nextModel === 'taycan' ? 880 : 540, 0.18);
    onSettingsChange({
      ...settings,
      vehicleModel: nextModel,
    });
  };

  const toggleXray = () => {
    soundEngine.playChime(!settings.xrayMode ? 840 : 440, 0.15);
    onSettingsChange({
      ...settings,
      xrayMode: !settings.xrayMode,
    });
  };

  return (
    <div className="fixed top-20 sm:top-24 right-3 sm:right-6 z-40 flex flex-col items-end">
      {/* Quick Color Swatches Bar - Compact on Mobile */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 p-1.5 rounded-full bg-black/75 backdrop-blur-xl border border-white/10 shadow-lg">
        {/* Model Selector Pill (Porsche Taycan vs Concept) */}
        <button
          onClick={toggleVehicleModel}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wider transition-all cursor-pointer ${
            settings.vehicleModel === 'taycan'
              ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.6)]'
              : 'bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white'
          }`}
          title="Switch between Porsche Taycan and Concept Hypercar"
        >
          <Car className={`w-3 h-3 ${settings.vehicleModel === 'taycan' ? 'text-slate-950' : 'text-amber-400'}`} />
          <span>{settings.vehicleModel === 'taycan' ? 'TAYCAN' : 'CONCEPT'}</span>
        </button>

        {/* X-Ray Mode Quick Toggle Pill */}
        <button
          onClick={toggleXray}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wider transition-all cursor-pointer ${
            settings.xrayMode
              ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse'
              : 'bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white'
          }`}
          title="Toggle X-Ray Drivetrain View"
        >
          <Eye className={`w-3 h-3 ${settings.xrayMode ? 'text-slate-950' : 'text-cyan-400'}`} />
          <span>X-RAY</span>
        </button>

        {/* Paint Studio Overlay Toggle Button */}
        <button
          onClick={() => {
            soundEngine.playChime(720, 0.2);
            onOpenPaintStudio();
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wider bg-gradient-to-r from-cyan-500 to-violet-600 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)] cursor-pointer"
          title="Open Visual Paint Studio"
        >
          <Palette className="w-3 h-3 text-slate-950" />
          <span className="hidden xs:inline">Paint Studio</span>
        </button>

        {/* Color presets swatches */}
        {(Object.keys(PAINT_PRESETS) as PaintFinish[]).map((key) => {
          const p = PAINT_PRESETS[key];
          const isSelected = settings.paintFinish === key;
          return (
            <button
              key={key}
              onClick={() => selectPreset(key)}
              title={p.name}
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all cursor-pointer relative flex items-center justify-center shrink-0 ${
                isSelected ? 'scale-110 ring-2 ring-cyan-400' : 'opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: p.color }}
            >
              {isSelected && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white drop-shadow" />}
            </button>
          );
        })}

        <button
          onClick={() => {
            soundEngine.playHoverTone();
            setIsOpen(!isOpen);
          }}
          className="ml-0.5 px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-medium tracking-wider bg-white/10 hover:bg-white/20 text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Sliders className="w-3 h-3 text-cyan-400" />
          <span className="hidden sm:inline">{isOpen ? 'Close' : 'PBR Config'}</span>
        </button>
      </div>

      {/* Expanded Tweakpane Modal / Bottom Sheet */}
      {isOpen && (
        <div className="mt-2 relative w-[calc(100vw-2rem)] max-w-xs sm:w-80 p-3 rounded-2xl bg-[#0c0c14]/95 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_15px_45px_rgba(0,0,0,0.85)] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 px-1">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
              <span className="text-cyan-400">●</span> REALTIME AUTOMOTIVE PBR
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
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
