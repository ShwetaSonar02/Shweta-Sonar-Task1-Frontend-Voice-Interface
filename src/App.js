import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [statusText, setStatusText] = useState("System Ready");
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // 🎯 Questions per domain (5 each)
  const domainQuestions = {
    java: [
      "/audio/java1.mp3",
      "/audio/java2.mp3",
      "/audio/java3.mp3",
      "/audio/java4.mp3",
      "/audio/java5.mp3",
    ],
    web: [
      "/audio/web1.mp3",
      "/audio/web2.mp3",
      "/audio/web3.mp3",
      "/audio/web4.mp3",
      "/audio/web5.mp3",
    ],
    ai: [
      "/audio/ai1.mp3",
      "/audio/ai2.mp3",
      "/audio/ai3.mp3",
      "/audio/ai4.mp3",
      "/audio/ai5.mp3",
    ],
  };

  const totalQuestions = selectedDomain
    ? domainQuestions[selectedDomain].length
    : 0;

  const progressPercent =
    totalQuestions > 0
      ? Math.min((questionIndex / totalQuestions) * 100, 100)
      : 0;

  /* --------------------------------------------------
     PLAY QUESTION
  -------------------------------------------------- */
  const playQuestion = () => {
    if (!selectedDomain) {
      setStatusText("Please Select Domain First ⚠");
      return;
    }

    if (questionIndex >= totalQuestions) {
      setStatusText("🎉 Interview Completed Successfully!");
      return;
    }

    const audio = new Audio(
      domainQuestions[selectedDomain][questionIndex]
    );

    setStatusText(`Playing Question ${questionIndex + 1}...`);
    audio.play();

    audio.onended = () => {
      startRecording();
    };
  };

  /* --------------------------------------------------
     START RECORDING
  -------------------------------------------------- */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = saveRecording;

      mediaRecorder.start();
      setIsRecording(true);
      setStatusText("Recording Answer...");
    } catch (err) {
      setStatusText("❌ Microphone Error");
    }
  };

  /* --------------------------------------------------
     STOP RECORDING
  -------------------------------------------------- */
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setStatusText("Processing Answer...");
    }
  };

  /* --------------------------------------------------
     SAVE RECORDING
  -------------------------------------------------- */
  const saveRecording = () => {
    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Answer_Q${questionIndex + 1}.webm`;
    a.click();

    if (questionIndex + 1 < totalQuestions) {
      setQuestionIndex((prev) => prev + 1);
      setStatusText("Answer Saved ✅ Moving to Next Question...");
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

    {/* Domain Selection */}
    <div className="domain-section">
      <label>Select Domain:</label>
      <select
        className="select-domain"
        value={selectedDomain}
        onChange={(e) => {
          setSelectedDomain(e.target.value);
          setQuestionIndex(0);
          setStatusText("System Ready");
        }}
      >
        <option value="">-- Choose Domain --</option>
        <option value="java">Java Development</option>
        <option value="web">Web Development</option>
        <option value="ai">AI / ML</option>
      </select>
    </div>

    {/* Status */}
    <h2 className="status-text">{statusText}</h2>

    {/* Show Only After Domain Selected */}
    {selectedDomain && (
      <>
        <h3 className="question-count">
          {questionIndex < totalQuestions
            ? `Question ${questionIndex + 1} of ${totalQuestions}`
            : "Interview Completed"}
        </h3>

        <p className="progress-text">
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

        {/* Buttons */}
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

const btnStyle = {
  padding: "10px 20px",
  margin: "10px",
  fontSize: "16px",
  cursor: "pointer",
};

export default App;