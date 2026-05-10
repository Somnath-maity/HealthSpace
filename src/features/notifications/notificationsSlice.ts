import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

interface AppNotification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

interface NotificationsState {
  permission: "default" | "granted" | "denied";
  list: AppNotification[];
}

const initialState: NotificationsState = {
  permission: "default",
  list: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setPermission(state, action: PayloadAction<NotificationsState["permission"]>) {
      state.permission = action.payload;
    },
    addNotification(state, action: PayloadAction<Omit<AppNotification, "id" | "read" | "createdAt">>) {
      state.list.unshift({
        id: crypto.randomUUID(),
        read: false,
        createdAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    markAllRead(state) {
      state.list.forEach((n) => (n.read = true));
    },
  },
});

export const { setPermission, addNotification, markAllRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;