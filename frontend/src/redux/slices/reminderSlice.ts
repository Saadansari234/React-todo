import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Reminders_temp from "../../interfaces";

// const { data } = useGetReminderQuery();

export const reminderSlice = createSlice({
  name: "reminderSlice",
  initialState: [] as Reminders_temp[],
  reducers: {
    setReminders: (state, action: PayloadAction<Reminders_temp[]>) => {
      // Populate reminders into local state
      return action.payload;
    },
    editReminder: (state, action: PayloadAction<number>) => {
      const selectedReminder = state.find((t) => t.id === action.payload);
      if (selectedReminder) {
        selectedReminder.isEdit = !selectedReminder.isEdit;
      }
    },
    isSpeak:(state, action: PayloadAction<number> )=>{
      
    }
  },
});

export const { editReminder, setReminders } = reminderSlice.actions;

export default reminderSlice.reducer;
