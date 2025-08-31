import React, { useEffect, useState } from "react";
import {
  fetchBio,
  saveBio,
  fetchSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/api";

export default function Dashboard({ user }) {
  const [bio, setBio] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  const [skillForm, setSkillForm] = useState({ name: "", level: "" });
  const [projForm, setProjForm] = useState({
    title: "",
    description: "",
    link: "",
  });

  const loadAll = async () => {
    try {
      const b = await fetchBio();
      setBio(b.data || {});
    } catch {}
    try {
      const s = await fetchSkills();
      setSkills(s.data || []);
    } catch {}
    try {
      const p = await fetchProjects();
      setProjects(p.data || []);
    } catch {}
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleBioSave = async (e) => {
    e.preventDefault();
    await saveBio(bio);
    await loadAll();
  };

  const addSkill = async (e) => {
    e.preventDefault();
    await createSkill(skillForm);
    setSkillForm({ name: "", level: "" });
    await loadAll();
  };

  const removeSkill = async (id) => {
    await deleteSkill(id);
    await loadAll();
  };
  const addProject = async (e) => {
    e.preventDefault();
    await createProject(projForm);
    setProjForm({ title: "", description: "", link: "" });
    await loadAll();
  };
  const removeProject = async (id) => {
    await deleteProject(id);
    await loadAll();
  };

  return (
    <section className="dashboard">
      <h2>Dashboard</h2>

      <div className="grid">
        <div className="card">
          <h3>Bio</h3>
          <form onSubmit={handleBioSave}>
            <input
              placeholder="Full name"
              value={bio.fullName || ""}
              onChange={(e) => setBio({ ...bio, fullName: e.target.value })}
            />
            <input
              placeholder="Title"
              value={bio.title || ""}
              onChange={(e) => setBio({ ...bio, title: e.target.value })}
            />
            <input
              placeholder="Contact email"
              value={bio.contactEmail || ""}
              onChange={(e) => setBio({ ...bio, contactEmail: e.target.value })}
            />
            <textarea
              placeholder="About"
              value={bio.about || ""}
              onChange={(e) => setBio({ ...bio, about: e.target.value })}
            ></textarea>
            <button className="btn">Save Bio</button>
          </form>
        </div>

        <div className="card">
          <h3>Skills</h3>
          <form onSubmit={addSkill}>
            <input
              placeholder="Skill name"
              value={skillForm.name}
              onChange={(e) =>
                setSkillForm({ ...skillForm, name: e.target.value })
              }
            />
            <input
              placeholder="Level (e.g., Intermediate)"
              value={skillForm.level}
              onChange={(e) =>
                setSkillForm({ ...skillForm, level: e.target.value })
              }
            />
            <button className="btn">Add Skill</button>
          </form>
          <ul>
            {skills.map((s) => (
              <li key={s._id}>
                {s.name} <span className="muted">({s.level})</span>
                <button className="small" onClick={() => removeSkill(s._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>Projects</h3>
          <form onSubmit={addProject}>
            <input
              placeholder="Title"
              value={projForm.title}
              onChange={(e) =>
                setProjForm({ ...projForm, title: e.target.value })
              }
            />
            <input
              placeholder="Link"
              value={projForm.link}
              onChange={(e) =>
                setProjForm({ ...projForm, link: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={projForm.description}
              onChange={(e) =>
                setProjForm({ ...projForm, description: e.target.value })
              }
            ></textarea>
            <button className="btn">Add Project</button>
          </form>
          <ul>
            {projects.map((p) => (
              <li key={p._id}>
                <strong>{p.title}</strong> — {p.description}
                <button className="small" onClick={() => removeProject(p._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
