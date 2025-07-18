import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Lightning, FileText, Download, Sparkle, Check, ArrowDown, Camera } from 'phosphor-react';
import { useApp } from '@/context/AppContext';

interface ExportZoneProps {
  className?: string;
}

export const ExportZone: React.FC<ExportZoneProps> = ({ className = "" }) => {
  const { state } = useApp();
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);

  const exportFormats = [
    { id: 'bundle', name: 'Complete Bundle', description: 'All files in a single ZIP package', icon: Package, gradient: 'from-cyan-500 to-blue-600', size: '25 MB' },
    { id: 'video', name: 'Video Only', description: 'MP4 format, high quality', icon: Camera, gradient: 'from-pink-500 to-rose-600', size: '18 MB' },
    { id: 'interactive', name: 'Interactive Package', description: 'HTML5 with questions', icon: Lightning, gradient: 'from-violet-500 to-purple-600', size: '12 MB' },
    { id: 'transcript', name: 'Transcript & Notes', description: 'PDF with detailed notes', icon: FileText, gradient: 'from-amber-500 to-orange-600', size: '2 MB' }
  ];

  const handleExport = async (formatId: string) => {
    setIsExporting(true);
    setExportProgress(0);
    setExportComplete(false);

    const steps = [
      { name: 'Preparing files', progress: 25 },
      { name: 'Generating package', progress: 50 },
      { name: 'Compressing data', progress: 75 },
      { name: 'Finalizing export', progress: 100 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setExportProgress(step.progress);
    }

    const exportData = {
      format: formatId,
      timestamp: new Date().toISOString(),
      content: state.mockData,
      character: state.characterConfig,
      mode: state.currentMode,
      metadata: {
        version: '1.0',
        generator: 'Paradox Educational Platform',
        duration: '4:60',
        questions: state.mockData.questions.length,
        scenes: state.mockData.scenes.length
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `paradox-export-${formatId}-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    setExportComplete(true);
    setIsExporting(false);
  };

  const resetExport = () => {
    setExportComplete(false);
    setExportProgress(0);
  };

  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))', border: '1px solid rgba(6, 182, 212, 0.3)' }}
        >
          <Sparkle size={40} weight="fill" className="text-cyan-400" />
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-3">Export Your Experience</h2>
        <p className="text-[var(--text-muted)] max-w-lg mx-auto">
          Choose your preferred format to download your personalized learning experience
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isExporting && !exportComplete ? (
          <motion.div
            key="formats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {exportFormats.map((format, index) => {
              const Icon = format.icon;
              return (
                <motion.button
                  key={format.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleExport(format.id)}
                  className="p-6 rounded-3xl text-left transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${format.gradient}`}>
                      <Icon size={28} weight="fill" className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg">{format.name}</h3>
                      <p className="text-sm text-[var(--text-muted)]">{format.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)] px-3 py-1 rounded-full bg-white/5">{format.size}</span>
                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgba(6, 182, 212, 1)' }}>
                      Download
                      <Download size={16} weight="bold" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        ) : isExporting ? (
          <motion.div
            key="exporting"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))', border: '1px solid rgba(99, 102, 241, 0.3)' }}
            >
              <ArrowDown size={36} weight="bold" className="text-indigo-400" />
            </motion.div>

            <h3 className="text-xl font-bold text-white mb-2">Exporting Your Experience</h3>
            <p className="text-[var(--text-muted)] mb-6">Please wait while we prepare your download...</p>

            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--text-secondary)]">Progress</span>
                <span className="text-white font-medium">{exportProgress}%</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${exportProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(6, 182, 212, 0.2))', border: '1px solid rgba(34, 197, 94, 0.4)' }}
            >
              <Check size={40} weight="bold" className="text-emerald-400" />
            </motion.div>

            <h3 className="text-xl font-bold text-white mb-2">Export Complete!</h3>
            <p className="text-[var(--text-muted)] mb-6">Your learning experience has been downloaded successfully.</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetExport}
              className="px-8 py-3 rounded-2xl font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              Export Another Format
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
