import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction} from "@reduxjs/toolkit";
import type { Patient } from "../../types/patient";
import { mockPatients } from "./mockPatients";

type ViewMode = "grid" | "list";

interface PatientsState {
  patients: Patient[];
  viewMode: ViewMode;
  selectedPatient: Patient | null;
  searchQuery: string;
}

const initialState: PatientsState = {
  patients: mockPatients,
  viewMode: "grid",
  selectedPatient: null,
  searchQuery: "",
};

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },
    setSelectedPatient(state, action: PayloadAction<Patient | null>) {
      state.selectedPatient = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setViewMode, setSelectedPatient, setSearchQuery } = patientsSlice.actions;
export default patientsSlice.reducer;