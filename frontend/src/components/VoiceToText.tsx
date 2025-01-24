import React, { useState, useEffect } from "react";

const VoiceToText: React.FC = () => {
  const [transcription, setTranscription] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const newRecognition = new SpeechRecognition();
      newRecognition.lang = "en-US";
      newRecognition.continuous = true;
      newRecognition.interimResults = true;

      newRecognition.onstart = () => {
        setIsListening(true);
      };

      newRecognition.onend = () => {
        setIsListening(false);
      };

      newRecognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setTranscription(transcript);
      };

      setRecognition(newRecognition);
    } else {
      alert("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  const handleStartStop = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        setTranscription("");
        recognition.start();
      }
    }
  };

  return (
    <div>
      <h2>Voice to Text Converter</h2>
      <div onClick={handleStartStop}>
        {isListening ? (
          <div className="position-absolute">
            <i className="bi bi-mic-mute"></i>
            <p>{transcription}</p>
            <button>submit</button>
          </div>
        ) : (
          <i className="bi bi-mic"></i>
        )}
      </div>
      {/* <div>
        <h3>Transcription:</h3>
        <p>{transcription}</p>
      </div> */}
    </div>
  );
};

export default VoiceToText;
