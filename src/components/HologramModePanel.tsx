import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Gear, Record, PaperPlaneTilt, Brain, Sparkle, Microphone, MicrophoneSlash, VideoCamera, VideoCameraSlash } from 'phosphor-react';
import { useApp } from '@/context/AppContext';

interface HologramModePanelProps {
  className?: string;
}

export const HologramModePanel: React.FC<HologramModePanelProps> = ({ className = "" }) => {
  const { state } = useApp();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('Conversational');
  const [chatMessage, setChatMessage] = useState('');

  const hologramFeatures = [
    { id: 'gesture', title: 'Gesture Recognition', description: 'AI responds to hand gestures', icon: '👋', active: true },
    { id: 'emotion', title: 'Emotion Detection', description: 'Adapts based on student emotions', icon: '😊', active: true },
    { id: 'voice', title: 'Voice Analysis', description: 'Analyzes tone and pace', icon: '🎤', active: false },
    { id: 'eye', title: 'Eye Tracking', description: 'Monitors attention levels', icon: '👁️', active: false }
  ];

  const teachingStyles = [
    { name: 'Conversational', description: 'Friendly, chat-based' },
    { name: 'Lecture', description: 'Structured presentation' },
    { name: 'Socratic', description: 'Question-based discovery' },
    { name: 'Demonstration', description: 'Show-and-tell approach' }
  ];

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.2)'
            }}
          >
            <div className="relative aspect-video bg-black/50 flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="grid grid-cols-12 grid-rows-8 h-full">
                  {[...Array(96)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="border border-cyan-500/20"
                      animate={{ opacity: [0.05, 0.2, 0.05] }}
                      transition={{ duration: 3, repeat: Infinity, delay: (i % 12) * 0.15 }}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-center relative z-10"
              >
                <motion.div
                  className="w-32 h-32 mx-auto mb-6 rounded-3xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    boxShadow: '0 0 60px -20px rgba(6, 182, 212, 0.4)'
                  }}
                >
                  <User size={56} weight="duotone" className="text-cyan-400" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {state.characterConfig?.name || 'AI Hologram Teacher'}
                </h3>

                <div className="flex items-center justify-center gap-2 mb-3">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: isRecording ? '#ef4444' : '#22c55e' }}
                    animate={{ opacity: isRecording ? [1, 0.3, 1] : 1 }}
                    transition={{ duration: isRecording ? 1 : 999, repeat: isRecording ? Infinity : 0 }}
                  />
                  <span className="text-sm text-[var(--text-muted)]">
                    {isRecording ? 'Recording session...' : 'Ready to teach'}
                  </span>
                </div>

                <p className="text-[var(--text-muted)] text-sm max-w-lg mx-auto">
                  Your AI hologram teacher is ready to provide personalized instruction
                  with advanced gesture recognition and adaptive learning.
                </p>
              </motion.div>

              <div className="absolute top-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-3 rounded-xl transition-all ${isRecording ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  <Record size={20} weight="fill" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
                >
                  <Gear size={20} weight="fill" />
                </motion.button>
              </div>
            </div>

            <div className="p-6" style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)'
            }}>
              <div className="flex items-center gap-4">
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isMicOn ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white' : 'bg-white/10 text-white/50'}`}
                  >
                    {isMicOn ? <Microphone size={22} weight="fill" /> : <MicrophoneSlash size={22} />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isVideoOn ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white' : 'bg-white/10 text-white/50'}`}
                  >
                    {isVideoOn ? <VideoCamera size={22} weight="fill" /> : <VideoCameraSlash size={22} />}
                  </motion.button>
                </div>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Ask your AI teacher anything..."
                    className="w-full px-5 py-4 rounded-2xl text-white placeholder-[var(--text-muted)] transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  >
                    <PaperPlaneTilt size={20} weight="fill" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <AnimatePresence>
            {showSettings ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-6 rounded-3xl h-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>
                    <Sparkle size={20} weight="fill" className="text-white" />
                  </div>
                  <h3 className="font-bold text-white">Hologram Settings</h3>
                </div>

                <div className="space-y-3 mb-6">
                  {hologramFeatures.map((feature) => (
                    <motion.button
                      key={feature.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-2xl text-left transition-all ${feature.active ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-white/[0.02] border border-white/[0.05]'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{feature.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-white text-sm">{feature.title}</div>
                          <div className="text-xs text-[var(--text-muted)]">{feature.description}</div>
                        </div>
                        <div className={`w-2.5 h-2.5 rounded-full ${feature.active ? 'bg-emerald-400' : 'bg-gray-500'}`} />
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/[0.05]">
                  <h4 className="font-semibold text-white mb-3 text-sm">Teaching Style</h4>
                  <div className="space-y-2">
                    {teachingStyles.map((style) => (
                      <motion.button
                        key={style.name}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedStyle(style.name)}
                        className={`w-full p-3 rounded-xl text-left transition-all ${selectedStyle === style.name ? 'bg-cyan-500/20 border border-cyan-500/40' : 'bg-white/[0.02] border border-white/[0.05]'}`}
                      >
                        <div className="font-semibold text-white text-sm">{style.name}</div>
                        <div className="text-xs text-[var(--text-muted)]">{style.description}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.05]">
                  <h4 className="font-semibold text-white mb-4 text-sm">Session Stats</h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Questions', value: '24', color: 'from-cyan-500 to-blue-500' },
                      { label: 'Engagement', value: '92%', color: 'from-pink-500 to-rose-500' },
                      { label: 'Progress', value: '68%', color: 'from-violet-500 to-purple-500' }
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between">
                        <span className="text-sm text-[var(--text-muted)]">{stat.label}</span>
                        <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${stat.color.includes('cyan') ? '#06b6d4' : stat.color.includes('pink') ? '#ec4899' : '#8b5cf6'}, ${stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('rose') ? '#f43f5e' : '#a78bfa'})` }}
                            initial={{ width: 0 }}
                            animate={{ width: stat.value.replace('%', '') + '%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 rounded-3xl h-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>
                    <Brain size={32} weight="fill" className="text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2">AI Capabilities</h3>
                  <p className="text-sm text-[var(--text-muted)]">Advanced holographic teaching</p>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: '🎯', text: 'Personalized learning paths' },
                    { icon: '💡', text: 'Real-time explanations' },
                    { icon: '📊', text: 'Progress tracking' },
                    { icon: '🎭', text: 'Adaptive teaching styles' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-[var(--text-secondary)]">{item.text}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSettings(true)}
                  className="w-full mt-6 py-3 rounded-xl font-semibold text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))', border: '1px solid rgba(6, 182, 212, 0.3)' }}
                >
                  Open Settings
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
