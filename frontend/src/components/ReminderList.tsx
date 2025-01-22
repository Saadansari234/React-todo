import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { useGetReminderQuery, useUpdateReminderMutation } from "../redux/apis/ReminderApi";
import Reminders_temp from "../interfaces";
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

  const handleSave = (id: number) => {
    updateReminder({ id, updatedval });
  };

  useEffect(() => {
    if (fetchedReminders) {
      // Store the fetched reminders into the local state
      dispatch(setReminders(fetchedReminders));
    }
  }, [fetchedReminders, dispatch]);
  return (
    <ListGroup className="py-5">
      {reminders?.map((item: Reminders_temp, idx: number) => (
        <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
          <div>
            {item.isEdit ? (
              <div>
                <input type="text" onChange={(e) => setUpdatedVal(e.target.value)} value={updatedval} />
                <Button variant="outline-warning" onClick={() => handleSave(item.id)}>
                  save
                </Button>
              </div>
            ) : (
              <div>{item.reminder}</div>
            )}
          </div>
          <div>
            {item.isEdit ? (
              <Button variant="outline-warning" onClick={() => handleEdit(item.id)}>
              <i className="bi bi-x-lg"></i>
              </Button>
            ) : (
              <Button variant="outline-warning" onClick={() => handleEdit(item.id)}>
            <i className="bi bi-pencil-square"></i>
              </Button>
            )}
            <Button variant="outline-danger" className="mx-2" onClick={() => handleDelete(item.id)}>
            <i className="bi bi-trash"></i>
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ReminderList;
