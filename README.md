# Glare — AI-Powered Mock Interview Platform

Practice job interviews with a real-time voice AI interviewer. Glare lets users sign up, start a mock interview, and have a live spoken conversation with an AI agent that asks questions and gives feedback — built to simulate the experience of a real interview rather than a static Q&A form.

🔗 **Live App:** [glare-interview-preparation.vercel.app](https://glare-interview-preparation.vercel.app)

## Overview

Most interview prep tools are just flashcards or text-based Q&A. Glare instead runs the interview as a real conversation: a voice AI agent speaks the questions, listens to your spoken answers, and responds naturally — closer to what an actual interview round feels like.

## Features

- **Real-time voice interviews** — Conversational AI interviewer powered by [Vapi](https://vapi.ai), handling speech-to-text, text-to-speech, and turn-taking in real time
- **AI-generated questions & feedback** — Google's Gemini model (via the Vercel AI SDK) generates interview questions and evaluates responses
- **Authentication** — Email/password sign up and sign in via Firebase Auth
- **Persistent sessions** — Interview history and user data stored with Firebase / Firebase Admin SDK
- **Responsive UI** — Built with Tailwind CSS and Radix-based UI components (shadcn-style), with toast notifications via Sonner
- **Form validation** — React Hook Form + Zod for sign up/sign in and interview setup forms

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19, TypeScript, Tailwind CSS, Radix UI, lucide-react |
| Voice AI | Vapi (`@vapi-ai/web`) |
| LLM | Google Gemini via Vercel AI SDK (`@ai-sdk/google`, `ai`) |
| Auth & Data | Firebase, Firebase Admin |
| Forms | React Hook Form, Zod |

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project (Web + Admin SDK credentials)
- A Vapi account and API key
- A Google AI (Gemini) API key

### Installation

```bash
git clone https://github.com/gagan-1307/Glare-Interview-Prep.git
cd Glare-Interview-Prep
npm install
```

### Environment Variables

Create a `.env.local` file in the project root with your own credentials:

```bash
# Firebase (client)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase (admin)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Vapi
NEXT_PUBLIC_VAPI_WEB_TOKEN=

# Google Gemini
GOOGLE_GENERATIVE_AI_API_KEY=
```

> Replace these with the exact variable names your code reads — check `firebase/` and `lib/` for the precise keys used.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Roadmap

- [ ] Add interview performance analytics/history dashboard
- [ ] Support more interview types/roles
- [ ] Export feedback as a downloadable report

## License

This project is open source and available under the [MIT License](LICENSE).
