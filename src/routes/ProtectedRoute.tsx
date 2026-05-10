import {  Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useAppDispatch } from "../app/hooks";
import { openLoginPortal } from "../features/auth/authSlice";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!loading && !user) {
      dispatch(openLoginPortal()); 
    }
  }, [user, loading]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null; 

  return <Outlet />;
};

export default ProtectedRoute;