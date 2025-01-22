import React, { useState, useEffect } from 'react';

const VoiceToText = () => {
  const [transcription, setTranscription] = useState('');
  const [isListening, setIsListening] = useState(false);
  let recognition;

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setTranscription(transcript);
      };
    } else {
      alert('Speech Recognition API is not supported in this browser.');
    }
  }, []);

  const handleStartStop = () => {
    if (isListening) {
      recognition.stop();
    } else {
      setTranscription('');
      recognition.start();
    }
  };

  return (
    <div>
      <h2>Voice to Text Converter</h2>
      <button onClick={handleStartStop}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <div>
        <h3>Transcription:</h3>
        <p>{transcription}</p>
      </div>
    </div>
  );
};

export default VoiceToText;
