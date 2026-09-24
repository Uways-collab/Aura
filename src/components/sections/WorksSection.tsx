import React, { useState, useRef } from 'react';
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../../types';
import { PROJECTS } from '../../data/projects';
import { soundEngine } from '../../utils/audio';
import { KineticTextReveal } from '../common/KineticTextReveal';

interface WorksSectionProps {
  onSelectProject: (project: Project) => void;
  scrollVelocity?: number;
}

// Interactive 3D Perspective Tilt Card with Neon Glow & Dynamic Skew
function ProjectCard({
  project,
  onSelect,
  scrollVelocity = 0,
}: {
  project: Project;
  onSelect: () => void;
  scrollVelocity?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Move listener: calculate cursor's relative X & Y within card boundaries
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation: -14 to +14 degrees
    const rotateY = ((x / rect.width) - 0.5) * 22;
    const rotateX = ((y / rect.height) - 0.5) * -22;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playHoverTone();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Dynamic scroll skew effect: transform: skewY(calc(velocity * 0.1deg))
  const skewDegree = Math.max(Math.min(scrollVelocity * 0.1, 10), -10);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        soundEngine.playChime(700, 0.25);
        onSelect();
      }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) skewY(${skewDegree}deg) scale3d(${isHovered ? 1.025 : 1}, ${isHovered ? 1.025 : 1}, 1)`,
        boxShadow: isHovered
          ? '0 0 35px rgba(139, 92, 246, 0.45), 0 20px 50px rgba(6, 182, 212, 0.25)'
          : '0 10px 30px rgba(0, 0, 0, 0.5)',
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease'
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease',
      }}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-white/5 backdrop-blur-xl border will-change-transform ${
        isHovered
          ? 'border-cyan-400'
          : 'border-white/10'
      }`}
    >
      {/* Visual Image container with Smooth Zoom */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Subtle Contrast Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-black/40 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

        {/* Floating Year / Client badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
            {project.client}
          </span>
          <span className="bg-black/65 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/15 text-cyan-300 font-bold">
            {project.year}
          </span>
        </div>

        {/* Glowing inspect arrow */}
        <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white/10 group-hover:bg-cyan-400 group-hover:text-black text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg">
          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-7">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 font-medium">
          <span>{project.category}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-300 transition-colors font-display tracking-tight mb-2">
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 font-light leading-relaxed mb-5">
          {project.subtitle}
        </p>

        {/* Technologies Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono text-slate-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/10"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[11px] font-mono text-slate-500">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export const WorksSection: React.FC<WorksSectionProps> = ({
  onSelectProject,
  scrollVelocity = 0,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'Virtual Production / Unreal Engine', label: 'Unreal & Virtual Production' },
    { id: 'Spatial WebGL / Virtual Fashion', label: 'Spatial WebGL' },
    { id: 'Interactive 3D / Brand Experience', label: 'Interactive 3D' },
  ];

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  const scrollGallery = (direction: 'left' | 'right') => {
    soundEngine.playHoverTone();
    if (!scrollContainerRef.current) return;
    const distance = 460;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  const headerSkew = Math.max(Math.min(scrollVelocity * 0.08, 8), -8);

  return (
    <section id="works" className="relative z-10 py-28 max-w-7xl mx-auto px-6 sm:px-12">
      {/* Section Header with Dynamic Skew and Kinetic Letter Reveal */}
      <div
        style={{
          transform: `skewY(${headerSkew}deg)`,
          transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10 will-change-transform"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01. Selected Works Gallery</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-none">
            <KineticTextReveal as="span" stagger={0.025}>
              WORKS
            </KineticTextReveal>
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-light">
            Interactive virtual productions, brand spaces & metaverse experiences.
          </p>
        </div>

        {/* Filter Controls & Horizontal Scroll Arrows */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playHoverTone();
                  setFilter(cat.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filter === cat.id
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Navigation Scroll Buttons */}
          <div className="hidden sm:flex items-center gap-2 ml-2">
            <button
              onClick={() => scrollGallery('left')}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous work"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollGallery('right')}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Next work"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid with Perspective Tilt Cards */}
      <div
        ref={scrollContainerRef}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            scrollVelocity={scrollVelocity}
            onSelect={() => onSelectProject(project)}
          />
        ))}
      </div>
    </section>
  );
};
