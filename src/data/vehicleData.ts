import { SpecItem, Hotspot } from '../types';

export const VEHICLE_SPECS: SpecItem[] = [
  {
    id: 'hp',
    label: 'Peak Output',
    value: '1,500',
    unit: 'HP',
    detail: 'Quad axial-flux magnet motors with torque vectoring per wheel',
    category: 'powertrain',
  },
  {
    id: 'acceleration',
    label: '0–60 MPH',
    value: '1.74',
    unit: 'SEC',
    detail: 'Carbon ceramic launch control with active aero preload',
    category: 'powertrain',
  },
  {
    id: 'top-speed',
    label: 'Top Speed',
    value: '250+',
    unit: 'MPH',
    detail: 'Electronically limited track velocity with DRS mode',
    category: 'powertrain',
  },
  {
    id: 'battery',
    label: 'Solid-State Battery',
    value: '120',
    unit: 'kWh',
    detail: 'Silicon-graphene electrolyte with 98% charge retention',
    category: 'battery',
  },
  {
    id: 'range',
    label: 'EPA Range',
    value: '620',
    unit: 'MILES',
    detail: 'High-density pack architecture with regenerative thermal loop',
    category: 'battery',
  },
  {
    id: 'charging',
    label: '800V Architecture',
    value: '12',
    unit: 'MIN (10–80%)',
    detail: '450 kW ultra-fast DC fast charging protocol',
    category: 'battery',
  },
  {
    id: 'drag',
    label: 'Drag Coefficient',
    value: '0.19',
    unit: 'Cd',
    detail: 'Venturi tunnels with dynamic active rear diffuser and front flaps',
    category: 'aero',
  },
  {
    id: 'weight',
    label: 'Dry Curb Weight',
    value: '3,480',
    unit: 'LBS',
    detail: 'Full Toray T1100 carbon monocoque and forged magnesium wheels',
    category: 'chassis',
  },
];

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'hero',
    scrollRange: [0, 0.18],
    title: 'AURA EV // HYPER-PERFORMANCE CONCEPT',
    headline: 'BEYOND SPEED',
    specs: [
      'Next-Gen Active Aero & Matrix LED Light Blades',
      'High-Downforce Front Splitter with Ground-Effect Venturi',
      'Zero-Compromise Carbon Fiber Architecture',
    ],
    position: 'bottom-left',
  },
  {
    id: 'battery',
    scrollRange: [0.19, 0.48],
    title: 'UNDERBODY PACK // SOLID-STATE CORE',
    headline: '120 kWh SOLID-STATE BATTERY',
    specs: [
      '620 Miles Highway Range on Single Charge',
      '800V Ultra-Fast Architecture (10–80% in 12 Mins)',
      'Sub-Floor Structural Pack Lowering CG to 380mm',
    ],
    position: 'bottom-left',
  },
  {
    id: 'aero',
    scrollRange: [0.49, 0.78],
    title: 'ACTIVE FLUIDICS // TEARDROP COCKPIT',
    headline: 'ACTIVE CARBON AERODYNAMICS',
    specs: [
      '0.19 Drag Coefficient (Cd) in Streamline Cruise',
      'Dual-Element Electro-Hydraulic Active Rear Wing',
      'Electrochromic Solar Glass Canopy with 99.8% UV Shield',
    ],
    position: 'top-right',
  },
  {
    id: 'performance',
    scrollRange: [0.79, 1.0],
    title: 'QUAD-MOTOR DRIVE // POWERTRAIN APEX',
    headline: '1,500 HP QUAD-MOTOR AWD',
    specs: [
      '0–60 MPH in 1.74 Seconds with Launch Control',
      'Top Speed 250+ MPH Track Calibrated',
      'Real-Time Millisecond Dynamic Torque Vectoring',
    ],
    position: 'top-left',
  },
];

export const PAINT_PRESETS = {
  stealthBlack: {
    name: 'Matte Stealth Black',
    color: '#0d0d11',
    roughness: 0.35,
    metalness: 0.85,
    clearcoat: 0.2,
  },
  liquidTitanium: {
    name: 'Liquid Titanium',
    color: '#b0b8c4',
    roughness: 0.12,
    metalness: 0.95,
    clearcoat: 0.9,
  },
  metallicViolet: {
    name: 'Electric Metallic Violet',
    color: '#5b21b6',
    roughness: 0.15,
    metalness: 0.92,
    clearcoat: 0.85,
  },
  hyperCyan: {
    name: 'Hyper Sonic Cyan',
    color: '#0284c7',
    roughness: 0.14,
    metalness: 0.9,
    clearcoat: 0.88,
  },
};
