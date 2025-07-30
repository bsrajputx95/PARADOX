export interface AppState {
  currentMode: 'cinema' | 'hologram' | 'chronos';
  uploadedFile: File | null;
  extractedContent: string;
  mockData: MockDataBundle;
  characterConfig: CharacterConfig;
  isGenerating: boolean;
  previewActive: boolean;
}

export interface MockDataBundle {
  title: string;
  content: string;
  outline: OutlineData;
  scenes: SceneData[];
  questions: QuestionData[];
  assetMap: AssetMapData;
}

export interface CharacterConfig {
  name: string;
  personality: string;
  tone: 'serious' | 'funny' | 'sarcastic' | 'friendly' | 'casual' | 'energetic' | 'professional';
  style: 'realistic' | 'anime' | 'cosmic' | 'professional' | 'conversational' | 'motivational';
}

export interface OutlineData {
  title: string;
  sections: Array<{
    id: string;
    heading: string;
    bullets: string[];
  }>;
}

export interface SceneData {
  id: string;
  start: number;
  duration: number;
  text: string;
}

export interface QuestionData {
  scene_id: string;
  time: number;
  text: string;
  options: string[];
  answer_index: number;
}

export interface AssetMapData {
  mode: 'Cinema' | 'Hologram' | 'Chronos';
  scene_to_clip: Record<string, string>;
}

export interface Section {
  id: string;
  heading: string;
  bullets: string[];
}

export type AppAction =
  | { type: 'SET_MODE'; payload: 'cinema' | 'hologram' | 'chronos' }
  | { type: 'SET_FILE'; payload: File | null }
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'SET_MOCK_DATA'; payload: MockDataBundle }
  | { type: 'SET_CHARACTER'; payload: CharacterConfig }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'SET_PREVIEW'; payload: boolean }
  | { type: 'RESET_STATE' };