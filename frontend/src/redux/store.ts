import { configureStore } from "@reduxjs/toolkit";
import { reminderApi } from "./apis/ReminderApi";
import { reminderSlice } from "./slices/reminderSlice";
const store = configureStore({
  reducer: {
    [reminderApi.reducerPath]: reminderApi.reducer,
    reminders: reminderSlice.reducer, 
  },
  // Add middleware for caching, invalidation, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reminderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;