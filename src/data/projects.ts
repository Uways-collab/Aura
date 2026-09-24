import { Project } from '../types';
import kizunaImg from '../assets/images/work_kizuna_ai_1790245939693.jpg';
import wearGoImg from '../assets/images/work_wear_go_land_1790245954498.jpg';
import discoatImg from '../assets/images/work_discoat_ss_1790245967609.jpg';
import unrealImg from '../assets/images/work_unreal_engine_1790245976100.jpg';

export const PROJECTS: Project[] = [
  {
    id: 'kizuna-ai-fortnite',
    title: 'KizunaAI - Hello, Fortnite',
    subtitle: 'Epic Games Metaverse Live Concert & Virtual Stage',
    client: 'KizunaAI Inc. / Epic Games',
    category: 'Virtual Production / Unreal Engine',
    year: '2025',
    image: kizunaImg,
    overview: 'A milestone spatial performance combining real-time holographic motion capture inside Fortnite Creative with custom Unreal Engine 5 stage physics, synchronized spatial audio, and interactive crowd laser systems.',
    technologies: ['Unreal Engine 5', 'Fortnite Creative 2.0', 'Motion Matching', 'Spatial Audio API', 'Subsurface Scattering'],
    metrics: [
      { label: 'Concurrent Attendees', value: '420,000+' },
      { label: 'Render Latency', value: '< 16.4ms' },
      { label: 'Global Fan Reach', value: '82 Countries' }
    ],
    awards: ['FWA of the Month', 'Awwwards Site of the Day', 'Tokyo Digital Art Grand Prix'],
    highlight: 'Pioneered custom live lighting relays directly communicating with Epic Games cloud multiplayer servers.'
  },
  {
    id: 'wear-go-land',
    title: 'WEAR GO LAND',
    subtitle: 'Zero-Gravity Virtual Fashion Exhibition & Runway',
    client: 'ZOZO Inc. / WEAR',
    category: 'Spatial WebGL / Virtual Fashion',
    year: '2025',
    image: wearGoImg,
    overview: 'A zero-gravity virtual fashion runway where attendees can browse, inspect, and experience high-fashion physical garments transformed into volumetric 3D meshes with real-time cloth simulation.',
    technologies: ['WebGL / Three.js', 'Custom Cloth PhysX', 'GLTF Draco Mesh', 'Node WebGL Pipeline', 'Post-Processing Bloom'],
    metrics: [
      { label: 'Interactive Dwell Time', value: '18m 42s' },
      { label: 'Garment Mesh Polys', value: '1.2M Optimized' },
      { label: 'Conversion Lift', value: '+310%' }
    ],
    awards: ['Awwwards Developer Award', 'CSSDA Best UI/UX'],
    highlight: 'Engineered GPU-accelerated cloth shader that runs smoothly at 60 FPS on both mobile Safari and high-end desktop GPUs.'
  },
  {
    id: 'discoat-2025ss',
    title: 'DISCOAT 2025SS Lookbook',
    subtitle: 'Architectural Digital Lookbook & Spatial Commerce',
    client: 'PAL CLOSET / DISCOAT',
    category: 'Interactive 3D / Brand Experience',
    year: '2025',
    image: discoatImg,
    overview: 'An ethereal digital lookbook installation challenging conventional e-commerce. Fabric drapery, sunlight refractions, and fluid camera transitions invite users into an architectural dreamscape of seasonal apparel.',
    technologies: ['React Three Fiber', 'GLSL Custom Iridescence', 'GSAP Scroll Choreography', 'Lenis Smooth Scroll'],
    metrics: [
      { label: 'Page Engagement', value: '89.4%' },
      { label: 'Unique Visitors', value: '1.4M+' },
      { label: 'Average Frame Rate', value: '60 FPS' }
    ],
    awards: ['FWA of the Day', 'Tokyo ADC Nominee'],
    highlight: 'Fluid physics-driven camera orbits tied directly to inertia scroll momentum.'
  },
  {
    id: 'unreal-engine-world',
    title: 'Unreal Engine World',
    subtitle: 'Cybernetic Japanese Pavilion & Real-Time Environment',
    client: 'Alche R&D / Tech Showcase',
    category: 'Real-Time Spatial / Environment Design',
    year: '2026',
    image: unrealImg,
    overview: 'An experimental showcase exploring the boundary between high-end digital agency web frontends and cinematic Unreal Engine 5 world spaces, featuring cybernetic Japanese architectural koi waters and volumetric mist.',
    technologies: ['Nanite & Lumen', 'WebGPU Hybrid Bridge', 'Volumetric Shaders', 'Binaural Audio Engine'],
    metrics: [
      { label: 'Active World Assets', value: '3,800+' },
      { label: 'Dynamic Lights', value: '64 Real-time' },
      { label: 'Shader Compute Time', value: '2.1ms' }
    ],
    awards: ['Epic MegaGrants Recipient', 'CES Digital Innovation Showcase'],
    highlight: 'Seamless bidirectional state synchronization between web client DOM elements and 3D simulation instances.'
  }
];

export const STUDIO_METRICS = [
  {
    label: 'WebGL Engine Speed',
    value: '60 FPS',
    change: 'Rock Solid',
    description: 'Hardware-accelerated rendering with custom low-overhead shaders'
  },
  {
    label: 'Global Recognitions',
    value: '18+',
    change: 'FWA / Awwwards',
    description: 'Celebrated worldwide for interactive 3D craft & spatial computing'
  },
  {
    label: 'Interaction Latency',
    value: '0.04s',
    change: '< 40ms',
    description: 'Instant response time for mouse tilt, scroll inertia and sound synth'
  },
  {
    label: 'World Render Scale',
    value: '100k+',
    change: 'Particles',
    description: 'Real-time floating cosmic dust with dynamic velocity vector field'
  }
];
