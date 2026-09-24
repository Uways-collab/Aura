import React, { useEffect } from 'react';
import { X, ExternalLink, Award, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { Project } from '../../types';
import { soundEngine } from '../../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0c14] border border-cyan-500/30 shadow-[0_20px_70px_rgba(6,182,212,0.25)] z-10 text-slate-100 p-6 sm:p-10">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playHoverTone();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
          <span>{project.category}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{project.client}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{project.year}</span>
        </div>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-3">
          {project.title}
        </h2>
        <p className="text-base text-slate-300 font-light mb-8 max-w-2xl">
          {project.subtitle}
        </p>

        {/* High-res Image Showcase */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 border border-white/10 bg-slate-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-transparent to-transparent opacity-60" />
        </div>

        {/* Project Overview & Key Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
          <div className="md:col-span-7 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Project Architecture & Brief
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {project.overview}
            </p>
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Key Innovation:</strong> {project.highlight}
              </span>
            </div>
          </div>

          <div className="md:col-span-5 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Verified Performance
            </h4>
            <div className="space-y-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between"
                >
                  <span className="text-xs text-slate-400">{m.label}</span>
                  <span className="text-sm font-bold font-mono text-cyan-300 tabular-nums">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack & Recognitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono bg-white/5 rounded-lg border border-white/10 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.awards && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Awards & Industry Honors
              </h4>
              <div className="space-y-2">
                {project.awards.map((award) => (
                  <div key={award} className="flex items-center gap-2 text-xs text-violet-300">
                    <Award className="w-4 h-4 text-violet-400" />
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono tracking-wider transition-colors cursor-pointer"
          >
            Back to Portfolio
          </button>

          <button
            onClick={() => {
              soundEngine.playChime(800, 0.2);
              alert(`Launching live simulation viewer for ${project.title}. Connecting to WebGL server node...`);
            }}
            className="px-6 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            <span>Launch Live Experience</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
