import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction } from '@/types';

const initialState: AppState = {
  currentMode: 'cinema',
  uploadedFile: null,
  extractedContent: '',
  mockData: {
    title: '',
    content: '',
    outline: { title: '', sections: [] },
    scenes: [],
    questions: [],
    assetMap: { mode: 'Cinema', scene_to_clip: {} }
  },
  characterConfig: {
    name: 'Cosmic Guide',
    personality: 'Enthusiastic educator with vast knowledge',
    tone: 'serious',
    style: 'cosmic'
  },
  isGenerating: false,
  previewActive: false
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, currentMode: action.payload };
    
    case 'SET_FILE':
      return { ...state, uploadedFile: action.payload };
    
    case 'SET_CONTENT':
      return { ...state, extractedContent: action.payload };
    
    case 'SET_MOCK_DATA':
      return { ...state, mockData: action.payload };
    
    case 'SET_CHARACTER':
      return { ...state, characterConfig: action.payload };
    
    case 'SET_GENERATING':
      return { ...state, isGenerating: action.payload };
    
    case 'SET_PREVIEW':
      return { ...state, previewActive: action.payload };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}