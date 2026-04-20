# WordHarbor Reading Tool Skills

This document outlines the technical capabilities and features of the WordHarbor Reading Tool, integrated with a Hybrid Speech Architecture and Firebase.

## Hybrid Speech Engine

To ensure the best performance across all devices without requiring a Firebase Blaze (billing) plan, WordHarbor uses a **Hybrid Staggered Transcription System**:

- **Desktop (PC/Laptop)**: Uses **Native Web Speech API** (`webkitSpeechRecognition`). This is free, fast, and highly reliable on Desktop Chrome.
- **Mobile (Android/iOS)**: Uses the **Deepgram Direct API** (Nova-3 model). This provides professional-grade accuracy for mobile browsers where native speech recognition can be flaky.

### Technical Implementation
- **Detection**: Automatically detects device type using `getPlatformRuntime()`.
- **Direct Integration**: Calls Deepgram directly from the browser to bypass serverless function requirements.
- **Microphone Support**: Explicitly handles `AudioContext` lifecycle for mobile compatibility.

## Core Features

- **Fluency Assessment**: Real-time speech recognition and analysis of reading accuracy, WPM (Words Per Minute), and hesitation patterns.
- **Comprehension Testing**: Interactive quizzes linked to specific reading passages to evaluate understanding.
- **Teacher Dashboard**: Centralized view for teachers to monitor student progress and review historical data.

## Infrastructure

- **Firebase Hosting**: High-performance delivery of all static assets.
- **Firebase Auth**: Secure teacher authentication.
- **Cloud Firestore**: Real-time database for:
    - `teachers`: Teacher profiles.
    - `students`: Centralized student registry.
    - `attempts`: Detailed exam results and speech metrics.

## API Configuration

Current project is configured with the following credentials:

```javascript
const DEEPGRAM_API_KEY = "bf322035aa3f2ced5cc4dfb26579846b2ce1f91d";
const firebaseConfig = {
  projectId: "readingtool-b2124",
  // ... other credentials in index.html
};
```
