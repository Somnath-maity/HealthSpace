import type{ RootState } from "../../app/store";

export const selectFilteredPatients = (state: RootState) => {
  const { patients, searchQuery } = state.patients;
  if (!searchQuery.trim()) return patients;
  return patients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );
};