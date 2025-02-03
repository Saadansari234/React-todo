import { useState, useEffect, useRef } from "react";

export function UseVoiceToText() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if the browser supports SpeechRecognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Browser does not support Speech Recognition");
      return;
    }

    // Initialize SpeechRecstartListeningognition
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // You can set the language here
    recognition.interimResults = false;
    recognition.continuous = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript( currentTranscript);
    };

    recognition.onerror = (event: any) => {
      setError(event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      setError(null);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  return {
    transcript,
    isListening,
    error,
    startListening,
    stopListening,
    setTranscript
  };
}
