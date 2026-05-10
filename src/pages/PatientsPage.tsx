import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSearchQuery } from "../features/patients/patientsSlice";
import { selectFilteredPatients } from "../features/patients/patientsSelectors";
import ViewToggle from "../components/patients/ViewToggle";
import PatientGrid from "../components/patients/PatientGrid";
import PatientList from "../components/patients/PatientList";

const PatientsPage = () => {
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector((state) => state.patients.viewMode);
  const searchQuery = useAppSelector((state) => state.patients.searchQuery);
  const patients = useAppSelector(selectFilteredPatients);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Patients</h1>
          <p className="text-sm text-gray-400">{patients.length} records found</p>
        </div>
        <ViewToggle />
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          placeholder="Search by name or condition..."
          className="w-full max-w-sm border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* View */}
      {patients.length === 0 ? (
        <p className="text-sm text-gray-400 text-center mt-20">No patients found.</p>
      ) : viewMode === "grid" ? (
        <PatientGrid patients={patients} />
      ) : (
        <PatientList patients={patients} />
      )}
    </div>
  );
};

export default PatientsPage;