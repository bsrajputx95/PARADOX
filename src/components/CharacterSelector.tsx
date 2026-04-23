import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Sparkle, Lightning, Smiley, Brain, Heart, Star, Check } from 'phosphor-react';

interface CharacterSelectorProps {
  className?: string;
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({ className = "" }) => {
  const { state, dispatch } = useApp();

  const presetCharacters = [
    {
      id: 'scholar',
      name: 'The Scholar',
      personality: 'Wise and patient educator with deep knowledge',
      tone: 'serious' as const,
      style: 'professional' as const,
      icon: Sparkle,
      gradient: 'from-amber-500 to-orange-500',
      glowColor: 'rgba(245, 158, 11, 0.4)'
    },
    {
      id: 'mentor',
      name: 'The Mentor',
      personality: 'Enthusiastic guide with practical wisdom',
      tone: 'friendly' as const,
      style: 'professional' as const,
      icon: Lightning,
      gradient: 'from-violet-500 to-purple-500',
      glowColor: 'rgba(139, 92, 246, 0.4)'
    },
    {
      id: 'companion',
      name: 'The Companion',
      personality: 'Friendly and approachable learning partner',
      tone: 'casual' as const,
      style: 'conversational' as const,
      icon: Smiley,
      gradient: 'from-emerald-500 to-teal-500',
      glowColor: 'rgba(16, 185, 129, 0.4)'
    },
    {
      id: 'sage',
      name: 'The Sage',
      personality: 'Thoughtful teacher with philosophical insights',
      tone: 'serious' as const,
      style: 'professional' as const,
      icon: Brain,
      gradient: 'from-cyan-500 to-blue-500',
      glowColor: 'rgba(34, 211, 238, 0.4)'
    },
    {
      id: 'coach',
      name: 'The Coach',
      personality: 'Motivational instructor focused on growth',
      tone: 'energetic' as const,
      style: 'motivational' as const,
      icon: Heart,
      gradient: 'from-pink-500 to-rose-500',
      glowColor: 'rgba(244, 114, 182, 0.4)'
    },
    {
      id: 'expert',
      name: 'The Expert',
      personality: 'Specialist with industry expertise',
      tone: 'professional' as const,
      style: 'professional' as const,
      icon: Star,
      gradient: 'from-indigo-500 to-violet-500',
      glowColor: 'rgba(99, 102, 241, 0.4)'
    }
  ];

  const handleCharacterSelect = (character: typeof presetCharacters[0]) => {
    dispatch({
      type: 'SET_CHARACTER',
      payload: {
        name: character.name,
        personality: character.personality,
        tone: character.tone,
        style: character.style
      }
    });
  };

  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Choose Your AI Teacher
        </h2>
        <p className="text-[var(--text-muted)] max-w-lg mx-auto">
          Select an AI character that matches your learning style
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {presetCharacters.map((character, index) => {
          const isSelected = state.characterConfig?.name === character.name;
          const Icon = character.icon;

          return (
            <motion.button
              key={character.id}
              onClick={() => handleCharacterSelect(character)}
              className="group relative p-4 rounded-2xl text-center transition-all duration-500 overflow-hidden"
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`
                  : 'rgba(255,255,255,0.02)',
                border: isSelected
                  ? '2px solid rgba(255,255,255,0.2)'
                  : '1px solid rgba(255,255,255,0.05)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSelected && (
                <motion.div
                  layoutId="selectedCharacterBg"
                  className="absolute inset-0"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              <div
                className={`absolute inset-0 bg-gradient-to-br ${character.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <motion.div
                  className={`
                    w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3 transition-all duration-300
                    ${isSelected
                      ? `bg-gradient-to-br ${character.gradient} shadow-lg`
                      : 'bg-white/[0.05] group-hover:bg-white/[0.1]'
                    }
                  `}
                  style={isSelected ? { boxShadow: `0 8px 30px -5px ${character.glowColor}` } : {}}
                >
                  <Icon
                    size={28}
                    weight={isSelected ? 'fill' : 'duotone'}
                    className={isSelected ? 'text-white' : 'text-gray-400'}
                  />
                </motion.div>

                <h3 className={`text-sm font-bold mb-1 transition-colors ${isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                  {character.name}
                </h3>

                <p className="text-xs text-[var(--text-muted)] leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
                  {character.personality.split(' ').slice(0, 3).join(' ')}...
                </p>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg"
                  >
                    <Check size={12} weight="bold" className="text-white" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {state.characterConfig?.name && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
        >
          <p className="text-sm text-[var(--text-muted)]">
            Selected: <span className="text-white font-medium">{state.characterConfig.name}</span>
            <span className="mx-2">•</span>
            {state.characterConfig.personality}
          </p>
        </motion.div>
      )}
    </div>
  );
};
