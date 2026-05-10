import { Bell } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { markAllRead } from "../../features/notifications/notificationsSlice"
import { useState } from "react";

const NotificationBell = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.notifications);
  const [open, setOpen] = useState(false);

  const unreadCount = list.filter((n) => !n.read).length;

  const handleOpen = () => {
    setOpen(!open);
    if (!open) dispatch(markAllRead());
  };

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Bell size={20} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-100 rounded-xl shadow-lg z-50">
          <div className="p-3 border-b border-gray-50">
            <p className="text-sm font-medium text-gray-700">Notifications</p>
          </div>
          {list.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-6">No notifications</p>
          ) : (
            list.map((n) => (
              <div key={n.id} className="px-4 py-3 border-b border-gray-50 last:border-0">
                <p className="text-sm font-medium text-gray-700">{n.title}</p>
                <p className="text-xs text-gray-400">{n.body}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;