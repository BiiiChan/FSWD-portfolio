import React, { useEffect, useState } from "react";
import { fetchProjects } from "../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchProjects();
        setProjects(res.data || []);
      } catch (err) {
        setProjects([]);
      }
    })();
  }, []);

  return (
    <section className="projects">
      <h2>Projects</h2>
      <div className="grid">
        {projects.length ? (
          projects.map((p) => (
            <div key={p._id} className="card project">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  Demo / Repo
                </a>
              )}
            </div>
          ))
        ) : (
          <div className="card">
            No projects to show. Login to add your projects (Dashboard).
          </div>
        )}
      </div>
    </section>
  );
}
