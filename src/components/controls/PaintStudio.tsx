import React from 'react';
import { Sparkles, Palette, Check, Sliders, Droplets, Flame } from 'lucide-react';
import { CarSettings } from '../../types';
import { PAINT_PRESETS } from '../../data/vehicleData';
import { soundEngine } from '../../utils/audio';

interface PaintStudioProps {
  settings: CarSettings;
  onSettingsChange: (settings: CarSettings) => void;
  isOpen: boolean;
  onClose: () => void;
}

// 5 curated custom paint blends for gradient slider blending
export const COLOR_SPECTRUM = [
  { pos: 0, name: 'Stealth Obsidian', color: '#0d0d12', secondary: '#1e1e28', flake: 0.85, rough: 0.35, clear: 0.2 },
  { pos: 25, name: 'Electric Violet', color: '#5b21b6', secondary: '#8b5cf6', flake: 0.95, rough: 0.15, clear: 0.85 },
  { pos: 50, name: 'Hyper Sonic Cyan', color: '#0284c7', secondary: '#38bdf8', flake: 0.92, rough: 0.14, clear: 0.88 },
  { pos: 75, name: 'Liquid Titanium', color: '#b0b8c4', secondary: '#f1f5f9', flake: 0.98, rough: 0.12, clear: 0.92 },
  { pos: 100, name: 'Crimson Solar Apex', color: '#dc2626', secondary: '#fb7185', flake: 0.9, rough: 0.16, clear: 0.8 },
];

export const PaintStudio: React.FC<PaintStudioProps> = ({
  settings,
  onSettingsChange,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  // Linear interpolation of RGB color hex
  const interpolateColor = (color1: string, color2: string, factor: number) => {
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);

    const r1 = (c1 >> 16) & 255;
    const g1 = (c1 >> 8) & 255;
    const b1 = c1 & 255;

    const r2 = (c2 >> 16) & 255;
    const g2 = (c2 >> 8) & 255;
    const b2 = c2 & 255;

    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const handleSliderChange = (val: number) => {
    // Find surrounding spectrum anchor points
    let lower = COLOR_SPECTRUM[0];
    let upper = COLOR_SPECTRUM[COLOR_SPECTRUM.length - 1];

    for (let i = 0; i < COLOR_SPECTRUM.length - 1; i++) {
      if (val >= COLOR_SPECTRUM[i].pos && val <= COLOR_SPECTRUM[i + 1].pos) {
        lower = COLOR_SPECTRUM[i];
        upper = COLOR_SPECTRUM[i + 1];
        break;
      }
    }

    const range = upper.pos - lower.pos;
    const factor = range === 0 ? 0 : (val - lower.pos) / range;
    const blendedColor = interpolateColor(lower.color, upper.color, factor);
    const blendedFlake = lower.flake + factor * (upper.flake - lower.flake);
    const blendedRoughness = lower.rough + factor * (upper.rough - lower.rough);
    const blendedClearcoat = lower.clear + factor * (upper.clear - lower.clear);

    onSettingsChange({
      ...settings,
      bodyColor: blendedColor,
      metalness: blendedFlake,
      roughness: blendedRoughness,
      clearcoat: blendedClearcoat,
    });
  };

  return (
    <div className="fixed inset-x-4 sm:inset-x-auto sm:right-6 bottom-6 sm:bottom-8 z-50 sm:w-96 bg-black/85 backdrop-blur-2xl border border-cyan-500/40 rounded-3xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(6,182,212,0.25)] animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Studio Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs sm:text-sm font-black font-display text-white uppercase tracking-wider">
            Paint Studio &bull; Realtime Finish
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-mono"
        >
          ✕
        </button>
      </div>

      {/* Real-time Color Gradient Spectrum Slider */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              <span>COLOR GRADIENT SPECTRUM</span>
            </span>
            <span
              className="px-2 py-0.5 rounded font-mono text-[11px] font-bold border border-white/20 text-white"
              style={{ backgroundColor: settings.bodyColor }}
            >
              {settings.bodyColor.toUpperCase()}
            </span>
          </div>

          {/* Continuous Gradient Bar */}
          <div className="relative h-6 w-full rounded-xl overflow-hidden p-0.5 border border-white/20 bg-slate-900">
            <div
              className="w-full h-full rounded-lg"
              style={{
                background:
                  'linear-gradient(to right, #0d0d12 0%, #5b21b6 25%, #0284c7 50%, #b0b8c4 75%, #dc2626 100%)',
              }}
            />
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              onChange={(e) => handleSliderChange(+e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Color gradient transition slider"
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
            <span>Obsidian</span>
            <span>Violet</span>
            <span>Sonic Cyan</span>
            <span>Titanium</span>
            <span>Crimson</span>
          </div>
        </div>

        {/* Metallic Flakes Density Slider */}
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>METALLIC FLAKE INTENSITY</span>
            </span>
            <span className="text-cyan-400 font-bold tabular-nums">
              {(settings.metalness * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.02"
            value={settings.metalness}
            onChange={(e) => {
              onSettingsChange({ ...settings, metalness: +e.target.value });
            }}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Clearcoat Polish */}
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>CLEARCOAT GLOSS LAYER</span>
            </span>
            <span className="text-cyan-400 font-bold tabular-nums">
              {(settings.clearcoat * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0.0"
            max="1.0"
            step="0.02"
            value={settings.clearcoat}
            onChange={(e) => {
              onSettingsChange({ ...settings, clearcoat: +e.target.value });
            }}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Headlight Color Accents */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">LED HEADLIGHT BLADES:</span>
          <div className="flex items-center gap-2">
            {[
              { color: '#06b6d4', label: 'Cyan' },
              { color: '#ffffff', label: 'Hyper White' },
              { color: '#a855f7', label: 'Violet' },
              { color: '#eab308', label: 'Gold' },
            ].map((hl) => (
              <button
                key={hl.color}
                onClick={() => {
                  soundEngine.playHoverTone();
                  onSettingsChange({ ...settings, headlightColor: hl.color });
                }}
                className={`w-5 h-5 rounded-full border transition-transform ${
                  settings.headlightColor === hl.color
                    ? 'ring-2 ring-cyan-400 scale-110'
                    : 'border-white/20 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: hl.color }}
                title={hl.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
