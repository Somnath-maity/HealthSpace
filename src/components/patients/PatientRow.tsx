import React from "react";
import type { Patient } from "../../types/patient";
import { statusStyles } from "../../utils/statusStyles";
import { useNavigate } from "react-router-dom";

interface Props {
  patient: Patient;
}

const PatientRow = React.memo(({ patient }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/patients/${patient.id}`)}
      className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between cursor-pointer hover:shadow-sm transition"
    >
      {/* Avatar + Name */}
      <div className="flex items-center gap-3 w-1/4">
        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center text-xs">
          {patient.avatar}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{patient.name}</p>
          <p className="text-xs text-gray-400">{patient.gender}, {patient.age} yrs</p>
        </div>
      </div>

      {/* Condition */}
      <p className="text-sm text-gray-500 w-1/4">{patient.condition}</p>

      {/* Doctor */}
      <p className="text-sm text-gray-500 w-1/4">{patient.doctor}</p>

      {/* Status */}
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[patient.status]}`}>
        {patient.status}
      </span>
    </div>
  );
});

export default PatientRow;