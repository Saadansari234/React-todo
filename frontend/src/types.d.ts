interface Reminders_temp {
  id: number;
  reminder: string;
  isCompleted: boolean;
  isEdit: boolean;
  customField: null;
  createdAt:string;
  createdAt:string
}

interface ReminderState {
  isPopup: boolean;
}

// voice to text converting interface
interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}

interface SpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
  readonly resultIndex: number;
}