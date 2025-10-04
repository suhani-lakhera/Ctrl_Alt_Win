// src/components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/authContext";

export default function PrivateRoute({ children, roles = [] }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  // optional role check
  if (roles.length && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  return children;
}