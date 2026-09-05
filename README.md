# Projexa

## Overview
Projexa is an AI-powered platform for final-year students that helps them discover, validate, learn, and plan the development of practical academic projects. 
It takes students from initial confusion to a defendable, realistically scoped project blueprint.

## Problem Being Solved
Students often struggle to find practical, feasible, and sufficiently novel projects that match their specific skill sets. They also lack guidance on how to structure the architecture, what the exact MVP scope should be, and the step-by-step roadmap to build it. Projexa acts as a personalized technical architect and academic advisor.

## Core Features
- **3 Entry Modes**: Project DNA (skills/interests), Guided Discovery, or Validate Existing Idea.
- **AI Project Intelligence**: Personalized recommendations with Project Fit Scores, Novelty Checks, Reality Checks, and Skill Gap analysis.
- **Project Blueprint**: Actionable development roadmaps containing Architecture, Tech Stack, MVP Scope, User Stories, and Milestones.

## Technology Stack
- **Frontend**: React + Vite, Tailwind CSS v4, Lucide Icons.
- **Backend**: Express.js (Node.js).
- **Database/Auth**: Firebase Firestore & Firebase Authentication.
- **AI Layer**: Google Gemini API (`@google/genai` sdk).

## Local Setup
1. `npm install`
2. `cd server && npm install && cd ..`
3. Create `.env.local` in the root:
```env
GEMINI_API_KEY=your_gemini_key_here
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
4. `npm run dev` (Starts Vite and the Express server concurrently)

## Deployment (Cloud Run)
A `Dockerfile` is provided at the root. The Express server is configured to serve the built Vite frontend statically in production on the specified `PORT`.
```bash
gcloud run deploy projexa --source . --port 8080 --set-env-vars="GEMINI_API_KEY=your_key"
```
