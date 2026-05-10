import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { setUser, clearAuth } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({ uid: firebaseUser.uid, email: firebaseUser.email }));
      } else {
        dispatch(clearAuth()); }
    });

    return unsubscribe;
  }, [dispatch]);
};