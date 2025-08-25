import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

function ProjectCard({ p, onDelete, onEditClick }) {
  return (
    <div className="project-card">
      <div className="project-top">
        <h4>{p.title}</h4>
        <div className="project-actions">
          <button className="btn small" onClick={() => onEditClick(p)}>
            Edit
          </button>
          <button className="btn small ghost" onClick={() => onDelete(p._id)}>
            Delete
          </button>
        </div>
      </div>

      <p>{p.description}</p>

      <div className="techs">
        {p.techs?.map((t) => (
          <span key={t} className="tech">
            {t}
          </span>
        ))}
      </div>

      {/* ✅ Show GitHub + Live Links if available */}
      <div style={{ marginTop: "8px" }}>
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="link"
            style={{ marginRight: "12px" }}
          >
            GitHub
          </a>
        )}
        {p.live && (
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Live
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    load();
  }, []);

  function load() {
    axios.get(`${API}/projects`).then((r) => setProjects(r.data));
  }

  async function create(e) {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        techs: form.techs
          ? form.techs.split(",").map((t) => t.trim())
          : [],
      };

      if (editing) {
        await axios.put(`${API}/projects/${editing._id}`, payload);
        setEditing(null);
      } else {
        await axios.post(`${API}/projects`, payload);
      }

      setForm({});
      setFormVisible(false);
      load();
    } catch (err) {
      alert(err?.response?.data?.error || err.message);
    }
  }

  async function remove(id) {
    if (!window.confirm("Delete project?")) return;
    await axios.delete(`${API}/projects/${id}`);
    load();
  }

  function startEdit(p) {
    setEditing(p);
    setForm({
      ...p,
      techs: p.techs?.join(", "),
    });
    setFormVisible(true);
  }

  return (
    <div className="container">
      <div className="section-head">
        <h2>Projects</h2>
        <div>
          <button
            className="btn"
            onClick={() => {
              setFormVisible((s) => !s);
              setEditing(null);
              setForm({});
            }}
          >
            {formVisible ? "Close" : "Add Project"}
          </button>
        </div>
      </div>

      {formVisible && (
        <form className="card form-card" onSubmit={create}>
          <label>
            Title
            <input
              required
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </label>

          <label>
            Description
            <textarea
              required
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            ></textarea>
          </label>

          <label>
            GitHub Link
            <input
              value={form.github || ""}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
            />
          </label>

          <label>
            Live Link
            <input
              value={form.live || ""}
              onChange={(e) => setForm({ ...form, live: e.target.value })}
            />
          </label>

          <label>
            Techs (comma separated)
            <input
              value={form.techs || ""}
              onChange={(e) => setForm({ ...form, techs: e.target.value })}
            />
          </label>

          <div style={{ display: "flex", gap: "8px" }}>
            <button type="submit" className="btn">
              {editing ? "Save" : "Create"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setFormVisible(false);
                setForm({});
                setEditing(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard
            key={p._id}
            p={p}
            onDelete={remove}
            onEditClick={startEdit}
          />
        ))}
      </div>
    </div>
  );
}
