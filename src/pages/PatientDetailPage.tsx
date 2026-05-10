import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { setSelectedPatient } from "../features/patients/patientsSlice";
import { statusStyles } from "../utils/statusStyles";
import { ArrowLeft } from "lucide-react";

const PatientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const patient = useAppSelector((state) =>
    state.patients.patients.find((p) => p.id === id)
  );

  useEffect(() => {
    if (patient) {
      dispatch(setSelectedPatient(patient));
    }

    return () => {
      dispatch(setSelectedPatient(null)); // cleanup on unmount
    };
  }, [patient]);

  if (!patient) {
    return (
      <div className="p-6 text-center text-gray-400 text-sm mt-20">
        Patient not found.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition"
      >
        <ArrowLeft size={16} />
        Back to Patients
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 font-bold text-xl flex items-center justify-center">
            {patient.avatar}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{patient.name}</h1>
            <p className="text-sm text-gray-400">{patient.gender}, {patient.age} years old</p>
            <span className={`mt-2 inline-block text-xs font-medium px-3 py-1 rounded-full ${statusStyles[patient.status]}`}>
              {patient.status}
            </span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <DetailCard label="Condition" value={patient.condition} />
        <DetailCard label="Assigned Doctor" value={patient.doctor} />
        <DetailCard label="Admitted On" value={patient.admittedOn} />
        <DetailCard label="Patient ID" value={patient.id} />

      </div>

    </div>
  );
};

// small reusable sub-component
const DetailCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
    <p className="text-sm font-medium text-gray-800">{value}</p>
  </div>
);

export default PatientDetailPage;