import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: ReminderState = {
  isPopup: false,
};

// Create the slice with proper typings
export const additionalSlice = createSlice({
  name: "reminderSlice",
  initialState,
  reducers: {
    setModal: (state) => {
      state.isPopup = !state.isPopup; 
    },
  },
});

// Export the actions
export const { setModal } = additionalSlice.actions;

// Export the reducer
export default additionalSlice.reducer;
