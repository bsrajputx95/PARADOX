/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_TTS_API_KEY: string;
  readonly VITE_APP_ENV: string;
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'mammoth' {
  interface ExtractResult {
    value: string;
    messages: Array<{ type: string; message: string }>;
  }

  interface mammoth {
    extractRawText(options: { arrayBuffer: ArrayBuffer }): Promise<ExtractResult>;
  }

  const mammoth: mammoth;
  export default mammoth;
}
