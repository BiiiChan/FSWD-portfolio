import React, { useEffect, useState } from "react";
import { fetchSkills } from "../services/api";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchSkills();
        setSkills(res.data || []);
      } catch (err) {
        setSkills([]);
      }
    })();
  }, []);

  return (
    <section className="skills card">
      <h2>Skills</h2>
      <ul className="skill-list">
        {skills.length ? (
          skills.map((s) => (
            <li key={s._id}>
              {s.name} <span className="muted">({s.level})</span>
            </li>
          ))
        ) : (
          <li>Login to add skills via Dashboard.</li>
        )}
      </ul>
    </section>
  );
}
