# PARADOX - Learn Across Dimensions

![Paradox Logo](https://img.shields.io/badge/PARADOX-Educational%20Platform-3B82F6?style=for-the-badge&logo=rocket&logoColor=white)

PARADOX is a revolutionary educational platform that transforms learning content into immersive, cinematic experiences. It converts PDFs, notes, and documents into three distinct learning modes: Cinema, Hologram, and Chronos.

## 🚀 Features

### Three Learning Modes

- **Cinema Mode** - Transform content into cinematic mini-films with dramatic visuals and storytelling
- **Hologram Mode** - AI-powered holographic teachers with real-time interaction
- **Chronos Mode** - Timeline-based learning experiences with 360° visualizations

### Core Capabilities

- 📄 **Multi-format Support** - Upload PDF, DOCX, TXT files
- 🎭 **AI Characters** - Choose from various AI teacher personalities
- 🎬 **Mock Generation** - Deterministic content processing simulation
- 📤 **Export System** - Download content bundles and manifests
- 🌐 **Real-time AI Tutoring** - Live correction and feedback

## 📋 Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or pnpm 8+

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/paradox.git
cd paradox
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key
VITE_TTS_API_KEY=your_elevenlabs_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 📦 Production Build

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🚢 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Manual Deployment

Build the project and deploy the `dist/` folder to any static hosting service.

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI analysis | Yes |
| `VITE_TTS_API_KEY` | ElevenLabs API key for text-to-speech | No |
| `VITE_APP_ENV` | Application environment (`development`/`production`) | No |

## 🧭 Project Structure

```
paradox/
├── src/
│   ├── components/     # React components
│   ├── context/         # React Context (AppContext)
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services (Gemini, TTS)
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── test/            # Test files
├── public/              # Static assets
├── .github/workflows/   # CI/CD pipelines
└── vercel.json         # Vercel configuration
```

## 🎨 Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Cosmos Black | `#06070A` | Primary background |
| Quantum Cyan | `#00F0FF` | Primary accent |
| FTL Magenta | `#FF2DD7` | Secondary accent |
| Plasma Violet | `#8C4BFF` | Tertiary accent |

### Typography

- **Headlines**: Outfit (Google Fonts)
- **Body**: Inter (Google Fonts)

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our development workflow.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [TailwindCSS](https://tailwindcss.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- AI capabilities by [Google Gemini](https://ai.google.dev/)
- Icons by [Phosphor Icons](https://phosphoricons.com/)
