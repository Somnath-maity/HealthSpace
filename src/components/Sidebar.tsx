import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart2,
  LogOut,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/analytics", label: "Analytics", icon: BarChart2 },
];

const Sidebar = () => {
  const handleLogout = async () => {
    await signOut(auth);
    // onAuthStateChanged fires → clearAuth() → showLoginPortal = true
  };

  return (
    <aside className="w-60 bg-white border-r border-gray-100 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <h1 className="text-lg font-bold text-blue-600">HealthDesk</h1>
        <p className="text-xs text-gray-400">B2B Healthcare Platform</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-500 hover:bg-gray-50"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 w-full transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;