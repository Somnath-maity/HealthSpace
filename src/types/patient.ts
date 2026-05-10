export type Gender = "Male" | "Female" | "Other";
export type Status = "Stable" | "Critical" | "Recovering" | "Discharged";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  condition: string;
  status: Status;
  doctor: string;
  admittedOn: string; // ISO date string
  avatar: string; // initials or image url
}