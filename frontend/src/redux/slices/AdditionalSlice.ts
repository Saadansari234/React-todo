import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: ReminderState = {
  isListening: false,
};

// Create the slice with proper typings
export const additionalSlice = createSlice({
  name: "reminderSlice",
  initialState,
  reducers: {
    setListener: (state) => {
      state.isListening = !state.isListening; 
    },
  },
});

// Export the actions
export const { setListener } = additionalSlice.actions;

// Export the reducer
export default additionalSlice.reducer;
