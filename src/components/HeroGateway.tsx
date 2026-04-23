import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkle, Brain, Clock, FilmStrip } from 'phosphor-react';
import { CinemaLogo, HologramLogo, ChronosLogo } from './logos';

interface HeroGatewayProps {
  onEnter: () => void;
  onPreview?: () => void;
  onCinemaModeClick?: () => void;
  onHologramModeClick?: () => void;
  onChronosModeClick?: () => void;
}

const floatingOrbs = [
  { size: 400, x: '10%', y: '20%', duration: 20, delay: 0 },
  { size: 300, x: '80%', y: '60%', duration: 25, delay: -5 },
  { size: 200, x: '70%', y: '15%', duration: 18, delay: -10 },
  { size: 150, x: '15%', y: '70%', duration: 22, delay: -8 },
];

export const HeroGateway: React.FC<HeroGatewayProps> = ({
  onEnter,
  onCinemaModeClick,
  onHologramModeClick,
  onChronosModeClick
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 1.02, 0.3, 1] }
    }
  };

  const features = [
    {
      id: 'cinema',
      name: 'Cinema Mode',
      desc: 'Immersive video lessons with interactive engagement',
      icon: FilmStrip,
      gradient: 'from-violet-500 to-purple-600',
      hoverGradient: 'hover:from-violet-400 hover:to-purple-500',
      glowColor: 'rgba(139, 92, 246, 0.4)',
      Logo: CinemaLogo,
      onClick: onCinemaModeClick
    },
    {
      id: 'hologram',
      name: 'Hologram Mode',
      desc: 'AI-powered holographic teachers for personalized learning',
      icon: Brain,
      gradient: 'from-cyan-500 to-blue-600',
      hoverGradient: 'hover:from-cyan-400 hover:to-blue-500',
      glowColor: 'rgba(34, 211, 238, 0.4)',
      Logo: HologramLogo,
      onClick: onHologramModeClick
    },
    {
      id: 'chronos',
      name: 'Chronos Mode',
      desc: 'Explore historical timelines with 360° visualizations',
      icon: Clock,
      gradient: 'from-pink-500 to-rose-600',
      hoverGradient: 'hover:from-pink-400 hover:to-rose-500',
      glowColor: 'rgba(244, 114, 182, 0.4)',
      Logo: ChronosLogo,
      onClick: onChronosModeClick
    }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern" />

      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `linear-gradient(135deg, ${orb.x.includes('10') ? '#6366f1, #8b5cf6' : orb.x.includes('80') ? '#ec4899, #f43f5e' : '#06b6d4, #3b82f6'})`
          }}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.div
        className="relative z-10 max-w-5xl w-full px-6 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl mb-8"
          >
            <Sparkle size={16} className="text-amber-400" weight="fill" />
            <span className="text-sm text-[var(--text-secondary)]">Next Generation Learning Experience</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          >
            <span className="text-white">Learn Beyond</span>
            <br />
            <span className="text-gradient animate-gradient">Every Dimension</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Transform any educational content into immersive cinematic experiences.
            <br className="hidden md:block" />
            Where imagination meets intelligence.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={onEnter}
              className="group relative px-10 py-5 rounded-2xl font-bold text-lg text-white overflow-hidden transition-all duration-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-[2px] rounded-xl bg-[var(--bg-deep)] opacity-90" />
              <span className="relative z-10 flex items-center gap-3">
                Enter Portal
                <ArrowRight size={22} weight="bold" className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.button>

            <motion.button
              onClick={onCinemaModeClick}
              className="group flex items-center gap-3 px-8 py-5 rounded-2xl font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center group-hover:bg-white/[0.1] transition-colors">
                <Play size={20} weight="fill" className="text-indigo-400" />
              </div>
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-center text-sm text-[var(--text-muted)] uppercase tracking-widest mb-8">
            Choose Your Learning Dimension
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <motion.button
                key={feature.id}
                onClick={feature.onClick}
                disabled={!feature.onClick}
                className="group relative p-8 rounded-3xl text-left overflow-hidden transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)`,
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                  style={{ background: feature.glowColor }}
                />

                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                    style={{ boxShadow: `0 10px 40px -10px ${feature.glowColor}` }}
                  >
                    <feature.Logo />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {feature.name}
                  </h3>

                  <p className="text-[var(--text-muted)] leading-relaxed mb-6 group-hover:text-[var(--text-secondary)] transition-colors">
                    {feature.desc}
                  </p>

                  <div className={`flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    Explore mode
                    <ArrowRight size={14} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-8 text-sm text-[var(--text-muted)]"
        >
          {['PDF & Document Support', 'AI-Powered Analysis', 'Interactive Quizzes', 'Export Ready'].map((tag) => (
            <div key={tag} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              {tag}
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};
