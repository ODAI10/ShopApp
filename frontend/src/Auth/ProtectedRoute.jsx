import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, role, loading } = useContext(AuthContext);
console.log("User role:", role);
console.log("Allowed roles:", allowedRoles);
  if (loading) {
    return <div>Loading...</div>;  // شاشة انتظار أثناء جلب بيانات المستخدم
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
