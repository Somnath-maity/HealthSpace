import React from "react";
import type { Patient } from "../../types/patient";
import { statusStyles } from "../../utils/statusStyles";
import { useNavigate } from "react-router-dom";

interface Props {
  patient: Patient;
}

const PatientCard = React.memo(({ patient }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/patients/${patient.id}`)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 cursor-pointer hover:shadow-md transition"
    >
      {/* Avatar + Name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center text-sm">
          {patient.avatar}
        </div>
        <div>
          <p className="font-medium text-gray-800 text-sm">{patient.name}</p>
          <p className="text-xs text-gray-400">{patient.gender}, {patient.age} yrs</p>
        </div>
      </div>

      {/* Condition */}
      <p className="text-xs text-gray-500 mb-3">{patient.condition}</p>

      {/* Status Badge */}
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[patient.status]}`}>
        {patient.status}
      </span>

      {/* Doctor + Date */}
      <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between text-xs text-gray-400">
        <span>{patient.doctor}</span>
        <span>{patient.admittedOn}</span>
      </div>
    </div>
  );
});

export default PatientCard;