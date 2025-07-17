import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkipBack, SkipForward, Play, Pause, Clock, Compass, Flag } from 'phosphor-react';
import { useApp } from '@/context/AppContext';

interface ChronosModePanelProps {
  className?: string;
}

export const ChronosModePanel: React.FC<ChronosModePanelProps> = ({ className = "" }) => {
  const { state: _state } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimelinePoint, setCurrentTimelinePoint] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const timelineEvents = [
    { id: 'origin', title: 'Origin Point', date: '3000 BC', description: 'The beginning of recorded knowledge', icon: '🏛️', gradient: 'from-violet-500 to-purple-600' },
    { id: 'discovery', title: 'Key Discovery', date: '1543 AD', description: 'Revolutionary breakthrough in understanding', icon: '🔬', gradient: 'from-pink-500 to-rose-600' },
    { id: 'development', title: 'Modern Development', date: '1900 AD', description: 'Scientific advancement and refinement', icon: '⚡', gradient: 'from-indigo-500 to-blue-600' },
    { id: 'application', title: 'Current Application', date: '2024 AD', description: 'Present-day implementation and future', icon: '🚀', gradient: 'from-cyan-500 to-teal-600' },
    { id: 'future', title: 'Future Vision', date: '2050 AD', description: 'Projected developments and possibilities', icon: '🔮', gradient: 'from-amber-500 to-orange-600' }
  ];

  const currentEvent = timelineEvents[currentTimelinePoint];

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.2)'
            }}
          >
            <div className="relative aspect-video bg-black/50">
              <div className="absolute inset-0 opacity-15">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-full w-px"
                    style={{ left: `${(i + 1) * 10}%`, background: 'linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.3), transparent)' }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  d="M 10 50 Q 30 30 50 50 T 90 50"
                  stroke="url(#chronos-gradient)"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
                <defs>
                  <linearGradient id="chronos-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>

              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="absolute"
                  style={{ left: `${20 + index * 15}%`, top: '45%', transform: 'translate(-50%, -50%)' }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: index === currentTimelinePoint ? 1.3 : 1, opacity: 1 }}
                  transition={{ delay: index * 0.15, type: "spring" }}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentTimelinePoint(index)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-xl border-2 transition-all ${index === currentTimelinePoint ? 'border-white/50 bg-white/20' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}
                    style={index === currentTimelinePoint ? { boxShadow: `0 0 30px -5px ${index % 2 === 0 ? 'rgba(139, 92, 246, 0.5)' : 'rgba(236, 72, 153, 0.5)'}` } : {}}
                  >
                    <span className="text-2xl">{event.icon}</span>
                  </motion.button>

                  <motion.div
                    className="absolute top-full mt-3 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-xs font-bold text-white">{event.title}</div>
                    <div className="text-xs text-[var(--text-muted)]">{event.date}</div>
                  </motion.div>
                </motion.div>
              ))}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentEvent.id}
                  className="absolute bottom-6 left-6 right-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="p-5 rounded-2xl backdrop-blur-xl"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${currentEvent.gradient}`}>
                        <span className="text-xl">{currentEvent.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{currentEvent.title}</h3>
                        <p className="text-sm text-[var(--text-muted)]">{currentEvent.date}</p>
                      </div>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm">{currentEvent.description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentTimelinePoint(Math.max(0, currentTimelinePoint - 1))}
                  disabled={currentTimelinePoint === 0}
                  className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <SkipBack size={18} weight="fill" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 rounded-xl text-white"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
                >
                  {isPlaying ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentTimelinePoint(Math.min(timelineEvents.length - 1, currentTimelinePoint + 1))}
                  disabled={currentTimelinePoint === timelineEvents.length - 1}
                  className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <SkipForward size={18} weight="fill" />
                </motion.button>
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
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
                <Clock size={24} weight="fill" className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Temporal Learning Experience</h3>
                <p className="text-sm text-[var(--text-muted)]">Journey through time</p>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Journey through time as your educational content unfolds chronologically. Experience historical context,
              evolutionary development, and future projections in an immersive timeline visualization.
            </p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div
            className="p-6 rounded-3xl h-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
                <Compass size={20} weight="fill" className="text-white" />
              </div>
              <h3 className="font-bold text-white">Timeline Controls</h3>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">Zoom Level</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                  className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                />
                <span className="text-sm text-[var(--text-muted)] w-12">{zoomLevel.toFixed(1)}x</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {timelineEvents.map((event, index) => (
                <motion.button
                  key={event.id}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentTimelinePoint(index)}
                  className={`w-full p-4 rounded-2xl text-left transition-all ${index === currentTimelinePoint ? 'bg-gradient-to-r ' + event.gradient + '/20 border-2 border-transparent' : 'bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1]'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{event.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm">{event.title}</h4>
                      <p className="text-xs text-[var(--text-muted)]">{event.date}</p>
                    </div>
                    {index === currentTimelinePoint && (
                      <motion.div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.05]">
              <h4 className="font-semibold text-white mb-4 text-sm">Timeline Analytics</h4>
              <div className="space-y-3">
                {[
                  { label: 'Events Explored', value: `${currentTimelinePoint + 1}/${timelineEvents.length}`, color: '#8b5cf6' },
                  { label: 'Time Span', value: '5000+ years', color: '#06b6d4' },
                  { label: 'Progress', value: `${Math.round(((currentTimelinePoint + 1) / timelineEvents.length) * 100)}%`, color: '#ec4899' }
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-muted)]">{stat.label}</span>
                    <span className="text-sm font-semibold" style={{ color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))', border: '1px solid rgba(139, 92, 246, 0.3)' }}
            >
              <Flag size={18} weight="fill" />
              Start Journey
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
