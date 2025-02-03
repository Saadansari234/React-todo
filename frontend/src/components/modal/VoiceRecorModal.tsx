import React from "react";
import { Button } from "react-bootstrap";
import { useAddReminderMutation } from "../../redux/apis/ReminderApi";
interface Modalprops {
  transcript: string;
  stopListening: ()=> void;
  setTranscript:(value: string)=> void;
}

const VoiceRecorModal: React.FC<Modalprops> = ({ transcript, stopListening, setTranscript }) => {
  const [addReminder] = useAddReminderMutation()
  const handleCancel=()=>{
    stopListening()
    setTranscript("")
  }
  const handleClick=()=>{
    if (transcript !== "") {
      stopListening()
      addReminder(transcript)
      setTranscript("")
    }
    console.log("bbbd")
  }

  return (
    <div className="modal-listener">  
      <div className="mod-body">
        <div className="mod-close"><i className="bi bi-x-lg" onClick={handleCancel} ></i></div>
        <h3>Add your reminder...</h3>
        <div className="mod-image-wrapper">
          <img src="../mic-speaking.svg" alt="" />
        </div>
        <div className="mod-transcript">{transcript}</div>
        <Button onClick={handleClick} variant="outline-primary mt-3">submit</Button>
      </div>
    </div>
  );
};

export default VoiceRecorModal;
