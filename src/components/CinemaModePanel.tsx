import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SpeakerHigh, SpeakerSlash, ArrowsOut, Gear, FilmStrip, Sparkle, SkipBack, SkipForward, List } from 'phosphor-react';
import { useApp } from '@/context/AppContext';

interface CinemaModePanelProps {
  className?: string;
  onStartCinema?: () => void;
}

export const CinemaModePanel: React.FC<CinemaModePanelProps> = ({ className = "", onStartCinema }) => {
  const { state } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress] = useState(0);

  const scenes = [
    { id: 'intro', title: 'Introduction', duration: '0:45', icon: FilmStrip, description: 'Opening sequence with key concepts' },
    { id: 'concept', title: 'Core Concepts', duration: '2:30', icon: Sparkle, description: 'Main educational content' },
    { id: 'example', title: 'Examples', duration: '1:15', icon: FilmStrip, description: 'Real-world applications' },
    { id: 'conclusion', title: 'Summary', duration: '0:30', icon: Sparkle, description: 'Key takeaways' }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <div className="relative aspect-video bg-black/50 flex items-center justify-center">
              <motion.div
                animate={{ scale: isPlaying ? [1, 1.02, 1] : 1 }}
                transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
                className="text-center"
              >
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)',
                    border: '1px solid rgba(139, 92, 246, 0.3)'
                  }}
                  animate={{ y: isPlaying ? [0, -10, 0] : 0 }}
                  transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                >
                  <FilmStrip size={48} weight="duotone" className="text-violet-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {state.mockData.title || 'Cinematic Learning Experience'}
                </h3>
                <p className="text-[var(--text-muted)]">
                  {isPlaying ? 'Now playing...' : 'Ready to begin your journey'}
                </p>
              </motion.div>

              <div className="absolute bottom-0 left-0 right-0 p-6" style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)'
              }}>
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-[var(--text-muted)] mb-2">
                    <span>0:00</span>
                    <span className="text-violet-400">{Math.floor(progress * 2.4)}:{String(Math.floor((progress * 144) % 60)).padStart(2, '0')}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-[var(--text-muted)] hover:text-white transition-colors">
                      <SkipBack size={20} weight="fill" />
                    </button>
                    <motion.button
                      onClick={handlePlayPause}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isPlaying ? <Pause size={24} weight="fill" /> : <Play size={24} weight="fill" className="ml-1" />}
                    </motion.button>
                    <button className="p-2 text-[var(--text-muted)] hover:text-white transition-colors">
                      <SkipForward size={20} weight="fill" />
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 text-[var(--text-muted)] hover:text-white transition-colors"
                    >
                      {isMuted ? <SpeakerSlash size={20} weight="fill" /> : <SpeakerHigh size={20} weight="fill" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[var(--text-muted)] hover:text-white transition-colors">
                      <List size={20} weight="bold" />
                    </button>
                    <button className="p-2 text-[var(--text-muted)] hover:text-white transition-colors">
                      <Gear size={20} weight="fill" />
                    </button>
                    <button className="p-2 text-[var(--text-muted)] hover:text-white transition-colors">
                      <ArrowsOut size={20} weight="bold" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="p-6 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                <FilmStrip size={24} weight="fill" className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">About This Experience</h3>
                <p className="text-sm text-[var(--text-muted)]">Cinematic storytelling mode</p>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Transform your educational content into cinematic experiences with dramatic visuals,
              immersive storytelling, and engaging transitions that make learning unforgettable.
            </p>
            {onStartCinema && (
              <motion.button
                onClick={onStartCinema}
                className="w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-3"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 40px -10px rgba(99, 102, 241, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Play size={20} weight="fill" />
                Start Cinema Mode
              </motion.button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div
            className="p-6 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                <Sparkle size={20} weight="fill" className="text-white" />
              </div>
              <h3 className="font-bold text-white">Scene Timeline</h3>
            </div>

            <div className="space-y-3">
              {scenes.map((scene) => {
                const Icon = scene.icon;
                return (
                  <motion.button
                    key={scene.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 rounded-2xl text-left transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(139, 92, 246, 0.2)' }}
                      >
                        <Icon size={18} weight="duotone" className="text-violet-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-white text-sm">{scene.title}</h4>
                          <span className="text-xs text-[var(--text-muted)]">{scene.duration}</span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">{scene.description}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div
            className="p-6 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <h4 className="font-bold text-white mb-4">Cinematic Features</h4>
            <div className="space-y-3">
              {['Dynamic camera angles', 'Smooth transitions', 'Professional pacing', 'Immersive audio'].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} />
                  <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
