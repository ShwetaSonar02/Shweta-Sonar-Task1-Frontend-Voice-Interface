import React, { useRef, useState } from "react";
import "./App.css";
import DomainSelect from "./DomainSelect";

function App() {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [statusText, setStatusText] = useState("System Ready");
  const [isRecording, setIsRecording] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  /* --------------------------------------------------
   🎯 CREATE 40 QUESTIONS PER DOMAIN (QUESTION BANK)
-------------------------------------------------- */

const generateQuestions = (prefix) => {
  const arr = [];
  for (let i = 1; i <= 40; i++) {
    arr.push(`/audio/${prefix}${i}.mp3`);
  }
  return arr;
};

const domainQuestions = {
  fullstack: generateQuestions("Development"),
  python: generateQuestions("Python"),
  datascience: generateQuestions("ai"),
  ml: generateQuestions("ai"),
  digital: generateQuestions("web"),
  deeplearning: generateQuestions("ai"),
  corejava: generateQuestions("java"),
  analytics: generateQuestions("web"),
  cyber: generateQuestions("ai"),
  aiml: generateQuestions("ai"),
};
  /* --------------------------------------------------
   🔀 SHUFFLE AND PICK ONLY 10 QUESTIONS
-------------------------------------------------- */
const getRandomQuestions = (questions, count = 10) => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count); // pick only 10
};

  const handleDomainSelect = (domain) => {
  const selectedSet = getRandomQuestions(domainQuestions[domain], 10);

  setSelectedDomain(domain);
  setShuffledQuestions(selectedSet); // only 10 stored
  setQuestionIndex(0);
  setStatusText("Interview Started");
};

  const totalQuestions = shuffledQuestions.length;

  const progressPercent =
    totalQuestions > 0
      ? Math.min((questionIndex / totalQuestions) * 100, 100)
      : 0;

  /* --------------------------------------------------
     ▶ PLAY QUESTION AUDIO
  -------------------------------------------------- */
  const playQuestion = () => {
    if (questionIndex >= totalQuestions) {
      setStatusText("🎉 Interview Completed");
      return;
    }

    const audio = new Audio(shuffledQuestions[questionIndex]);

    setStatusText(`Playing Question ${questionIndex + 1}`);
    audio.play();

    audio.onended = () => {
      startRecording();
    };
  };

  /* --------------------------------------------------
     🎤 START RECORDING
  -------------------------------------------------- */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = handleAnswerSubmit;

      mediaRecorder.start();
      setIsRecording(true);
      setStatusText("Recording Answer...");
    } catch (err) {
      setStatusText("Microphone Access Denied");
    }
  };

  /* --------------------------------------------------
     ⏹ STOP RECORDING
  -------------------------------------------------- */
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setStatusText("Saving Response...");
    }
  };

  /* --------------------------------------------------
     📡 HANDLE ANSWER (NO DOWNLOAD NOW)
     → Ready to send backend later
  -------------------------------------------------- */
  const handleAnswerSubmit = () => {
    const blob = new Blob(chunksRef.current, { type: "audio/webm" });

    console.log("Recorded Answer Blob:", blob); // future API upload

    if (questionIndex + 1 < totalQuestions) {
      setQuestionIndex((prev) => prev + 1);
      setStatusText("Answer Saved. Next Question Ready.");
    } else {
      setQuestionIndex(totalQuestions);
      setStatusText("🎉 Interview Completed Successfully!");
    }
  };

  /* --------------------------------------------------
     UI
  -------------------------------------------------- */
  return (
    <div className="app-container">
      <h1 className="app-title">AI Interview Voice Interface</h1>

      {!selectedDomain ? (
        <DomainSelect onDomainSelect={handleDomainSelect} />
      ) : (
        <>
          <h2 className="status-text">{statusText}</h2>

          <h3>
            {questionIndex < totalQuestions
              ? `Question ${questionIndex + 1} of ${totalQuestions}`
              : "Interview Completed"}
          </h3>

          <p>
            Completed: {Math.min(questionIndex, totalQuestions)} | Remaining:{" "}
            {Math.max(totalQuestions - questionIndex, 0)}
          </p>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="button-group">
            <button className="btn play-btn" onClick={playQuestion}>
              ▶ Play Question
            </button>

            <button
              className="btn stop-btn"
              onClick={stopRecording}
              disabled={!isRecording}
            >
              ⏹ Stop Recording
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;