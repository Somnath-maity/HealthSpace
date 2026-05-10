import { useAppSelector } from "../app/hooks";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="h-14 bg-white border-b border-gray-100 px-6 flex items-center justify-between">

      <p className="text-sm text-gray-400">
        Good morning, <span className="text-gray-700 font-medium">{user?.email}</span>
      </p>

      <div className="flex items-center gap-3">
        <NotificationBell />
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold flex items-center justify-center">
          DR
        </div>
      </div>

    </header>
  );
};

export default Navbar;