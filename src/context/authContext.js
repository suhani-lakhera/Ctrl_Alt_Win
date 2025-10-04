// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);    // store user object returned by backend
  const [loading, setLoading] = useState(true);

  // Set or remove token on axios defaults + localStorage
  const setSession = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete api.defaults.headers.common.Authorization;
    }
  };

  // register
  const register = async (payload) => {
    const res = await api.post("/auth/register", payload);
    setSession(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  // login
  const login = async (payload) => {
    const res = await api.post("/auth/login", payload);
    setSession(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  // logout
  const logout = async () => {
    // If you have a server logout endpoint (clearing refresh cookie), call it here.
    setSession(null);
    setUser(null);
  };

  // On mount: attempt to rehydrate user from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    setSession(token);
    // verify token by calling protected profile endpoint
    api.get("/auth/profile")
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => {
        setSession(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;