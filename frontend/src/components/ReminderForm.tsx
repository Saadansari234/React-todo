import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAddReminderMutation } from "../redux/apis/ReminderApi";
import { useState } from "react";
import { UseVoiceToText } from "./UseVoiceToText";
import { useAppDispatch } from "../redux/customHooks";
import VoiceRecorModal from "./modal/VoiceRecorModal";
import { setModal } from "../redux/slices/AdditionalSlice";

// import { setListener } from '../redux/slices/AdditionalSlice';
function ReminderForm() {
  const [reminder, setReminder] = useState<string>("");
  const [addReminder] = useAddReminderMutation();
  const dispatch = useAppDispatch();
  const { startListening, isListening, transcript, stopListening, setTranscript } = UseVoiceToText();

  // const handleListening=()=>{
  //   startListening()
  //   dispatch(setModal())
  // }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reminder?.trim() !== "") {
      addReminder(reminder);
      setReminder("");
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div className="add-reminder">
        <Form.Group className="reminder-input" controlId="formBasicEmail">
          <Form.Control onChange={(e) => setReminder(e.target.value)} value={reminder} type="text" placeholder="Enter reminders" />
        </Form.Group>

        <div className="icon-wrapper">
          {isListening ? <VoiceRecorModal transcript={transcript} stopListening={stopListening} setTranscript={setTranscript} /> : <i className="bi bi-mic" onClick={startListening}></i>}
          {/* <i className="bi bi-mic" onClick={handleListening}></i> */}
        </div>

        <button className="reminder-btn" type="submit">
          <i className="bi bi-send"></i>
        </button>
      </div>
    </Form>
  );
}

export default ReminderForm;
