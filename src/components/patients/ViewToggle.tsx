import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setViewMode } from "../../features/patients/patientsSlice";
import { LayoutGrid, List } from "lucide-react";

const ViewToggle = () => {
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector((state) => state.patients.viewMode);

  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => dispatch(setViewMode("grid"))}
        className={`p-2 rounded-md transition ${
          viewMode === "grid" ? "bg-white shadow text-blue-600" : "text-gray-400"
        }`}
      >
        <LayoutGrid size={18} />
      </button>
      <button
        onClick={() => dispatch(setViewMode("list"))}
        className={`p-2 rounded-md transition ${
          viewMode === "list" ? "bg-white shadow text-blue-600" : "text-gray-400"
        }`}
      >
        <List size={18} />
      </button>
    </div>
  );
};

export default ViewToggle;