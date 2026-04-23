import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { FilmStrip, UserCircle, Clock, Check } from 'phosphor-react';

interface TriModeSelectorProps {
  className?: string;
}

export const TriModeSelector: React.FC<TriModeSelectorProps> = ({ className = "" }) => {
  const { state, dispatch } = useApp();

  const modes = [
    {
      id: 'cinema' as const,
      name: 'Cinema',
      description: 'Cinematic storytelling with immersive narratives',
      icon: FilmStrip,
      gradient: 'from-violet-500/20 to-purple-500/20',
      activeGradient: 'from-violet-500 to-purple-600',
      borderColor: 'hover:border-violet-500/30',
      iconColor: 'text-violet-400'
    },
    {
      id: 'hologram' as const,
      name: 'Hologram',
      description: 'AI teacher avatars with personalized instruction',
      icon: UserCircle,
      gradient: 'from-cyan-500/20 to-blue-500/20',
      activeGradient: 'from-cyan-500 to-blue-600',
      borderColor: 'hover:border-cyan-500/30',
      iconColor: 'text-cyan-400'
    },
    {
      id: 'chronos' as const,
      name: 'Chronos',
      description: 'Timeline-based learning with 360° visualizations',
      icon: Clock,
      gradient: 'from-pink-500/20 to-rose-500/20',
      activeGradient: 'from-pink-500 to-rose-600',
      borderColor: 'hover:border-pink-500/30',
      iconColor: 'text-pink-400'
    }
  ];

  const handleModeSelect = (modeId: 'cinema' | 'hologram' | 'chronos') => {
    dispatch({ type: 'SET_MODE', payload: modeId });
  };

  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Select Your Learning Mode
        </h2>
        <p className="text-[var(--text-muted)] max-w-lg mx-auto">
          Choose how you want to experience your educational content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modes.map((mode, index) => {
          const isActive = state.currentMode === mode.id;
          const Icon = mode.icon;

          return (
            <motion.button
              key={mode.id}
              onClick={() => handleModeSelect(mode.id)}
              className={`
                relative p-6 rounded-2xl text-left transition-all duration-500 overflow-hidden
                ${isActive
                  ? 'bg-gradient-to-br ' + mode.gradient + ' border-2 border-transparent'
                  : 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] ' + mode.borderColor
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeModeIndicator"
                  className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-50`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300
                      ${isActive
                        ? 'bg-gradient-to-br ' + mode.activeGradient + ' shadow-lg'
                        : 'bg-white/[0.05]'
                      }
                    `}
                    style={isActive ? { boxShadow: `0 8px 30px -5px ${mode.iconColor.replace('text-', 'rgba(').replace('-400', ', 0.4)')}` } : {}}
                  >
                    <Icon
                      size={28}
                      weight={isActive ? 'fill' : 'duotone'}
                      className={isActive ? 'text-white' : mode.iconColor}
                    />
                  </motion.div>

                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                    >
                      <Check size={14} weight="bold" className="text-white" />
                    </motion.div>
                  )}
                </div>

                <h3 className={`text-lg font-bold mb-2 transition-colors ${isActive ? 'text-white' : 'text-gray-200'}`}>
                  {mode.name}
                </h3>

                <p className={`text-sm leading-relaxed transition-colors ${isActive ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                  {mode.description}
                </p>
              </div>

              <div
                className={`
                  absolute bottom-0 left-0 right-0 h-1 transition-opacity duration-300
                  ${isActive ? 'opacity-100' : 'opacity-0'}
                `}
              >
                <div className={`h-full bg-gradient-to-r ${mode.activeGradient}`} />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
