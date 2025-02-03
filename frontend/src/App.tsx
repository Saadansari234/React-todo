import "./App.css";
import VoiceRecorModal from "./components/modal/VoiceRecorModal";
import ReminderForm from "./components/ReminderForm";
import ReminderList from "./components/ReminderList";
import { useAppSelector } from "./redux/customHooks";
function App() {
  return (
    <>
      <div className="main">
        <div className="reminder-content">
          <ReminderForm />
          <ReminderList />
        </div>
      </div>
    </>
  );
}

export default App;
