import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { File as FileIcon, FileText, X, Sparkle, CircleNotch, CheckCircle, CloudArrowUp } from 'phosphor-react';
import { useApp } from '@/context/AppContext';
import { extractContentFromFile, validateFile } from '@/utils/fileParser';

interface FileUploadProps {
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ className = "" }) => {
  const { dispatch } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setExtractionError(null);
    setUploadedFile(file);
    setIsProcessing(true);

    const validation = validateFile(file);
    if (!validation.valid) {
      setExtractionError(validation.error || 'Invalid file');
      setIsProcessing(false);
      return;
    }

    try {
      const result = await extractContentFromFile(file);

      if (result.extractionSuccess) {
        dispatch({ type: 'SET_FILE', payload: file });
        dispatch({ type: 'SET_CONTENT', payload: result.content });
      } else {
        setExtractionError(result.errorMessage || 'Failed to extract content');
      }
    } catch (error) {
      setExtractionError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setExtractionError(null);
    dispatch({ type: 'SET_FILE', payload: null });
    dispatch({ type: 'SET_CONTENT', payload: '' });
  };

  return (
    <div className={`${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Upload Your Content
        </h2>
        <p className="text-[var(--text-muted)] max-w-lg mx-auto">
          Drag and drop your educational materials to begin
        </p>
      </div>

      {!uploadedFile ? (
        <motion.div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          className={`
            relative rounded-3xl transition-all duration-500 overflow-hidden
            ${isDragging
              ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/50 scale-[1.02]'
              : 'bg-white/[0.02] border-2 border-dashed border-white/[0.08] hover:border-white/[0.15]'
            }
          `}
        >
          <input
            type="file"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            accept=".pdf,.docx,.txt"
          />

          <AnimatePresence>
            {isDragging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl z-10"
              />
            )}
          </AnimatePresence>

          <div className="text-center py-16 px-6 relative z-10">
            <motion.div
              animate={{
                y: isDragging ? -15 : 0,
                scale: isDragging ? 1.1 : 1
              }}
              className={`
                w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center transition-all duration-500
                ${isDragging
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white/[0.05] text-[var(--text-muted)]'
                }
              `}
            >
              <CloudArrowUp size={40} weight="duotone" />
            </motion.div>

            <motion.h3
              animate={{ y: isDragging ? -5 : 0 }}
              className={`text-xl font-bold mb-3 transition-colors ${isDragging ? 'text-indigo-400' : 'text-white'}`}
            >
              {isDragging ? 'Drop to Upload' : 'Drag & Drop Your File'}
            </motion.h3>

            <p className="text-[var(--text-muted)] mb-8 max-w-sm mx-auto">
              or click to browse your files
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { ext: '.pdf', icon: FileText, label: 'PDF' },
                { ext: '.docx', icon: FileIcon, label: 'Word' },
                { ext: '.txt', icon: FileText, label: 'Text' }
              ].map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.ext}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-[var(--text-muted)]"
                  >
                    <Icon size={16} weight="duotone" />
                    {type.label}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 px-6"
              >
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <CircleNotch size={80} weight="bold" className="text-indigo-500 opacity-20" />
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full shadow-lg shadow-indigo-500/30" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Processing your content...</h3>
                <p className="text-sm text-[var(--text-muted)]">Extracting text and analyzing structure</p>
              </motion.div>
            ) : (
              <motion.div
                key="uploaded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6"
              >
                <div className="flex items-center gap-5">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/20 flex items-center justify-center"
                  >
                    {extractionError ? (
                      <X size={32} className="text-red-400" weight="bold" />
                    ) : (
                      <CheckCircle size={32} className="text-emerald-400" weight="fill" />
                    )}
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1 truncate">{uploadedFile.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                      <span>{(uploadedFile.size / 1024).toFixed(1)} KB</span>
                      <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                      <span className={extractionError ? 'text-red-400' : 'text-emerald-400'}>
                        {extractionError ? 'Extraction warning' : 'Ready'}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    onClick={removeFile}
                    className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-[var(--text-muted)] hover:text-white transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={20} weight="bold" />
                  </motion.button>
                </div>

                {extractionError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                  >
                    <p className="text-sm text-red-400">{extractionError}</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {uploadedFile && !isProcessing && !extractionError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 p-5 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Sparkle size={24} weight="fill" className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-white mb-0.5">Ready for Transformation</h4>
              <p className="text-sm text-[var(--text-muted)]">
                Select an AI character above to personalize your learning experience
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
