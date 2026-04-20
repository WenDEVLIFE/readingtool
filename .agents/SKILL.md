# WordHarbor Reading Tool Skills

This document outlines the technical capabilities and features of the WordHarbor Reading Tool, integrated with Firebase.

## Core Features

- **Fluency Assessment**: Real-time speech recognition and analysis of reading accuracy, WPM (Words Per Minute), and hesitation patterns.
- **Comprehension Testing**: Interactive quizzes linked to specific reading passages to evaluate understanding.
- **Teacher Dashboard**: Centralized view for teachers to monitor student progress, review historical exam data, and manage accounts.

## AI & Technical Integrations

- **Speech-to-Text (STT)**: 
  - Integrated via **Firebase Cloud Functions** with **Deepgram Nova-3** and **OpenAI Whisper**.
  - Optimized for multi-language detection and punctuation accuracy.
- **Pronunciation Assessment**: 
  - Integrated via **Firebase Cloud Functions** with **Azure AI Speech** for detailed phoneme-level feedback.
- **Firebase Infrastructure**:
  - **Firebase Auth**: Secure teacher login and registration (formerly SQL-based).
  - **Cloud Firestore**: Real-time data storage replacing legacy SQL tables.
    - `teachers`: Collection for teacher identity and metadata.
    - `students`: Collection for student profiles (using normalized names as IDs).
    - `attempts`: Collection for all exam results and performance metrics.
  - **Firebase Hosting**: Static asset delivery with logic-mapped rewrites.

## Deployment Credentials

The project is linked to the Firebase Project: `readingtool-b2124`.

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB0l6qT-z56eQUMQgW6CbNbYwB1ZJmMzOk",
  authDomain: "readingtool-b2124.firebaseapp.com",
  projectId: "readingtool-b2124",
  storageBucket: "readingtool-b2124.firebasestorage.app",
  messagingSenderId: "981193866014",
  appId: "1:981193866014:web:7460f57861256cceb4270f",
  measurementId: "G-X7Y8622DZJ"
};
```

## Migration Notes
All functions previously inserting into SQL (Supabase) have been replaced by direct client-side Firestore operations or Firebase Cloud Functions where secure API keys are required.
