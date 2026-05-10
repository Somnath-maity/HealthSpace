import { createSlice, } from "@reduxjs/toolkit";
import type { PayloadAction} from  "@reduxjs/toolkit";

interface AuthState {
  user: { uid: string; email: string | null } | null;
  loading: boolean;
  error: string | null;
  showLoginPortal: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
  showLoginPortal: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
      state.loading = false;
      state.showLoginPortal = false; // close portal on login
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearAuth(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.showLoginPortal = true; // open portal on logout/no session
    },
    openLoginPortal(state) {
      state.showLoginPortal = true;
    },
    closeLoginPortal(state) {
      state.showLoginPortal = false;
    },
  },
});

export const { setUser, setError, clearAuth, openLoginPortal, closeLoginPortal } = authSlice.actions;
export default authSlice.reducer;