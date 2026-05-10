import { useAppSelector } from "../app/hooks";

const DashboardPage = () => {
  const patients = useAppSelector((state) => state.patients.patients);
  const critical = patients.filter((p) => p.status === "Critical").length;
  const stable = patients.filter((p) => p.status === "Stable").length;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-400 mb-6">Here's what's happening today</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Patients", value: patients.length },
          { label: "Critical", value: critical },
          { label: "Stable", value: stable },
          { label: "Doctors on Duty", value: 6 },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;