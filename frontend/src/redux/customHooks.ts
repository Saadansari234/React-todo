import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store"; // Adjust paths as necessary

// Custom hook for dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook for selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
