import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { useGetReminderQuery, useUpdateReminderMutation } from "../redux/apis/ReminderApi";
import { useDeleteReminderMutation } from "../redux/apis/ReminderApi";
import { useAppDispatch } from "../redux/customHooks";
import { editReminder, setReminders } from "../redux/slices/reminderSlice";
import { useAppSelector } from "../redux/customHooks";
import { useEffect, useState } from "react";

function ReminderList() {
  const dispatch = useAppDispatch();
  const { data: fetchedReminders } = useGetReminderQuery();
  const [deleteReminder] = useDeleteReminderMutation();
  const reminders = useAppSelector((state) => state.reminders);
  const [updatedval, setUpdatedVal] = useState<string>("");
  const [updateReminder] = useUpdateReminderMutation();
  const handleDelete = (id: number) => {
    deleteReminder(id);
  };

  const handleEdit = (id: number) => {
    dispatch(editReminder(id));
  };

  const handleSave = (item: Reminders_temp) => {
    if (updatedval.trim() !== "") {
      const dataParams = item.id;
      const newData = { ...item, reminder: updatedval }
      // console.log(newJson)
      updateReminder({dataParams,newData});
    }
  };

  // useEffect(() => {
  //   fetch("http://localhost:8081/reminders")
  //     .then(res => res.json())
  //     .then(data => console.log(data)) // Handle fetched data
  //     .catch(err => console.error("Error fetching:", err));
  // }, []);
  useEffect(() => {
   
    if (fetchedReminders) {
      dispatch(setReminders(fetchedReminders));
    }
  }, [fetchedReminders, dispatch]);
  return (
    <ListGroup className="py-5 reminder-list">
      {reminders?.map((item: Reminders_temp, idx: number) => (
        <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
          <div>
            {item.isEdit ? (
              <div>
                <input type="text" onChange={(e) => setUpdatedVal(e.target.value)} value={updatedval} autoComplete="off" />
                <Button variant="outline-warning" onClick={() => handleSave(item)}>
                  save
                </Button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <input type="checkbox" name="" id="" />
                <div className="d-flex align-items-center gap-3 ">
                  <i className="bi bi-grip-vertical r-icon"></i>
                  <div>{item.reminder}</div>
                </div>
              </div>
            )}
          </div>
          <div className="list-right ">
            {item.isEdit ? (
              <button onClick={() => handleEdit(item.id)}>
                <i className="bi bi-x-lg r-icon"></i>
              </button>
            ) : (
              <button onClick={() => handleEdit(item.id)}>
                <i className="bi bi-pencil-square r-icon"></i>
              </button>
            )}
            <button className="mx-2" onClick={() => handleDelete(item.id)}>
              <i className="bi bi-trash r-icon"></i>
            </button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ReminderList;
