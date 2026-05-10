import PatientCard from "./PatientCard";
import type { Patient } from "../../types/patient";

interface Props {
  patients: Patient[];
}

const PatientGrid = ({ patients }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
};

export default PatientGrid;