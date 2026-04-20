# WordHarbor Reading Tool Skills

This document outlines the technical capabilities and features of the WordHarbor Reading Tool.

## Core Features

- **Fluency Assessment**: Real-time speech recognition and analysis of reading accuracy, WPM (Words Per Minute), and hesitation patterns.
- **Comprehension Testing**: Interactive quizzes linked to specific reading passages to evaluate understanding.
- **Teacher Dashboard**: Centralized view for teachers to monitor student progress, review exam history, and manage accounts.

## AI & Technical Integrations

- **Speech-to-Text (STT)**: 
  - Integrated with **Deepgram** (Nova models) and **OpenAI Whisper** for high-accuracy transcription.
  - Supports multi-language detection and smart formatting.
- **Pronunciation Assessment**: 
  - Optional integration with **Azure AI Speech** for detailed pronunciation feedback at the phoneme level.
- **Firebase Infrastructure**:
  - **Firebase Auth**: Secure teacher authentication and session management.
  - **Cloud Firestore**: Real-time database for student profiles, exam results, and historical data.
  - **Firebase Hosting**: High-performance static web hosting.
  - **Cloud Functions**: Serverless backend for secure API interactions and processing.

## Architecture

- **Frontend**: Vanilla JS with modular components for speech handling, state management, and UI rendering.
- **Backend-as-a-Service**: Leveraging Firebase for scalability and security.
