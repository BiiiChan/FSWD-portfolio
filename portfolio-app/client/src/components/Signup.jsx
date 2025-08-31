import React, { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup({ onAuth }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      localStorage.setItem("token", res.data.token);
      onAuth(res.data.user);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <section className="auth card">
      <h2>Signup</h2>
      <form onSubmit={handle}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        {err && <p className="error">{err}</p>}
        <button className="btn">Signup</button>
      </form>
    </section>
  );
}
