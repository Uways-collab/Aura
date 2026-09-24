/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AutomotiveScene } from './components/canvas/AutomotiveScene';
import { HotspotOverlay } from './components/canvas/HotspotOverlay';
import { AutomotiveTweakpane } from './components/controls/AutomotiveTweakpane';
import { PaintStudio } from './components/controls/PaintStudio';
import { AutomotiveNavbar } from './components/layout/AutomotiveNavbar';
import { AutomotiveHero } from './components/sections/AutomotiveHero';
import { SpecsSection } from './components/sections/SpecsSection';
import { EngineeringSection } from './components/sections/EngineeringSection';
import { ReserveSection } from './components/sections/ReserveSection';
import { AutomotiveFooter } from './components/layout/AutomotiveFooter';
import { CarSettings } from './types';
import { PAINT_PRESETS } from './data/vehicleData';
import { LenisProvider, useLenisScroll } from './context/LenisScrollContext';

const DEFAULT_CAR_SETTINGS: CarSettings = {
  paintFinish: 'stealthBlack',
  bodyColor: PAINT_PRESETS.stealthBlack.color,
  roughness: PAINT_PRESETS.stealthBlack.roughness,
  metalness: PAINT_PRESETS.stealthBlack.metalness,
  clearcoat: PAINT_PRESETS.stealthBlack.clearcoat,
  headlightIntensity: 1.8,
  headlightColor: '#06b6d4', // Hyper Cyan
  taillightColor: '#ff0033', // Ruby Laser
  floorReflectionOpacity: 0.65,
  activeAero: true,
  cameraSensitivity: 1.0,
  xrayMode: false,
  vehicleModel: 'taycan',
};

function AppContent() {
  const [settings, setSettings] = useState<CarSettings>(DEFAULT_CAR_SETTINGS);
  const [isPaintStudioOpen, setIsPaintStudioOpen] = useState(false);

  // Consume Lenis inertia scroll velocity and progress from global context
  const { scrollProgress, scrollVelocity } = useLenisScroll();

  const handleResetSettings = () => {
    setSettings(DEFAULT_CAR_SETTINGS);
  };

  const handleScrollToReserve = () => {
    const el = document.getElementById('reserve');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSpecs = () => {
    const el = document.getElementById('specs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#06060a] text-slate-100 selection:bg-cyan-500 selection:text-black overflow-x-hidden touch-action-pan-y">
      {/* 1. Full-Screen 3D Automotive WebGL Canvas with Responsive Camera & DPR scaling */}
      <AutomotiveScene
        settings={settings}
        scrollProgress={scrollProgress}
        scrollVelocity={scrollVelocity}
      />

      {/* 2. Responsive 3D Spec Hotspots (Floating on desktop, bottom-drawer on mobile) */}
      <HotspotOverlay scrollProgress={scrollProgress} />

      {/* 3. Floating Quick Swatches & Tweakpane Configurator */}
      <AutomotiveTweakpane
        settings={settings}
        onSettingsChange={setSettings}
        onReset={handleResetSettings}
        onOpenPaintStudio={() => setIsPaintStudioOpen(true)}
      />

      {/* 4. Visual Paint Studio Gradient & Flake Transition Overlay */}
      <PaintStudio
        settings={settings}
        onSettingsChange={setSettings}
        isOpen={isPaintStudioOpen}
        onClose={() => setIsPaintStudioOpen(false)}
      />

      {/* 5. Mobile-First Fixed Automotive Navbar */}
      <AutomotiveNavbar
        onReserveClick={handleScrollToReserve}
        onOpenPaintStudio={() => setIsPaintStudioOpen(true)}
      />

      {/* 6. Page Sections with Inertia Momentum, Fluid Clamp Typography & 100dvh */}
      <main className="relative z-10">
        <AutomotiveHero
          scrollVelocity={scrollVelocity}
          onExploreClick={handleScrollToSpecs}
          onReserveClick={handleScrollToReserve}
        />

        <SpecsSection scrollVelocity={scrollVelocity} />

        <EngineeringSection scrollVelocity={scrollVelocity} />

        <ReserveSection />
      </main>

      {/* 7. Minimalist Luxury Automotive Footer */}
      <AutomotiveFooter />
    </div>
  );
}

export default function App() {
  return (
    <LenisProvider>
      <AppContent />
    </LenisProvider>
  );
}
