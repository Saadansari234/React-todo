import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAddReminderMutation } from '../redux/apis/ReminderApi';
import { useState } from 'react';
import { UseVoiceToText } from './UseVoiceToText';
import { useAppDispatch } from '../redux/customHooks';
import VoiceRecorModal from './modal/VoiceRecorModal';
// import { setListener } from '../redux/slices/AdditionalSlice';
function ReminderForm() {
  const [reminder, setReminder] = useState<string>("")
  const [addReminder] = useAddReminderMutation()
  const dispatch = useAppDispatch()
  const { isListening, startListening, transcript } = UseVoiceToText();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    if (reminder?.trim() !== "") {
      addReminder(reminder)
      setReminder("")
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Reminders</Form.Label>
        <Form.Control
          onChange={e => setReminder(e.target.value)}
          value={reminder}
          type="text" placeholder="Enter reminders" />
      </Form.Group>

      <div>
        {
          isListening ? <VoiceRecorModal transcript={transcript} /> : <i className="bi bi-mic" onClick={startListening}></i>
        }
      </div>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ReminderForm;