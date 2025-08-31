import React, { useEffect, useState } from "react";
import { fetchBio } from "../services/api";

export default function About() {
  const [bio, setBio] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchBio();
        setBio(res.data || {});
      } catch (err) {
        // no auth: show sample content
      }
    })();
  }, []);

  return (
    <section className="about card">
      <h2>About</h2>
      <h3>{bio.fullName || "Your Full Name"}</h3>
      <p className="muted">{bio.title || "Frontend Developer / Designer"}</p>
      <p>
        {bio.about ||
          `Short bio goes here — what you love building and designing.`}
      </p>
    </section>
  );
}
