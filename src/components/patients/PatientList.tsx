import PatientRow from "./PatientRow";
import type { Patient } from "../../types/patient";

interface Props {
  patients: Patient[];
}

const PatientList = ({ patients }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="px-5 py-2 grid grid-cols-4 text-xs font-medium text-gray-400 uppercase tracking-wide">
        <span>Patient</span>
        <span>Condition</span>
        <span>Doctor</span>
        <span>Status</span>
      </div>

      {/* Rows */}
      {patients.map((patient) => (
        <PatientRow key={patient.id} patient={patient} />
      ))}
    </div>
  );
};

export default PatientList;