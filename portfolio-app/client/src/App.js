import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { getMe } from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await getMe();
      setUser(res.data);
    } catch (err) {
      console.log("Not authenticated");
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onAuth={setUser} />} />
          <Route path="/signup" element={<Signup onAuth={setUser} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
