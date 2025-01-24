import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAddReminderMutation } from '../redux/apis/ReminderApi';
import { useState } from 'react';
import VoiceToText from './VoiceToText';
import { useAppSelector, useAppDispatch } from '../redux/customHooks';
import { setListener } from '../redux/slices/AdditionalSlice';
function ReminderForm() {
   const [reminder, setReminder]= useState<string>()
   const [addReminder ]= useAddReminderMutation()
   const isListening= useAppSelector(state=> state.additional.isListening)
   const dispatch = useAppDispatch()
  
   const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
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
        onChange={e=> setReminder(e.target.value)}
        type="text" placeholder="Enter reminders" />
      </Form.Group>
 
      <div>
        {
          isListening ?  <VoiceToText/>:  <i className="bi bi-mic" onClick={()=>dispatch(setListener())}></i>
        }
       
      </div>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ReminderForm;