# 🎤 AI-Based Interview Voice Interface (Frontend)

A React.js-based Voice Interview Interface that simulates a real-time technical interview experience.

This module handles candidate interaction, question delivery, audio recording, and interview flow management.

---

## 📌 Project Overview

This system allows candidates to:

- Select an interview domain  
- Receive audio-based interview questions  
- Record voice responses using microphone  
- Complete a structured interview session  
- Track interview progress in real time  

The module is designed to integrate seamlessly with backend AI-based evaluation systems.

---

## 🚀 Key Features

- ✅ 10 Confirmed Interview Domains  
- ✅ 40-Question Bank per Domain  
- ✅ Random Selection of 10 Questions per Interview  
- ✅ Dynamic Question Shuffling  
- ✅ Automatic Audio Playback  
- ✅ Voice Recording via MediaRecorder API  
- ✅ Interview Progress Indicator  
- ✅ Controlled Interview Flow (No Replay/Download)  
- ✅ Backend Integration Ready  

---

## 📂 Confirmed Interview Domains

1. Full Stack Development  
2. Python Programming  
3. Data Science  
4. Machine Learning  
5. Digital Marketing  
6. Deep Learning  
7. Core Java  
8. Data Analytics  
9. Cyber Security  
10. Artificial Intelligence (AI) / Machine Learning (ML)  

---

## 🧠 Interview Workflow

1. Candidate selects a domain  
2. System loads 40-question repository  
3. 10 questions are randomly selected  
4. Each question is played as audio  
5. Recording starts automatically after playback  
6. Candidate submits answer  
7. System proceeds to next question  
8. Interview completion message displayed  

---

## 🏗️ Architecture Overview

### 🔹 Frontend Responsibilities
- Domain Selection  
- Question Randomization  
- Audio Playback Handling  
- Voice Recording Management  
- Progress Tracking  
- Interview State Management  

### 🔹 Backend (Future Integration)
- Speech-to-Text Conversion  
- AI-Based Answer Evaluation  
- Scoring & Feedback Generation  
- Data Storage & Analytics  

---

## 🛠️ Technology Stack

- React.js  
- JavaScript (ES6+)  
- HTML5 Audio API  
- MediaRecorder API  
- CSS  

---

## 📂 Project Structure
'''
Shweta-Sonar-Task1-Frontend-Voice-Interface
│
├── public/                          → Static files
│   │
│   ├── audio/                       → Interview question audio files
│   │   ├── FullStack1.mp3           → Question audio
│   │   ├── Python1.mp3              → Question audio
│   │   ├── CyberSecurity1.mp3       → Question audio
│   │   └── ... (40 per domain)
│   │
│   ├── index.html                   → Main HTML template
│   └── manifest.json                → App configuration
│
├── src/                             → React source code
│   │
│   ├── App.js                       → Interview workflow logic
│   ├── App.css                      → UI styling
│   ├── DomainSelect.js              → Domain selection UI
│   ├── index.js                     → React entry point
│   └── reportWebVitals.js           → Performance metrics
│
├── screenshots/                     → README screenshots
│   ├── screen1.png                  → Domain selection screen
│   ├── screen2.png                  → Voice interview screen
│   └── screen3.png                  → Interview progress screen
│
├── package.json                     → Project dependencies
├── package-lock.json                → Dependency lock file
├── README.md                        → Project documentation
└── .gitignore                       → Git ignored files '''
---

## 🚀 How to Run

npm install
npm start

Open in browser:

http://localhost:3000

---

🔮 Future Enhancements

AI-powered automatic scoring
Speech-to-text transcription
Cloud-based answer storage
Timer per question
Admin panel for question management

---

## 📸 Application Screenshots

### 🔹 Domain Selection
![Domain Selection](screenshots/screen1.png)

### 🔹 Voice Question & Recording
![Voice Interface](screenshots/screen2.png)

### 🔹 Interview Progress Tracking
![Progress](screenshots/screen3.png)

---

## 👩‍💻 Developed By

**Shweta Sonar**
MCA (2024–2026)
