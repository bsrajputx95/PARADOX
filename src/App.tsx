import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider } from '@/context/AppContext';
import { HeroGateway } from '@/components/HeroGateway';
import { BrandHeader } from '@/components/BrandHeader';
import { TriModeSelector } from '@/components/TriModeSelector';
import { FileUpload } from '@/components/FileUpload';
import { CharacterSelector } from '@/components/CharacterSelector';
import { CinemaModePanel } from '@/components/CinemaModePanel';
import { useApp } from '@/context/AppContext';
import { LiveBackground } from '@/components/LiveBackground';
import { ChronosModeFlow } from '@/components/ChronosModeFlow';
import { HologramModeFlow } from '@/components/HologramModeFlow';

function AppContent() {
  const { state } = useApp();
  const [showMainInterface, setShowMainInterface] = useState(false);
  const [showCinemaMode, setShowCinemaMode] = useState(false);
  const [showHologramMode, setShowHologramMode] = useState(false);

  const handleEnter = () => {
    setShowMainInterface(true);
  };

  const handlePreview = () => { };

  const handleCinemaModeStart = () => {
    setShowCinemaMode(true);
  };

  const handleCinemaModeBack = () => {
    setShowCinemaMode(false);
  };

  const handleHologramModeStart = () => {
    setShowHologramMode(true);
  };

  const handleHologramModeBack = () => {
    setShowHologramMode(false);
  };

  const renderModePanel = () => {
    switch (state.currentMode) {
      case 'cinema':
        return <CinemaModePanel onStartCinema={handleCinemaModeStart} />;
      default:
        return <CinemaModePanel onStartCinema={handleCinemaModeStart} />;
    }
  };

  // Show Cinema/Chronos Mode Flow
  if (showCinemaMode) {
    return <ChronosModeFlow onBack={handleCinemaModeBack} />;
  }

  // Show Hologram Mode Flow
  if (showHologramMode) {
    return <HologramModeFlow onBack={handleHologramModeBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden text-white">
      <LiveBackground />

      <AnimatePresence mode="wait">
        {!showMainInterface ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <HeroGateway
              onEnter={handleEnter}
              onPreview={handlePreview}
              onCinemaModeClick={handleCinemaModeStart}
              onHologramModeClick={handleHologramModeStart}
              onChronosModeClick={handleCinemaModeStart}
            />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen relative z-10"
          >
            {/* Main Interface */}
            <BrandHeader />
            <div className="container mx-auto px-6 py-8">
              {/* Page intro */}
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center mb-12">
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                  Upload content, choose a mode, and preview deterministic mock lessons.
                </p>
              </motion.div>

              {/* Tri-Mode Selector */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-16"
              >
                <TriModeSelector />
              </motion.div>

              {/* Mode Panel */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={state.currentMode}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {renderModePanel()}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Upload Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-12"
              >
                <FileUpload />
              </motion.div>

              {/* Character Selector */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-12"
              >
                <CharacterSelector />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
