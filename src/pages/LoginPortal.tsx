import { createPortal } from "react-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setError} from "../features/auth/authSlice";
import { useNotifications } from "../hooks/useNotifications";
import { addNotification } from "../features/notifications/notificationsSlice";

const LoginPortal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showLoginPortal, error } = useAppSelector((state) => state.auth);
  const { requestPermission, sendNotification } = useNotifications();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      dispatch(setError("Email and password are required."));
      return;
    }

    try {
      setSubmitting(true);
      await requestPermission();
      await signInWithEmailAndPassword(auth, email, password);

      sendNotification("Welcome back!", "You have patients waiting for review.");

      dispatch(addNotification({
        title: "Welcome back!",
        body: "You have patients waiting for review.",
      }));

      navigate("/dashboard");
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      setSubmitting(false);
    }
  };

  if (!showLoginPortal) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">

        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-6">Sign in to your healthcare dashboard</p>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@hospital.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition disabled:opacity-50"
        >
          {submitting ? "Signing in..." : "Sign In"}
        </button>

      </div>
    </div>,
    document.body
  );
};

export default LoginPortal;