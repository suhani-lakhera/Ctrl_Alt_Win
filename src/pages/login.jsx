// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <form onSubmit={submit}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
      <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}