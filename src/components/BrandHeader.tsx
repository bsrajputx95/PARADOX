import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { FilmStrip, UserCircle, Clock } from 'phosphor-react';
import { motion } from 'framer-motion';

export const BrandHeader: React.FC = () => {
  const { state, dispatch } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setMode = (mode: 'cinema' | 'hologram' | 'chronos') => {
    dispatch({ type: 'SET_MODE', payload: mode });
  };

  const modes = [
    { id: 'cinema' as const, icon: FilmStrip, label: 'Cinema' },
    { id: 'hologram' as const, icon: UserCircle, label: 'Hologram' },
    { id: 'chronos' as const, icon: Clock, label: 'Chronos' }
  ];

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-[rgba(3,3,5,0.8)] backdrop-blur-xl border-b border-white/[0.05] py-3'
          : 'bg-transparent py-5'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
            <h1 className="relative text-2xl font-bold tracking-tight">
              <span className="text-white">PARA</span>
              <span className="text-gradient">DOX</span>
            </h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl">
          {modes.map((mode) => {
            const isActive = state.currentMode === mode.id;
            const Icon = mode.icon;

            return (
              <motion.button
                key={mode.id}
                onClick={() => setMode(mode.id)}
                className={`
                  relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                  ${isActive
                    ? 'text-white'
                    : 'text-[var(--text-muted)] hover:text-white'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl border border-white/[0.1]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
                  {mode.label}
                </span>
              </motion.button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05]">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-[var(--text-muted)]">Ready</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
