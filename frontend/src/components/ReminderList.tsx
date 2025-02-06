import { useGetReminderQuery } from "../redux/apis/ReminderApi";
import { ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUpdateReminderMutation } from "../redux/apis/ReminderApi";
import { useDeleteReminderMutation } from "../redux/apis/ReminderApi";
import { useEffect, useState } from "react";

function ReminderList() {
  const { data: fetchedReminders } = useGetReminderQuery();

  return (
    <ListGroup className="py-5 reminder-list">
      {fetchedReminders?.map((item) => (
        <ReminderListItem item={item} key={item.id} />
      ))}
    </ListGroup>
  );
}

interface listgroupsProps {
  item: Reminders_temp;
}

const ReminderListItem: React.FC<listgroupsProps> = ({ item }) => {
  const [updatedval, setUpdatedVal] = useState<string>("");
  const [updateReminder] = useUpdateReminderMutation();
  const [deleteReminder] = useDeleteReminderMutation();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = (item: Reminders_temp) => {
    if (updatedval.trim() !== "") {
      const dataParams = item.id;
      const newData = { ...item, reminder: updatedval };
      updateReminder({ dataParams, newData });
      setIsEditing(!isEditing);
      setUpdatedVal("")
    }
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataParams = item.id
    const newCheckedState = e.target.checked;

    const newData = { ...item, isCompleted: newCheckedState };
    updateReminder({ dataParams, newData });

    console.log("Updated Data:", newData);
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <div>
        {isEditing ? (
          <div>
            <input type="text" onChange={(e) => setUpdatedVal(e.target.value)} value={updatedval} autoComplete="off" />
            <Button variant="outline-warning" onClick={() => handleSave(item)}>
              save
            </Button>
          </div>
        ) : (
          <div className="d-flex gap-2">
            <input type="checkbox" name="" id="" onChange={handleChecked} checked={item.isCompleted} />
            <div className="d-flex align-items-center gap-3 ">
              <div className={`${item.isCompleted ? "checked" : ""}`}>
                {item.reminder} 
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="list-right ">
        {isEditing ? (
          <button onClick={() => setIsEditing(!isEditing)}>
            <i className="bi bi-x-lg r-icon"></i>
          </button>
        ) : (
          <button onClick={() => setIsEditing(!isEditing)}>
            <i className="bi bi-pencil-square r-icon"></i>
          </button>
        )}
        <button className="mx-2" onClick={() => deleteReminder(item.id)}>
          <i className="bi bi-trash r-icon"></i>
        </button>
      </div>
    </ListGroup.Item>
  );
};

export default ReminderList;
